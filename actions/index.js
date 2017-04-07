module.exports = (api) => {
    api.actions = {
        users: require('./users')(api),
        cars: require('./cars')(api),
        auth: require('./auth')(api),
        rentings: require('./rentings')(api),
        models: require('./models')(api),
        agencies: require('./agencies')(api)
    };
};
