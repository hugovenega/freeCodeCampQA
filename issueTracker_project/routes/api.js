const mongoose = require('mongoose');
const Issue = require('../models/issue');
const Project = require('../models/project');

mongoose.model('Issue');

module.exports = function (app) {
  app.route('/api/issues/:project');

  app.get((req, res) => {
    const { project } = req.params;

    const searchQuery = req.query;

    if (searchQuery.open) {
      searchQuery.open = String(searchQuery.open) === 'true';
    }

    Project.find({
      name: project,
    }).populate('issue').exec((err, populatedProject) => {
      if (err) console.log(err);
      let filteredIssue = populatedProject[0].issue;
      if (searchQuery) {
        for (let parameter in searchQuery) {
          filteredIssue = filteredIssue.filter((issue) => issue[parameter] == searchQuery[parameter]);
        }
      }
      res.send(filteredIssue);
    });
  })

    .post((req, res) => {
      const { project } = req.params;
    })

    .put((req, res) => {
      const { project } = req.params;
    })

    .delete((req, res) => {
      const { project } = req.params;
    });
};
