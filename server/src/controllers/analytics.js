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
    const { startDate, endDate } = req.query;
    
    const where = {};
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const visitsWhere = {};
    if (startDate || endDate) {
      visitsWhere.visitedAt = {};
      if (startDate) visitsWhere.visitedAt.gte = new Date(startDate);
      if (endDate) visitsWhere.visitedAt.lte = new Date(endDate);
    }

    const [
      totalLeads,
      leadsWithWhatsApp,
      totalVisits,
      uniqueVisitors,
      recentLeads
    ] = await Promise.all([
      prisma.lead.count({ where }),
      prisma.lead.count({ 
        where: { 
          ...where,
          whatsappClickedAt: { not: null }
        } 
      }),
      prisma.visit.count({ where: visitsWhere }),
      prisma.visit.groupBy({
        by: ['sessionId'],
        where: visitsWhere,
        _count: true
      }),
      prisma.lead.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: 10
      })
    ]);

    const conversionRate = totalLeads > 0 
      ? ((leadsWithWhatsApp / totalLeads) * 100).toFixed(2)
      : 0;

    res.json({
      summary: {
        totalVisits,
        uniqueVisitors: uniqueVisitors.length,
        totalLeads,
        leadsWithWhatsApp,
        conversionRate: parseFloat(conversionRate)
      },
      recentLeads
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
