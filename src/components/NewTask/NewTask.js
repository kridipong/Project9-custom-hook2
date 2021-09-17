
import useHttp from "../../hooks/use-http";
import Section from "../UI/Section";
import TaskForm from "./TaskForm";



const NewTask = (props) => {
  const httpData = useHttp();

  const { isLoading, error, sendRequest: addTask } = httpData;



  const postTask =(taskText,data) =>{
  
    console.log(data);
    const generatedId =data.name;
    const createdTask = { id: generatedId, text: taskText };
    props.onAddTask(createdTask);

  } ;

  const enterTaskHandler = async (taskText) => {

    addTask({
      url: "https://myreactapp-14003-default-rtdb.asia-southeast1.firebasedatabase.app//tasks.json",
      method: "POST",
      body: { text: taskText },
      headers: {
        "Content-Type": "application/json",
      },
    },postTask);

    postTask.bind(null, taskText)


  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;

// try {
//   const response = await fetch(
//     'https://myreactapp-14003-default-rtdb.asia-southeast1.firebasedatabase.app//tasks.json',
//     {
//       method: 'POST',
//       body: JSON.stringify({ text: taskText }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }
//   );

//   if (!response.ok) {
//     throw new Error('Request failed!');
//   }

//   const data = await response.json();

//   const generatedId = data.name; // firebase-specific => "name" contains generated id
//   const createdTask = { id: generatedId, text: taskText };

//   props.onAddTask(createdTask);
// } catch (err) {
//   setError(err.message || 'Something went wrong!');
// }
// setIsLoading(false);
