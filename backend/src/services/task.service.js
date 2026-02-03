const db = require('../database/db');

const taskService = {
    createTask(title) {
        return new Promise((resolve, reject) => {
            if (!title || title.length < 3) {
                return reject({
                    status: 400,
                    message: 'Title must be at least 3 characters'
                });
            }

            const query = `
        INSERT INTO tasks (title, completed, createdAt)
        VALUES (?, 0, ?)
      `;

            db.run(query, [title, new Date().toISOString()], function (err) {
                if (err) return reject(err);

                resolve({
                    id: this.lastID,
                    title,
                    completed: false
                });
            });
        });
    },

    getTasks() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM tasks`, [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },

    toggleTask(id) {
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE tasks SET completed = NOT completed WHERE id = ?`,
                [id],
                function (err) {
                    if (err) return reject(err);
                    if (this.changes === 0) {
                        return reject({ status: 404, message: 'Task not found' });
                    }
                    resolve();
                }
            );
        });
    },

    deleteTask(id) {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM tasks WHERE id = ?`, [id], function (err) {
                if (err) return reject(err);
                if (this.changes === 0) {
                    return reject({ status: 404, message: 'Task not found' });
                }
                resolve();
            });
        });
    }
};

module.exports = taskService;
