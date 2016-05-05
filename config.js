module.exports = {
  MONGO_URI: process.env.MONGOLAB_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/MEAN_TODO_DB',
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'Dragons taste like squirrel meat'
};

// to add process env variables use heroku config: set <name> = value

// heroku config will list all env variables we have.
