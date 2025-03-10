// src/components/BlogList.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs, deleteBlog } from "../features/blogSlice";
import { Button, List, ListItem, ListItemText, Typography } from "@mui/material";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Blog Posts
      </Typography>
      <List>
        {blogs.map((blog) => (
          <ListItem key={blog.id}>
            <ListItemText primary={blog.title} secondary={blog.content} />
            <Button onClick={() => dispatch(deleteBlog(blog.id))}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default BlogList;
