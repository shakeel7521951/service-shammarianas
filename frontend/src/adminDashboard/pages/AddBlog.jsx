import React, { useState } from "react";
import "./AddBlog.css";
import { useAddBlogMutation } from "../../features/blogsApi";

const AddBlog = () => {
  const [addBlog] = useAddBlogMutation();

  const [blog, setBlog] = useState({
    title: "",
    description: "",
    file: null,
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setBlog((prevBlog) => ({
      ...prevBlog,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("body", blog.description);
    formData.append("category", blog.category);
    if (blog.file) formData.append("file", blog.file);

    try {
      await addBlog(formData).unwrap();
      alert("Blog added successfully!");
      setBlog({
        title: "",
        description: "",
        file: null,
        category: "",
      });
    } catch (error) {
      console.error("Failed to add blog:", error.message);
      alert("Failed to add blog. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Add New Blog</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={blog.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={blog.description}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>

          <div className="input-group">
            <label>Cover Image:</label>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
          </div>

          <div className="input-group">
            <label>Category:</label>
            <select
              name="category"
              value={blog.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div className="button-group">
            <button type="submit">Add Blog</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
