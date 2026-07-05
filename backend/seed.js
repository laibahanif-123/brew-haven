const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const products = [
  { name: "Espresso", category: "Hot Coffee", price: 350, rating: 4.8, img: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=500&q=80", desc: "Double shot, Colombian Huila — bright acidity.", description: "A concentrated shot of pure coffee, pulled from Colombian Huila beans.", ingredients: ["Espresso"] },
  { name: "Americano", category: "Hot Coffee", price: 380, rating: 4.5, img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=500&q=80", desc: "Espresso topped with hot water.", description: "Smooth and light, espresso diluted with hot water.", ingredients: ["Espresso", "Hot water"] },
  { name: "Cappuccino", category: "Hot Coffee", price: 480, rating: 4.7, img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=500&q=80", desc: "Steamed milk, deep foam.", description: "Equal parts espresso, steamed milk, and foam.", ingredients: ["Espresso", "Steamed milk", "Foam"] },
  { name: "Caramel Latte", category: "Hot Coffee", price: 550, rating: 4.9, img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=500&q=80", desc: "House caramel, sea salt finish.", description: "Espresso, steamed milk, house caramel, sea salt.", ingredients: ["Espresso", "Steamed milk", "Caramel", "Sea salt"] },
  { name: "Dark Mocha", category: "Hot Coffee", price: 600, rating: 4.6, img: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=500&q=80", desc: "70% cacao, whipped cream.", description: "Rich chocolate mocha with whipped cream and cocoa nibs.", ingredients: ["Espresso", "Dark chocolate", "Whipped cream"] },
  { name: "Flat White", category: "Hot Coffee", price: 500, rating: 4.6, img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=500&q=80", desc: "Velvety micro-foam.", description: "Double ristretto with velvety micro-foam milk.", ingredients: ["Espresso", "Micro-foam milk"] },
  { name: "Iced Latte", category: "Cold Coffee", price: 520, rating: 4.5, img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=500&q=80", desc: "Chilled milk over espresso.", description: "Double shot over ice with chilled milk.", ingredients: ["Espresso", "Cold milk", "Ice"] },
  { name: "Cold Brew", category: "Cold Coffee", price: 490, rating: 4.7, img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80", desc: "Steeped 18 hours.", description: "Slow-steeped for 18 hours, smooth and low-acid.", ingredients: ["Coarse ground coffee", "Cold water"] },
  { name: "Iced Mocha", category: "Cold Coffee", price: 580, rating: 4.6, img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=500&q=80", desc: "Chocolate espresso over ice.", description: "Chocolate, espresso, and cold milk over ice.", ingredients: ["Espresso", "Chocolate", "Cold milk", "Ice"] },
  { name: "Affogato", category: "Cold Coffee", price: 550, rating: 4.8, img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80", desc: "Vanilla gelato with espresso.", description: "Vanilla gelato drowned in a hot shot of espresso.", ingredients: ["Vanilla gelato", "Espresso"] },
  { name: "Green Tea", category: "Tea", price: 300, rating: 4.3, img: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=500&q=80", desc: "Light and grassy.", description: "Light, grassy green tea, antioxidant rich.", ingredients: ["Green tea leaves"] },
  { name: "Masala Chai", category: "Tea", price: 280, rating: 4.7, img: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=500&q=80", desc: "Spiced black tea.", description: "Spiced black tea simmered in milk.", ingredients: ["Black tea", "Milk", "Spices"] },
  { name: "Butter Croissant", category: "Pastries", price: 420, rating: 4.8, img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80", desc: "Baked fresh every morning.", description: "Laminated buttery dough, baked fresh every morning.", ingredients: ["Flour", "Butter", "Yeast"] },
  { name: "Chocolate Cake", category: "Cakes", price: 650, rating: 4.9, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=80", desc: "Rich dark chocolate sponge.", description: "Rich dark chocolate sponge with ganache layer.", ingredients: ["Chocolate", "Flour", "Eggs"] },
  { name: "Cheesecake", category: "Cakes", price: 700, rating: 4.8, img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=500&q=80", desc: "New York style.", description: "Classic New York style cheesecake, baked to order.", ingredients: ["Cream cheese", "Biscuit base"] },
  { name: "Blueberry Muffin", category: "Snacks", price: 380, rating: 4.5, img: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=500&q=80", desc: "Fresh blueberries.", description: "Fresh blueberries in a soft, fluffy crumb.", ingredients: ["Blueberries", "Flour", "Sugar"] },
  { name: "Glazed Donut", category: "Snacks", price: 250, rating: 4.4, img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=500&q=80", desc: "Classic glaze.", description: "Classic glazed donut, light and fluffy.", ingredients: ["Flour", "Sugar", "Glaze"] },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB for seeding");

    await Product.deleteMany();
    console.log("🗑️  Old products removed");

    await Product.insertMany(products);
    console.log("🌱 17 products seeded successfully!");

    process.exit();
  } catch (error) {
    console.error("❌ Seeding error:", error.message);
    process.exit(1);
  }
};

seedProducts();