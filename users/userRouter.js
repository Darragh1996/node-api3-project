const express = require("express");

const Users = require("./userDb");

const router = express.Router();

router.post("/", (req, res) => {
  // do your magic!
  Users.insert(req.body)
    .then(newUser => {
      res.status(200).json(newUser);
    })
    .catch(err => {
      res.status(500).json({ message: "something went wrong", error: err });
    });
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
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

router.get("/:id/posts", (req, res) => {
  // do your magic!
  console.log(req.params);
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: "something went wrong", error: err });
    });
});

router.delete("/:id", (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
    .then(confirm => {
      res.status(200).json(confirm);
    })
    .catch(err => {
      res.status(500).json({ message: "something went wrong", error: err });
    });
});

router.put("/:id", (req, res) => {
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
      res.status(500).json({ message: "something went wrong" });
    });
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
