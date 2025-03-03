import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [category, setCategory] = useState('Work');
  const [dueDate, setDueDate] = useState('');
  const [filter, setFilter] = useState('all');

 
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) setTasks(storedTasks);
  }, []);

 
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => setInputValue(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleDueDateChange = (e) => setDueDate(e.target.value);

  const handleAddTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { text: inputValue, completed: false, dueDate, category }]);
      setInputValue('');
      setDueDate('');
      setCategory('Work');
    }
  };

  const handleToggleComplete = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="container">
      <h1>Task Manager</h1>

      {/* Task Input Fields */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Add a new task" />
        <input type="date" value={dueDate} onChange={handleDueDateChange} />
        <select value={category} onChange={handleCategoryChange}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Urgent">Urgent</option>
        </select>
        <button onClick={handleAddTask}>Add Task</button>
      </motion.div>

      {/* Filter Buttons */}
      <div>
        <button onClick={() => setFilter('all')}>Show All Tasks</button>
        <button onClick={() => setFilter('completed')}>Show Completed Tasks</button>
        <button onClick={() => setFilter('pending')}>Show Pending Tasks</button>
      </div>

      {/* Task Table */}
      <motion.table border="1" style={{ width: '100%', marginTop: '10px', textAlign: 'left' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Category</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {filteredTasks.map((task, index) => (
              <motion.tr key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <td style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</td>
                <td>{task.category}</td>
                <td>{task.dueDate}</td>
                <td>
                  <motion.span animate={{ scale: task.completed ? 1.1 : 1 }}>
                    {task.completed ? '✅ Completed' : '🕒 Pending'}
                  </motion.span>
                </td>
                <td>
                  <input type="checkbox" checked={task.completed} onChange={() => handleToggleComplete(index)} />
                  <motion.button onClick={() => handleDeleteTask(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    style={{ marginLeft: '10px', background: 'white', color: 'white', border: 'none', padding: '5px' }}
                  >
                    ❌
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </motion.table>
    </div>
  );
}
