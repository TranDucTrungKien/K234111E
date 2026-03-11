const express = require('express');
const app = express();
const port = 4000;
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Fashion = require('./models/Fashion');

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/FashionData')
  .then(() => console.log('✅ Connected to MongoDB FashionData'))
  .catch(err => console.error('❌ MongoDB error:', err));

// ==================== FASHION APIs ====================

// GET all fashions, sorted by createdAt descending
app.get('/fashions', async (req, res) => {
  try {
    const fashions = await Fashion.find({}).sort({ createdAt: -1 });
    res.json(fashions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET fashions filtered by style
app.get('/fashions/style/:style', async (req, res) => {
  try {
    const fashions = await Fashion.find({ style: req.params.style }).sort({ createdAt: -1 });
    res.json(fashions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all distinct styles
app.get('/styles', async (req, res) => {
  try {
    const styles = await Fashion.distinct('style');
    res.json(styles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET fashion by id
app.get('/fashions/:id', async (req, res) => {
  try {
    const fashion = await Fashion.findById(req.params.id);
    if (!fashion) return res.status(404).json({ message: 'Fashion not found' });
    res.json(fashion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add new fashion
app.post('/fashions', async (req, res) => {
  try {
    const { title, detail, thumbnail, style } = req.body;
    const newFashion = new Fashion({ title, detail, thumbnail, style });
    const saved = await newFashion.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT edit fashion by id
app.put('/fashions/:id', async (req, res) => {
  try {
    const { title, detail, thumbnail, style } = req.body;
    const updated = await Fashion.findByIdAndUpdate(
      req.params.id,
      { title, detail, thumbnail, style },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Fashion not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE fashion by id
app.delete('/fashions/:id', async (req, res) => {
  try {
    const deleted = await Fashion.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Fashion not found' });
    res.json({ message: 'Fashion deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Root
app.get('/', (req, res) => {
  res.json({ message: 'Fashion API Server running on port 4000' });
});

app.listen(port, () => {
  console.log(`🚀 Server-Fashion running on http://localhost:${port}`);
});
