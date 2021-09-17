import React, { useEffect, useState, useCallback } from "react";
import useHttp from "./hooks/use-http";
import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";

function App() {
  const [tasks, setTasks] = useState([]);

  const transformTasks = useCallback((tasksObj) => {
    const loadedTasks = [];
    for (const taskKey in tasksObj) {
      loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
    }
    setTasks(loadedTasks);
  }, []);

  const httpData = useHttp(transformTasks);

  const { isLoading, error, sendRequest: fetchTasks } = httpData;

  useEffect(() => {
    fetchTasks({
      url: "https://myreactapp-14003-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
    },transformTasks);
  }, [fetchTasks,transformTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;

// const fetchTasks = async (taskText) => {
//   setIsLoading(true);
//   setError(null);
//   try {
//     const response = await fetch(
//       'https://myreactapp-14003-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json'
//     );

//     if (!response.ok) {
//       throw new Error('Request failed!');
//     }

//     const data = await response.json();

//     const loadedTasks = [];

//     for (const taskKey in data) {
//       loadedTasks.push({ id: taskKey, text: data[taskKey].text });
//     }

//     setTasks(loadedTasks);
//   } catch (err) {
//     setError(err.message || 'Something went wrong!');
//   }
//   setIsLoading(false);
// };
