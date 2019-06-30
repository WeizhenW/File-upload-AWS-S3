const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// let imagesUrlArray = [];
//route to post image
router.post('/', (req, res) => {
    // imagesUrlArray.push(req.body.url);
    pool.query(`INSERT INTO "images" ("url")
    VALUES ($1);`, [req.body.url]).then(
        () => {
            res.sendStatus(200);
        }
    ).catch(error => console.log('error with post request', error));
})

//route to get all images
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "images";`).then(
        result => {
            // console.log('result', result.rows);
            res.send(result.rows);
        }
    ).catch(error => {
        console.log('error with get request', error);
    })
})



module.exports = router;