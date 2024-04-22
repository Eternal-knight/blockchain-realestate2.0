import mongoose, {Schema} from 'mongoose'

const PropertySchema = new Schema({
    city: {
        type: String,
        required : true,
        trim: true,       
    },
    state: {
        type: String,
        required : true,
        trim: true,       
    },
    address: {
        type: String,
        required : true,
    },
    description: {
        type: String,
        required : true,
    },
    price: {
        type: Number,
        required : true,
    },
    contractAddress: {
        type: String,
    },
    ownerAddress: {
        type: String,
    },
    PropertyImage: {
        type: String, 
    }
},{timestamps: true})

export const Property = mongoose.model("Property", PropertySchema);