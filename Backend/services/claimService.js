const User = require("../models/User");
const ClaimHistory = require("../models/ClaimHistory");
const generatePoints = require("../utils/generatePoints");

const getLeaderboardService = async () => {
  const topUsers = await User.find()
    .sort({ totalpoints: -1 })
    .limit(10)
    .select("name totalpoints avatarUrl"); 

  return topUsers.map((user, index) => ({
    _id: user._id,
    name: user.name,
    totalpoints: user.totalpoints,
    avatarUrl: user.avatarUrl,
    rank: index + 1, 
  }));
};



const claimPointsService = async (userIds) => {
  if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
    throw new Error("userIds must be a non-empty array");
  }

  const results = [];

  for (const userId of userIds) {
    const user = await User.findById(userId);
    if (!user) continue;

    const points = generatePoints(); 

    user.totalpoints += points;
    await user.save();

    const history = await ClaimHistory.create({
      userId: user._id,
      points,
    });

    results.push({
      user: {
        _id: user._id,
        name: user.name,
        totalpoints: user.totalpoints,
        avatarUrl: user.avatarUrl,
      },
      points,
      history,
    });
  }

  return results;
};

module.exports = { claimPointsService, getLeaderboardService };

userIds =  [ '68a713ca3313e58e9c67b3fe', '68a713ec3313e58e9c67b402' ]
