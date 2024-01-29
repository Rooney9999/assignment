import React, { useState, useEffect } from 'react';

const PullRequests = () => {
  const [pullRequests, setPullRequests] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '' });

  useEffect(() => {
    // Fetch pull requests from the API when the component mounts
    fetch('http://localhost:8000/api/pull-requests')
      .then((response) => response.json())
      .then((data) => setPullRequests(data))
      .catch((error) => console.error('Error fetching pull requests:', error));
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to create a new pull request
    fetch('http://localhost:8000/api/pull-requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setPullRequests([...pullRequests, data]);
        // Clear the form after successful submission
        setFormData({ title: '', description: '' });
      })
      .catch((error) => console.error('Error creating pull request:', error));
  };

  return (
    <div className="pull-requests-container">
      <h2>Pull Requests</h2>

      {/* New Pull Request Form */}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Create Pull Request</button>
      </form>

      {/* List of Pull Requests */}
      <ul>
        {pullRequests.map((pullRequest) => (
          <li key={pullRequest._id}>
            <strong>{pullRequest.title}</strong>
            <p>{pullRequest.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PullRequests