// src/controllers/profile.controller.js
const Profile = require('../models/profile.model');

// GET /api/profile
exports.getProfile = async (req, res) => {
  try {
    const doc = await Profile.findOne().lean();
    return res.json(doc || {});
  } catch (error) {
    console.error('getProfile error:', error);
    return res.status(500).json({ error: 'SERVER_ERROR' });
  }
};

// PUT /api/profile
exports.updateProfile = async (req, res) => {
  try {
    const allowed = ['name','headline','bioShort','bioLong','quickFacts','avatar','links','cta'];
    const payload = Object.fromEntries(
      Object.entries(req.body).filter(([k]) => allowed.includes(k))
    );

    if (typeof payload.quickFacts === 'string') {
      payload.quickFacts = payload.quickFacts
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean);
    }

    const updated = await Profile.findOneAndUpdate(
      {},
      payload,
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    ).lean();

    return res.json(updated);
  } catch (error) {
    console.error('updateProfile error:', error);
    return res.status(400).json({ error: 'BAD_REQUEST', message: error.message });
  }
};
