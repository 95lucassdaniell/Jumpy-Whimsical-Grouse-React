const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

async function recordVisit(req, res) {
  try {
    const { page, utmSource, utmMedium, utmCampaign, referrer } = req.body;
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

    const [currentVisits, currentLeads, currentWhatsApp] = await Promise.all([
      prisma.visit.count({ where: { visitedAt: { gte: thirtyDaysAgo } } }),
      prisma.lead.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
      prisma.lead.count({ 
        where: { 
          createdAt: { gte: thirtyDaysAgo },
          whatsappClickedAt: { not: null }
        } 
      })
    ]);

    const [previousVisits, previousLeads, previousWhatsApp] = await Promise.all([
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
      })
    ]);

    const currentConversion = currentVisits > 0 
      ? ((currentLeads / currentVisits) * 100).toFixed(1)
      : 0;
    const previousConversion = previousVisits > 0
      ? ((previousLeads / previousVisits) * 100).toFixed(1)
      : 0;

    const calculateGrowth = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return (((current - previous) / previous) * 100).toFixed(1);
    };

    res.json({
      current: {
        totalVisits: currentVisits,
        totalLeads: currentLeads,
        leadsWithWhatsApp: currentWhatsApp,
        conversionRate: parseFloat(currentConversion)
      },
      previous: {
        totalVisits: previousVisits,
        totalLeads: previousLeads,
        leadsWithWhatsApp: previousWhatsApp,
        conversionRate: parseFloat(previousConversion)
      },
      growth: {
        visits: parseFloat(calculateGrowth(currentVisits, previousVisits)),
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

module.exports = {
  recordVisit,
  getSummary
};
