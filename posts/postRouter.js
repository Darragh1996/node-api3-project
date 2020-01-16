const express = require("express");

const Posts = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  // do your magic!
  Posts.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: "something went wrong", error: err });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  // do your magic!
  Posts.getById(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ message: "something went wrong", error: err });
    });
});

router.post("/", validatePost, (req, res) => {
  // do your magic!
  Posts.insert(req.body)
    .then(newPost => {
      res.status(200).json(newPost);
    })
    .catch(err => {
      res.status(500).json({ message: "something went wrong", error: err });
    });
});

router.delete("/:id", validatePostId, (req, res) => {
  // do your magic!
  Posts.remove(req.params.id)
    .then(confirm => {
      res.status(200).json({ confirm, message: "successfully deleted post" });
    })
    .catch(err => {
      res.status(500).json({ message: "something went wrong", error: err });
    });
});

router.put("/:id", validatePostId, (req, res) => {
  // do your magic!
  Posts.update(req.params.id, req.body)
    .then(newPost => {
      res.status(200).json(newPost);
    })
    .catch(err => {
      res.status(500).json({ message: "something went wrong", error: err });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  console.log("inside validatePostId");
  if (!req.params.id) {
    res.status(404).json({ message: "no id detected" });
  } else {
    Posts.getById(req.params.id)
      .then(post => {
        if (!post) {
          res.status(404).json({ message: "id not in database" });
        } else {
          next();
        }
      })
      .catch(err => {
        res.status(500).json({ message: "something went wrong" });
      });
  }
}

function validatePost(req, res, next) {
  // do your magic!
  console.log("inside validatePost");
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text || !req.body.user_id) {
    res.status(400).json({ message: "please include text and user_id" });
  } else {
    next();
  }
}

module.exports = router;
