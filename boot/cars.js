module.exports = (api) => {
    const Car = api.models.Car;
    const Agency = api.models.Agency;
    const Model = api.models.Model;
    const cars = api.settings.fixtures.cars;

    (function loadCars() {
        let batch = [];
        let agency, model;
        cars.forEach((car) => {
            findModel()
                .then(ensureOne)
                .then(findAgency)
                .then(ensureOne)
                .catch(notFound)
                .then(create);

            //batch.push(promise);

            function findModel() {
                return Model.findOne({
                    name: car.model
                }).then(set);

                function set(data) {
                    return model = data;
                }
            }

            function findAgency() {
                return Agency.findOne({
                    name: car.rentingPoint
                }).then(set);

                function set(data) {
                    return agency = data;
                }
            }

            function ensureOne(found) {
                return (found) ? found : Promise.reject(found);
            }

            function notFound(element) {
                console.log('not.found ' + element.name);
            }

            function ensureAgencyNotFull(agency) {
                if (agency.placesDISPO && agency.placesDISPO <= 0) {
                    Promise.reject(agency)
                }
            }

            function agencyFull(agency) {
                console.log(agency.name + '.full');
            }

            function create() {
                let newCar = new Car({
                    model: model._id,
                    rentingPoint: agency._id,
                    maxPlaces: model.places,
                    availablePlaces: model.places
                }).save();

                agency.placesDISPO = agency.placesMAX - 1;
                agency.save();

            }
        });
    })();
};