const { query } = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");

const db = require("../config/dbConfig");

var router = express.Router();

router.get("/", (req, res) => {
  try {
    res.json({
      success: true,
      message: "Simple User Call",
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
});

//Check Auth
router.post("/auth/", (req, res) => {
  try {
    let tokenHeader = process.env.TOKEN_HEADER_KEY;
    let tokenSecrete = process.env.JWT_SECRET_KEY;

    // validate the token
    const token = req.header(tokenHeader);
    const verified = jwt.verify(token, tokenSecrete);

    if (verified) {
      const userid = verified.user_id;
      var checkExisting = `SELECT * FROM users WHERE 	user_id='${userid}' AND isDeleted='0'`;
      db.query(checkExisting, (error, results) => {
        if (error) {
          res.json({
            success: false,
            error,
          });
        } else {
          if (results.length != 0) {
            res.json({
              success: true,
              user: results,
              message: "InSession",
            });
          } else {
            res.status(404).json({
              success: false,
              message: "User Not Found!, try again!",
            });
          }
        }
      });
    } else {
      res.json({
        success: false,
        message: "OutSession",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
});

// Create new User
router.post("/create/", (req, res) => {
  try {
    const userid = Math.floor(1000000 * Math.random() + 9999999);
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const userMobile = req.body.userMobile;
    const userPassword = req.body.userPassword;

    // check existing user
    var checkExisting = `SELECT * FROM users WHERE user_email='${userEmail}' AND isDeleted='0'`;
    db.query(checkExisting, (error, results) => {
      if (error) {
        res.json({
          success: false,
          error,
        });
      } else {
        if (results.length == 0) {
          //insert user
          var insertData = `INSERT INTO users(user_id, user_name, user_email, user_mobile, user_password, status, isDeleted)
                VALUES('${userid}','${userName}','${userEmail}','${userMobile}','${userPassword}','0','0')`;
          db.query(insertData, (error, results) => {
            if (error) {
              res.json({
                success: false,
                error,
              });
            } else {
              res.json({
                success: true,
                message: "User Registered Success.",
              });
            }
          });
        } else {
          res.json({
            success: false,
            message: "User Already registered, try to login",
          });
        }
      }
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
});

// Update User [Auth]
router.put("/update/", (req, res) => {
  try {
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const userMobile = req.body.userMobile;
    const userStatus = req.body.userStatus;

    let tokenHeader = process.env.TOKEN_HEADER_KEY;
    let tokenSecrete = process.env.JWT_SECRET_KEY;

    // validate the token
    const token = req.header(tokenHeader);
    const verified = jwt.verify(token, tokenSecrete);

    if (verified) {
      // check existing user
      const userid = verified.user_id;
      var checkExisting = `SELECT * FROM users WHERE 	user_id='${userid}' AND isDeleted='0'`;
      db.query(checkExisting, (error, results) => {
        if (error) {
          res.json({
            success: false,
            error,
          });
        } else {
          if (results.length != 0) {
            //update user
            var updateData = `UPDATE users SET user_name='${userName}', user_email='${userEmail}', user_mobile='${userMobile}', status='${userStatus}' WHERE user_id='${userid}'`;
            db.query(updateData, (error, results) => {
              if (error) {
                res.status(400).json({
                  success: false,
                  error,
                });
              } else {
                res.status(200).json({
                  success: true,
                  message: "User Updated Success.",
                });
              }
            });
          } else {
            res.status(404).json({
              success: false,
              message: "User Not Found!, try again!",
            });
          }
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: "User Not Have Access",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
});

// delete User
router.delete("/delete/:userid", (req, res) => {
  try {
    const userid = req.params.userid;
    // check existing user
    var checkExisting = `SELECT * FROM users WHERE user_id='${userid}' AND isDeleted='0'`;
    db.query(checkExisting, (error, results) => {
      if (error) {
        res.json({
          success: false,
          error,
        });
      } else {
        if (results.length != 0) {
          //update user
          var updateData = `UPDATE users SET isDeleted='1' WHERE user_id='${userid}'`;
          db.query(updateData, (error, results) => {
            if (error) {
              res.json({
                success: false,
                error,
              });
            } else {
              res.json({
                success: true,
                message: "User Deleted Success.",
              });
            }
          });
        } else {
          res.json({
            success: false,
            message: "User Not Found!, try again!",
          });
        }
      }
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
});

// get user by id
router.get("/details/:userid", (req, res) => {
  try {
    const userid = req.params.userid;
    // check existing user
    var checkExisting = `SELECT * FROM users WHERE user_id='${userid}' AND isDeleted='0'`;
    db.query(checkExisting, (error, results) => {
      if (error) {
        res.json({
          success: false,
          error,
        });
      } else {
        if (results.length != 0) {
          res.json({
            success: true,
            results,
          });
        } else {
          res.json({
            success: false,
            message: "User Not Found!, try again!",
          });
        }
      }
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
});

// user login
router.post("/login/", (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    var checkUserInDb = `SELECT * FROM users WHERE user_email='${username}'`;
    db.query(checkUserInDb, (error, results) => {
      if (error) {
        res.json({
          success: false,
          error,
        });
      } else {
        if (results.length != 0) {
          const dbPassword = results[0].user_password;
          const userId = results[0].user_id;
          if (dbPassword == password) {
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            let sessionData = {
              time: Date(),
              username: username,
              user_id: userId,
            };
            const token = jwt.sign(sessionData, jwtSecretKey, {
              expiresIn: process.env.JWT_TOKEN_EXPIRES,
            });
            res.json({
              success: true,
              message: "Login Success",
              token: token,
            });
          } else {
            res.json({
              success: false,
              message: "Wrong password!, try again!",
            });
          }
        } else {
          res.json({
            success: false,
            message: "User Not Registred!, try again!",
          });
        }
      }
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
});

router.get("/events/", async (req, res) => {
  try {
    let tokenHeader = process.env.TOKEN_HEADER_KEY;
    let tokenSecrete = process.env.JWT_SECRET_KEY;

    // validate the token
    const token = req.header(tokenHeader);
    const verified = jwt.verify(token, tokenSecrete);

    if (verified) {
      var userId = verified.user_id;

      const fetchEventDetails = async (eventId) => {
        return new Promise((resolve, reject) => {
          var getEventByEventId = `SELECT * FROM events_list WHERE event_id='${eventId}'`;
          db.query(getEventByEventId, (error, eventDetails) => {
            if (error) {
              reject(error);
            } else {
              resolve(eventDetails);
            }
          });
        });
      };

      const fetchUserDetails = async (uid) => {
        return new Promise((resolve, reject) => {
          var getUserDetailsById = `SELECT * FROM users WHERE user_id='${uid}'`;
          db.query(getUserDetailsById, (error, userDetails) => {
            if (error) {
              reject(error);
            } else {
              resolve(userDetails);
            }
          });
        });
      };

      var checkExisting = `SELECT * FROM event_bookings WHERE user_id='${userId}'`;

      db.query(checkExisting, async (error, bookingResults) => {
        if (error) {
          res.json({
            success: false,
            error,
          });
        } else {
          if (bookingResults.length === 0) {
            res.json({
              success: false,
              message: "Booking Id not Found!",
            });
          } else {
            for (var i = 0; i < bookingResults.length; i++) {
              var evId = bookingResults[i].event_id;
              var uid = bookingResults[i].user_id;
              bookingResults[i].eventDetails = await fetchEventDetails(evId);
              bookingResults[i].userDetails = await fetchUserDetails(uid);
            }
            res.json({
              success: true,
              bookingResults,
            });
          }
        }
      });
    } else {
      res.json({
        success: false,
        error,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
});

// Search User
router.get("/search/", (req, res) => {
  try {
    const searchQuery = req.query.text;

    var searchQueryDb = `SELECT * FROM users WHERE user_name LIKE '%${searchQuery}%' OR user_email LIKE '%${searchQuery}%'`;
    db.query(searchQueryDb, (error, results) => {
      if (error) {
        res.json({
          success: false,
          error,
        });
      } else {
        if (results.length != 0) {
          res.status(200).json({
            success: true,
            searchResults: results,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Search related info not found!",
          });
        }
      }
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
});

module.exports = router;
