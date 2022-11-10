const express = require("express");
const router = express.Router();
const shortUrlModel = require("../models/ShortUrlModel");

// Create URL
router.post("/", async (req, res) => {
  try {
    await shortUrlModel.create(req.body, (error, data) => {
      res.status(201).send(data);
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get All Urls
router.get("/", async (req, res) => {
  try {
    let urls = await shortUrlModel.find();
    res.status(200).send(urls);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get URL with Parameters
router.get("/:shortUrl", async (req, res) => {
  try {
    // Checks if shortURL Exists in DB
    const url = await shortUrlModel.findOne({
      short: req.params.shortUrl,
    });

    // If URL dosent exists, sending 404 error
    if (!url) {
      return res.status(404).send();
    }

    // If URL exists, adds +1 to clicks counter
    url.clicks++;

    // Saving the changes in DB
    url.save();

    // Returning the updated URL
    return res.send(url.full);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
