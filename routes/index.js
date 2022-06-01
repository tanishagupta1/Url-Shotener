const express = require('express');
const router = express.Router();


const Url = require('../models/Url');

//@route  Get/:CODE
//@dec Redirect to longUrl

router.get('/getAll', async (req, res) => {
    try {
        const data = await Url.find();
     
        if (data) {
            return res.json(data);
        }
        else {
            return res.status(404).json("No data Found");
        }

    }
    catch (err) {
        res.status(500).json("Server Error");
    }
} )

router.get('/:code', async (req, res) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.code });
     
        if (url) {
            return res.json(url.longUrl);
        }
        else {
            return res.status(404).json("No Url Found");
        }

    }
    catch (err) {
        res.status(500).json("Server Error");
    }
});


module.exports = router;