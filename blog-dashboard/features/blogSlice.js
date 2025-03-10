// src/features/blogSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/blogs";

// Async Thunks
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addBlog = createAsyncThunk("blogs/addBlog", async (blog) => {
  const response = await axios.post(API_URL, blog);
  return response.data;
});

export const updateBlog = createAsyncThunk("blogs/updateBlog", async (blog) => {
  const response = await axios.put(`${API_URL}/${blog.id}`, blog);
  return response.data;
});

export const deleteBlog = createAsyncThunk("blogs/deleteBlog", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// Slice
const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.findIndex((blog) => blog.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        return state.filter((blog) => blog.id !== action.payload);
      });
  },
});

export default blogSlice.reducer;
