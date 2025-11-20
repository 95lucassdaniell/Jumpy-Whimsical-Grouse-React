const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

const hashIP = (ip) => {
  return crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
};

const savePartialSignup = async (req, res) => {
  try {
    const { 
      sessionId, name, email, phone, 
      utmSource, utmMedium, utmCampaign,
      utmContent, utmTerm, fbclid,
      campaignId, adId, adsetId
    } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID é obrigatório' });
    }

    if (!name && !email && !phone) {
      return res.status(400).json({ error: 'Pelo menos um campo deve ser preenchido' });
    }

    const ipHash = req.ip ? hashIP(req.ip) : null;

    const existingSignup = await prisma.abandonedSignup.findFirst({
      where: { sessionId }
    });

    let signup;
    if (existingSignup) {
      signup = await prisma.abandonedSignup.update({
        where: { id: existingSignup.id },
        data: {
          name: name || existingSignup.name,
          email: email || existingSignup.email,
          phone: phone || existingSignup.phone,
          utmSource: utmSource || existingSignup.utmSource,
          utmMedium: utmMedium || existingSignup.utmMedium,
          utmCampaign: utmCampaign || existingSignup.utmCampaign,
          utmContent: utmContent || existingSignup.utmContent,
          utmTerm: utmTerm || existingSignup.utmTerm,
          fbclid: fbclid || existingSignup.fbclid,
          campaignId: campaignId || existingSignup.campaignId,
          adId: adId || existingSignup.adId,
          adsetId: adsetId || existingSignup.adsetId,
          ipHash: ipHash || existingSignup.ipHash,
          completedAt: null
        }
      });
    } else {
      signup = await prisma.abandonedSignup.create({
        data: {
          sessionId,
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
          adsetId,
          ipHash
        }
      });
    }

    res.json({ success: true, signupId: signup.id });
  } catch (error) {
    console.error('Error saving partial signup:', error);
    res.status(500).json({ error: 'Erro ao salvar dados' });
  }
};

const markAsCompleted = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID é obrigatório' });
    }

    const signup = await prisma.abandonedSignup.findFirst({
      where: { sessionId }
    });

    if (signup) {
      await prisma.abandonedSignup.update({
        where: { id: signup.id },
        data: { completedAt: new Date() }
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error marking signup as completed:', error);
    res.status(500).json({ error: 'Erro ao atualizar dados' });
  }
};

const getAbandonedSignups = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const [signups, total] = await Promise.all([
      prisma.abandonedSignup.findMany({
        where: {
          completedAt: null
        },
        orderBy: { updatedAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.abandonedSignup.count({
        where: {
          completedAt: null
        }
      })
    ]);

    res.json({
      signups,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching abandoned signups:', error);
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
};

const getAbandonedStats = async (req, res) => {
  try {
    const [totalAbandoned, totalCompleted, recentAbandoned] = await Promise.all([
      prisma.abandonedSignup.count({
        where: { completedAt: null }
      }),
      prisma.abandonedSignup.count({
        where: { completedAt: { not: null } }
      }),
      prisma.abandonedSignup.count({
        where: {
          completedAt: null,
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
          }
        }
      })
    ]);

    const withEmail = await prisma.abandonedSignup.count({
      where: {
        completedAt: null,
        email: { not: null }
      }
    });

    const withPhone = await prisma.abandonedSignup.count({
      where: {
        completedAt: null,
        phone: { not: null }
      }
    });

    const recoveryRate = totalCompleted > 0 
      ? ((totalCompleted / (totalAbandoned + totalCompleted)) * 100).toFixed(1)
      : 0;

    res.json({
      totalAbandoned,
      totalCompleted,
      recentAbandoned,
      withEmail,
      withPhone,
      recoveryRate
    });
  } catch (error) {
    console.error('Error fetching abandoned stats:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
};

const exportAbandonedCSV = async (req, res) => {
  try {
    const signups = await prisma.abandonedSignup.findMany({
      where: { completedAt: null },
      orderBy: { updatedAt: 'desc' }
    });

    const csv = [
      'Nome,Email,Telefone,Data Início,Última Atualização,UTM Source,UTM Medium,UTM Campaign,UTM Content,UTM Term,Facebook Click ID,Campaign ID,Ad ID,Adset ID',
      ...signups.map(s => 
        `"${s.name || ''}","${s.email || ''}","${s.phone || ''}","${s.createdAt.toISOString()}","${s.updatedAt.toISOString()}","${s.utmSource || ''}","${s.utmMedium || ''}","${s.utmCampaign || ''}","${s.utmContent || ''}","${s.utmTerm || ''}","${s.fbclid || ''}","${s.campaignId || ''}","${s.adId || ''}","${s.adsetId || ''}"`
      )
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename=cadastros-abandonados.csv');
    res.send('\ufeff' + csv);
  } catch (error) {
    console.error('Error exporting abandoned signups CSV:', error);
    res.status(500).json({ error: 'Erro ao exportar dados' });
  }
};

const convertToLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const abandonedSignup = await prisma.abandonedSignup.findUnique({
      where: { id }
    });

    if (!abandonedSignup) {
      return res.status(404).json({ error: 'Cadastro abandonado não encontrado' });
    }

    if (abandonedSignup.completedAt) {
      return res.status(400).json({ error: 'Este cadastro já foi convertido' });
    }

    const leadData = {
      name: name || abandonedSignup.name,
      email: email || abandonedSignup.email,
      phone: phone || abandonedSignup.phone,
      utmSource: abandonedSignup.utmSource,
      utmMedium: abandonedSignup.utmMedium,
      utmCampaign: abandonedSignup.utmCampaign,
      utmContent: abandonedSignup.utmContent,
      utmTerm: abandonedSignup.utmTerm,
      fbclid: abandonedSignup.fbclid,
      campaignId: abandonedSignup.campaignId,
      adId: abandonedSignup.adId,
      adsetId: abandonedSignup.adsetId
    };

    if (!leadData.name || !leadData.email || !leadData.phone) {
      return res.status(400).json({ 
        error: 'Nome, email e telefone são obrigatórios para criar um lead' 
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const existingLead = await tx.lead.findFirst({
        where: {
          OR: [
            { email: leadData.email },
            { phone: leadData.phone }
          ]
        }
      });

      if (existingLead) {
        await tx.abandonedSignup.update({
          where: { id },
          data: { completedAt: new Date() }
        });
        return { leadId: existingLead.id, message: 'Lead já existe' };
      }

      const newLead = await tx.lead.create({
        data: leadData
      });

      await tx.abandonedSignup.update({
        where: { id },
        data: { completedAt: new Date() }
      });

      return { leadId: newLead.id };
    });

    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Error converting to lead:', error);
    res.status(500).json({ error: 'Erro ao converter em lead' });
  }
};

module.exports = {
  savePartialSignup,
  markAsCompleted,
  getAbandonedSignups,
  getAbandonedStats,
  exportAbandonedCSV,
  convertToLead
};
