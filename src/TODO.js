import React, { useState } from 'react';
import { Plus, X, Check, Circle, CheckCircle2, Trash2 } from 'lucide-react';

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)',
    padding: '32px 16px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },
  maxWidth: {
    maxWidth: '672px',
    margin: '0 auto'
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px',
    margin: '0 0 8px 0'
  },
  subtitle: {
    color: '#6b7280',
    margin: '0'
  },
  addSection: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    padding: '24px',
    marginBottom: '24px'
  },
  inputContainer: {
    display: 'flex',
    gap: '12px'
  },
  inputWrapper: {
    flex: '1',
    position: 'relative'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    outline: 'none',
    color: '#374151',
    fontSize: '16px',
    transition: 'all 0.2s',
    boxSizing: 'border-box'
  },
  inputFocus: {
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
  },
  addButton: {
    background: '#3b82f6',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '500',
    fontSize: '16px'
  },
  addButtonHover: {
    background: '#2563eb'
  },
  filterContainer: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    marginBottom: '24px'
  },
  filterTabs: {
    display: 'flex',
    borderBottom: '1px solid #e5e7eb'
  },
  filterTab: {
    flex: '1',
    padding: '16px 24px',
    textAlign: 'center',
    fontWeight: '500',
    transition: 'all 0.2s',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    fontSize: '16px'
  },
  filterTabActive: {
    color: '#2563eb',
    borderBottom: '2px solid #2563eb',
    background: '#eff6ff'
  },
  filterTabInactive: {
    color: '#6b7280',
    background: 'transparent'
  },
  filterTabInactiveHover: {
    color: '#1f2937',
    background: '#f9fafb'
  },
  badge: {
    marginLeft: '8px',
    padding: '2px 8px',
    borderRadius: '9999px',
    fontSize: '12px'
  },
  badgeActive: {
    background: '#dbeafe',
    color: '#2563eb'
  },
  badgeInactive: {
    background: '#f3f4f6',
    color: '#6b7280'
  },
  todoContainer: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  },
  emptyState: {
    padding: '48px',
    textAlign: 'center'
  },
  emptyIcon: {
    width: '64px',
    height: '64px',
    background: '#f3f4f6',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px auto'
  },
  emptyTitle: {
    fontSize: '18px',
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: '8px',
    margin: '0 0 8px 0'
  },
  emptyText: {
    color: '#9ca3af',
    margin: '0'
  },
  todoList: {
    borderTop: 'none'
  },
  todoItem: {
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    transition: 'background-color 0.2s',
    borderBottom: '1px solid #f3f4f6'
  },
  todoItemHover: {
    background: '#f9fafb'
  },
  todoItemCompleted: {
    background: '#fafafa'
  },
  checkButton: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: '2px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
    background: 'transparent',
    padding: '0'
  },
  checkButtonActive: {
    background: '#10b981',
    borderColor: '#10b981',
    color: 'white'
  },
  checkButtonInactive: {
    borderColor: '#d1d5db',
    color: 'transparent'
  },
  checkButtonInactiveHover: {
    borderColor: '#10b981',
    background: '#ecfdf5'
  },
  todoText: {
    flex: '1',
    minWidth: '0',
    color: '#1f2937',
    transition: 'all 0.2s',
    fontSize: '16px',
    margin: '0'
  },
  todoTextCompleted: {
    textDecoration: 'line-through',
    color: '#6b7280'
  },
  deleteButton: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'transparent',
    color: '#9ca3af',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  deleteButtonHover: {
    background: '#fef2f2',
    color: '#ef4444'
  },
  footer: {
    marginTop: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px',
    color: '#6b7280'
  },
  clearButton: {
    color: '#ef4444',
    background: 'transparent',
    border: 'none',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'color 0.2s',
    fontSize: '14px'
  },
  clearButtonHover: {
    color: '#dc2626'
  }
};

