const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getSettings(req, res) {
  try {
    const settings = await prisma.setting.findMany();
    
    // Convert array of settings to object for easier use
    const settingsObj = {};
    settings.forEach(setting => {
      settingsObj[setting.key] = setting.value;
    });

    res.json({ settings: settingsObj });
  } catch (error) {
    console.error('Error getting settings:', error);
    res.status(500).json({ error: 'Erro ao buscar configurações' });
  }
}

async function updateSettings(req, res) {
  try {
    const { redirectUrl, redirectEnabled } = req.body;

    // Update or create redirect URL setting
    if (redirectUrl !== undefined) {
      await prisma.setting.upsert({
        where: { key: 'redirectUrl' },
        update: { value: redirectUrl },
        create: { key: 'redirectUrl', value: redirectUrl }
      });
    }

    // Update or create redirect enabled setting
    if (redirectEnabled !== undefined) {
      await prisma.setting.upsert({
        where: { key: 'redirectEnabled' },
        update: { value: String(redirectEnabled) },
        create: { key: 'redirectEnabled', value: String(redirectEnabled) }
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: 'Erro ao atualizar configurações' });
  }
}

module.exports = {
  getSettings,
  updateSettings
};
