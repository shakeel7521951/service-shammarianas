import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBlog = ({ blogs, setBlogs }) => {
  const navigate = useNavigate();

  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    image: "",
    author: "",
  });

  // Function to handle form submission
  const handleCreateBlog = (e) => {
    e.preventDefault();

    // Generate a unique ID for the new blog
    const newBlogWithId = { ...newBlog, id: blogs.length + 1 };

    // Update state
    setBlogs([...blogs, newBlogWithId]);

    // Navigate back to the admin panel
    navigate("/admin");
  };

  return (
    <div className="main bg-[#1e3a4c] !p-4 flex flex-col items-center w-full">
      <div className="!p-6 bg-[#092734] border border-[#51afb2] text-white mt-4 w-full md:w-[35%] mx-auto rounded-3xl shadow-md">
        <h2 className="text-center text-xl mb-4 text-white font-bold">
          Create New Blog
        </h2>
        <form onSubmit={handleCreateBlog}>
          <div className="form-content flex flex-col gap-4">
            <div className="mb-4">
              <label className="block text-white font-bold" htmlFor="title">
                Title:
              </label>
              <input
                type="text"
                value={newBlog.title}
                id="title"
                onChange={(e) =>
                  setNewBlog({ ...newBlog, title: e.target.value })
                }
                className="w-full !p-2 rounded bg-[#1c1d1e] text-white !mt-1"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-bold" htmlFor="content">
                Content:
              </label>
              <textarea
                value={newBlog.content}
                id="content"
                onChange={(e) =>
                  setNewBlog({ ...newBlog, content: e.target.value })
                }
                className="w-full !p-2 rounded bg-[#1c1d1e] text-white !mt-1"
                rows="5"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-bold" htmlFor="url">
                Image URL:
              </label>
              <input
                type="text"
                value={newBlog.image}
                id="url"
                onChange={(e) =>
                  setNewBlog({ ...newBlog, image: e.target.value })
                }
                className="w-full !p-2 rounded bg-[#1c1d1e] text-white !mt-1"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-bold" htmlFor="author">
                Author Name:
              </label>
              <input
                type="text"
                id="author"
                value={newBlog.author}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, author: e.target.value })
                }
                className="w-full !p-2 rounded bg-[#1c1d1e] text-white !mt-1"
                required
              />
            </div>
            <div className="btns w-full flex gap-4 justify-center">
              <button
                type="submit"
                className="bg-[#51afb2] !px-4 !py-2 rounded hover:bg-[#3a8d90] cursor-pointer"
              >
                Create Blog
              </button>
              <button
                type="button"
                className="ml-2 bg-red-500 !px-4 !py-2 rounded hover:bg-red-700 cursor-pointer"
                onClick={() => navigate("/admin")}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
