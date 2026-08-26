import Login from './components/Login';
import TaskList from './components/TaskList';

function App() {

    const token = localStorage.getItem("token");

    return (
        <div>
            {token ? <TaskList /> : <Login />}
        </div>
    );
}

export default App;