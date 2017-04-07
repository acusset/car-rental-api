module.exports = (api) => {
    require('./models')(api);
    require('./users')(api);
    require('./agencies')(api);
    require('./cars')(api);
};


