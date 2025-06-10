const Service = require('../models/Service');

const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) throw new Error('Service not found');
    res.json(service);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const addService = async (req, res) => {
  const { name, description, img ,  price  } = req.body;
  try {
    if (!name || !description || !price || !img) {
      throw new Error('All fields are required');
    }

    const newService = new Service({ name, description, img , price });
    await newService.save();

    res.status(201).json({ message: 'Service added successfully', service: newService });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getServices, getServiceById, addService };
