module.exports = (api) => {
    const mongoose = api.mongoose;
    const Schema = mongoose.Schema;

    let AgencySchema = Schema({
        name: {
            type: String,
            required: true
        },
        coordinates: {
            type: Object,
            required: true
        },
        placesMAX: {
            type: Number,
            required: true,
        },
        placesDISPO: {
            type: Number,
            required: true,
        }
    });

    return mongoose.model('Agency', AgencySchema);
};