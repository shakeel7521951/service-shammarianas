import React, { useState } from "react";
import { useGetBlogsQuery } from "../../features/blogsApi";
import { useParams } from "react-router-dom";
import { useAddCommentMutation } from "../../features/commentApi.js";

function Blog() {
  const { id } = useParams();
  const { data, isLoading } = useGetBlogsQuery();
  const [addComment] = useAddCommentMutation();

  const blog = data?.blogs?.find((blog) => blog._id === id);

  const [comments, setComments] = useState([]);
  const [commentData, setCommentData] = useState({
    name: "",
    email: "",
    content: "",
  });

  const handleChange = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentData.name || !commentData.email || !commentData.content) return;

    try {
      await addComment({ id, ...commentData }).unwrap();
      setComments([...comments, commentData]); // Update UI
      setCommentData({ name: "", email: "", content: "" });
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="blog section-padding">
      <div className="container">
        <div className="row xlg-marg">
          <div className="col-lg-8">
            <div className="main-post">
              <div className="item pb-60">
                <article>
                  <div className="text">
                    <p>
                      <span className="spec-letter">SH</span> {blog?.body}
                    </p>
                  </div>
                </article>
              </div>

              {/* Comments Section */}
              <div className="comments-from mt-80">
                <div className="mb-60">
                  <h3>Leave a comment</h3>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="messages"></div>

                  <div className="controls row">
                    <div className="col-lg-6">
                      <div className="form-group mb-30">
                        <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          required
                          value={commentData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group mb-30">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          required
                          value={commentData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-group">
                        <textarea
                          name="content"
                          placeholder="Message"
                          rows="4"
                          required
                          value={commentData.content}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                      <div className="text-center">
                        <div className="mt-30">
                          <button type="submit">
                            <span className="text">Post Comment</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* Display Comments */}
              <div className="comments-list mt-50">
                <h3>Comments</h3>
                {comments.length === 0 ? (
                  <p>No comments yet.</p>
                ) : (
                  comments.map((comment, index) => (
                    <div key={index} className="comment-item">
                      <p>
                        <strong>{comment.name}</strong> ({comment.email})
                      </p>
                      <p>{comment.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Blog;
