const mongoose = require('mongoose');
const Product = require('./models/Product');

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/FashionData")
.then(() => console.log('✅ MongoDB connected for seeding'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Sample products data
const sampleProducts = [
    {
        name: "Wireless Bluetooth Headphones",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
        description: "Premium wireless headphones with active noise cancellation and 30-hour battery life",
        quantity: 50,
        category: "Electronics",
        inStock: true
    },
    {
        name: "Smart Watch Series 5",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
        description: "Advanced fitness tracking, heart rate monitoring, and smartphone notifications",
        quantity: 30,
        category: "Electronics",
        inStock: true
    },
    {
        name: "Laptop Stand Aluminum",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
        description: "Ergonomic laptop stand with adjustable height and cable management",
        quantity: 100,
        category: "Accessories",
        inStock: true
    },
    {
        name: "Mechanical Gaming Keyboard",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&h=500&fit=crop",
        description: "RGB backlit mechanical keyboard with customizable keys and macro support",
        quantity: 45,
        category: "Gaming",
        inStock: true
    },
    {
        name: "4K Webcam Pro",
        price: 159.99,
        image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=500&h=500&fit=crop",
        description: "Ultra HD webcam with auto-focus and built-in microphone for streaming",
        quantity: 25,
        category: "Electronics",
        inStock: true
    },
    {
        name: "Wireless Mouse Ergonomic",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop",
        description: "Comfortable wireless mouse with 6 programmable buttons and long battery life",
        quantity: 75,
        category: "Accessories",
        inStock: true
    },
    {
        name: "USB-C Hub 7-in-1",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop",
        description: "Multi-port hub with HDMI, USB 3.0, SD card reader, and power delivery",
        quantity: 60,
        category: "Accessories",
        inStock: true
    },
    {
        name: "Portable SSD 1TB",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop",
        description: "Ultra-fast external SSD with USB-C connectivity and shock resistance",
        quantity: 40,
        category: "Storage",
        inStock: true
    },
    {
        name: "LED Desk Lamp Smart",
        price: 44.99,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
        description: "Adjustable LED lamp with USB charging port and touch controls",
        quantity: 55,
        category: "Office",
        inStock: true
    },
    {
        name: "Noise Cancelling Earbuds",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop",
        description: "True wireless earbuds with active noise cancellation and wireless charging",
        quantity: 35,
        category: "Electronics",
        inStock: true
    },
    {
        name: "Phone Stand Adjustable",
        price: 19.99,
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop",
        description: "Multi-angle phone stand compatible with all smartphones and tablets",
        quantity: 120,
        category: "Accessories",
        inStock: true
    },
    {
        name: "Gaming Mouse RGB",
        price: 69.99,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop",
        description: "High-precision gaming mouse with 16000 DPI and customizable RGB lighting",
        quantity: 50,
        category: "Gaming",
        inStock: true
    }
];

// Function to seed the database
async function seedDatabase() {
    try {
        // Clear existing products
        await Product.deleteMany({});
        console.log('🗑️  Cleared existing products');

        // Insert sample products
        const result = await Product.insertMany(sampleProducts);
        console.log(`✅ Successfully inserted ${result.length} products`);

        // Display inserted products
        console.log('\n📦 Inserted Products:');
        result.forEach((product, index) => {
            console.log(`${index + 1}. ${product.name} - $${product.price}`);
        });

        console.log('\n✨ Database seeding completed successfully!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seed function
seedDatabase();
