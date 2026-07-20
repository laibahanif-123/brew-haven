const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    cafeName: { type: String, default: "Brew Haven" },
    location: { type: String, default: "Mian Channu, Punjab, Pakistan" },
    phone: { type: String, default: "+92 300 0000000" },
    email: { type: String, default: "hello@brewhaven.pk" },
    openingHours: { type: String, default: "7:00 AM – 9:00 PM (Daily)" },
    established: { type: String, default: "2026" },
    tagline:  { type: String, default: "" },
    website:  { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Setting", settingSchema);
