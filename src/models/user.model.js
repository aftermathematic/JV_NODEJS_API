"use strict";
var dbConn = require("./../../config/db.config");

//User object create
var User = function (user) {
  this.username = user.username;
  this.email = user.email;
  this.birthday = user.birthday;

  this.created_at = new Date();
  this.updated_at = new Date();
};

User.create = function (newUser, result) {
dbConn.query("INSERT INTO users set ?", newUser, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  console.log(res.insertId);
  result(null, res.insertId);
}
});
};

User.findById = function (id, result) {
  dbConn.query("Select * from users where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

User.findAll = function (result) {
  dbConn.query("Select * from users", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("users : ", res);
      result(null, res);
    }
  });
};

User.findAllSorted = function (orderby, result) {
  // Apparently SQL returns an error when a limit is inserted via a '?' parameter.   
  //single quotes are automatically added, which breaks the query.
  dbConn.query("SELECT * FROM users ORDER BY " + orderby, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

User.findAllSearch = function ([field, search], result) {
  // Apparently SQL returns an error when a limit is inserted via a '?' parameter.   
  //single quotes are automatically added, which breaks the query.
  dbConn.query("SELECT * FROM users where " + field + " LIKE '%" + search + "%'", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

User.findAllLimit = function (limit, result) {
  // Apparently SQL returns an error when a limit is inserted via a '?' parameter.   
  //single quotes are automatically added, which breaks the query.
  dbConn.query("Select * from users LIMIT " + limit, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

User.findAllLimitOffset = function (limit, offset, result) {
  // Apparently SQL returns an error when a limit is inserted via a '?' parameter.   
  //single quotes are automatically added, which breaks the query.
  dbConn.query("Select * from users LIMIT " + limit + ", " + offset, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

User.update = function (id, user, result) {
  dbConn.query(
    "UPDATE users SET username=?,email=?, birthday=?, updated_at=? WHERE id = ?",
    [
      user.username,
      user.email,
      user.birthday,
      new Date(),
      id,
    ],
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

User.delete = function (id, result) {
  dbConn.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = User;
