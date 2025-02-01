let db;

exports.initializeDatabase = (databaseConnection) => {
    db = databaseConnection;
};

exports.createPost = (user_id, title, content) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)';
    db.query(sql, [user_id, title, content], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.getAllPosts = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM posts';
    db.query(sql, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

exports.getPostById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM posts WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) reject(err);
      resolve(result[0]);
    });
  });
};

exports.updatePostById = (id, title, content) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';
    db.query(sql, [title, content, id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.deletePostById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM posts WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
