const express = require('express');
const router = express.Router();
const Profile = require('../../models/profile.model');
const Codework = require('../../models/codework.model');

router.get('/', (req, res) => res.redirect('/admin/profile'));

router.get('/profile', async (req, res) => {
  const profile = await Profile.findOne().lean();
  res.render('profile', { title: 'Profile', profile: profile || {} });
});

router.post('/profile', async (req, res) => {
  const allowed = ['name','headline','bioShort','bioLong','quickFacts','avatar','links.email','links.github','links.linkedin','links.website','cta.label','cta.href'];
  const {
    name, headline, bioShort, bioLong, quickFacts,
    avatar, email, github, linkedin, website, ctaLabel, ctaHref
  } = req.body;

  const payload = {
    name, headline, bioShort, bioLong,
    quickFacts: quickFacts ? quickFacts.split('\n').map(s=>s.trim()).filter(Boolean) : [],
    avatar,
    links: { email, github, linkedin, website },
    cta: { label: ctaLabel, href: ctaHref }
  };

  await Profile.findOneAndUpdate({}, payload, { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true });
  res.redirect('/admin/profile');
});

router.get('/codeworks', async (req, res) => {
  const items = await Codework.find().sort({ order: -1, createdAt: -1 }).lean();
  res.render('codeworks', { title: 'Codeworks', items });
});

router.post('/codeworks/create', async (req, res) => {
  const {
    title, summary, content, kind, status, order,
    github, demo, tags, techStack, images
  } = req.body;

  await Codework.create({
    title,
    summary,
    content,
    kind,
    status: status || 'draft',
    order: Number(order) || 0,
    link: { github, demo },
    tags: tags ? tags.split(',').map(s=>s.trim()).filter(Boolean) : [],
    techStack: techStack ? techStack.split(',').map(s=>s.trim()).filter(Boolean) : [],
    images: images ? images.split('\n').map(s=>s.trim()).filter(Boolean) : []
  });

  res.redirect('/admin/codeworks');
});

router.post('/codeworks/:id/delete', async (req, res) => {
  await Codework.findByIdAndDelete(req.params.id);
  res.redirect('/admin/codeworks');
});

module.exports = router;
