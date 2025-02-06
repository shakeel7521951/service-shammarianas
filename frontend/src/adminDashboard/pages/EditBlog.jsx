import React, { useState, useEffect } from "react";
import "./EditBlog.css";
import {
  useGetBlogsQuery,
  useUpdateBlogMutation,
} from "../../features/blogsApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditBlog = () => {
  const navigate = useNavigate();
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
    author: "",
  });

  useEffect(() => {
    if (blogData) {
      setBlog({
        title: blogData.title || "",
        description: blogData.body || "",
        file: null,
        category: blogData.category || "",
        author: blogData.author || "",
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
    formData.append("author", blog.author);

    if (blog.file) formData.append("file", blog.file);

    try {
      await updateBlog({ id: blogId, formData }).unwrap();
      toast.success("Blog Uppdated Succesfully");
      navigate("/admin/all-blogs");
    } catch (error) {
      console.error("Failed to update blog:", error.message);
      toast.error("Failed To Updaate the Blog");
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#1e1e2f", // Dark background color
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#252537", // Dark card background
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          padding: "30px",
          width: "100%",
          maxWidth: "800px",
          margin: "20px",
        }}
      >
        <h2
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "24px",
            fontWeight: "600",
            color: "#ff9800", // Highlighted title color
            marginBottom: "20px",
          }}
        >
          Update Blog
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "16px",
                color: "#e0e0e0", // Light text color
                marginBottom: "5px",
              }}
            >
              Title:
            </label>
            <input
              type="text"
              name="title"
              value={blog.title}
              onChange={handleChange}
              required
              style={{
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #444", // Darker border
                borderRadius: "4px",
                outline: "none",
                color: "#fff", // Light text in input
                backgroundColor: "#333", // Dark background in input
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#ff9800")}
              onBlur={(e) => (e.target.style.borderColor = "#444")}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "16px",
                color: "#e0e0e0", // Light text color
                marginBottom: "5px",
              }}
            >
              Author
            </label>
            <input
              type="text"
              name="author"
              value={blog.author}
              onChange={handleChange}
              required
              style={{
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #444",
                borderRadius: "4px",
                outline: "none",
                color: "#fff",
                backgroundColor: "#333",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#ff9800")}
              onBlur={(e) => (e.target.style.borderColor = "#444")}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "16px",
                color: "#e0e0e0", // Light text color
                marginBottom: "5px",
              }}
            >
              Description:
            </label>
            <textarea
              name="description"
              value={blog.description}
              onChange={handleChange}
              rows="5"
              required
              style={{
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #444",
                borderRadius: "4px",
                outline: "none",
                color: "#fff",
                backgroundColor: "#333",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#ff9800")}
              onBlur={(e) => (e.target.style.borderColor = "#444")}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "16px",
                color: "#e0e0e0",
                marginBottom: "5px",
              }}
            >
              Cover Image:
            </label>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              accept="image/*"
              style={{
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #444",
                borderRadius: "4px",
                outline: "none",
                color: "#fff",
                backgroundColor: "#333",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#ff9800")}
              onBlur={(e) => (e.target.style.borderColor = "#444")}
            />
            {blogData?.coverImageUrl && (
              <img
                src={blogData.coverImageUrl}
                alt="Current Cover"
                style={{
                  marginTop: "10px",
                  maxWidth: "100px", // Limit the width to 100px
                  height: "auto",
                  borderRadius: "4px",
                  objectFit: "cover", // Maintain aspect ratio and avoid distortion
                }}
              />
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "16px",
                color: "#e0e0e0",
                marginBottom: "5px",
              }}
            >
              Category:
            </label>
            <select
              name="category"
              value={blog.category}
              onChange={handleChange}
              required
              style={{
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #444",
                borderRadius: "4px",
                outline: "none",
                color: "#fff",
                backgroundColor: "#333",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#ff9800")}
              onBlur={(e) => (e.target.style.borderColor = "#444")}
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <button
              type="submit"
              disabled={isUpdating}
              style={{
                padding: "12px 24px",
                fontSize: "16px",
                backgroundColor: "#ff9800", // Highlighted button
                border: "none",
                borderRadius: "4px",
                color: "#fff",
                cursor: "pointer",
                transition: "background-color 0.3s",
                fontWeight: "600",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#e68900")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#ff9800")}
            >
              {isUpdating ? "Updating..." : "Update Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
