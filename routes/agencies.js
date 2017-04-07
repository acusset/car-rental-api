const router = require('express').Router();

module.exports = (api) => {

    router.get('/', api.actions.agencies.list);

    router.get('/:id', api.actions.agencies.show);

    router.get('/:id/cars', api.actions.agencies.showCarsAvailable);

    router.post('/',
        api.middlewares.isAuthenticated,
        api.middlewares.acl.ensure("admin"),
        api.middlewares.bodyParser.json(),
        api.actions.agencies.create);

    router.put('/:id',
        api.middlewares.isAuthenticated,
        api.middlewares.acl.ensure("admin"),
        api.middlewares.bodyParser.json(),
        api.actions.agencies.update);

    router.delete('/:id',
        api.middlewares.isAuthenticated,
        api.middlewares.acl.ensure("admin"),
        api.actions.agencies.remove);

    return router;
};