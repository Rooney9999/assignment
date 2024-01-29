// routes/pullRequests.js
const express = require('express');
const router = express.Router();
const pullRequestsController = require('../controllers/pullRequests');

router.get('/pull-requests', pullRequestsController.getAllPullRequests);
router.get('/pull-requests/:id', pullRequestsController.getPullRequestById);
router.post('/pull-requests', pullRequestsController.createPullRequest);
router.put('/pull-requests/:id', pullRequestsController.updatePullRequest);
router.delete('/pull-requests/:id', pullRequestsController.deletePullRequest);

module.exports = router;