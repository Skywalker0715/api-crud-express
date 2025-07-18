// Import framework Express dan controller
const express = require('express');
const { getPosts, createPost, updatePost, deletePost } = require('../controllers/postController');
// Buat instance router Express
const postRoutes = express.Router();

// Definisikan route GET '/posts' yang akan memanggil fungsi getPosts
postRoutes.get('/posts', getPosts);
postRoutes.post('/posts', createPost);
postRoutes.put('/posts/:id', updatePost);
postRoutes.delete('/posts/:id', deletePost);

// Export router agar bisa digunakan di file lain (misal: app.js)
module.exports = postRoutes;
