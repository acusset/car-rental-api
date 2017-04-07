module.exports = (api) => {
    const Agency = api.models.Agency;

    function create(req, res, next) {
        let agency = new Agency(req.body);
        agency.save()
            .then(res.prepare(201))
            .catch(res.prepare(500));
    }

    function list(req, res, next) {
        Agency.find()
            .then(res.prepare(200))
            .then(res.prepare(500));
    }

    function show(req, res, next) {
        Agency.findById(req.params.id)
            .then(res.prepare(200))
            .catch(res.prepare(500));
    }

    function update(req, res, next) {
        Agency.findByIdAndUpdate(req.params.id, req.body)
            .then(res.prepare(204))
            .catch(res.prepare(500));
    }

    function remove(req, res, next) {
        Agency.findByIdAndRemove(req.params.id)
            .then(res.prepare(204))
            .catch(res.prepare(500));
    }

    function showCarsAvailable(req, res, next) {
        const Car = api.models.Car;

        Car.find({rentingPoint: req.params.id, $where: function() { return (this.availablePlaces > 0) }})
            .then(res.prepare(204))
            .catch(res.prepare(500));
    }

    return {
        create,
        list,
        show,
        update,
        remove,
        showCarsAvailable
    };
};
