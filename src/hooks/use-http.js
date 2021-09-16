import { useState } from "react";

const useHttp = (requestConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  setIsLoading(true);
  setError(null);

  const sendRequest = async () => {
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method:"GET",
        body: JSON.stringify(requestConfig.body ? requestConfig.body: null),
        headers: requestConfig.headers ? requestConfig.headers :{},
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyData(data);
      // const generatedId = data.name; // firebase-specific => "name" contains generated id
      // const createdTask = { id: generatedId, text: taskText };
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
  };

  return {isLoading: isLoading, error:  error , sendRequest:sendRequest};
};

export default useHttp;

  //   if (action === "fetch") {
  //     try {
  //       const response = await fetch(
  //         'https://myreactapp-14003-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json'
  //       );

  //       if (!response.ok) {
  //         throw new Error('Request failed!');
  //       }

  //       const data = await response.json();
  //       for (const taskKey in data) {
  //         loadedTasks.push({ id: taskKey, text: data[taskKey].text });
  //       }

  //     } catch (err) {
  //       setError(err.message || 'Something went wrong!');
  //     }

  //   }
  //   setIsLoading(false);

  //   return {isLoading:isLoading, error:error, tasks:loadedTasks, newTask:newTask};

  // };