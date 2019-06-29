const express = require('express');
const router = express.Router();

let imagesUrlArray = [];
//route to post image
router.post('/', (req, res) => {
    imagesUrlArray.push(req.body.url);
    res.sendStatus(200);
})

//route to get all images
router.get('/', (req, res) => {
    res.send(imagesUrlArray);
})



module.exports = router;