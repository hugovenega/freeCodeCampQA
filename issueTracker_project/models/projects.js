const mongoose = require('mongoose');
const Issue = require('./issues');

const ProjectSchema = new mongoose.Schema({
  name: String,
  issue: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Issue',
  }],
});

module.exports = mongoose.model('Project', ProjectSchema);
