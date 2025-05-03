const getCreatorData = async (creatorId, accessToken, platform) => {
  return {
    geography: { Dublin: 45 },
    behavior: { 'Skincare Engagement': 68, totalFollowers: 128000 },
    intent: { 'Eco-conscious': 68 },
    engagementTimes: { peak: '7:30-9:00 AM' },
  };
};

const getCreatorComments = async (creatorId, accessToken, platform) => {
  return ['Sample comment'];
};

module.exports = { getCreatorData, getCreatorComments };

