const router = require('express').Router();

module.exports = (api) => {

    /**
     * List all rentings
     * Require Auth + Admin
     */
    router.get('/',
        api.middlewares.isAuthenticated,
        api.middlewares.acl.ensure(1),
        api.actions.rentings.list
    );

    router.post('/:id/join', 
        api.middlewares.isAuthenticated,
        api.actions.rentings.join
    );

    return router;
};