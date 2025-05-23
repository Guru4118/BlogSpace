import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BlogDeleteButton({ blogId }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    const token = localStorage.getItem('token');
    if (!token) return alert('Please login');

    try {
      const res = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        alert('Deleted successfully');
        navigate('/blogs');
      } else {
        alert('Delete failed');
      }
    } catch {
      alert('Error deleting blog');
    }
  };

  return <button onClick={handleDelete}>Delete Blog</button>;
}
