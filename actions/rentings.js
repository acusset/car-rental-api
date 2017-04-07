module.exports = (api) => {
    const Renting = api.models.Renting;
    const User = api.models.User;
    const Car = api.models.Car;

    function create(req, res, next) {
        let renting = new Renting(req.body);
        renting.save()
            .then(res.prepare(201))
            .catch(res.prepare(500));
    }

    function list(req, res, next) {
        Renting.find()
            .then(res.prepare(200))
            .then(res.prepare(500));
    }

    function show(req, res, next) {
        Renting.findById(req.params.id)
            .then(res.prepare(200))
            .catch(res.prepare(500));
    }

    function update(req, res, next) {
        Renting.findByIdAndUpdate(req.params.id, req.body)
            .then(res.prepare(204))
            .catch(res.prepare(500));
    }

    function remove(req, res, next) {
        Renting.findByIdAndRemove(req.params.id)
            .then(res.prepare(204))
            .catch(res.prepare(500));
    }

    function join(req, res, next){
        //récupère l'id de la location qu'on veut join
        let renting, car; 

        return getRenting()
            .then(ensureOne)
            .then(getCar)
            .then(ensureOne)
            .then(checkAvailablePlaces)
            .then(updateRenting)
            .then(updateCar)
            .then(res.prepare(204))
            .catch(res.prepare(500));

        function getRenting(){
            return Renting.findOne({_id : req.params.id})
                .then(set);

            function set(data){
                return renting = data;
            }
        }
        //vérifie qu'elle existe
        function ensureOne(data) {
            return (data) ? data : Promise.reject('data.not.found');
        }

        function getCar(location){
            return Car.findOne({_id : data.carId})
                .then(set);

            function set(data){
                return car = data;
            }
        }

        function checkAvailablePlaces(data) {
            return (car.availablePlaces >= req.body.nbPlaces && req.body.nbPlaces > 0) ? car : Promise.reject('Nombre de places restantes insuffisantes.');
        }

        function updateRenting(data){
            renting.usersId.push(req.userId);
            renting.save();
        }

        function updateCar(data){
            car.availablePlaces -= 1;
            car.save();
        }

    }

    return {
        create,
        list,
        show,
        update,
        remove,
        join
    };
};
