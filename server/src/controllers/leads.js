const { PrismaClient } = require('@prisma/client');
const { Parser } = require('json2csv');

const prisma = new PrismaClient();

async function createLead(req, res) {
  try {
    const { 
      name, email, phone, 
      utmSource, utmMedium, utmCampaign,
      utmContent, utmTerm, fbclid,
      campaignId, adId, adsetId
    } = req.body;

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        utmSource,
        utmMedium,
        utmCampaign,
        utmContent,
        utmTerm,
        fbclid,
        campaignId,
        adId,
        adsetId
      }
    });

    await prisma.abandonedSignup.updateMany({
      where: {
        OR: [
          { email: email },
          { phone: phone }
        ],
        completedAt: null
      },
      data: {
        completedAt: new Date()
      }
    });

    res.status(201).json({
      success: true,
      leadId: lead.id
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ error: 'Erro ao salvar contato' });
  }
}

async function recordWhatsAppClick(req, res) {
  try {
    const { id } = req.params;

    await prisma.lead.update({
      where: { id },
      data: { whatsappClickedAt: new Date() }
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error recording WhatsApp click:', error);
    res.status(500).json({ error: 'Erro ao registrar clique' });
  }
}

async function getLeads(req, res) {
  try {
    const { format, page = 1, limit = 50, startDate, endDate } = req.query;
    const skip = (page - 1) * limit;

    const where = {};
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        where.createdAt.lte = end;
      }
    }

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: parseInt(skip),
        take: parseInt(limit)
      }),
      prisma.lead.count({ where })
    ]);

    if (format === 'csv') {
      const fields = [
        { label: 'Nome', value: 'name' },
        { label: 'Email', value: 'email' },
        { label: 'Telefone', value: 'phone' },
        { label: 'Data', value: 'createdAt' },
        { label: 'UTM Source', value: 'utmSource' },
        { label: 'UTM Medium', value: 'utmMedium' },
        { label: 'UTM Campaign', value: 'utmCampaign' },
        { label: 'UTM Content', value: 'utmContent' },
        { label: 'UTM Term', value: 'utmTerm' },
        { label: 'Facebook Click ID', value: 'fbclid' },
        { label: 'Campaign ID', value: 'campaignId' },
        { label: 'Ad ID', value: 'adId' },
        { label: 'Adset ID', value: 'adsetId' },
        { label: 'Clicou WhatsApp', value: 'whatsappClickedAt' }
      ];

      const allLeads = await prisma.lead.findMany({
        where,
        orderBy: { createdAt: 'desc' }
      });

      const parser = new Parser({ fields });
      const csv = parser.parse(allLeads);

      res.header('Content-Type', 'text/csv');
      res.header('Content-Disposition', `attachment; filename="leads-${new Date().toISOString().split('T')[0]}.csv"`);
      return res.send(csv);
    }

    res.json({
      leads,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error getting leads:', error);
    res.status(500).json({ error: 'Erro ao buscar leads' });
  }
}

async function deleteLead(req, res) {
  try {
    const { id } = req.params;
    
    const lead = await prisma.lead.findUnique({
      where: { id }
    });
    
    if (!lead) {
      return res.status(404).json({ error: 'Lead não encontrado' });
    }
    
    await prisma.lead.delete({
      where: { id }
    });
    
    res.json({ success: true, message: 'Lead excluído com sucesso' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({ error: 'Erro ao excluir lead' });
  }
}

module.exports = {
  createLead,
  recordWhatsAppClick,
  getLeads,
  deleteLead
};
