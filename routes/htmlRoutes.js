const router = require("express").Router()
const path = require("path")

router.get("/notes", (req, res) => {
    return res.sendFile(path.join(__dirname, "../public/notes.html"))
})

router.get("/notes", (req, res) => {
  res.sendFile(path.join(dirname, "./public/notes.html"));
});

router.get("*", (req, res) => {
  res.sendFile(path.join(dirname, "./public/index.html"));
});

module.exports = router