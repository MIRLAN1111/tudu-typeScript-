import React, { useState } from "react";

interface Task {
  id: number;
  text: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTaskText, setEditTaskText] = useState<string>("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask("");
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id: number, newText: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return { ...task, text: newText };
      }
      return task;
    }));
    setEditTaskId(null);
    setEditTaskText("");
  };

  const startEdit = (id: number, text: string) => {
    setEditTaskId(id);
    setEditTaskText(text);
  };

  const cancelEdit = () => {
    setEditTaskId(null);
    setEditTaskText("");
  };

  return (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="пишите что нибудь"
      />
      <button className="goldButton" onClick={addTask}>Add</button>
      {tasks.map((item) => (
        <div key={item.id}>
          {editTaskId === item.id ? (
            <>
              <input
                type="text"
                value={editTaskText}
                onChange={(e) => setEditTaskText(e.target.value)}
              />
              <button onClick={() => editTask(item.id, editTaskText)}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
            </>
          ) : (
            <>
              <h2>{item.text}</h2>
              <button onClick={() => deleteTask(item.id)}>Delete</button>
              <button onClick={() => startEdit(item.id, item.text)}>Edit</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default App;
