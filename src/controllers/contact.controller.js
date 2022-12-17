"use strict";

const Contact = require("../models/contact.model");
var validation = require("../../config/validation.js");

exports.findAll = function (req, res) {
  Contact.findAll(function (err, contact) {
    //console.log("controller");
    if (err) res.send(err);
    console.log("res", contact);
    res.send(contact);
  });
};

exports.findAllSorted = function (req, res) {
  Contact.findAllSorted(req.params.orderby, function (err, contact) {
    if (err) res.send(err);
    console.log("res", contact);
    res.send(contact);
  });
};

exports.findAllLimit = function (req, res) {
  Contact.findAllLimit(req.params.limit, function (err, contact) {
    if (err) res.send(err);
    res.json(contact);
  });
};

exports.findAllLimitOffset = function (req, res) {
  Contact.findAllLimit(
    [req.params.limit, req.params.offset],
    function (err, contact) {
      if (err) res.send(err);
      res.json(contact);
    }
  );
};

exports.findAllSearch = function (req, res) {
  Contact.findAllSearch(
    [req.params.field, req.params.search],
    function (err, contact) {
      if (err) res.send(err);
      res.json(contact);
    }
  );
};

exports.create = function (req, res) {
  const new_contact = new Contact(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required fields" });
  } else {
    // Validation
    var isValid = true;
    var ErrorMsg = [];

    var isAlphaNumeric = validation.isAlphaNumeric(req.body.name);
    if (!isAlphaNumeric) {
      ErrorMsg.push("Name is not valid");
      isValid = false;
    }

    var isEmail = validation.isEmail(req.body.email);
    if (!isEmail) {
      ErrorMsg.push("Email address is not valid");
      isValid = false;
    }

    var msg = req.body.message;
    if (msg.length === 0) {
      ErrorMsg.push("Message is not valid,");
      isValid = false;
    }

    if (isValid == true) {
      Contact.create(new_contact, function (err, contact) {
        if (err) {
          res.json({
            error: true,
            message: "Adding contact failed!",
          });
        } else {
          res.json({
            error: false,
            message: "Contact added successfully!",
            data: contact,
          });
        }
      });
    } else {
      res.status(400).send({ error: true, message: ErrorMsg.join(", ") });
    }
  }
};

exports.findById = function (req, res) {
  Contact.findById(req.params.id, function (err, contact) {
    if (err) res.send(err);
    res.json(contact);
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required fields" });
  } else {
    // Validation
    var isValid = true;
    var ErrorMsg = [];

    var isAlphaNumeric = validation.isAlphaNumeric(req.body.name);
    if (!isAlphaNumeric) {
      ErrorMsg.push("Name is not valid");
      isValid = false;
    }

    var isEmail = validation.isEmail(req.body.email);
    if (!isEmail) {
      ErrorMsg.push("Email address is not valid");
      isValid = false;
    }

    var msg = req.body.message;
    if (msg.length === 0) {
      ErrorMsg.push("Message is not valid,");
      isValid = false;
    }

    if (isValid == true) {
      Contact.update(
        req.params.id,
        new Contact(req.body),
        function (err, contact) {
          if (err) res.send(err);
          res.json({ error: false, message: "Contact successfully updated" });
        }
      );
    } else {
      res.status(400).send({ error: true, message: ErrorMsg.join(", ") });
    }
  }
};

exports.delete = function (req, res) {
  Contact.delete(req.params.id, function (err, contact) {
    if (err) res.send(err);
    res.json({ error: false, message: "Contact successfully deleted" });
  });
};
