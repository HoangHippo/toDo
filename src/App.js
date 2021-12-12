import React from "react";
import clsx from "clsx";

import "./App.css";

function App() {
  const [text, setText] = React.useState("");

  const [tasks, setTasks] = React.useState(() => {
    const storedTasks = localStorage.getItem("tasks");

    if (!storedTasks) {
      return [];
    }

    return JSON.parse(storedTasks);
  });

  const handleAddTasks = () => {
    if (text) {
      setTasks((preTasks) => [
        ...preTasks,
        { content: text, isCompleted: false },
      ]
      );
      setText('');
    }
  };

  const handleChangeInput = (e) => {
    const value = e.target.value;
    setText(value);
  };

  const clsList = clsx({
    border: tasks.length > 0,
    "divide-y divide-grey-100 mt-8": true,
  });

  return (
    <div className="container mx-auto">
      <div className="mt-3 flex">
        <div className="flex-grow">
          <input
            className="w-full h-full px-2 bordered rounded"
            value={text}
            placeholder="Enter new task"
            onChange={handleChangeInput}
          ></input>
        </div>
        <button
          className="px-2 py-3 text-white bg-blue-500"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleAddTasks();
            }
          }}
          onClick={handleAddTasks}
        >
          Add
        </button>
      </div>
      <ul className={clsList}>
        {tasks.map((task, idx) => {
          return (
            <li className="p-2 flex">
              <div className="mr-2 incline-flex items-center flex-grow">
                {task.content}
              </div>
              <button className="px-2 py-3 text-white bg-red-500">
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
