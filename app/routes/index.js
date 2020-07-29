module.exports = app => {
  require('./auth')(app);
  require('./users')(app);
  require('./categories')(app);
  require('./products')(app);
  require('./addresses')(app);
};


