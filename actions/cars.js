module.exports = (api) => {
    const Car = api.models.Car;
    const User = api.models.User;
    const Model = api.models.Model;
    const Agency = api.models.Agency;
    const Renting = api.models.Renting;

    function create(req, res, next) {
        let car = new Car(req.body);
        let modelId = req.body.model;
        let agencyId = req.body.agency;

        let model = null;


        Agency.findById(agencyId)
            .then(ensureAgencyExist)
            .then(findModel)
            .then(saveCar)
            .catch(res.prepare(500));

        function ensureAgencyExist(agency) {
            return (agency) ? agency : Promise.reject({code: 404, reason: 'Agency not found'});
        }

        function findModel() {
            return Model.findById(modelId)
                .then(ensureOne)
                .then(set);

            function ensureOne(model) {
                return (model) ? model : Promise.reject({code: 404, reason: 'Model car not found'});
            }

            function set(instance) {
                model = instance;
            }
        }

        function saveCar(data) {
            car.maxPlaces = data.places;
            car.availablePlaces = data.places;

            return car.save()
                .then(res.prepare(204))
                .catch(res.prepare(404));
        }
    }

    function list(req, res, next) {
        Car.find()
            .then(res.prepare(200))
            .then(res.prepare(500));
    }

    function show(req, res, next) {
        Car.findById(req.params.id)
            .then(res.prepare(200))
            .catch(res.prepare(500));
    }

    function update(req, res, next) {
        Car.findByIdAndUpdate(req.params.id, req.body)
            .then(res.prepare(204))
            .catch(res.prepare(500));
    }

    function remove(req, res, next) {
        let carId = req.param.id;

        Renting.find({'carId' : carId})
            .then(ensureRenting)
            .then(res.prepare(200))
            .catch(res.prepare(500));

        function ensureRenting(data) {
            Car.findByIdAndRemove(carId);
            Renting.remove({$where : function(){
                this.carId == carId
            }});
        }
    }

    function rent(req, res, next) {
        let carId = req.params.id;
        let userId = req.userId;
        let nbPlaces = req.body.nbPlaces;
        let rentingPoint = req.body.rentingPoint;

        let car = null;
        let user = null;
        let renting = null;

        findCar()
            .then(ensureOne)
            .then(ensureDateAvailable)
            .then(ensureAvailable)
            .then(updateCar)
            .then(updateRenting)
            .then(res.prepare(204))
            .catch(res.prepare(404));

        function findCar() {
            return Car.findById(carId)
                .then(set);

            function set(data) {
                return car = data;
            }
        }

        function ensureDateAvailable(data) {
            let rentingCar = Renting.find({'carId' : carId});

            if (!rentingCar) {
                return data;
            } else {
                //TODO
            }
        }
        function ensureAvailable(car) {
            if (car.availablePlaces < nbPlaces || car.rentingPoint !== rentingPoint) {
                return Promise.reject({code: 403, reason: 'Car unavailable'})
            }else {
                car.availablePlaces = car.availablePlaces - nbPlaces;
                return car;
            }
        }

        function updateCar() {
            return car.save;
        }

        function findUser() {
            return User.findById(userId)
                .then(set);

            function set(data) {
                return user = data;
            }
        }

        function updateRenting() {
            car.renters.push(userId);
            user.rent = carId;

            return car.save()
                .then(saveUser);

            function saveUser() {
                return user.save();
            }
        }

        function ensureOne(data) {
            return (data) ? data : Promise.reject('not.found');
        }
    }

    function back(req, res, next) {
        let car = null;
        let user = null;

        findUser()
            .then(ensureCarRented)
            .then(ensureCarExist)
            .then(update)
            .then(res.prepare(204))
            .catch(res.error);

        function findUser() {
            return User.findById(req.userId)
                .then(set);

            function set(instance) {
                return user = instance;
            }
        }

        function ensureCarRented(user) {
            return (user.rent) ? user.rent : Promise.reject({code: 403, reason: 'No car rented'})
        }

        function ensureCarExist(carId) {
            return Car.findById(carId)
                .then(ensureOne)
                .then(set);

            function ensureOne(car) {
                return (car) ? car : Promise.reject({code: 404, reason: 'Rented car not found'});
            }

            function set(instance) {
                car = instance;
            }
        }

        function update() {
            return updateCar()
                .then(updateUser);

            function updateCar() {
                car.renters.remove(req.userId);
                return car.save();
            }

            function updateUser() {
                user.rent = undefined;
                return user.save();
            }
        }
    }

    return {
        create,
        list,
        show,
        update,
        remove,
        rent,
        back
    };
};
