// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useGetBlogsQuery } from "../../features/blogsApi";
// import "./AdminHome.css";

// const AdminHome = () => {
//   // const navigate = useNavigate();
//   // const { data, error, isLoading } = useGetBlogsQuery();
//   // const [blogs, setBlogs] = useState([]);

//   // useEffect(() => {
//   //   if (data?.blogs) {
//   //     setBlogs(data.blogs);
//   //   }
//   // }, [data]);

//   // const handleDelete = (id) => {
//   //   setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
//   // };

//   // if (isLoading) return <p className="loading">Loading...</p>;
//   // if (error) return <p className="error">Error fetching blogs!</p>;

//   return (
//     <div className="admin-home">
//       <h1 className="title" style={{ color: "red" }}>
//         Welcome to Admin Panel
//       </h1>
//       {blogs.length > 0 ? (
//         blogs.map((blog) => (
//           <div key={blog.id} className="blog-card">
//             <img
//               src={blog.coverImageUrl}
//               alt={blog.title}
//               className="blog-image"
//             />
//             <h3 className="blog-title">{blog.title}</h3>
//             <p className="blog-body">
//               {blog.body.split(" ").length > 30
//                 ? `${blog.body.split(" ").slice(0, 30).join(" ")}...`
//                 : blog.body}
//             </p>
//             <p className="blog-author">
//               <b>Author:</b> {blog.createdBy?.fullName}
//             </p>
//             <div className="button-group">
//               <button
//                 className="update-btn"
//                 onClick={() => navigate(`/admin/blogs/edit/${blog.id}`)}
//               >
//                 Update
//               </button>
//               <button
//                 className="delete-btn"
//                 onClick={() => handleDelete(blog.id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="no-blogs">No blogs available.</p>
//       )}
//     </div>
//   );
// };

// export default AdminHome;

import React from "react";
import AdminFooter from "../components/AdminFooter.jsx";

const AdminHome = () => {
  return (
    <>
      <div>AdminHome</div>;
      <h1 className="admin-home">
        jfsdljfkldsfjdslkfjdsklfjsdklfjsklfjdskljfdskljfslkdjfdslkj
      </h1>
      <AdminFooter />
    </>
  );
};

export default AdminHome;
