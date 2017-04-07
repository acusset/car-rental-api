module.exports = (api) => {
    const mongoose = api.mongoose;
    const Schema = mongoose.Schema;

    let AgencySchema = Schema({
        name: {
            type: String,
            required: true
        },
        lat: {
            type: Number,
            required: true
        },
        long: {
            type: Number,
            required: true
        },
        placesMAX: {
            type: Number,
            required: true,
        },
        placesDISPO: {
            type: Number,
            required: false,
        }
    });

    return mongoose.model('Agency', AgencySchema);
};