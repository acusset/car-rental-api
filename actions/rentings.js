module.exports = (api) => {
    const Renting = api.models.Renting;

    function list(req, res, next) {
        Renting.find()
            .then(res.prepare(200))
            .then(res.prepare(500));
    }

    return {
        list
    };
};
