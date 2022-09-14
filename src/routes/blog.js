const router = require("express").Router();
const Blog = require("../models/Blog");
const bodyparser = require("body-parser");

// Your routing code goes here
router.use(bodyparser());

router.get("/blog", async (req, res) => {
  try {
    const blog = await Blog.find({ topic: req.query.search })
      .limit(5)
      .skip((Number(req.query.page) - 1) * 5);
    res.json({
      status: "success",
      result: blog,
    });
  } catch (e) {
    res.json({
      status: "failed",
      message: e.message,
    });
  }
});
router.post("/blog", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json({
      status: "success",
      result: blog,
    });
  } catch (e) {
    res.json({
      status: "failed",
      message: e.message,
    });
  }
});
router.put("/blog/:id", async (req, res) => {
  try {
    await Blog.updateOne({ _id: req.params.id }, req.body);
    const blog = await Blog.findOne({ _id: req.params.id });
    res.json({
      status: "success",
      result: blog,
    });
  } catch (e) {
    res.json({
      status: "failed",
      message: e.message,
    });
  }
});
router.delete("/blog/:id", async (req, res) => {
  try {
    const blog = await Blog.deleteOne({ _id: req.params.id });
    res.json({
      status: "success",
      result: blog,
    });
  } catch (e) {
    res.json({
      status: "failed",
      message: e.message,
    });
  }
});
module.exports = router;
