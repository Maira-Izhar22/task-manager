import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/tasks';

const taskService = {
    getAll() {
        return axios.get(API_BASE_URL);
    },

    create(title) {
        return axios.post(API_BASE_URL, { title });
    },

    toggle(id) {
        return axios.patch(`${API_BASE_URL}/${id}`);
    },

    remove(id) {
        return axios.delete(`${API_BASE_URL}/${id}`);
    }
};

export default taskService;
