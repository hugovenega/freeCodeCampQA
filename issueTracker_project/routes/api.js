const mongoose = require('mongoose');
const Issue = require('../models/issues');
const Project = require('../models/projects');

mongoose.model('Issue');

module.exports = function (app) {
  app.route('/api/issues/:project')

    .get((req, res) => {
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
      const { body } = req;

      if (!body.issue_title || !body.issue_text || !body.created_by) {
        res.json({
          error: 'required field(s) missing',
        });
      } else {
        // look if project already exist
        Project.findOne({
          name: project,
        }, (err, foundProject) => {
          if (err) {
            console.log(err);
            // if there is no project
          } else if (foundProject === null) {
            Project.create({
              name: project,
            }, (err, newProject) => {
              if (err) {
                console.log(err);
              } else {
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
                  // made new project and new issue now push new issue to newly made project
                  newProject.issue.push(newIssue);
                  newProject.save((err, savedProject) => {
                    err ? console.log(err) : res.json(newIssue);
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

  // TODO: have to add check to close the issue

    // put is use to overwrite
    .put((req, res) => {
      const { project } = req.params;
      const { body } = req;
      // Store `id` and delete it.
      const id = body._id;
      delete body._id;

      const updates = req.body;
      // Delete all field which is empty.
      for (let data in updates) {
        if (!updates[data]) delete updates[data];
      }
      // Extract boolean from string.
      if (updates.open) updates.open = String(!updates.open) === 'true';
      // if no id sent
      if (!id) {
        return res.json({
          error: 'missing _id',
        });
      } if (Object.keys(updates).length === 0) {
        return res.json({
          error: 'no update field(s) sent',
          _id: id,
        });
      }
      updates.updated_on = new Date();
      Issue.findByIdAndUpdate(id, updates, (err, updatedIssue) => {
        // handle err and when there is not matched id
        if (err || updatedIssue === null) {
          console.log(err);
          return res.json({
            error: 'could not update',
            _id: id,
          });
        }
        return res.json({
          result: 'successfully updated',
          _id: id,
        });
      });
    })

    .delete((req, res) => {
      const { project } = req.params;

      if (!req.body._id) {
        return res.send({
          error: 'missing _id',
        });
      }

      Issue.findByIdAndDelete(req.body._id, (err, issue) => {
        if (err || issue === null) {
          return res.json({
            error: 'could not delete',
            _id: req.body._id,
          });
        }
        res.json({
          result: 'successfully deleted',
          _id: req.body._id,
        });
      });
    });
};
