const mongoose = require('mongoose');
const Issue = require('../models/issue');
const Project = require('../models/project');

module.exports = function (app) {
  app.route('/api/issues/:project')

    .get((req, res) => {
      const { project } = req.params;
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
