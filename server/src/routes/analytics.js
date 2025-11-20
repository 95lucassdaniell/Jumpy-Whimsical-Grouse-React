const express = require('express');
const analyticsController = require('../controllers/analytics');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/visit', async (req, res) => {
  await analyticsController.recordVisit(req, res);
});

router.get('/summary', requireAuth, async (req, res) => {
  await analyticsController.getSummary(req, res);
});

router.get('/campaigns', requireAuth, async (req, res) => {
  await analyticsController.getCampaignStats(req, res);
});

module.exports = router;
