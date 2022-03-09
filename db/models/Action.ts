import mongoose from 'mongoose'

export enum Tendency {
    LIKE,
    PASS
}

export interface Action {
    _id?: String,
    subject: String,
    target: String,
    tendency: Number
}

const ActionSchema = new mongoose.Schema<Action>({
    subject: { type: String, required: true },
    target: { type: String, required: true },
    tendency: { type: Number, enum: [Tendency.LIKE, Tendency.PASS], default: Tendency.LIKE }
})

ActionSchema.index({subject: 1, target: 1}, {unique: true})

const ActionModel = mongoose.models.Action || mongoose.model<Action>('Action', ActionSchema)

export default ActionModel