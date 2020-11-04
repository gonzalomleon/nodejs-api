const config = {
      env: 'development',
      hostname: 'dev.example.com',
      // mongo database
      mongo : {
          uri : "mongodb+srv://mongo-dbuser-test:mysq1@cluster0.lnlte.mongodb.net/db-test?retryWrites=true&w=majority",
          db : 'db-test',
      },
};

export default {config};