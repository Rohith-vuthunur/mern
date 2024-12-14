import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Update() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  // Fetch single user data
  const getSingleUser = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/${id}`);
      const result = await response.json();

      if (response.ok) {
        setName(result.name);
        setEmail(result.email);
        setAge(result.age);
      } else {
        console.error('Error fetching user:', result.error);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  // Update user data
  const handleEdit = async (e) => {
    e.preventDefault();
    const updatedUser = { name, age, email };

    try {
      const response = await fetch(`http://localhost:4000/api/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedUser),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setError(null);
        navigate('/all');
      } else {
        const result = await response.json();
        setError(result.error || 'Failed to update user');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Update error:', err);
    }
  };

  // Load user data when the component is mounted
  useEffect(() => {
    getSingleUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-fluid mx-3">
      <h3 className="text-center">Edit</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleEdit}>
        <div className="mb-3">
          <label htmlFor="user" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="user"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
