const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');


const Url = require('../models/Url');

// @route Post request /api/url/shorten
//@desc   create short URL

router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = config.get('baseUrl');
    //check baseUrl
    if (!validUrl.isUri(baseUrl)) {
        res.status(401).json('Invalid base Url');
    }

    //create url code 
    const urlCode = shortid.generate();

    //check long Url
    if (validUrl.isUri(longUrl)) {
        try {
            //checking if the longUrl is already there in the db
            let url = await Url.findOne({ longUrl });

            if (url) {
                res.json(url);
            }
            else {
                const shortUrl = baseUrl + '/' + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();
                //promise
                res.json(url);
            }

        } catch (err) {
            console.error(err);
            res.status(500).json("Server Error");
        }
    }
    else {
        res.status(401).json("Invalid Long Url");
    }

});

module.exports = router;