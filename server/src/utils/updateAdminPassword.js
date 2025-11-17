require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function updateAdminPassword() {
  try {
    const username = 'admin';
    const newPassword = 'lucaslol321';
    
    const admin = await prisma.admin.findUnique({
      where: { username }
    });

    if (!admin) {
      console.log('❌ Admin user not found! Creating new one...');
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      await prisma.admin.create({
        data: {
          username,
          password: hashedPassword
        }
      });
      
      console.log('✅ Admin user created successfully!');
    } else {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      await prisma.admin.update({
        where: { username },
        data: { password: hashedPassword }
      });
      
      console.log('✅ Admin password updated successfully!');
    }
    
    console.log('\n📋 New Credentials:');
    console.log('Username: admin');
    console.log('Password: lucaslol321');
    console.log('\n🔒 Senha alterada com sucesso!');
  } catch (error) {
    console.error('❌ Error updating admin password:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateAdminPassword();
