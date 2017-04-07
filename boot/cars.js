module.exports = (api) => {
    const Car = api.models.Car;
    const Agency = api.models.Agency;
    const Model = api.models.Model;
    const cars = api.settings.fixtures.cars;

    (function loadCars() {
        /*let batch = [];
        cars.forEach((car) => {
            let promise = Model.findOne({
                name: car.model
            })
                .then(ensureOne)
                .then(findAgency)
                .then(ensureOne)
                .catch(notFound)
                .then(ensureAgencyNotFull)
                .catch(agencyFull)
                .then(create);

            batch.push(promise);

            function ensureOne(found) {
                return (found) ? found : Promise.reject(found);
            }

            function findAgency() {
                return Agency.findOne({
                    name: car.rentingPoint
                })
            }

            function notFound(element) {
                console.log(element + ' not found');
            }

            function create() {

            }
        });

        return Promise.all(batch);*/
    })();
};