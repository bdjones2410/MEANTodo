module.exports = {
  MONGO_URI: process.env.MONGOLAB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/MEAN_TODO_DB',
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'Dragons taste like squirrel meat'
};
