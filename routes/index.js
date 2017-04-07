module.exports = (api) => {
    api.use(api.middlewares.logger);
    api.use(api.middlewares.res);

    api.use('/users', require('./users')(api));
    api.use('/cars', require('./cars')(api));
    api.use('/auth', require('./auth')(api));
    api.use('/models', require('./models')(api));
    api.use('/agencies', require('./agencies')(api));
    api.use('/rentings', require('./rentings')(api));
};