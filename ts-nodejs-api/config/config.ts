const config = {
      env: 'development',
      hostname: 'dev.example.com',
      // mongo database
      mongo : {
          uri : process.env.MONGO_URI || 'localhost',
          db : 'example_dev',
      },
};

export default {config};