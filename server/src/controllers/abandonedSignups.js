const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

const hashIP = (ip) => {
  return crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
};

const savePartialSignup = async (req, res) => {
  try {
    const { sessionId, name, email, phone, utmSource, utmMedium, utmCampaign } = req.body;

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
          ipHash: ipHash || existingSignup.ipHash
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
      'Nome,Email,Telefone,Data Início,Última Atualização,UTM Source,UTM Medium,UTM Campaign',
      ...signups.map(s => 
        `"${s.name || ''}","${s.email || ''}","${s.phone || ''}","${s.createdAt.toISOString()}","${s.updatedAt.toISOString()}","${s.utmSource || ''}","${s.utmMedium || ''}","${s.utmCampaign || ''}"`
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

module.exports = {
  savePartialSignup,
  markAsCompleted,
  getAbandonedSignups,
  getAbandonedStats,
  exportAbandonedCSV
};
