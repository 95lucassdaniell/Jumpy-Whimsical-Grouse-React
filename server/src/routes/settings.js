const express = require('express');
const { body, validationResult } = require('express-validator');
const settingsController = require('../controllers/settings');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// Public endpoint to get settings (for frontend)
router.get('/', async (req, res) => {
  await settingsController.getSettings(req, res);
});

// Protected endpoint to update settings (admin only)
router.patch('/',
  requireAuth,
  [
    body('redirectUrl').optional().isURL().withMessage('URL de redirecionamento inválida'),
    body('redirectEnabled').optional().isBoolean().withMessage('redirectEnabled deve ser true ou false')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await settingsController.updateSettings(req, res);
  }
);

module.exports = router;
