const express = require("express");

const Users = require("./userDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
    .then(newUser => {
      res.status(200).json(newUser);
    })
    .catch(err => {
      res.status(500).json({ message: "something went wrong", error: err });
    });
});

router.get("/", (req, res) => {
  // do your magic!
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "couldn't get users", error: err });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  console.log(req.user);
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  console.log(req.user);
  Users.getUserPosts(req.user.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: "something went wrong", error: err });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
    .then(confirm => {
      res.status(200).json(confirm);
    })
    .catch(err => {
      res.status(500).json({ message: "something went wrong", error: err });
    });
});

router.put("/:id", validateUserId, (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: "something went wrong", error: err });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  Users.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(200).json({ message: "invalid user id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "something went wrong", error: err });
    });
}

function validateUser(req, res, next) {
  // do your magic!
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
