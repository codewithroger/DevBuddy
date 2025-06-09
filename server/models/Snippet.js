const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true },
  category: { type: String, default: 'General' },
}, { timestamps: true });

module.exports = mongoose.model('Snippet', snippetSchema);
