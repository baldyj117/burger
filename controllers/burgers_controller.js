var express = require("express");
var burger = require("../models/burger.js")

var router = express.Router();


router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burger: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burger", function(req, res) {
  burger.create(["burger_name", "devoured"], [req.body.burger_name, req.body.devoure], function(result) {

    res.json({ id: result.insertId });
  });
});

router.put("/api/burger/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  console.log("condition", condition);
  console.log(req.body);
  burger.update(
    req.body,
    condition,
    function(result) {
      if (result.changedRows === 0) {

        return res.status(404).end();
      }
      res.status(200).end();

    }
  );
});


module.exports = router;