const Setting = require("../models/Setting");

const getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = new Setting({});
    }

    const { cafeName, location, phone, email, openingHours, established, tagline, website } = req.body;

    if (cafeName !== undefined) settings.cafeName = cafeName;
    if (location !== undefined) settings.location = location;
    if (phone !== undefined) settings.phone = phone;
    if (email !== undefined) settings.email = email;
    if (openingHours !== undefined) settings.openingHours = openingHours;
    if (established !== undefined) settings.established = established;
    if (tagline !== undefined) settings.tagline = tagline;
    if (website !== undefined) settings.website = website;

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSettings, updateSettings };
