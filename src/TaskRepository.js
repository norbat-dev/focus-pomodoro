const Utils = require("./utils");

class TaskRepository {
  constructor(db) {
    // db should be an instance of DatabaseManager with run/get/all methods
    this.db = db;
  }

  async addNewTask(title) {
    if (!title || typeof title !== "string") {
      throw new TypeError("title is required and must be a string");
    }

    const name = Utils.slugify(title);
    const sql = `
            INSERT INTO tasks (name, title, time, status, createdAt)
            VALUES (?, ?, '00:00:00', 'in_progress', datetime());
        `;

    const result = await this.db.run(sql, [name, title]);
    // return a useful object including inserted row id
    return { id: result.lastID, name, title };
  }

  async getTodayTasks() {
    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM tasks WHERE DATE(createdAt) = DATE('now', 'localtime')`;
      this.db.all(query, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  async getTaskById(id) {
    const row = await this.db.get("SELECT * FROM tasks WHERE id = ?", [id]);
    return row;
  }

  async updateTaskTitle(id, title) {
    if (!title || typeof title !== "string") {
      throw new TypeError("title is required and must be a string");
    }
    const name = Utils.slugify(title);
    const res = await this.db.run(
      "UPDATE tasks SET name = ?, title = ? WHERE id = ?",
      [name, title, id],
    );
    return res.changes;
  }

  async deleteTask(id) {
    const res = await this.db.run("DELETE FROM tasks WHERE id = ?", [id]);
    return res.changes;
  }
}

module.exports = TaskRepository;
