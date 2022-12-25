const express = require("express");
const upload = require("./multer");
const path = require("path");
const Resize = require("./sharp");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/image/upload", upload.single("image"), async (req, res) => {
  const folder = path.join(__dirname, "public/image");
  const resize = new Resize(folder);
  const filename = await resize.save(req.file.buffer);
  res.status(200).json(filename);
});

app.listen(4000, console.log("server is running on PORT 4000"));
