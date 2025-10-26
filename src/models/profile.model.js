const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, 
    headline: { type: String },
    bioShort: { type: String }, 
    bioLong: { type: String }, 
    quickFacts: [{ type: String }],
    avatar: { type: String },

    links: {
      email: { type: String },
      github: { type: String },
      linkedin: { type: String },
      website: { type: String }
    },

    cta: {
      label: { type: String },
      href: { type: String } 
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Profile', profileSchema);
