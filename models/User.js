module.exports = (api) => {
    const mongoose = api.mongoose;
    const Schema = api.mongoose.Schema;

    let UserSchema = Schema({
        name: {
            type: String,
            default: 'unknown'
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        role: {
            type: Schema.Types.ObjectId,
            ref: 'Role',
            select: false
        }
    });

    return mongoose.model('User', UserSchema);
};