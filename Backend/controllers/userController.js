const { createUser } = require("../services/userService");
const {
  claimPointsService,
  getLeaderboardService,
} = require("../services/claimService");
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await getLeaderboardService();
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const claimPoints = async (req, res) => {
  try {
    const { userIds } = req.body;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ message: "userIds must be a non-empty array" });
    }

    const results = await claimPointsService(userIds);

    res.json({ message: "Points claimed", results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const addUser = async (req, res) => {
  try {
    const { name, email, password = "Pass@123" } = req.body;
    const user = await createUser({ name, email, password });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Profile = async (req, res) => {
  try {
     if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { _id, name, email, avatarUrl, totalpoints } = req.user;
    res.json({ id: _id, name, email, avatarUrl, totalpoints });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserlist = async (req, res) => {
  try {
    let filter = {};

    if (req.user && req.user._id) {
      filter._id = { $ne: req.user._id };
    }

     const users = await User.find(filter).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClaimHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    const history = await ClaimHistory.find({userId : userId }).sort({ createdAt: -1 });

    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { getLeaderboard, claimPoints, addUser, Profile, getUserlist,getClaimHistory };
