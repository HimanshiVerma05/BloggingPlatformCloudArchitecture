let db;

exports.initializeDatabase = (databaseConnection) => {
    db = databaseConnection;
};

exports.createUser = (username, hashedPassword) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, hashedPassword], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.findUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, result) => {
      if (err) reject(err);
      resolve(result[0]);
    });
  });
};

exports.findUserIdByUsername = (username) => {
  return new Promise((resolve, reject) => {
    console.log('username is -- ',username);
    const sql = 'SELECT id FROM users WHERE username = ?';
    db.query(sql, [username], (err, result) => {
      console.log('result -- ',result);
      if (err) {
        console.error('Error finding user ID by username:', err);
        reject(err);
      }
      if (result.length === 0) {
        console.log('User not found:', username);
        resolve(null);
      } else {
        console.log('Result:', result);
        resolve(result[0]);
      }
    });
  });
};

