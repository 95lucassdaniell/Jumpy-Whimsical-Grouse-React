const express = require('express');
const router = express.Router();
const {
  savePartialSignup,
  markAsCompleted,
  getAbandonedSignups,
  getAbandonedStats,
  exportAbandonedCSV,
  convertToLead
} = require('../controllers/abandonedSignups');
const { requireAuth } = require('../middleware/auth');

router.post('/', savePartialSignup);
router.post('/mark-completed', markAsCompleted);
router.post('/:id/convert', requireAuth, convertToLead);
router.get('/', requireAuth, getAbandonedSignups);
router.get('/stats', requireAuth, getAbandonedStats);
router.get('/export', requireAuth, exportAbandonedCSV);

module.exports = router;
