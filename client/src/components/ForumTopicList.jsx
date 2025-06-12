import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ForumTopicList = ({ onTopicSelect }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get('https://api.teploivanov.ru/api/topics');
        setTopics(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTopics();
  }, []);

  return (
    <div className="forum-topics-container">
      {topics.map((topic) => (
        <div
          key={topic._id}
          className="forum-topic-card"
          onClick={() => onTopicSelect(topic._id)}
        >
          <h2 className="forum-topic-title">{topic.title}</h2>
          <p className="forum-topic-author">Автор: {topic.author}</p>
          <p className="forum-topic-comments">Комментарии: {topic.comments.length}</p>
        </div>
      ))}
    </div>
  );
};

export default ForumTopicList;