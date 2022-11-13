const express = require("express");
const router = express.Router();
const shortUrlModel = require("../models/ShortUrlModel");

// Create URL
router.post("/", async (req, res) => {
  try {
    let url = new shortUrlModel(req.body);
    await url.save();
    res.status(201).send(url);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get All URLS from DB
router.get("/", async (req, res) => {
  try {
    let urls = await shortUrlModel.find();
    res.status(200).send(urls);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get Current Short URL and add +1 to clicks
router.get("/:shortUrl", async (req, res) => {
  try {
    // Checks if shortURL Exists in DB
    const url = await shortUrlModel.findOne({
      short: req.params.shortUrl,
    });

    // If URL dosent exists, sending 404 error
    if (!url) {
      return res.status(404).send("Something went wrong...");
    }

    // If URL exists, adds +1 to clicks counter
    url.clicks++;

    // Saving the changes in DB
    url.save();

    // Returning the Full URL
    return res.send(url.full);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
