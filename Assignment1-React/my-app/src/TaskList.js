import React, { useState } from 'react'

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const handleAddTask = () => {
        if (inputValue.trim()) {
            setTasks([...tasks, inputValue]);
            setInputValue('');
        }
    };
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }


  return (
    <div>
      <input
        type = "text"
        value = {inputValue}
        onChange = {handleInputChange}
        placeholder = "Add a new task"  
       />
        <button onClick = {handleAddTask}>Add TaskList</button>
        <ul>
        <h1>List of Tasks</h1>
            {tasks.map((task, index) => (
                <li key = {index}>{task}</li>
            ))}
        </ul>
    </div>
  )
}
