import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const BASE_URL = "http://20.244.56.144/evaluation-service";

app.post("/register", async (req, res) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, req.body, {
      headers: { "Content-Type": "application/json" },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data || error.message,
    });
  }
});

app.post("/auth", async (req, res) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth`, req.body, {
      headers: { "Content-Type": "application/json" },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data || error.message,
    });
  }
});

app.get("/users", async (req, res) => {
  try {
    const usersRes = await axios.get(`${BASE_URL}/users`);
    const users = usersRes.data.users;

    let userCommentCounts = [];

    for (let userId in users) {
      const postsRes = await axios.get(`${BASE_URL}/users/${userId}/posts`);
      const posts = postsRes.data.posts;

      let commentCount = 0;
      for (const post of posts) {
        const commentsRes = await axios.get(
          `${BASE_URL}/posts/${post.id}/comments`
        );
        commentCount += commentsRes.data.comments.length;
      }
      userCommentCounts.push({ name: users[userId], comments: commentCount });
    }

    userCommentCounts.sort((a, b) => b.comments - a.comments);
    res.json(userCommentCounts.slice(0, 5));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const type = req.query.type;
    const usersRes = await axios.get(`${BASE_URL}/users`);
    const users = usersRes.data.users;

    let postsList = [];

    for (let userId in users) {
      const postsRes = await axios.get(`${BASE_URL}/users/${userId}/posts`);
      postsList.push(...postsRes.data.posts);
    }

    if (type === "popular") {
      let postComments = [];

      for (const post of postsList) {
        const commentsRes = await axios.get(
          `${BASE_URL}/posts/${post.id}/comments`
        );
        postComments.push({
          ...post,
          commentCount: commentsRes.data.comments.length,
        });
      }

      const maxComments = Math.max(...postComments.map((p) => p.commentCount));
      const trending = postComments.filter(
        (p) => p.commentCount === maxComments
      );
      res.json(trending);
    } else if (type === "latest") {
      postsList.sort((a, b) => b.id - a.id);
      res.json(postsList.slice(0, 5));
    } else {
      res.status(400).json({ error: "Invalid type parameter" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
