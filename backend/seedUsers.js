const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB for seeding users");

    // Check if test admin exists
    let admin = await User.findOne({ email: "laibahanif0909@gmail.com" });
    if (!admin) {
      admin = await User.create({
        name: "Admin User",
        email: "laibahanif0909@gmail.com",
        password: "password123",
        isAdmin: true,
      });
      console.log("👑 Admin user created");
    } else {
      console.log("👑 Admin user already exists");
    }

    // Check if test user exists
    let user = await User.findOne({ email: "user@test.com" });
    if (!user) {
      user = await User.create({
        name: "Test User",
        email: "user@test.com",
        password: "password123",
        isAdmin: false,
      });
      console.log("👤 Test user created");
    } else {
      console.log("👤 Test user already exists");
    }

    process.exit();
  } catch (error) {
    console.error("❌ Seeding users error:", error.message);
    process.exit(1);
  }
};

seedUsers();
