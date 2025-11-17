const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function login(req, res) {
  try {
    const { username, password } = req.body;

    const admin = await prisma.admin.findUnique({
      where: { username }
    });

    if (!admin) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const validPassword = await bcrypt.compare(password, admin.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    req.session.user = {
      id: admin.id,
      username: admin.username
    };

    res.json({
      success: true,
      user: { username: admin.username }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
}

async function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao fazer logout' });
    }
    res.clearCookie('connect.sid');
    res.json({ success: true });
  });
}

module.exports = {
  login,
  logout
};
