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
        const Renting = api.models.Renting;
        const Car = api.models.Car;

        Agency.findById(req.params.id)
            .then(ensureOne)
            .then(ensureNoRentings)
            .then(deleteAgency)
            .then(deleteAgencyCars)
            .then(res.prepare(204))
            .catch(res.prepare(500));

        //vérifie s'il y a 1 match sur agency --> si non, catch
        function ensureOne(agency) {
            return (agency) ? agency : Promise.reject({code: 404, reason: 'agency.not.found'});
        }

        //vérifie s'il y a un match sur une location.backpoint, ou location.rentingPoint, et agencyId; --> si oui, catch
        function ensureNoRentings(agency){
            return Renting.findOne({
                $where : function(){
                    return (this.rentingPoint == agency._id || this.backPoint == agency._id)
                }
            })
                .then(ensureNone);

            function ensureNone(renting) {
                return (renting) ? Promise.reject({code: 403, reason: 'Some rentings are tied to this agency.'}) : renting;
            }
        }

        function deleteAgency(){
            Agency.findByIdAndRemove(req.params.id);
        }

        function deleteAgencyCars(){
            Car.remove({rentingPoint : req.params.id});
        }

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
