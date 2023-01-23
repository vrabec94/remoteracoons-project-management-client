// src/pages/EditProjectPage.js

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; //  <== IMPORT

const API_URL = "http://localhost:5005";

function EditTaskPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");

  const { taskId } = useParams();
  const navigate = useNavigate();

  console.log(taskId);
  useEffect(() => {
    axios
      .get(`${API_URL}/api/tasks/${taskId}`)
      .then((response) => {
        
        const oneTask = response.data;
        setTitle(oneTask.title);
        setDescription(oneTask.description);
        setProjectId(oneTask.project);
       console.log(response);
      })
      .catch((error) => console.log(error));
  }, [taskId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { title, description };

    // Make a PUT request to update the project
    axios
      .put(`${API_URL}/api/tasks/${taskId}`, requestBody)
      .then((response) => {
        // const projectIdOfTask = response.data.project;
        // Once the request is resolved successfully and the project
        // is updated we navigate back to the details page
        navigate(`/projects/${projectId}`);
      });
  };
  
  const deleteTask = () => {
    // Make a DELETE request to delete the task
    axios
      .delete(`${API_URL}/api/tasks/${taskId}`)
      .then(() => {
        navigate(`/projects/${projectId}`);
      })
      .catch((err) => console.log(err));
  };  

  return (
    <div className="EditProjectPage">
      <h3>Edit the Task</h3>

      <form onSubmit={handleFormSubmit}>
        {" "}
        {/*  <== UPDATE  */}
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Update Task</button>
        <button onClick={deleteTask}>Delete Task</button>
      </form>
    </div>
  );
}

export default EditTaskPage;