import React, { useState } from "react";
import { useAddBlogMutation } from "../../features/blogsApi";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddBlog = () => {
  const navigate = useNavigate();
  const [addBlog] = useAddBlogMutation();
  const [loading, setLoading] = useState(false);

  const [blog, setBlog] = useState({
    title: "",
    description: "",
    file: null,
    category: "",
    author: "",
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
    setLoading(true);
    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("body", blog.description);
    formData.append("category", blog.category);
    formData.append("author", blog.author);

    if (blog.file) formData.append("file", blog.file);

    try {
      await addBlog(formData).unwrap();
      toast.success("Blog Added Successfully");
      setBlog({
        title: "",
        description: "",
        file: null,
        category: "",
      });
      navigate("/admin/all-blogs");
    } catch (error) {
      console.error("Failed to add blog:", error.message);
      toast.error("Failed To Add Blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#1e1e1e",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#252537",
          borderRadius: "12px",
          padding: "40px",
          boxShadow: "0 6px 15px rgba(0, 0, 0, 0.4)",
          width: "400px",
          maxWidth: "100%",
          color: "#eaeaea",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#ff9800" }}>Add New Blog</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div>
            <label style={{ color: "#b3b3b3" }}>Title:</label>
            <input
              type="text"
              name="title"
              value={blog.title}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#333",
                borderRadius: "6px",
                border: "1px solid #444",
                color: "#f1f1f1",
              }}
            />
          </div>
          <div>
            <label style={{ color: "#b3b3b3" }}>Author:</label>
            <input
              type="text"
              name="author"
              value={blog.author}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#333",
                borderRadius: "6px",
                border: "1px solid #444",
                color: "#f1f1f1",
              }}
            />
          </div>

          <div>
            <label style={{ color: "#b3b3b3" }}>Description:</label>
            <textarea
              name="description"
              value={blog.description}
              onChange={handleChange}
              rows="5"
              required
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#333",
                borderRadius: "6px",
                border: "1px solid #444",
                color: "#f1f1f1",
              }}
            />
          </div>

          <div>
            <label style={{ color: "#b3b3b3" }}>Cover Image:</label>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              required
              style={{ color: "#b3b3b3" }}
            />
          </div>

          <div>
            <label style={{ color: "#b3b3b3" }}>Category:</label>
            <select
              name="category"
              value={blog.category}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#333",
                borderRadius: "6px",
                border: "1px solid #444",
                color: "#f1f1f1",
              }}
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border: "none",
                background: loading
                  ? "#555"
                  : "linear-gradient(135deg, #ff9800, #ff5722)",
                color: "#fff",
                fontSize: "16px",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {loading ? "Submitting..." : "Add Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
