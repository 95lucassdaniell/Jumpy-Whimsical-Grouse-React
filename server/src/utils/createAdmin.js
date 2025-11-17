require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const username = 'admin';
    const password = 'admin123';
    
    const existing = await prisma.admin.findUnique({
      where: { username }
    });

    if (existing) {
      console.log('Admin user already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.admin.create({
      data: {
        username,
        password: hashedPassword
      }
    });

    console.log('Admin user created successfully!');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('\n⚠️  IMPORTANTE: Altere a senha após o primeiro login!');
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
