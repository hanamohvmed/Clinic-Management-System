import React, { useState } from 'react';
import './To-do-react.css';

const Todoapp = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'To study React fundamentals', completed: true },
    { id: 2, text: 'iti training', completed: true },
    { id: 3, text: 'go to gym', completed: false },
    { id: 4, text: 'To study js', completed: false }
  ]);
  const [newTask, setNewTask] = useState('');
  const [showInput, setShowInput] = useState(false);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, {
        id: Date.now(),
        text: newTask,
        completed: false
      }]);
      setNewTask('');
      setShowInput(false);
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <div className="todo-container">
      <div className="todo-app">
        <div className="header">
          <button 
            className="add-task-btn"
            onClick={() => setShowInput(!showInput)}
          >
            Add a new task
            <span className="add-icon">+</span>
          </button>
        </div>

        {showInput && (
          <div className="input-section">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter new task..."
              className="task-input"
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              autoFocus
            />
            <div className="input-actions">
              <button onClick={addTask} className="save-btn">Save</button>
              <button onClick={() => setShowInput(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        )}

        <div className="tasks-section">
          <div className="section-header">
            <span>Tasks to do - {pendingTasks.length}</span>
          </div>

          {pendingTasks.map(task => (
            <div key={task.id} className="task-item">
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="task-checkbox"
                />
                <span className="task-text">{task.text}</span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="delete-btn"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        {completedTasks.length > 0 && (
          <div className="completed-section">
            <div className="section-header">
              <span>Done - {completedTasks.length}</span>
            </div>

            {completedTasks.map(task => (
              <div key={task.id} className="task-item completed">
                <div className="task-content">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="task-checkbox"
                  />
                  <span className="task-text">{task.text}</span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="delete-btn"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Todoapp;