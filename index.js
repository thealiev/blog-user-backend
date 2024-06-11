require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const { authValidation, loginValidation } = require("./validations/auth");
const { postValidation } = require("./validations/post");
const checkAuth = require("./utils/checkAuth");
const { getJiraUserTickets } = require("./utils/jira");
const handleValidationErrors = require("./utils/handleValidationErrors");
const userController = require("./controllers/user");
const postController = require("./controllers/post");
const commentController = require("./controllers/comments");
const searchController = require("./controllers/search");
const ticketRoutes = require("./routes/ticketRoutes");
const jiraRoutes = require("./routes/jiraRoutes");

const app = express();
mongoose.set("strictQuery", true);

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/api/tickets", ticketRoutes);
app.use("/api", jiraRoutes);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log("db ok");
  })
  .catch((err) => {
    console.log(err);
  });

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.post(
  "/auth/register",
  authValidation,
  handleValidationErrors,
  userController.register
);

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  userController.login
);

app.get("/auth/me", checkAuth, userController.getMe);

app.get("/posts/search", searchController.searchPosts);
app.get("/tags", postController.getLastTags);

app.post(
  "/posts",
  checkAuth,
  postValidation,
  handleValidationErrors,
  postController.create
);

app.get("/posts", postController.getAll);
app.get("/posts/popular", postController.getPopular);
app.get("/posts/:id", postController.getOne);
app.delete("/posts/:id", postController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postValidation,
  handleValidationErrors,
  postController.update
);

app.post("/posts/:id/toggleLike", checkAuth, postController.toggleLike);
app.post("/comments/:id", checkAuth, commentController.createComment);
app.get("/posts/comments/:id", commentController.getPostComments);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
