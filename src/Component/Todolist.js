// src/TodoList.js

import React, { useState, useEffect } from 'react';
import './Todolist.css';

function TodoList() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [progress, setProgress] = useState(100);

  const handleInputChange = (event) => {
    setTask(event.target.value);
  };

  const handleAddTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask('');
      setNotification({ show: true, message: 'Item added!' });
      setProgress(100);

      // Hide the notification after 2 seconds
      setTimeout(() => {
        setNotification({ show: false, message: '' });
      }, 2000);
    } else {
      alert('Add some input first, dude!');
    }
  };

  const handleToggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    );
    // No notification when toggling task completion
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
    setNotification({ show: true, message: 'Item deleted!' });
    setProgress(100);

    // Hide the notification after 2 seconds
    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 2000);
  };

  useEffect(() => {
    let interval;
    if (notification.show) {
      interval = setInterval(() => {
        setProgress((prevProgress) => Math.max(prevProgress - (100 / 20), 0)); // Adjust the division to match the desired duration
      }, 100);
    }
    return () => clearInterval(interval);
  }, [notification.show]);

  useEffect(() => {
    if (progress === 0) {
      setNotification({ show: false, message: '' });
      setProgress(100);
    }
  }, [progress]);

  return (
    <div id="todo-container">
      {notification.show && (
        <div className="notification-bar">
          <div className="notification">{notification.message}</div>
          <div className="progress-bar">
            <div className="progress-bar-inner" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}
      <h1>Grocery Cart</h1>
      <div>
        <input
          type="text"
          value={task}
          onChange={handleInputChange}
          placeholder="Type your task..."
          className='input'
        />
        <button className='add-btn' onClick={handleAddTask}>Add Item</button>
      </div>
      <ul>
        {tasks.map((t) => (
          <li
            key={t.id}
            className={`todo-item ${t.completed ? 'completed' : ''}`}
          >
            <div>
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => handleToggleTask(t.id)}
                className="checkbox"
              />
              <span>{t.text}</span>
            </div>
            <button onClick={() => handleDeleteTask(t.id)} className="delete">
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
