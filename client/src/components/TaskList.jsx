import { useEffect, useState } from "react";
import { getTasks } from "../api";

function TaskList() {

    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {

        const loadTasks = async()  => {
            const result = await getTasks();

            if(!result.ok){
                setMessage(result.data.message);
                return;
            }
            setTasks(result.data.tasks);
        };
        loadTasks();
    }, []);

    return (
        <div>
            <h2>My Tasks</h2>
            {message && <p>{message}</p>}
            {tasks.length === 0 ? (
                <p>No tasks found.</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <strong>{task.title}</strong>
                            <p>{task.description}</p>

                            <span>
                                {task.completed
                                 ? "Completed" : 
                                "Pending"}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

}

export default TaskList;