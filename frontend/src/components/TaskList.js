import { useCallback, useEffect, useState } from 'react';
import taskService from '../services/taskService';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchTasks = useCallback(async () => {
        try {
            setLoading(true);
            const response = await taskService.getAll();
            setTasks(response.data);
        } catch {
            setError('Failed to load tasks');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleAddTask = async () => {
        if (!title.trim()) return;

        try {
            await taskService.create(title);
            setTitle('');
            fetchTasks();
        } catch {
            setError('Task title must be at least 3 characters');
        }
    };

    const handleToggleTask = async (id) => {
        try {
            await taskService.toggle(id);
            fetchTasks();
        } catch {
            setError('Unable to update task');
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await taskService.remove(id);
            fetchTasks();
        } catch {
            setError('Unable to delete task');
        }
    };

    return (
        <div>
            <div>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task"
                />
                <button onClick={handleAddTask}>Add</button>
            </div>

            {loading && <p>Loading tasks...</p>}
            {error && <p className="error">{error}</p>}

            <ul>
                {tasks.map((task) => (
                    <li key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <input
                            type="checkbox"
                            checked={!!task.completed}
                            onChange={() => handleToggleTask(task.id)}
                        />

                        <span
                            className={task.completed ? 'done' : ''}
                            style={{ cursor: 'pointer', flexGrow: 1 }}
                        >
                            {task.title}
                        </span>
                        <button onClick={() => handleDeleteTask(task.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
