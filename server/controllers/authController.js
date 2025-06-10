const User = require('../models/User');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); 
    const user = new User({ name, email, password: hashedPassword });
    await user.save();


    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid email' });
    }

    console.log(user.password);
    
    const isMatch = await bcrypt.compare(password, user.password);


    
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password' });
    }


    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { register, login };
