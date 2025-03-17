import mongoose from 'mongoose';

const containerScheme = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }
    }
)

const componentScheme = mongoose.Schema(
    {
        containerId: {
            type: mongoose.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        count: {
            type: String
        }
    }
)

const container = mongoose.model('Container', containerScheme)
const component = mongoose.model('Component', componentScheme)

export {container, component}