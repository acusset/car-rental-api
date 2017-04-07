module.exports = (api) => {
    const mongoose = api.mongoose;
    const Schema = mongoose.Schema;

    let RentingsSchema = Schema({
        rentingPoint: {
            type: Schema.Types.ObjectId,
            ref: 'Agency',
        },
        backPoint: {
            type: Schema.Types.ObjectId,
            ref: 'Agency',
        },
        rentingDate: {
            type: String,
            required: true
        },
        backDate: {
            type: Object,
            required: true
        },
        carId: {
            type: Schema.Types.ObjectId,
            ref: 'Car',
        },
        usersId: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }]
    });

    return mongoose.model('Renting', RentingsSchema);
};