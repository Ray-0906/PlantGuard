const express = require('express');
const { createPlant, getMyPlants } = require('../controllers/plant');


const router = express.Router();
console.log(typeof(createPlant));
router.post('/', createPlant);
router.get('/', getMyPlants);

router.post("/detect", upload.single("image"), detectPlantDisease) ;
// router.put('/:id', updatePlant);
// router.delete('/:id', deletePlant);

module.exports = router;
