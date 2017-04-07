module.exports = (api) => {
    const mongoose = api.mongoose;
    const Schema = mongoose.Schema;

    let ModelSchema = Schema({
        name: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        places: {
            type: Number,
            required: true
        }
    });

    return mongoose.model('Model', ModelSchema);
};