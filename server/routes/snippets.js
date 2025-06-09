const express = require('express');
const router = express.Router();
const Snippet = require('../models/Snippet');

// GET all snippets
router.get('/', async (req, res) => {
  try {
    const snippets = await Snippet.find().sort({ createdAt: -1 });
    res.json(snippets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch snippets' });
  }
});

// POST new snippet
router.post('/', async (req, res) => {
  try {
    const { title, code, category } = req.body;
    const newSnippet = new Snippet({ title, code, category });
    await newSnippet.save();
    res.status(201).json(newSnippet);
  } catch (err) {
    res.status(400).json({ error: 'Failed to save snippet' });
  }
});

// PUT update snippet
router.put('/:id', async (req, res) => {
  try {
    const { title, code, category } = req.body;
    const updated = await Snippet.findByIdAndUpdate(
      req.params.id,
      { title, code, category },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Snippet not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update snippet' });
  }
});

// DELETE snippet
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Snippet.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Snippet not found' });
    res.json({ message: 'Snippet deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete snippet' });
  }
});

module.exports = router;
