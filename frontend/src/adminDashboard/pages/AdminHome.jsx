import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetBlogsQuery } from "../../features/blogsApi";

const AdminHome = () => {
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetBlogsQuery();

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (data?.blogs) {
      setBlogs(data.blogs);
    }
  }, [data]);

  const handleDelete = (id) => {
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
  };

  if (isLoading) return <p className="text-white text-center">Loading...</p>;
  if (error)
    return <p className="text-white text-center">Error fetching blogs!</p>;

  return (
    <div className="bg-[#000]">
      <div className="hero heading h-[100vh] flex flex-col justify-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-[#fff]">
          Welcome to Admin Panel
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 flex-wrap justify-center items-center p-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="border border-[#51afb2] rounded md:max-w-[25%] bg-[#000] p-4"
            >
              {/* Blog Image */}
              <div className="img w-full">
                <img
                  src={blog.coverImageUrl}
                  alt={blog.title}
                  className="rounded w-full md:h-[30vh]"
                />
              </div>

              {/* Blog Content */}
              <div className="flex flex-col text-center px-2 min-h-[8rem]">
                <h3 className="text-[20px] text-[#51afb2]">{blog.title}</h3>
                <p className="text-[15px] text-[#ffffff]">
                  {blog.body.split(" ").length > 30
                    ? `${blog.body.split(" ").slice(0, 30).join(" ")}...`
                    : blog.body}
                </p>
                <p className="text-[15px] text-[#ffffff]">
                  <b className="text-[#51afb2]">Author:</b>{" "}
                  {blog.createdBy?.fullName}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 justify-center mt-2 mb-2">
                <button
                  className="bg-[#51afb2] rounded px-2 py-1 text-[#1f4545] hover:bg-[#3a8d90] hover:scale-105 shadow-md"
                  onClick={() => navigate(`/admin/blogs/edit/${blog.id}`)}
                >
                  Update
                </button>

                <button
                  className="bg-[#ff2359] rounded px-2 py-1 text-white hover:bg-[#d91e4d] hover:scale-105 shadow-md"
                  onClick={() => handleDelete(blog.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center pb-2">No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
