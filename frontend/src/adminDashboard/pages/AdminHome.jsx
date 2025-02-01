import React from "react";
import "./AdminHome.css"; // Import custom CSS
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { useDelBlogMutation, useGetBlogsQuery } from "../../features/blogsApi";

const AdminHome = () => {
  const { data, isLoading, isError } = useGetBlogsQuery();
  const [delBlog] = useDelBlogMutation(); // ✅ Corrected
  const navigate = useNavigate(); // Initialize the navigate function

  const blogs = data?.blogs || [];

  const handleDel = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await delBlog(id).unwrap();
      alert("Blog deleted successfully!");
    } catch (error) {
      console.error("Failed to delete blog:", error);
      alert("Failed to delete blog. Please try again.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-blog/${id}`);
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Manage Blogs</h2>

      {/* Loader */}
      {isLoading && <div className="loader"></div>}

      {/* Error Handling */}
      {isError && (
        <p className="error-message">Failed to load blogs. Please try again.</p>
      )}

      {/* Blog List */}
      {!isLoading && !isError && blogs.length > 0 ? (
        <div className="blog-grid">
          {blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              <img
                src={blog.coverImageUrl}
                alt={blog.title}
                className="blog-image"
              />
              <div className="blog-content">
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-description">{blog.body}</p>
                <span className="blog-category">{blog.category}</span>
                <div className="blog-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(blog._id)} // On click navigate to the edit page
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDel(blog._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !isLoading && <p className="no-blogs">No blogs available.</p>
      )}
    </div>
  );
};

export default AdminHome;
