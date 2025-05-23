import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function BlogView() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    fetch(`/api/blogs/${id}`)
      .then(res => res.json())
      .then(setBlog);

    fetch(`/api/blogs/${id}/comments`)
      .then(res => res.json())
      .then(setComments);
  }, [id]);

  const handleAddComment = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Please login to comment');

    try {
      const res = await fetch(`/api/blogs/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ text: commentText }),
      });
      if (res.ok) {
        const newComment = await res.json();
        setComments([...comments, newComment]);
        setCommentText('');
      } else {
        alert('Failed to add comment');
      }
    } catch {
      alert('Error adding comment');
    }
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <p>Author: {blog.author?.username}</p>

      <h3>Comments</h3>
      <ul>
        {comments.map(c => (
          <li key={c._id}>
            <b>{c.author?.username}</b>: {c.text}
          </li>
        ))}
      </ul>

      <textarea
        value={commentText}
        onChange={e => setCommentText(e.target.value)}
        placeholder="Write a comment..."
      />
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
  );
}
