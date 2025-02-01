const mysql = require('mysql2/promise');

async function initializeDatabaseConnection(secrets) {
    try {
        const connection = await mysql.createConnection({
            host: secrets.DB_HOST,
            user: secrets.DB_USER,
            password: secrets.DB_PASSWORD,
            database: secrets.DB_NAME
        });

        console.log('Connected to the database');

        // Check if the 'users' table exists and create it if it doesn't
        const createUsersTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL UNIQUE,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await connection.query(createUsersTableQuery);
        console.log('Users table created or already exists');

        // Check if the 'posts' table exists and create it if it doesn't
        const createPostsTableQuery = `
            CREATE TABLE IF NOT EXISTS posts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `;
        await connection.query(createPostsTableQuery);
        console.log('Posts table created or already exists');

        return connection;
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
}

module.exports = initializeDatabaseConnection;
