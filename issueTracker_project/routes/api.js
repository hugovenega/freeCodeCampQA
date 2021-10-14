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
        for (const parameter in searchQuery) {
          filteredIssue = filteredIssue.filter((issue) => issue[parameter] == searchQuery[parameter]);
        }
      }
      res.send(filteredIssue);
    });
  })

    .post((req, res) => {
      const { project } = req.params;
      const { body } = req;

      if (!body.issue_title || !body.issue_text || !body.created_by) {
        res.json({
          error: 'required field(s) missing',
        });
      } else {
      // look if project already exist
        Project.findOne({
          name: project,
        }, (foundProjectErr, foundProject) => {
          if (foundProjectErr) {
            console.log(foundProjectErr);
          // if there is no project
          } else if (foundProject === null) {
            Project.create({
              name: project,
            }, (createProjectErr, newProject) => {
              if (createProjectErr) {
                console.log(createProjectErr);
              } else {
                Issue.create({
                  issue_title: body.issue_title,
                  issue_text: body.issue_text,
                  created_by: body.created_by,
                  assigned_to: body.assigned_to,
                  status_text: body.status_text,
                }, (createIssueErr, newIssue) => {
                  if (createIssueErr) {
                    console.log(createIssueErr);
                  }
                  // made new project and new issue now push new issue to newly made project
                  newProject.issue.push(newIssue);
                  newProject.save((saveProjectErr, savedProject) => {
                    saveProjectErr ? console.log(saveProjectErr) : res.json(newIssue);
                  });
                });
              }
            });
          // if we get matched project
          } else if (foundProject) {
          // create a new issue
            Issue.create({
              issue_title: body.issue_title,
              issue_text: body.issue_text,
              created_by: body.created_by,
              assigned_to: body.assigned_to,
              status_text: body.status_text,
            }, (err, newIssue) => {
              if (err) {
                console.log(err);
              }
              foundProject.issue.push(newIssue);
              foundProject.save((err, savedProject) => {
                err ? console.log(err) : res.json(newIssue);
              });
            });
          }
        });
      }
    })

    .put((req, res) => {
      const { project } = req.params;
    })

    .delete((req, res) => {
      const { project } = req.params;
    });
};
