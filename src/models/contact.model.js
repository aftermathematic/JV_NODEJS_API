"use strict";
var dbConn = require("./../../config/db.config");
//Contact object create
var Contact = function (contact) {
  this.name = contact.name;
  this.email = contact.email;
  this.message = contact.message;

  this.created_at = new Date();
  this.updated_at = new Date();
};

Contact.create = function (newContact, result) {
  dbConn.query("INSERT INTO contacts set ?", newContact, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Contact.findById = function (id, result) {
  dbConn.query("Select * from contacts where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Contact.findAll = function (result) {
  dbConn.query("Select * from contacts", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("contacts : ", res);
      result(null, res);
    }
  });
};

Contact.update = function (id, contact, result) {
  dbConn.query(
    "UPDATE contacts SET name=?,email=?,message=?,updated_at=? WHERE id = ?",
    [contact.name, contact.email, contact.message, new Date(), id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

Contact.delete = function (id, result) {
  dbConn.query("DELETE FROM contacts WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Contact;
