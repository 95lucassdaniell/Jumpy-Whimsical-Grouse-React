const express = require('express');
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/auth');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/login',
  [
    body('username').trim().notEmpty(),
    body('password').notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await authController.login(req, res);
  }
);

router.get('/me', requireAuth, async (req, res) => {
  res.json({ user: req.session.user });
});

router.post('/logout', async (req, res) => {
  await authController.logout(req, res);
});

module.exports = router;
