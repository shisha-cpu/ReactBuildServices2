const express = require('express');
const { getServices, getServiceById , addService } = require('../controllers/serviceController');
const router = express.Router();

router.get('/', getServices);
router.get('/:id', getServiceById);
router.post('/service', addService);

module.exports = router;