export default function TODO() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [inputFocused, setInputFocused] = useState(false);

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date()
      }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const getInputStyle = () => ({
    ...styles.input,
    ...(inputFocused ? styles.inputFocus : {})
  });

  const getAddButtonStyle = () => ({
    ...styles.addButton,
    ...(hoveredButton === 'add' ? styles.addButtonHover : {})
  });

  const getFilterTabStyle = (key) => ({
    ...styles.filterTab,
    ...(filter === key ? styles.filterTabActive : styles.filterTabInactive),
    ...(hoveredButton === key && filter !== key ? styles.filterTabInactiveHover : {})
  });

  const getBadgeStyle = (key) => ({
    ...styles.badge,
    ...(filter === key ? styles.badgeActive : styles.badgeInactive)
  });

  const getTodoItemStyle = (todo) => ({
    ...styles.todoItem,
    ...(hoveredItem === todo.id ? styles.todoItemHover : {}),
    ...(todo.completed ? styles.todoItemCompleted : {})
  });

  const getCheckButtonStyle = (todo) => ({
    ...styles.checkButton,
    ...(todo.completed ? styles.checkButtonActive : styles.checkButtonInactive),
    ...(hoveredButton === `check-${todo.id}` && !todo.completed ? styles.checkButtonInactiveHover : {})
  });

  const getTodoTextStyle = (todo) => ({
    ...styles.todoText,
    ...(todo.completed ? styles.todoTextCompleted : {})
  });

  const getDeleteButtonStyle = (todoId) => ({
    ...styles.deleteButton,
    ...(hoveredButton === `delete-${todoId}` ? styles.deleteButtonHover : {})
  });

  const getClearButtonStyle = () => ({
    ...styles.clearButton,
    ...(hoveredButton === 'clear' ? styles.clearButtonHover : {})
  });

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        <div style={styles.header}>
          <h1 style={styles.title}>My Tasks</h1>
          <p style={styles.subtitle}>Stay organized and get things done</p>
        </div>

        <div style={styles.addSection}>
          <div style={styles.inputContainer}>
            <div style={styles.inputWrapper}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                placeholder="What needs to be done?"
                style={getInputStyle()}
              />
            </div>
            <button
              onClick={addTodo}
              onMouseEnter={() => setHoveredButton('add')}
              onMouseLeave={() => setHoveredButton(null)}
              style={getAddButtonStyle()}
            >
              <Plus size={20} />
              Add
            </button>
          </div>
        </div>

        <div style={styles.filterContainer}>
          <div style={styles.filterTabs}>
            {[
              { key: 'all', label: 'All', count: todos.length },
              { key: 'active', label: 'Active', count: activeTodosCount },
              { key: 'completed', label: 'Completed', count: completedTodosCount }
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                onMouseEnter={() => setHoveredButton(key)}
                onMouseLeave={() => setHoveredButton(null)}
                style={getFilterTabStyle(key)}
              >
                {label} {count > 0 && (
                  <span style={getBadgeStyle(key)}>
                    {count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.todoContainer}>
          {filteredTodos.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>
                <CheckCircle2 color="#9ca3af" size={32} />
              </div>
              <h3 style={styles.emptyTitle}>
                {filter === 'completed' ? 'No completed tasks' : 
                 filter === 'active' ? 'No active tasks' : 'No tasks yet'}
              </h3>
              <p style={styles.emptyText}>
                {filter === 'all' ? 'Add a task above to get started!' : 
                 filter === 'active' ? 'All tasks are completed!' : 
                 'Complete some tasks to see them here'}
              </p>
            </div>
          ) : (
            <div style={styles.todoList}>
              {filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  style={getTodoItemStyle(todo)}
                  onMouseEnter={() => setHoveredItem(todo.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    onMouseEnter={() => setHoveredButton(`check-${todo.id}`)}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={getCheckButtonStyle(todo)}
                  >
                    {todo.completed && <Check size={16} />}
                  </button>
                  
                  <div style={{ flex: '1', minWidth: '0' }}>
                    <p style={getTodoTextStyle(todo)}>
                      {todo.text}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    onMouseEnter={() => setHoveredButton(`delete-${todo.id}`)}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={getDeleteButtonStyle(todo.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {todos.length > 0 && (
          <div style={styles.footer}>
            <span>
              {activeTodosCount} {activeTodosCount === 1 ? 'item' : 'items'} left
            </span>
            {completedTodosCount > 0 && (
              <button
                onClick={clearCompleted}
                onMouseEnter={() => setHoveredButton('clear')}
                onMouseLeave={() => setHoveredButton(null)}
                style={getClearButtonStyle()}
              >
                Clear completed
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}