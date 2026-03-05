const mongoose = require('mongoose');

// Product Schema for E-commerce
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    image: {
        type: String,
        required: [true, 'Image URL is required']
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity cannot be negative'],
        default: 0
    },
    category: {
        type: String,
        default: 'General'
    },
    inStock: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt
});

// Method to check if product is available
productSchema.methods.isAvailable = function(requestedQty) {
    return this.inStock && this.quantity >= requestedQty;
};

// Create Model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
