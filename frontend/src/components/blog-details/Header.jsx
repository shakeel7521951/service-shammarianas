"use client";
import React, { useEffect, useLayoutEffect } from "react";

import loadBackgroudImages from "../../common/loadBackgroudImages";
import { useGetBlogsQuery } from "../../features/blogsApi";
import { useParams } from "react-router-dom";
function Header() {
  useEffect(() => {
    loadBackgroudImages();
  }, []);
  const formatDate = (isoString) => {
    const date = new Date(isoString);

    return date.toLocaleString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };
  const params = useParams();
  let id = params.id;
  const { data } = useGetBlogsQuery();
  let blog = data?.blogs?.find((blog) => blog._id === id);

  return (
    <header className="header blog-header section-padding pb-0">
      <div className="container mt-80">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="caption">
              <div className="sub-title fz-12">
                <a href="#0">
                  <span>Design , </span>
                </a>
                <a href="#0">
                  <span>Development</span>
                </a>
              </div>
              <h1 className="fz-55 mt-30">{blog?.title}</h1>
            </div>
            <div className="info d-flex mt-40 align-items-center">
              <div className="left-info">
                <div className="d-flex align-items-center">
                  <div className="author-info">
                    <div className="d-flex align-items-center">
                      <a href="#0" className="circle-60">
                        <img
                          src="/assets/imgs/blog/author.png"
                          alt=""
                          className="circle-img"
                        />
                      </a>
                      <a href="#0" className="ml-20">
                        <span className="opacity-7">Author</span>
                        <h6 className="fz-16">{blog?.author}</h6>
                      </a>
                    </div>
                  </div>
                  <div className="date ml-50">
                    <a href="#0">
                      <span className="opacity-7">Published</span>
                      <h6 className="fz-16"> {formatDate(blog?.createdAt)}</h6>
                    </a>
                  </div>
                </div>
              </div>
              <div className="right-info ml-auto">
                <div>
                  <span className="pe-7s-comment fz-18 mr-10"></span>
                  <span className="opacity-7">
                    {blog?.comments.length} Comments
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="background bg-img mt-80"
        data-background={blog?.coverImageUrl}
      ></div>
    </header>
  );
}

export default Header;
