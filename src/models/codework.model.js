const mongoose = require('mongoose');

const codeworkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, 
    summary: { type: String, required: true }, 
    content: { type: String },
    images: [{ type: String }],

    link: {
      github: { type: String },
      demo: { type: String }
    },

    tags: [{ type: String }],
    techStack: [{ type: String }],

    kind: { type: String, enum: ['featured', 'technical'], required: true },

    status: { type: String, enum: ['draft', 'published'], default: 'draft' },

    order: { type: Number, default: 0 }
  },
  {
    timestamps: true 
  }
);

codeworkSchema.index({ kind: 1, status: 1, order: -1 });

module.exports = mongoose.model('Codework', codeworkSchema);
