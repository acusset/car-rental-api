module.exports = (api) => {
    const Renting = api.models.Renting;
    const User = api.models.User;

    function create(req, res, next) {
        let renting = new Renting(req.body);
        renting.save()
            .then(res.prepare(201))
            .catch(res.prepare(500));
    }

    function list(req, res, next) {
        renting.find()
            .then(res.prepare(200))
            .then(res.prepare(500));
    }

    function show(req, res, next) {
        renting.findById(req.params.id)
            .then(res.prepare(200))
            .catch(res.prepare(500));
    }

    function update(req, res, next) {
        renting.findByIdAndUpdate(req.params.id, req.body)
            .then(res.prepare(204))
            .catch(res.prepare(500));
    }

    function remove(req, res, next) {
        renting.findByIdAndRemove(req.params.id)
            .then(res.prepare(204))
            .catch(res.prepare(500));
    }

    return {
        create,
        list,
        show,
        update,
        remove
    };
};
