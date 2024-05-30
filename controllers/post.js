const { json } = require("express");
const PostModel = require("../models/post");

const create = async (req, res) => {
  try {
    const doc = new PostModel({
      user: req.userId,
      imageUrl: req.body.imageUrl,
      title: req.body.title,
      description: req.body.description,
      tags: req.body.tags,
    });

    const post = await doc.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getPopular = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .sort({ viewsCount: -1 })
      .populate("user")
      .exec();
    res.json(posts);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      }
    );

    if (!post) {
      return res.status(404).json({
        message: "Internal Server Error",
      });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.findByIdAndDelete(postId);
    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const update = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.findByIdAndUpdate(postId, {
      imageUrl: req.body.imageUrl,
      title: req.body.title,
      description: req.body.description,
      tags: req.body.tags,
    });
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const toggleLike = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const hasLiked = post.likes.includes(userId);

    if (hasLiked) {
      post.likes = post.likes.filter((id) => id !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.json({ likesCount: post.likes.length, liked: !hasLiked });
    console.log(!hasLiked)
  } catch (error) {
    console.error("Failed to toggle like", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  create,
  getAll,
  getOne,
  remove,
  update,
  getLastTags,
  getPopular,
  toggleLike,
};
