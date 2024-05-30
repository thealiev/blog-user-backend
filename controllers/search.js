const PostModel = require("../models/post");

const searchPosts = async (req, res) => {
  try {
    const searchTerm = req.query.term;
    const posts = await PostModel.find({
      title: { $regex: searchTerm, $options: "i" }
    })
      .populate("user")
      .exec();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to search posts" });
  }
};

module.exports = {
  searchPosts,
};
