const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.patch('/:id', taskController.toggleTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
