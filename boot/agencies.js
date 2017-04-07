module.exports = (api) => {
    const Agency = api.models.Agency;
    const agencies = api.settings.fixtures.agencies;

    (function loadAgencies() {
        let batch = [];
        agencies.forEach((agency) => {
            let promise = Agency.findOne({
                name: agency.name
            })
                .then(ensureOne)
                .catch(create);

            batch.push(promise);

            function ensureOne(found) {
                return (found) ? found : Promise.reject(agency);
            }

            function create() {
                console.log('Creating Agency :', agency);
                new Agency(agency)
                    .save()
                    .then(() => console.log('created.'));
            }
        });
        return Promise.all(batch);
    })();

};