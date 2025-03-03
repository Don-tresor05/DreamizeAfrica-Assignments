import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [category, setCategory] = useState('Work');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [priority, setPriority] = useState('Medium');
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
  const handleNotesChange = (e) => setNotes(e.target.value);
  const handlePriorityChange = (e) => setPriority(e.target.value);

  const handleAddTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { text: inputValue, notes, priority, category, dueDate, completed: false }]);
      setInputValue('');
      setNotes('');
      setDueDate('');
      setCategory('Work');
      setPriority('Medium');
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

  const completedCount = tasks.filter((task) => task.completed).length;
  const progress = tasks.length ? (completedCount / tasks.length) * 100 : 0;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'red';
      case 'Medium':
        return 'orange';
      case 'Low':
        return 'green';
      default:
        return 'black';
    }
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Task Name" />
        <textarea value={notes} onChange={handleNotesChange} placeholder="Notes"></textarea>
        <input type="date" value={dueDate} onChange={handleDueDateChange} />

        <select value={category} onChange={handleCategoryChange}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Urgent">Urgent</option>
        </select>

        <select value={priority} onChange={handlePriorityChange}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button onClick={handleAddTask}>Add Task</button>
      </motion.div>

      <div>
        <button onClick={() => setFilter('all')}>Show All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
      </div>

      <motion.div className="progress-bar" style={{ background: '#ccc', width: '100%', height: '20px', margin: '10px 0' }}>
        <motion.div
          style={{ background: 'blue', height: '100%' }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
        <span style={{ color: 'yellow', fontWeight: 'bold', textShadow: '1px 1px 2px black' }}>
  {Math.round(progress)}% Completed
</span>

      </motion.div>

      <motion.table border="1" style={{ width: '100%', marginTop: '10px', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Task</th>
            <th>Notes</th>
            <th>Category</th>
            <th>Priority</th>
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
                <td>{task.text}</td>
                <td>{task.notes}</td>
                <td>{task.category}</td>
                <td style={{ color: getPriorityColor(task.priority) }}>{task.priority}</td>
                <td>{task.dueDate}</td>
                <td>{task.completed ? '✅ Completed' : '🕒 Pending'}</td>
                <td>
                  <input type="checkbox" checked={task.completed} onChange={() => handleToggleComplete(index)} />
                  <motion.button onClick={() => handleDeleteTask(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    style={{ background: 'white', color: 'white', marginLeft: '10px' }}
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
