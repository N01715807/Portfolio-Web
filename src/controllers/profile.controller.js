const profile = require('../models/profile.model')
// GET /api/profile
exports.getProfile = async (req, res) => {
    try {
        const doc = await Profile.findOne().lean();
        if (!doc) return res.status(200).json({});
        return res.json(doc);
    } catch (error) {
        console.error('getProfile error:', err);
        return res.status(500).json({ error: 'SERVER_ERROR' });
    }
};

// PUT /api/profile
exports.updateProfile = async (req, res) => {
    try {
        const payload = req.body;
        const allowed = ['name', 'headline', 'bioShort', 'bioLong', 'quickFacts', 'avatar', 'links', 'cta'];
        Object.keys(payload).forEach(k => { if (!allowed.includes(k)) delete payload[k]; });
        const updated = await Profile.findOneAndUpdate({},
            payload,
            { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
        ).lean();
        return res.json(updated);
    } catch (error) {
        console.error('updateProfile error:', err);
        return res.status(400).json({ error: 'BAD_REQUEST', message: err.message });
    }
};