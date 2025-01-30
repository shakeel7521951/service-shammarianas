import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditBlog = ({ blogs, setBlogs }) => {
  const { id } = useParams(); // Get blog ID from URL
  const navigate = useNavigate();

  // Convert ID to number and find the blog
  const blogToEdit = blogs.find((blog) => blog.id === parseInt(id));

  // Handle case where blog is not found
  if (!blogToEdit) {
    return (
      <h2 className="text-center text-red-500 font-bold mt-10 text-2xl">
        Blog not found!
      </h2>
    );
  }

  // Initialize state with existing blog details (use empty values if missing)
  const [editedBlog, setEditedBlog] = useState({
    title: blogToEdit.title || "",
    content: blogToEdit.body || "", // Assuming "body" is the blog content
    coverImageUrl: blogToEdit.coverImageUrl || "", // Adjusted image property
    author: blogToEdit.createdBy?.fullName || "", // Adjusted author reference
  });

  // Update function
  const handleUpdate = (e) => {
    e.preventDefault();

    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog.id === parseInt(id) ? { ...blog, ...editedBlog } : blog
      )
    );

    navigate("/admin"); // Redirect after update
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#1e3a4c] p-6">
      <div className="bg-[#092734] border border-[#51afb2] text-white p-6 mt-6 w-full max-w-lg rounded-xl shadow-md">
        <h2 className="text-center text-2xl mb-4 font-bold">Edit Blog</h2>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          {/* Title Input */}
          <div>
            <label className="block text-white font-bold mb-1">Title:</label>
            <input
              type="text"
              value={editedBlog.title}
              onChange={(e) =>
                setEditedBlog({ ...editedBlog, title: e.target.value })
              }
              className="w-full p-2 rounded bg-[#1c1d1e] text-white"
              required
            />
          </div>

          {/* Content Input */}
          <div>
            <label className="block text-white font-bold mb-1">Content:</label>
            <textarea
              value={editedBlog.content}
              onChange={(e) =>
                setEditedBlog({ ...editedBlog, content: e.target.value })
              }
              className="w-full p-2 rounded bg-[#1c1d1e] text-white"
              rows="5"
              required
            />
          </div>

          {/* Image URL Input */}
          <div>
            <label className="block text-white font-bold mb-1">
              Image URL:
            </label>
            <input
              type="text"
              value={editedBlog.coverImageUrl}
              onChange={(e) =>
                setEditedBlog({ ...editedBlog, coverImageUrl: e.target.value })
              }
              className="w-full p-2 rounded bg-[#1c1d1e] text-white"
            />
          </div>

          {/* Author Input */}
          <div>
            <label className="block text-white font-bold mb-1">Author:</label>
            <input
              type="text"
              value={editedBlog.author}
              onChange={(e) =>
                setEditedBlog({ ...editedBlog, author: e.target.value })
              }
              className="w-full p-2 rounded bg-[#1c1d1e] text-white"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              type="submit"
              className="bg-[#51afb2] px-4 py-2 rounded hover:bg-[#3a8d90] transition"
            >
              Update Blog
            </button>
            <button
              type="button"
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 transition"
              onClick={() => navigate("/admin")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
