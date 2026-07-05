const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Product = require("./models/Product");

dotenv.config();
connectDB();

const products = [
  {
    name: "Espresso",
    category: "Hot Coffee",
    price: 350,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=500&q=80",
    desc: "Double shot, Colombian Huila — bright acidity.",
    description: "A bold double shot of Colombian Huila single-origin espresso, renowned for its bright acidity and rich, caramel-sweet finish. Perfectly pulled to bring out deep chocolate undertones with a velvety crema on top.",
    ingredients: ["Colombian Huila Espresso", "Filtered water"],
  },
  {
    name: "Americano",
    category: "Hot Coffee",
    price: 380,
    rating: 4.5,
    img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=500&q=80",
    desc: "Espresso topped with hot water, smooth body.",
    description: "Our Americano combines a double espresso with hot water, preserving the rich flavour while creating a lighter, smooth-bodied cup. Perfect for those who love espresso intensity in a longer drink.",
    ingredients: ["Double espresso", "Hot filtered water"],
  },
  {
    name: "Cappuccino",
    category: "Hot Coffee",
    price: 480,
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=500&q=80",
    desc: "Steamed milk, deep foam, cinnamon on request.",
    description: "A classic Italian cappuccino — equal parts espresso, steamed milk, and thick, velvety foam. We top it with a dusting of cinnamon on request. Rich, creamy, and perfectly balanced.",
    ingredients: ["Espresso", "Steamed milk", "Milk foam", "Cinnamon (optional)"],
  },
  {
    name: "Caramel Latte",
    category: "Hot Coffee",
    price: 550,
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=500&q=80",
    desc: "House caramel, oat or full-cream milk.",
    description: "Our signature caramel latte pairs a double espresso shot with steamed milk and house-made caramel, finished with a touch of sea salt. Smooth, balanced, and never too sweet.",
    ingredients: ["Espresso", "Steamed milk", "House caramel", "Sea salt"],
  },
  {
    name: "Dark Mocha",
    category: "Hot Coffee",
    price: 600,
    rating: 4.6,
    img: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=500&q=80",
    desc: "70% cacao, double espresso, whipped cream.",
    description: "An indulgent blend of 70% dark cacao and a double espresso shot, topped with freshly whipped cream. The bittersweet chocolate perfectly complements the bold espresso character.",
    ingredients: ["Double espresso", "70% dark chocolate", "Steamed milk", "Whipped cream"],
  },
  {
    name: "Flat White",
    category: "Hot Coffee",
    price: 500,
    rating: 4.6,
    img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=500&q=80",
    desc: "Velvety micro-foam over a double ristretto.",
    description: "A velvety smooth flat white made with a double ristretto and micro-foamed milk. The thin layer of silky foam allows the strong coffee flavour to shine through, creating a balanced and rich drink.",
    ingredients: ["Double ristretto", "Micro-foamed milk"],
  },
  {
    name: "Iced Latte",
    category: "Cold Coffee",
    price: 520,
    rating: 4.5,
    img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=500&q=80",
    desc: "Chilled milk poured over a double shot.",
    description: "Refreshingly cool — chilled milk poured over a double espresso shot with ice. A perfect pick-me-up for warm days, smooth and lightly sweetened on request.",
    ingredients: ["Double espresso", "Chilled milk", "Ice"],
  },
  {
    name: "Cold Brew",
    category: "Cold Coffee",
    price: 490,
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80",
    desc: "Steeped 18 hours, smooth and low-acid.",
    description: "Our cold brew is steeped for 18 hours using coarsely ground Ethiopian beans. The result is an ultra-smooth, naturally sweet, low-acid coffee concentrate served over ice.",
    ingredients: ["Coarse-ground Ethiopian beans", "Cold filtered water", "Ice"],
  },
  {
    name: "Iced Mocha",
    category: "Cold Coffee",
    price: 580,
    rating: 4.6,
    img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=500&q=80",
    desc: "Chocolate, espresso, cold milk over ice.",
    description: "A chilled combination of rich chocolate sauce, double espresso, and cold milk, served over ice. A sweet and energising treat that satisfies both chocolate and coffee cravings.",
    ingredients: ["Double espresso", "Chocolate sauce", "Cold milk", "Ice", "Whipped cream"],
  },
  {
    name: "Affogato",
    category: "Cold Coffee",
    price: 550,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80",
    desc: "Vanilla gelato drowned in hot espresso.",
    description: "A true Italian dessert-meets-coffee experience. A scoop of premium vanilla gelato drowned in a freshly pulled hot espresso shot. The contrast of hot and cold creates pure magic.",
    ingredients: ["Hot espresso", "Vanilla gelato"],
  },
  {
    name: "Green Tea",
    category: "Tea",
    price: 300,
    rating: 4.3,
    img: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=500&q=80",
    desc: "Light, grassy, antioxidant rich.",
    description: "Premium Japanese green tea, carefully brewed at the perfect temperature to extract its delicate, grassy flavour and antioxidant benefits. Light, refreshing, and naturally healthy.",
    ingredients: ["Japanese green tea leaves", "Filtered water"],
  },
  {
    name: "Masala Chai",
    category: "Tea",
    price: 280,
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=500&q=80",
    desc: "Spiced black tea, simmered in milk.",
    description: "A traditional masala chai simmered with aromatic spices — cardamom, cinnamon, ginger, and cloves — in whole milk. Bold, warming, and deeply comforting with every sip.",
    ingredients: ["Black tea", "Whole milk", "Cardamom", "Cinnamon", "Ginger", "Cloves"],
  },
  {
    name: "Butter Croissant",
    category: "Pastries",
    price: 420,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80",
    desc: "Laminated dough, baked fresh every morning.",
    description: "Hand-crafted from laminated butter dough and baked fresh every morning. Flaky on the outside, soft and airy on the inside — the perfect companion to any coffee.",
    ingredients: ["Butter", "Flour", "Yeast", "Milk", "Sugar", "Salt"],
  },
  {
    name: "Chocolate Cake",
    category: "Cakes",
    price: 650,
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=80",
    desc: "Rich dark chocolate sponge, ganache layer.",
    description: "A decadent three-layer dark chocolate sponge cake with silky ganache frosting. Made with premium Belgian chocolate, each slice is moist, rich, and utterly irresistible.",
    ingredients: ["Belgian dark chocolate", "Butter", "Eggs", "Flour", "Heavy cream", "Sugar"],
  },
  {
    name: "Cheesecake",
    category: "Cakes",
    price: 700,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=500&q=80",
    desc: "New York style, baked to order.",
    description: "Our signature New York-style cheesecake — dense, creamy, and baked to order with a buttery graham cracker crust. Served plain or with fresh berry compote on request.",
    ingredients: ["Cream cheese", "Eggs", "Sugar", "Vanilla", "Graham cracker crust", "Butter"],
  },
  {
    name: "Blueberry Muffin",
    category: "Snacks",
    price: 380,
    rating: 4.5,
    img: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=500&q=80",
    desc: "Fresh blueberries, soft crumb, baked daily.",
    description: "Bursting with fresh blueberries in every bite, our muffins are baked daily with a soft, moist crumb and a lightly crispy sugar top. A perfect morning snack with your coffee.",
    ingredients: ["Fresh blueberries", "Flour", "Butter", "Sugar", "Eggs", "Vanilla"],
  },
  {
    name: "Glazed Donut",
    category: "Snacks",
    price: 250,
    rating: 4.4,
    img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=500&q=80",
    desc: "Classic glaze, light and fluffy.",
    description: "A classic glazed donut — light, airy, and coated in a sweet, shiny glaze. Made fresh in-house with simple ingredients for the perfect nostalgic treat.",
    ingredients: ["Flour", "Yeast", "Sugar", "Butter", "Milk", "Vanilla glaze"],
  },
];

const importData = async () => {
  try {
    await Product.deleteMany(); // Clear existing products
    await Product.insertMany(products);
    console.log("✅ Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error importing data:", error.message);
    process.exit(1);
  }
};

importData();
