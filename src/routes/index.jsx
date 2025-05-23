import { createBrowserRouter } from "react-router-dom";
import Auth from "../Layout/Auth/Auth";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Dashboard/Home/Home";
import Earnings from "../Pages/Dashboard/Earnings";
import Artists from "../Pages/Dashboard/Artists";
import Users from "../Pages/Dashboard/Users";
import Admin from "../Pages/Dashboard/Admin";
// import Contents from "../Pages/Dashboard/Contents/Contents";
// import Category from "../Pages/Dashboard/Category";
import Events from "../Pages/Dashboard/Events";
import Banner from "../Pages/Dashboard/Banner";
import AboutUs from "../Pages/Dashboard/AboutUs";
import PrivacyPolicy from "../Pages/Dashboard/PrivacyPolicy/PrivacyPolicy.jsx";
// import ChangePassword from "../Pages/Auth/ChangePassword";
import Login from "../Pages/Auth/Login";
import Profile from "../Pages/Dashboard/Profile";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import NotFound from "../NotFound";
import Notifications from "../Pages/Dashboard/Notifications";
import SubCategory from "../Pages/Dashboard/SubCategory";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
// import Insight from "../Pages/Dashboard/Insight";
import Blogs from "../Pages/Dashboard/Blogs/Blogs";
import MedicalHistory from "../Pages/Dashboard/MedicalHistory/MedicalHistory";
import Faq from "../Pages/Dashboard/FAQ/Faq";
import TermsAndCondition from "../Pages/Dashboard/TermsAndCondition/TermsAndCondition";
import ChangePassword from "../Pages/Dashboard/AdminProfile/ChangePassword.jsx";
import Insight from "../Pages/Dashboard/InsightfullTips.jsx";
import PackagesPlans from "../Pages/Dashboard/Packages.jsx";
import Subscription from "../Pages/Dashboard/Subscription.jsx";
import Contents from "../Pages/Dashboard/Category/Category.jsx";
import Category from "../Pages/Dashboard/Category/Category.jsx";
import SymptomModal from "../components/common/SymptomModal.jsx";
import PrivateRoute from "./ProtectedRoute.jsx"
import Disclaimer from "../Pages/Dashboard/disclaimer/Disclaimer.jsx";
import Resources from "../Pages/Dashboard/resources/Resources.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <ProtectedRoute><Main /></ProtectedRoute> ,
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/earnings",
        element: <Earnings />,
      },
      {
        path: "/insight",
        element: <Insight />,
      },
      {
        path: "/artists",
        element: <Artists />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/subscription",
        element: <Subscription />,
      },
      {
        path: "/packagesplans",
        element: <PackagesPlans />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/banner",
        element: <Banner />,
      },
      // {
      //   path: "/about-us",
      //   element: <AboutUs />,
      // },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsAndCondition />,
      },
      {
        path: "/disclaimer",
        element: <Disclaimer />,
      },
      {
        path: "/resources",
        element: <Resources />,
      },

      {
        path: "/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/sub-category",
        element: <SubCategory />,
      },
      {
        path: "/profile",
        element: <AdminProfile />,
      },
      {
        path: "/notification",
        element: <Notifications />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/category/:id",
        element: <SymptomModal />,
      },
      {
        path: "/medicalhistory",
        element: <MedicalHistory />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
