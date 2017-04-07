module.exports = (api) => {
    const mongoose = api.mongoose;
    const Schema = api.mongoose.Schema;

    let CarSchema = Schema({
        model: {
            type: String,
            default: 'unknown'
        },
        maxSit: {
            type: Number,
            default: '5'
        },
        placesDispo: {
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