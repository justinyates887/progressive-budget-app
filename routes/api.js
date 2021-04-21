const router = require("express").Router();
const track = require("../models/track.js");

router.post("/api/track", ({body}, res) => {
  track.create(body)
    .then(dbtrack => {
      res.json(dbtrack);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.post("/api/track/bulk", ({body}, res) => {
  track.insertMany(body)
    .then(dbtrack => {
      res.json(dbtrack);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.get("/api/track", (req, res) => {
  track.find({}).sort({date: -1})
    .then(dbtrack => {
      res.json(dbtrack);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

module.exports = router;