const mongoose = require('mongoose');
const issues = require('./issues').Issue;

const { Schema } = mongoose;

const projectSchema = new Schema({
  projectName: { type: String, required: true },
  issues: [issues],
});
module.exports.Project = mongoose.model('project', projectSchema);
