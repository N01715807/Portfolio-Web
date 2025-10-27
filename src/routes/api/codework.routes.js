const express = require('express');
const router = express.Router();
const c = require('../../controllers/codework.controller');

router.get('/', c.list);
router.get('/:id', c.getOne);
router.post('/', c.create);
router.put('/:id', c.update);
router.delete('/:id', c.remove);

module.exports = router;
