module.exports = (api) => {
    const Model = api.models.Model;
    const models = api.settings.fixtures.models;

    (function loadModels() {
        let batch = [];

        models.forEach((element) => {
            let promise = Model.findOne({
                name: element.name
            })
                .then(ensureOne)
                .catch(create);

            batch.push(promise);

            function ensureOne(found) {
                return (found) ? found : Promise.reject(element);
            }

            function create() {
                console.log('Creating Car Model :', element);
                new Model(element)
                    .save()
                    .then(() => console.log('created.'));
            }
        });
        return Promise.all(batch);
    })();

};
