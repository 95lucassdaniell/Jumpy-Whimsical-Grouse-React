const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

async function recordVisit(req, res) {
  try {
    const { 
      page, 
      utmSource, utmMedium, utmCampaign,
      utmContent, utmTerm, fbclid,
      campaignId, adId, adsetId,
      referrer 
    } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex');
    
    let sessionId = req.session.visitorId;
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      req.session.visitorId = sessionId;
    }

    await prisma.visit.create({
      data: {
        page,
        sessionId,
        ipHash,
        utmSource,
        utmMedium,
        utmCampaign,
        utmContent,
        utmTerm,
        fbclid,
        campaignId,
        adId,
        adsetId,
        referrer
      }
    });

    res.json({ success: true, sessionId });
  } catch (error) {
    console.error('Error recording visit:', error);
    res.status(500).json({ error: 'Erro ao registrar visita' });
  }
}

async function getSummary(req, res) {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now - 60 * 24 * 60 * 60 * 1000);

    const [currentVisits, currentLeads, currentWhatsApp, currentUniqueVisitors] = await Promise.all([
      prisma.visit.count({ where: { visitedAt: { gte: thirtyDaysAgo } } }),
      prisma.lead.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
      prisma.lead.count({ 
        where: { 
          createdAt: { gte: thirtyDaysAgo },
          whatsappClickedAt: { not: null }
        } 
      }),
      prisma.visit.groupBy({
        by: ['sessionId'],
        where: { visitedAt: { gte: thirtyDaysAgo } }
      })
    ]);

    const [previousVisits, previousLeads, previousWhatsApp, previousUniqueVisitors] = await Promise.all([
      prisma.visit.count({ 
        where: { 
          visitedAt: { 
            gte: sixtyDaysAgo,
            lt: thirtyDaysAgo
          } 
        } 
      }),
      prisma.lead.count({ 
        where: { 
          createdAt: { 
            gte: sixtyDaysAgo,
            lt: thirtyDaysAgo
          } 
        } 
      }),
      prisma.lead.count({ 
        where: { 
          createdAt: { 
            gte: sixtyDaysAgo,
            lt: thirtyDaysAgo
          },
          whatsappClickedAt: { not: null }
        } 
      }),
      prisma.visit.groupBy({
        by: ['sessionId'],
        where: { 
          visitedAt: { 
            gte: sixtyDaysAgo,
            lt: thirtyDaysAgo
          } 
        }
      })
    ]);

    const currentUniqueVisitorsCount = currentUniqueVisitors.length;
    const previousUniqueVisitorsCount = previousUniqueVisitors.length;

    const currentConversion = currentUniqueVisitorsCount > 0 
      ? ((currentLeads / currentUniqueVisitorsCount) * 100).toFixed(1)
      : 0;
    const previousConversion = previousUniqueVisitorsCount > 0
      ? ((previousLeads / previousUniqueVisitorsCount) * 100).toFixed(1)
      : 0;

    const calculateGrowth = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return (((current - previous) / previous) * 100).toFixed(1);
    };

    res.json({
      current: {
        totalVisits: currentVisits,
        uniqueVisitors: currentUniqueVisitorsCount,
        totalLeads: currentLeads,
        leadsWithWhatsApp: currentWhatsApp,
        conversionRate: parseFloat(currentConversion)
      },
      previous: {
        totalVisits: previousVisits,
        uniqueVisitors: previousUniqueVisitorsCount,
        totalLeads: previousLeads,
        leadsWithWhatsApp: previousWhatsApp,
        conversionRate: parseFloat(previousConversion)
      },
      growth: {
        visits: parseFloat(calculateGrowth(currentVisits, previousVisits)),
        uniqueVisitors: parseFloat(calculateGrowth(currentUniqueVisitorsCount, previousUniqueVisitorsCount)),
        leads: parseFloat(calculateGrowth(currentLeads, previousLeads)),
        whatsapp: parseFloat(calculateGrowth(currentWhatsApp, previousWhatsApp)),
        conversion: parseFloat(calculateGrowth(
          parseFloat(currentConversion), 
          parseFloat(previousConversion)
        ))
      }
    });
  } catch (error) {
    console.error('Error getting summary:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
}

async function getCampaignStats(req, res) {
  try {
    const { period = 30 } = req.query;
    const daysAgo = new Date(Date.now() - period * 24 * 60 * 60 * 1000);

    const campaignLeads = await prisma.lead.groupBy({
      by: ['utmCampaign', 'utmSource'],
      where: {
        createdAt: { gte: daysAgo },
        utmCampaign: { not: null }
      },
      _count: {
        id: true
      }
    });

    const campaigns = await Promise.all(
      campaignLeads.map(async (item) => {
        const whereClause = {
          createdAt: { gte: daysAgo },
          utmCampaign: item.utmCampaign,
          utmSource: item.utmSource === null ? null : item.utmSource
        };

        const visitWhereClause = {
          visitedAt: { gte: daysAgo },
          utmCampaign: item.utmCampaign,
          utmSource: item.utmSource === null ? null : item.utmSource
        };

        const whatsappClicks = await prisma.lead.count({
          where: {
            ...whereClause,
            whatsappClickedAt: { not: null }
          }
        });

        const uniqueVisitors = await prisma.visit.groupBy({
          by: ['sessionId'],
          where: visitWhereClause
        });

        const totalLeads = item._count.id;
        const uniqueVisitorsCount = uniqueVisitors.length;
        const conversionRate = uniqueVisitorsCount > 0
          ? ((totalLeads / uniqueVisitorsCount) * 100).toFixed(1)
          : 0;

        return {
          campaign: item.utmCampaign,
          source: item.utmSource,
          leads: totalLeads,
          whatsappClicks,
          uniqueVisitors: uniqueVisitorsCount,
          conversionRate: parseFloat(conversionRate)
        };
      })
    );

    campaigns.sort((a, b) => b.leads - a.leads);

    res.json({
      campaigns: campaigns.slice(0, 10),
      totalCampaigns: campaigns.length,
      period
    });

  } catch (error) {
    console.error('Error getting campaign stats:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas de campanhas' });
  }
}

module.exports = {
  recordVisit,
  getSummary,
  getCampaignStats
};
