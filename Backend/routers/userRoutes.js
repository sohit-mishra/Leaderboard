const express = require('express');
const router = express.Router();
const {
  addUser,
  claimPoints,
  getLeaderboard,
  Profile,getUserlist, getClaimHistory
} = require('../controllers/userController');
const protect  = require('../middlewares/authMiddleware');

router.post('/', protect, addUser);
router.post('/claim', protect, claimPoints);
router.get('/leaderboard',protect, getLeaderboard);
router.post('/claim', protect, claimPoints);
router.get('/list',protect, getUserlist);
router.get("/me", protect, Profile);
router.get("/history/:userId", protect, getClaimHistory );


module.exports = router;
