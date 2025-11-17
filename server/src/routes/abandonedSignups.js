const express = require('express');
const router = express.Router();
const {
  savePartialSignup,
  markAsCompleted,
  getAbandonedSignups,
  getAbandonedStats,
  exportAbandonedCSV
} = require('../controllers/abandonedSignups');
const { authenticateSession } = require('../middleware/auth');

router.post('/', savePartialSignup);
router.post('/mark-completed', markAsCompleted);
router.get('/', authenticateSession, getAbandonedSignups);
router.get('/stats', authenticateSession, getAbandonedStats);
router.get('/export', authenticateSession, exportAbandonedCSV);

module.exports = router;
