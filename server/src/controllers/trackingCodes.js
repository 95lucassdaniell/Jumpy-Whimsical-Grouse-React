const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getPublicTrackingCodes(req, res) {
  try {
    const settings = await prisma.setting.findMany({
      where: {
        key: {
          in: ['trackingLeadFlow', 'trackingGTM', 'trackingFacebookPixel']
        }
      }
    });
    
    const codes = {};
    settings.forEach(setting => {
      codes[setting.key] = setting.value;
    });

    res.json({ 
      leadFlow: codes.trackingLeadFlow || '',
      gtm: codes.trackingGTM || '',
      facebookPixel: codes.trackingFacebookPixel || ''
    });
  } catch (error) {
    console.error('Error getting tracking codes:', error);
    res.status(500).json({ error: 'Erro ao buscar códigos de rastreamento' });
  }
}

module.exports = {
  getPublicTrackingCodes
};
