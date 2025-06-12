import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TopicComments.css'
const TopicComments = ({ topicId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://api.teploivanov.ru/api/topics/${topicId}/comments`);
        setComments(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchComments();
  }, [topicId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://api.teploivanov.ru/api/topics/${topicId}/comments`, {
        text: newComment,
      });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="comments-container">
      <h3 className="comments-title">Комментарии</h3>
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment._id} className="comment-item">
            <p className="comment-text">{comment.text}</p>
            <p className="comment-author">Автор: {comment.author.username}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Ваш комментарий"
          className="comment-textarea"
          required
        />
        <button type="submit" className="comment-submit">
          Добавить комментарий
        </button>
      </form>
    </div>
  );
};

export default TopicComments;