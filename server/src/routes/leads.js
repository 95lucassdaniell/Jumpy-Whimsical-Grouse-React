const express = require('express');
const { body, validationResult, query } = require('express-validator');
const leadsController = require('../controllers/leads');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/',
  [
    body('name').trim().notEmpty().withMessage('Nome é obrigatório'),
    body('email').isEmail().withMessage('Email inválido'),
    body('phone').trim().notEmpty().withMessage('Telefone é obrigatório')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await leadsController.createLead(req, res);
  }
);

router.patch('/:id/whatsapp-click', async (req, res) => {
  await leadsController.recordWhatsAppClick(req, res);
});

router.get('/', requireAuth, async (req, res) => {
  await leadsController.getLeads(req, res);
});

module.exports = router;
