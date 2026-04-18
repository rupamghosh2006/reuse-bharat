import app from './app.js';
import config from './config/index.js';
import connectDB from './src/config/database.js';
import seedDatabase from './src/utils/seed.js';

const startServer = async () => {
  try {
    await connectDB();
    await seedDatabase();
    
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();