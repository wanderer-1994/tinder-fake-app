import mongoose from 'mongoose'

export interface User {
    _id?: String,
    firstName: String,
    lastName: String,
    gender: String,
    picture: String,
    age: Number
}

const UserSchema = new mongoose.Schema<User>({
    firstName: { type: String, max: 50, min: 2 },
    lastName: { type: String, max: 50, min: 2 },
    gender: {
        type: String,
        enum: ['male', 'female', 'other', ''],
        default: ''
    },
    picture: String,
    age: { type: Number, required: true }
})

const UserModel = mongoose.models.User || mongoose.model<User>('User', UserSchema)

export default UserModel