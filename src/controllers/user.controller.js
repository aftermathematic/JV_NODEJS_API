"use strict";
const User = require("../models/user.model");
var validation = require("../../config/validation.js");

exports.findAll = function (req, res) {
  User.findAll(function (err, user) {
    //console.log("controller");
    if (err) res.send(err);
    console.log("res", user);
    res.send(user);
  });
};

exports.findAllSorted = function (req, res) {
  User.findAllSorted(req.params.orderby, function (err, user) {
    if (err) res.send(err);
    console.log("res", user);
    res.send(user);
  });
};

exports.findAllLimit = function (req, res) {
  User.findAllLimit(req.params.limit, function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.findAllLimitOffset = function (req, res) {
  User.findAllLimit(
    [req.params.limit, req.params.offset],
    function (err, user) {
      if (err) res.send(err);
      res.json(user);
    }
  );
};

exports.findAllSearch = function (req, res) {
  User.findAllSearch(
    [req.params.field, req.params.search],
    function (err, user) {
      if (err) res.send(err);
      res.json(user);
    }
  );
};

exports.create = function (req, res) {
  const new_user = new User(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required fields" });
  } else {
    // Validation
    var isValid = true;
    var ErrorMsg = [];

    var isValidBirthday = validation.isValidBirthday(req.body.birthday);
    if (!isValidBirthday) {
      ErrorMsg.push("Birthday is not valid");
      isValid = false;
    }

    if (isValid == true) {
      User.create(new_user, function (err, user) {
        if (err) {
          res.json({
            error: true,
            message: "Adding user failed!",
          });
        } else {
          res.json({
            error: false,
            message: "User added successfully!",
            data: user,
          });
        }
      });
    } else {
      res.status(400).send({ error: true, message: ErrorMsg.join(", ") });
    }
  }
};

exports.findById = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    // Validation
    var isValid = true; 
    var ErrorMsg = [];

    var isValidBirthday = validation.isValidBirthday(req.body.birthday);
    if (!isValidBirthday) {
      ErrorMsg.push("Birthday is not valid");
      isValid = false;
    }

    if (isValid == true) {
      User.update(req.params.id, new User(req.body), function (err, user) {
        if (err) res.send(err);
        res.json({ error: false, message: "User successfully updated" });
      });
    } else {
      res.status(400).send({ error: true, message: ErrorMsg.join(", ") });
    }
  }
};

exports.delete = function (req, res) {
  User.delete(req.params.id, function (err, user) {
    if (err) res.send(err);
    res.json({ error: false, message: "User successfully deleted" });
  });
};
