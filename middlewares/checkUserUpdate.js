module.exports = (api) => {

    return (req, res, next) => {
        const userIdBody = req.params.id;
 
        if (req.userId != userIdBody) {
            return unauthorized();
        }

        function unauthorized() {
            return res.status(401).send('unauthorized');
        }
    };
};