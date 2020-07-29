module.exports = app => {
  require('./auth')(app);
  require('./users')(app);
  require('./addresses')(app);
  require('./categories')(app);
  require('./products')(app);
  require('./cart')(app);
  require('./orders')(app);
  require('./payments')(app);
};