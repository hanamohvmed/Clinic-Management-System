import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Calendar, Clock, Flag, X, Edit2, Trash2, Moon, Sun } from 'lucide-react';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [draggedTask, setDraggedTask] = useState(null);

  // Initialize with sample data
  useEffect(() => {
    const sampleTasks = [
      {
        id: 1,
        title: "Design Homepage Layout",
        description: "Create wireframes and mockups for the new homepage design",
        priority: "high",
        dueDate: "2025-06-15",
        status: "todo",
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        title: "Implement User Authentication",
        description: "Set up login/register functionality with JWT tokens",
        priority: "medium",
        dueDate: "2025-06-20",
        status: "inprogress",
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        title: "Write Unit Tests",
        description: "Add comprehensive test coverage for all components",
        priority: "low",
        dueDate: "2025-06-25",
        status: "done",
        createdAt: new Date().toISOString()
      }
    ];
    setTasks(sampleTasks);
  }, []);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    status: 'todo'
  });

  const columns = [
    { id: 'todo', title: 'To Do', color: '#3B82F6' },
    { id: 'inprogress', title: 'In Progress', color: '#F59E0B' },
    { id: 'done', title: 'Done', color: '#10B981' }
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;

    const task = {
      id: Date.now(),
      ...newTask,
      createdAt: new Date().toISOString()
    };

    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '', priority: 'medium', dueDate: '', status: 'todo' });
    setShowAddModal(false);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask(task);
    setShowAddModal(true);
  };

  const handleUpdateTask = () => {
    if (!newTask.title.trim()) return;

    setTasks(tasks.map(task => 
      task.id === editingTask.id ? { ...task, ...newTask } : task
    ));
    
    setEditingTask(null);
    setNewTask({ title: '', description: '', priority: 'medium', dueDate: '', status: 'todo' });
    setShowAddModal(false);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== newStatus) {
      setTasks(tasks.map(task =>
        task.id === draggedTask.id ? { ...task, status: newStatus } : task
      ));
    }
    setDraggedTask(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingTask(null);
    setNewTask({ title: '', description: '', priority: 'medium', dueDate: '', status: 'todo' });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: darkMode ? '#111827' : '#F9FAFB',
      color: darkMode ? '#F9FAFB' : '#111827',
      transition: 'all 0.3s ease',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      position: 'sticky',
      top: 0,
      zIndex: 10,
      backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
      borderBottom: `1px solid ${darkMode ? '#374151' : '#E5E7EB'}`,
      backdropFilter: 'blur(8px)',
      padding: '1rem 0'
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    headerTop: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1rem'
    },
    logo: {
      fontSize: '2rem',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      margin: 0
    },
    headerControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    themeToggle: {
      padding: '0.5rem',
      borderRadius: '0.5rem',
      border: 'none',
      backgroundColor: darkMode ? '#374151' : '#F3F4F6',
      color: darkMode ? '#F9FAFB' : '#111827',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    addButton: {
      backgroundColor: '#3B82F6',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.2s ease',
      fontSize: '0.875rem',
      fontWeight: '500'
    },
    searchContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    searchBar: {
      position: 'relative',
      flex: 1
    },
    searchInput: {
      width: '100%',
      paddingLeft: '2.5rem',
      paddingRight: '1rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      borderRadius: '0.5rem',
      border: `1px solid ${darkMode ? '#374151' : '#D1D5DB'}`,
      backgroundColor: darkMode ? '#374151' : '#FFFFFF',
      color: darkMode ? '#F9FAFB' : '#111827',
      fontSize: '0.875rem',
      outline: 'none',
      transition: 'all 0.2s ease'
    },
    searchIcon: {
      position: 'absolute',
      left: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9CA3AF'
    },
    filtersContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    filterSelect: {
      padding: '0.5rem 0.75rem',
      borderRadius: '0.5rem',
      border: `1px solid ${darkMode ? '#374151' : '#D1D5DB'}`,
      backgroundColor: darkMode ? '#374151' : '#FFFFFF',
      color: darkMode ? '#F9FAFB' : '#111827',
      fontSize: '0.875rem',
      outline: 'none',
      cursor: 'pointer'
    },
    mainContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '1.5rem 1rem'
    },
    columnsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem'
    },
    column: {
      backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
      borderRadius: '0.75rem',
      border: `2px dashed ${darkMode ? '#374151' : '#E5E7EB'}`,
      padding: '1rem',
      minHeight: '400px'
    },
    columnHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1rem'
    },
    columnTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      margin: 0
    },
    taskCount: {
      backgroundColor: darkMode ? '#374151' : '#F3F4F6',
      color: darkMode ? '#D1D5DB' : '#6B7280',
      padding: '0.25rem 0.5rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '500'
    },
    tasksList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    },
    taskCard: {
      backgroundColor: darkMode ? '#374151' : '#FFFFFF',
      border: `1px solid ${darkMode ? '#4B5563' : '#E5E7EB'}`,
      borderRadius: '0.5rem',
      padding: '1rem',
      cursor: 'move',
      transition: 'all 0.2s ease',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    taskHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: '0.5rem'
    },
    taskTitle: {
      fontSize: '0.875rem',
      fontWeight: '500',
      margin: 0,
      lineHeight: '1.25'
    },
    taskActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      marginLeft: '0.5rem'
    },
    actionButton: {
      padding: '0.25rem',
      borderRadius: '0.25rem',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease',
      color: darkMode ? '#D1D5DB' : '#6B7280'
    },
    deleteButton: {
      color: '#EF4444'
    },
    taskDescription: {
      fontSize: '0.75rem',
      color: darkMode ? '#9CA3AF' : '#6B7280',
      marginBottom: '0.75rem',
      lineHeight: '1.4'
    },
    taskFooter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    priorityBadge: {
      padding: '0.25rem 0.5rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      border: '1px solid'
    },
    priorityHigh: {
      backgroundColor: '#FEE2E2',
      color: '#DC2626',
      borderColor: '#FECACA'
    },
    priorityMedium: {
      backgroundColor: '#FEF3C7',
      color: '#D97706',
      borderColor: '#FDE68A'
    },
    priorityLow: {
      backgroundColor: '#D1FAE5',
      color: '#059669',
      borderColor: '#A7F3D0'
    },
    dueDateContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      fontSize: '0.75rem'
    },
    overdueDate: {
      color: '#EF4444'
    },
    normalDate: {
      color: '#6B7280'
    },
    modal: {
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      zIndex: 50
    },
    modalContent: {
      backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
      borderRadius: '0.75rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      width: '100%',
      maxWidth: '28rem'
    },
    modalHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.5rem',
      borderBottom: `1px solid ${darkMode ? '#374151' : '#E5E7EB'}`
    },
    modalTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      margin: 0
    },
    closeButton: {
      padding: '0.25rem',
      borderRadius: '0.5rem',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease',
      color: darkMode ? '#D1D5DB' : '#6B7280'
    },
    modalBody: {
      padding: '1.5rem'
    },
    formGroup: {
      marginBottom: '1rem'
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      marginBottom: '0.25rem'
    },
    input: {
      width: '100%',
      padding: '0.5rem 0.75rem',
      borderRadius: '0.5rem',
      border: `1px solid ${darkMode ? '#374151' : '#D1D5DB'}`,
      backgroundColor: darkMode ? '#374151' : '#FFFFFF',
      color: darkMode ? '#F9FAFB' : '#111827',
      fontSize: '0.875rem',
      outline: 'none',
      transition: 'all 0.2s ease'
    },
    textarea: {
      width: '100%',
      padding: '0.5rem 0.75rem',
      borderRadius: '0.5rem',
      border: `1px solid ${darkMode ? '#374151' : '#D1D5DB'}`,
      backgroundColor: darkMode ? '#374151' : '#FFFFFF',
      color: darkMode ? '#F9FAFB' : '#111827',
      fontSize: '0.875rem',
      outline: 'none',
      transition: 'all 0.2s ease',
      resize: 'vertical',
      minHeight: '80px'
    },
    formRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem'
    },
    modalFooter: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '0.75rem',
      marginTop: '1.5rem'
    },
    cancelButton: {
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      border: 'none',
      backgroundColor: darkMode ? '#374151' : '#F3F4F6',
      color: darkMode ? '#F9FAFB' : '#111827',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontSize: '0.875rem'
    },
    submitButton: {
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      border: 'none',
      backgroundColor: '#3B82F6',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontSize: '0.875rem'
    }
  };

  // Responsive styles
  const responsiveStyles = {
    '@media (max-width: 768px)': {
      searchContainer: {
        flexDirection: 'column'
      },
      columnsGrid: {
        gridTemplateColumns: '1fr'
      },
      formRow: {
        gridTemplateColumns: '1fr'
      }
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerTop}>
            <h1 style={styles.logo}>TaskFlow</h1>
            <div style={styles.headerControls}>
              <button
                style={styles.themeToggle}
                onClick={() => setDarkMode(!darkMode)}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = darkMode ? '#4B5563' : '#E5E7EB';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = darkMode ? '#374151' : '#F3F4F6';
                }}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                style={styles.addButton}
                onClick={() => setShowAddModal(true)}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#2563EB';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#3B82F6';
                }}
              >
                <Plus size={20} />
                Add Task
              </button>
            </div>
          </div>

          <div style={styles.searchContainer}>
            <div style={styles.searchBar}>
              <div style={styles.searchIcon}>
                <Search size={20} />
              </div>
              <input
                style={styles.searchInput}
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3B82F6';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = darkMode ? '#374151' : '#D1D5DB';
                }}
              />
            </div>
            <div style={styles.filtersContainer}>
              <Filter size={20} style={{color: '#9CA3AF'}} />
              <select
                style={styles.filterSelect}
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.columnsGrid}>
          {columns.map(column => (
            <div
              key={column.id}
              style={{
                ...styles.column,
                borderColor: darkMode ? '#374151' : column.color + '40'
              }}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div style={styles.columnHeader}>
                <h2 style={styles.columnTitle}>{column.title}</h2>
                <span style={styles.taskCount}>
                  {filteredTasks.filter(task => task.status === column.id).length}
                </span>
              </div>

              <div style={styles.tasksList}>
                {filteredTasks
                  .filter(task => task.status === column.id)
                  .map(task => (
                    <div
                      key={task.id}
                      style={styles.taskCard}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task)}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                      }}
                    >
                      <div style={styles.taskHeader}>
                        <h3 style={styles.taskTitle}>{task.title}</h3>
                        <div style={styles.taskActions}>
                          <button
                            style={styles.actionButton}
                            onClick={() => handleEditTask(task)}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = darkMode ? '#4B5563' : '#F3F4F6';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'transparent';
                            }}
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            style={{...styles.actionButton, ...styles.deleteButton}}
                            onClick={() => handleDeleteTask(task.id)}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = darkMode ? '#7F1D1D' : '#FEE2E2';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'transparent';
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      
                      {task.description && (
                        <p style={styles.taskDescription}>
                          {task.description}
                        </p>
                      )}

                      <div style={styles.taskFooter}>
                        <span style={{
                          ...styles.priorityBadge,
                          ...(task.priority === 'high' ? styles.priorityHigh : 
                              task.priority === 'medium' ? styles.priorityMedium : 
                              styles.priorityLow)
                        }}>
                          <Flag size={10} />
                          {task.priority}
                        </span>
                        
                        {task.dueDate && (
                          <div style={{
                            ...styles.dueDateContainer,
                            ...(isOverdue(task.dueDate) ? styles.overdueDate : styles.normalDate)
                          }}>
                            <Calendar size={12} />
                            {formatDate(task.dueDate)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                {editingTask ? 'Edit Task' : 'Add New Task'}
              </h3>
              <button
                style={styles.closeButton}
                onClick={closeModal}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = darkMode ? '#374151' : '#F3F4F6';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                <X size={20} />
              </button>
            </div>
            
            <div style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Title</label>
                <input
                  style={styles.input}
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3B82F6';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = darkMode ? '#374151' : '#D1D5DB';
                  }}
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  style={styles.textarea}
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3B82F6';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = darkMode ? '#374151' : '#D1D5DB';
                  }}
                />
              </div>
              
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Priority</label>
                  <select
                    style={styles.input}
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Due Date</label>
                  <input
                    style={styles.input}
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3B82F6';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = darkMode ? '#374151' : '#D1D5DB';
                    }}
                  />
                </div>
              </div>
              
              {!editingTask && (
                <div style={styles.formGroup}>
                  <label style={styles.label}>Status</label>
                  <select
                    style={styles.input}
                    value={newTask.status}
                    onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                  >
                    <option value="todo">To Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              )}
              
              <div style={styles.modalFooter}>
                <button
                  style={styles.cancelButton}
                  onClick={closeModal}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = darkMode ? '#4B5563' : '#E5E7EB';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = darkMode ? '#374151' : '#F3F4F6';
                  }}
                >
                  Cancel
                </button>
                <button
                  style={styles.submitButton}
                  onClick={editingTask ? handleUpdateTask : handleAddTask}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#2563EB';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#3B82F6';
                  }}
                >
                  {editingTask ? 'Update Task' : 'Add Task'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManager;