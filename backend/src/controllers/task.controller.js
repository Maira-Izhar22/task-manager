const taskService = require('../services/task.service');

const taskController = {
    async createTask(req, res, next) {
        try {
            const task = await taskService.createTask(req.body.title);
            res.status(201).json(task);
        } catch (err) {
            next(err);
        }
    },

    async getTasks(req, res, next) {
        try {
            const tasks = await taskService.getTasks();
            res.json(tasks);
        } catch (err) {
            next(err);
        }
    },

    async toggleTask(req, res, next) {
        try {
            await taskService.toggleTask(req.params.id);
            res.json({ message: 'Task updated successfully' });
        } catch (err) {
            next(err);
        }
    },

    async deleteTask(req, res, next) {
        try {
            await taskService.deleteTask(req.params.id);
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
};

module.exports = taskController;
