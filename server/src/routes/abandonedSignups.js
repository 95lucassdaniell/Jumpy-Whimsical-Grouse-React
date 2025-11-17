const express = require('express');
const router = express.Router();
const {
  savePartialSignup,
  markAsCompleted,
  getAbandonedSignups,
  getAbandonedStats,
  exportAbandonedCSV
} = require('../controllers/abandonedSignups');
const { requireAuth } = require('../middleware/auth');

router.post('/', savePartialSignup);
router.post('/mark-completed', markAsCompleted);
router.get('/', requireAuth, getAbandonedSignups);
router.get('/stats', requireAuth, getAbandonedStats);
router.get('/export', requireAuth, exportAbandonedCSV);

module.exports = router;
