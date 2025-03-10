// src/components/BlogForm.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../features/blogSlice";
import { TextField, Button, Box } from "@mui/material";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBlog({ title, content }));
    setTitle("");
    setContent("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        margin="normal"
        multiline
        rows={4}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Add Blog
      </Button>
    </Box>
  );
};

export default BlogForm;
