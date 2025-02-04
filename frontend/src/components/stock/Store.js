'use client';

const stockData = [
  {
    id: 1,
    category: "design",
    imgSrc: "/assets/imgs/works/2/1.jpg",
    title: "Figma Digital Agency",
    subTitle: "Web Design",
    description: "A beautifully designed website using Figma for a digital agency.",
    price: "$49.99"
  },
  {
    id: 2,
    category: "marketing",
    imgSrc: "/assets/imgs/works/2/2.jpg",
    title: "SEO Optimization",
    subTitle: "Marketing",
    description: "Boost your website's SEO with our optimized strategies.",
    price: "$59.99"
  },
  {
    id: 3,
    category: "design",
    imgSrc: "/assets/imgs/works/2/3.jpg",
    title: "Creative Portfolio",
    subTitle: "Web Design",
    description: "Showcase your work with a clean and creative portfolio design.",
    price: "$39.99"
  },
  {
    id: 4,
    category: "development",
    imgSrc: "/assets/imgs/works/2/4.jpg",
    title: "React Dashboard",
    subTitle: "Development",
    description: "A modern dashboard built with React and Bootstrap.",
    price: "$79.99"
  },
  {
    id: 5,
    category: "design",
    imgSrc: "/assets/imgs/works/2/5.jpg",
    title: "E-commerce UI",
    subTitle: "Web Design",
    description: "An intuitive UI for e-commerce platforms to boost sales.",
    price: "$89.99"
  },
  {
    id: 6,
    category: "marketing",
    imgSrc: "/assets/imgs/works/2/6.jpg",
    title: "Social Media Ads",
    subTitle: "Marketing",
    description: "High-converting social media ads designed for your brand.",
    price: "$45.99"
  },
  {
    id: 7,
    category: "marketing",
    imgSrc: "/assets/imgs/works/2/7.jpg",
    title: "Content Strategy",
    subTitle: "Marketing",
    description: "Developing a content plan to engage and convert users.",
    price: "$55.99"
  },
  {
    id: 8,
    category: "development",
    imgSrc: "/assets/imgs/works/2/8.jpg",
    title: "Node.js API",
    subTitle: "Development",
    description: "A scalable and fast API built using Node.js and Express.",
    price: "$99.99"
  },
  {
    id: 9,
    category: "development",
    imgSrc: "/assets/imgs/works/2/9.jpg",
    title: "WordPress Theme",
    subTitle: "Development",
    description: "A custom-built WordPress theme for modern businesses.",
    price: "$69.99"
  }
];

function Store() {
  return (
    <section className="work-grid section-padding pb-0">
      <div className="container">
        <div className="row mb-80">
          <div className="col-lg-4">
            <div className="sec-head">
              <h6 className="sub-title main-color mb-10">DISCOVER OUR Stock</h6>
              <h3>Latest Stock</h3>
            </div>
          </div>
          <div className="filtering col-lg-8 d-flex justify-content-end align-items-end">
            <div>
              <div className="filter">
                <span data-filter="*" className="active" data-count="09">
                  All
                </span>
                <span data-filter=".design" data-count="03">
                  Design
                </span>
                <span data-filter=".development" data-count="03">
                  Development
                </span>
                <span data-filter=".marketing" data-count="03">
                  Marketing
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="gallery row md-marg">
          {stockData.map((item) => (
            <div key={item.id} className={`col-lg-4 col-md-6 items ${item.category}`}>
              <div className="item mb-50">
                <div className="img">
                  <img src={item.imgSrc} alt={item.title} />
                </div>
                <div className="cont d-flex align-items-end mt-30">
                  <div>
                    <span className="p-color mb-5 sub-title">{item.subTitle}</span>
                    <h6>{item.title}</h6>
                    <p>{item.description}</p>
                    <p className="text-bold">{item.price}</p>
                  </div>
                  <div className="ml-auto">
                    <a href="#">
                      <span className="ti-arrow-top-right"></span>
                    </a>
                  </div>
                </div>
                <button className="btn main-colorbg mt-2 w-100">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Store;
