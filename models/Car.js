module.exports = (api) => {
    const mongoose = api.mongoose;
    const Schema = api.mongoose.Schema;

    let CarSchema = Schema({
        model: {
            type: Schema.Types.ObjectId,
            ref: 'Model'
        },
        maxPlaces: {
            type: Number,
            default: '5'
        },
        availablePlaces: {
            type: Number,
            default: '5'
        },
        rentingPoint: [{
            type: Schema.Types.ObjectId,
            ref: 'Agency'
        }]
    });

    return mongoose.model('Car', CarSchema);
};