const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Định nghĩa Schema cho User
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    }
}, {
    timestamps: true // Tự động thêm createdAt và updatedAt
});

// Middleware để hash password trước khi lưu vào database
userSchema.pre('save', async function() {
    // Chỉ hash password nếu password bị thay đổi hoặc mới tạo
    if (!this.isModified('password')) {
        return;
    }
    
    // Tạo salt với độ phức tạp 10
    const salt = await bcrypt.genSalt(10);
    // Hash password với salt
    this.password = await bcrypt.hash(this.password, salt);
});

// Method để so sánh password khi login
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
};

// Tạo Model từ Schema
const User = mongoose.model('User', userSchema);

module.exports = User;
