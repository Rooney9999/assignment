// controllers/pullRequests.js
const PullRequest = require('../models/PullRequest');

exports.getAllPullRequests = async (req, res) => {
    try {
        const pullRequests = await PullRequest.find();
        res.json(pullRequests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getPullRequestById = async (req, res) => {
    try {
        const pullRequest = await PullRequest.findById(req.params.id);
        if (!pullRequest) {
            return res.status(404).json({ message: 'Pull request not found' });
        }
        res.json(pullRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.createPullRequest = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newPullRequest = new PullRequest({ title, description });

        const savedPullRequest = await newPullRequest.save();
        res.status(201).json(savedPullRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updatePullRequest = async (req, res) => {
    try {
        const { title, description } = req.body;
        const updatedPullRequest = await PullRequest.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true }
        );

        if (!updatedPullRequest) {
            return res.status(404).json({ message: 'Pull request not found' });
        }

        res.json(updatedPullRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deletePullRequest = async (req, res) => {
    try {
        const deletedPullRequest = await PullRequest.findByIdAndDelete(req.params.id);

        if (!deletedPullRequest) {
            return res.status(404).json({ message: 'Pull request not found' });
        }

        res.json({ message: 'Pull request deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};