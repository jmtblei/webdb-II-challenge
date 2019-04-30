const router = require("express").Router();
const knex = require("knex");
const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);

router.get("/", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json({ error: "Error loading animals", err });
    });
});

router.get("/:id", (req, res) => {
  const zooID = req.params.id;

  db("zoos")
    .where({ id: zooID })
    .then(zoo => {
      res.status(200).json(zoo);
    })
    .catch(err => {
      res.status(500).json({ error: "Error loading animals", err });
    });
});

router.post("/", (req, res) => {
  const zoo = req.body;

  db.insert(zoo)
    .into("zoos")
    .then(zoo => {
      res.status(201).json({ message: "Animal has been added" });
    })
    .catch(err => {
      res.status(500).json({ error: "Could not add animal", err });
    });
});

router.delete("/:id", (req, res) => {
  const zooID = req.params.id;

  db("zoos")
    .where({ id: zooID })
    .delete()
    .then(zoo => {
      res.status(200).json({ message: "Animal removed from zoo", zoo });
    })
    .catch(err => {
      res.status(500).json({ error: "Could not remove animal", err });
    });
});

router.put("/:id", (req, res) => {
  const zooID = req.params.id;
  const body = req.body;

  db("zoos")
    .where({ id: zooID })
    .update(body)
    .then(zoo => {
      res.status(200).json({ message: "Animal successfully updated", zoo });
    })
    .catch(err => {
      res.status(500).json({ error: "Could not update animal", err });
    });
});

module.exports = router;