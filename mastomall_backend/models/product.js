const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Furniture', 'Books', 'Electronics', 'Clothing']
    },
    condition: {
        type: String,
        enum: ['New', 'Used', 'Moderate']
    }
});

module.exports = mongoose.model('Product', productSchema);