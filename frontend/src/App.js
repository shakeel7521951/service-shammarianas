import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
// import Home from './pages/Landing';
import BlogClassic from "./pages/blog-classic";
import BlogDetails from "./pages/blog-details";
import BlogGrid3Columns from "./pages/blog-grid-3columns";
import BlogGridSidebar from "./pages/blog-grid-sidebar";
// import HomeCreativeAgency from './pages/home-creative-agency.js';
// import HomeDigitalAgency from './pages/home-digital-agency.js';
import HomeMain from "./pages/home-main.js";
// import HomeModernStudio from './pages/home-modern-studio.js';
// import HomePersonal from './pages/home-personal.js';
import Page404 from "./pages/page-404.js";
import PageAbout from "./pages/page-about.js";
import PageContact from "./pages/page-contact.js";
import PageFAQ from "./pages/page-FAQ.js";
import PageServices from "./pages/page-services.js";
import PageServicesDetails from "./pages/page-services-details.js";
import PageTeam from "./pages/page-team.js";
import PageTeamDetails from "./pages/page-team-details.js";
import Stock from "./pages/Stock.js";
// import PortfolioCreative from './pages/portfolio-creative.js';
import PortfolioCreativeCarousel from "./pages/portfolio-creative-carousel.js";
// import PortfolioGallery from './pages/portfolio-gallery.js';
import PortfolioGrid from "./pages/portfolio-grid.js";
// import PortfolioMasonry from './pages/portfolio-masonry.js';
// import ProjectDetails from './pages/project-details.js';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // import { ScrollSmoother } from 'gsap-trial/ScrollSmoother';

// gsap.registerPlugin(ScrollTrigger);
// gsap.config({ trialWarn: false });

import AdminUsers from "./adminDashboard/pages/AdminUsers.jsx";
import AddBlog from "./adminDashboard/pages/AddBlog.jsx";
import EditBlog from "./adminDashboard/pages/EditBlog.jsx";
import AdminBlogs from "./adminDashboard/pages/AdminBlogs.jsx";
import AddStock from "./adminDashboard/pages/AddStock.jsx";
import EditStock from "./adminDashboard/pages/EditStock.jsx";
import AdminStocks from "./adminDashboard/pages/AdminStocks.jsx";
import Services from "./components/home-main/Services.jsx";
import Login from "./pages/register/Login.js";
import Signup from "./pages/register/Signup.js";
import Dashboard from "./adminDashboard/pages/Dashboard.jsx";
import Header from "./adminDashboard/components/AdminHeader.jsx";
import Footer from "./adminDashboard/components/AdminFooter.jsx";
import CartData from "./pages/Cart-data.js";
import PurchasedItems from "./pages/PurchasedItems.js";
import AdminRoute from "./pages/protected.js";
import LoggedIn from "./pages/already.js";

const MainLayout = () => {
  return <Outlet />;
};

const AdminLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      // <Route path="/" element={<Home />} />
      { path: "/", element: <HomeMain /> },
      { path: "/blog-classic", element: <BlogClassic /> },
      { path: "/blog-details/:id", element: <BlogDetails /> },
      { path: "/blog-grid-3column", element: <BlogGrid3Columns /> },
      { path: "/blog-grid-sidebar", element: <BlogGridSidebar /> },
      // { path: "/home-creative-agency", element: <HomeCreativeAgency /> },
      // { path: "/home-digital-agency", element: <HomeDigitalAgency /> },
      // { path: "/home-modern-studio", element: <HomeModernStudio /> },
      // { path: "/home-personal", element: <HomePersonal /> },
      { path: "/page-404", element: <Page404 /> },
      { path: "/page-about", element: <PageAbout /> },
      { path: "/page-contact", element: <PageContact /> },
      { path: "/page-FAQ", element: <PageFAQ /> },
      { path: "/stock", element: <Stock /> },
      { path: "/services", element: <PageServices /> },
      { path: "/page-services-details", element: <PageServicesDetails /> },
      { path: "/page-services", element: <PageServices /> },
      { path: "/page-team", element: <PageTeam /> },
      { path: "/page-team-details", element: <PageTeamDetails /> },
      { path: "/cart-data", element: <CartData /> },
      { path: "/purchased-items", element: <PurchasedItems /> },
      // { path: "/portfolio-creative", element: <PortfolioCreative /> },
      {
        path: "/portfolio-creative-carousel",
        element: <PortfolioCreativeCarousel />,
      },
      // { path: "/portfolio-gallery", element: <PortfolioGallery /> },
      { path: "/portfolio", element: <PortfolioGrid /> },
      // { path: "/portfolio-masonry", element: <PortfolioMasonry /> },
      // { path: "/project-details", element: <ProjectDetails /> }
    ],
  },
  {
    path: "/log-in",
    element: (
      <LoggedIn>
        <Login />
      </LoggedIn>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <LoggedIn>
        <Signup />
      </LoggedIn>
    ),
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: (
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/all-blogs",
        element: (
          <AdminRoute>
            <AdminBlogs />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/add-blog",
        element: (
          <AdminRoute>
            <AddBlog />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/edit-blog/:id",
        element: (
          <AdminRoute>
            <EditBlog />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/add-stock",
        element: (
          <AdminRoute>
            <AddStock />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/edit-stock",
        element: (
          <AdminRoute>
            <EditStock />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/all-stocks",
        element: (
          <AdminRoute>
            <AdminStocks />
          </AdminRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
