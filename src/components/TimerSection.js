import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import TimerModal from './TimerModal';

const TimerSection = () => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editedTask, setEditedTask] = useState(null);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  const handleSave = () => {
    setShowModal(true);
  };

  const handleModalSave = (taskData) => {
    if (editedTask) {
      
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editedTask.id ? { ...task, ...taskData } : task
        )
      );
      setEditedTask(null);
    } else {
     
      setTasks([...tasks, { ...taskData, timeTracked: timer, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const handleModalCancel = () => {
    setEditedTask(null);
    setShowModal(false);
  };

  const handleEdit = (task) => {
    setEditedTask(task);
    setShowModal(true);
  };

  return (
    <div id="timer-section">
    <h2>Digital Clock: {new Date(timer * 1000).toISOString().substr(11, 8)}</h2>
    <button onClick={handleStart} disabled={isRunning}>
      Start
    </button>
    <button onClick={handlePause} disabled={!isRunning}>
      Pause
    </button>
    <button onClick={handleSave} disabled={!isRunning && !isPaused}>
      Save
    </button>

    {showModal && (
      <TimerModal
        onSave={handleModalSave}
        onCancel={handleModalCancel}
        editedTask={editedTask}
      />
    )}

    <TasksSection tasks={tasks} onEdit={handleEdit} />
  </div>
);
};

const TasksSection = ({ tasks, onEdit }) => {
  return (
    <div>
      <h2>Saved Tasks</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Task Title</th>
            <th>Description</th>
            <th>Time Tracked</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{new Date(task.timeTracked * 1000).toISOString().substr(11, 8)}</td>
              <td>
                <button onClick={() => onEdit(task)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TimerSection;
