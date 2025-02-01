const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS middleware
const getSecretsFromLambda = require('./services/secretsManager');
const initializeDatabaseConnection = require('./config/db');
const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');

const app = express();
const port = process.env.PORT || 3000;

async function init() {
  try {
    console.log('before getting secrets from the lambda');
    const secrets = await getSecretsFromLambda();
    console.log('before initializinf database connection');
    const dbConnection = await initializeDatabaseConnection(secrets);

    // Use CORS middleware
    /* app.use(cors({
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'], 
      credentials: true,
    })); */
  // Define the CORS options
  app.use(cors());
  app.options('*', cors()) 
  // Custom CORS middleware

  /*const corsOptions = {
    origin: '*', // Allow specific origin
    methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],// Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],  
    credentials: true, // Allow credentials (cookies)
  };
  
  app.use(cors(corsOptions));*/

   
  
     // Initialize middleware
    app.use(bodyParser.json());

    // Initialize routes
    app.use('/api/auth', authRouter(dbConnection));
    app.use('/api/posts', postsRouter(dbConnection));

    // Health check endpoint
    app.options('*', cors()) 
    app.get('/api/health', (req, res) => {
      res.status(200).send({ status: 'ok' });
    });

    // Define a route for the root path
    app.get('/', (req, res) => {
      res.send('Hello, world!');
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

  } catch (err) {
    console.error('Failed to initialize application:', err);
    process.exit(1);
  }
}

init();
