const { Plant } = require("../models/plant");

// Create a new plant
exports.createPlant = async (req, res) => {
  const { name, disease, cure } = req.body;

  try {
    const plant = new Plant({ name, disease, cure, user: req.user._id });
    await plant.save();
    res.status(201).json({ message: 'Plant created successfully', plant });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all plants for current user
exports.getMyPlants = async (req, res) => {
  try {
    const plants = await Plant.find({ user: req.user._id });
    res.json(plants);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a plant
exports.updatePlant = async (req, res) => {
  const { id } = req.params;
  const { name, disease, cure } = req.body;

  try {
    const plant = await Plant.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { name, disease, cure },
      { new: true }
    );

    if (!plant) return res.status(404).json({ message: 'Plant not found' });

    res.json({ message: 'Plant updated successfully', plant });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a plant
exports.deletePlant = async (req, res) => {
  const { id } = req.params;

  try {
    const plant = await Plant.findOneAndDelete({ _id: id, user: req.user._id });
    if (!plant) return res.status(404).json({ message: 'Plant not found' });

    res.json({ message: 'Plant deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
