const Codework = require('../models/codework.model');

// GET /api/codeworks
exports.list = async (req, res) => {
    try {
        const { kind, status } = req.query;
        const page = Math.max(parseInt(req.query.page || '1', 10), 1);
        const limit = Math.min(Math.max(parseInt(req.query.limit || '20', 10), 1), 100);
        const filter = {};
         if (kind) filter.kind = kind;
         if (status) filter.status = status;
        const cursor = Codework.find(filter)
         .sort({ order: -1, createdAt: -1 })
         .skip((page - 1) * limit)
         .limit(limit)
         .lean();
        const [items, total] = await Promise.all([
            cursor,
            Codework.countDocuments(filter)]);
            return res.json({
                page, limit, total,
                items});
    } catch (error) {
        console.error('list codeworks error:', err);
        return res.status(500).json({ error: 'SERVER_ERROR' });
    }
};

// GET /api/codeworks/:id
exports.getOne = async (req, res) => {
  try {
    const doc = await Codework.findById(req.params.id).lean();
    if (!doc) return res.status(404).json({ error: 'NOT_FOUND' });
    return res.json(doc);
  } catch (err) {
    console.error('getOne codework error:', err);
    return res.status(400).json({ error: 'BAD_REQUEST', message: err.message });
  }
};

// POST /api/codeworks
exports.create = async (req, res) => {
  try {
    const { title, summary, kind } = req.body;
    if (!title || !summary || !kind) {
      return res.status(400).json({ error: 'MISSING_FIELDS', fields: ['title', 'summary', 'kind'] });
    }
    const doc = await Codework.create(req.body);
    return res.status(201).json(doc);
  } catch (err) {
    console.error('create codework error:', err);
    return res.status(400).json({ error: 'BAD_REQUEST', message: err.message });
  }
};

// PUT /api/codeworks/:id
exports.update = async (req, res) => {
  try {
    const payload = req.body;
    const allowed = [
      'title','summary','content','images','link','tags','techStack',
      'kind','status','order'
    ];
    Object.keys(payload).forEach(k => { if (!allowed.includes(k)) delete payload[k]; });

    const updated = await Codework.findByIdAndUpdate(
      req.params.id,
      payload,
      { new: true, runValidators: true }
    ).lean();

    if (!updated) return res.status(404).json({ error: 'NOT_FOUND' });
    return res.json(updated);
  } catch (err) {
    console.error('update codework error:', err);
    return res.status(400).json({ error: 'BAD_REQUEST', message: err.message });
  }
};

// DELETE /api/codeworks/:id
exports.remove = async (req, res) => {
  try {
    const removed = await Codework.findByIdAndDelete(req.params.id).lean();
    if (!removed) return res.status(404).json({ error: 'NOT_FOUND' });
    return res.json({ ok: true, id: removed._id });
  } catch (err) {
    console.error('remove codework error:', err);
    return res.status(400).json({ error: 'BAD_REQUEST', message: err.message });
  }
};
