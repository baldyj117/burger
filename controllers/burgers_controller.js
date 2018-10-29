var express = require("express");
var router = express.Router();

var burger = require("../models/burger.js")

router.get("/", function(req, res) {
    burger.selectAll(function(data) {
      var hbsObject = {
        burgers: data
      };
      console.log("all burgers: " + hbsObject);
      res.render("index", hbsObject);
    });
});
  
router.post("/api/burgers", function(req, res) {
    console.log("new burger: " + req.body.burger_name);
    burger.insertOne([req.body.burger_name], function(result) {

      res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function(req, res) {  
    console.log("updating id: " + req.params.id);
    burger.updateOne(
      req.params.id, function(result) {
        if (result.changedRows === 0) {

          console.log("404");
          return res.status(404).end();
        }
        res.status(200).end();
  
      }
    );
  });

module.exports = router;