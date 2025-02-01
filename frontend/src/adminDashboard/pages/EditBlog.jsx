import React, { useState, useEffect } from "react";
import "./EditBlog.css";
import {
  useGetBlogsQuery,
  useUpdateBlogMutation,
} from "../../features/blogsApi";
import { useParams } from "react-router-dom";

const EditBlog = () => {
  const params = useParams();
  const blogId = params.id;
  const { data, isLoading, isError } = useGetBlogsQuery();
  const [updateBlog, { isUpdating }] = useUpdateBlogMutation();

  const blogData = data?.blogs?.find((blog) => blog._id === blogId);

  const [blog, setBlog] = useState({
    title: "",
    description: "",
    file: null,
    category: "",
  });

  useEffect(() => {
    if (blogData) {
      setBlog({
        title: blogData.title || "",
        description: blogData.body || "",
        file: null,
        category: blogData.category || "",
      });
    }
  }, [blogData]);

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
      await updateBlog({ id: blogId, formData }).unwrap();
      alert("Blog updated successfully!");
    } catch (error) {
      console.error("Failed to update blog:", error.message);
      alert("Failed to update blog. Please try again.");
    }
  };

  if (isLoading) {
    return <div className="loader"></div>;
  }

  if (isError) {
    return (
      <p className="error-message">
        Failed to load blog data. Please try again.
      </p>
    );
  }

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Update Blog</h2>

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
            />
            {blogData?.coverImageUrl && (
              <img
                src={blogData.coverImageUrl}
                alt="Current Cover"
                className="preview-image"
              />
            )}
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
            <button type="submit" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
