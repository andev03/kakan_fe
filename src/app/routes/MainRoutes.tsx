import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../page/HomePage";
import LoginPage from "../page/LoginPage";
import CalculatePage from "../page/CalculatePage";
import ContactPage from "../page/ContactPage";
import PremiumRegisterPage from "../page/RegisterPremium";
import UniversitiesPage from "../page/UniversitiesPage";
import ForumPage from "../page/forum/ForumPage";
import ForumDetail from "../page/forum/ForumDetail";
import ForumPost from "../page/forum/ForumPost";
import UniversityDetail from "../page/UniversityDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from "../page/ProfilePage";
import ManagePost from "../page/staff/ManagePost";
import ManageUser from "../page/admin/ManageUser";
import ManageUniversities from "../page/staff/ManageUniversities";
import GoogleCallBack from "../components/loginGoogle.tsx/loginGoogle";
import PaymentSuccess from "../page/vnpay/PaymentSuccess";

const MainRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          style={{ zIndex: 9999 }}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register-premium" element={<PremiumRegisterPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/calculate" element={<CalculatePage />} />
          <Route path="/universities" element={<UniversitiesPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/forum-post" element={<ForumPost />} />
          <Route path="/customer/dashboard" element={<ProfilePage />} />
          <Route
            path="/university-details/:name"
            element={<UniversityDetail />}
          />
          <Route path="/forum-details/:postId" element={<ForumDetail />} />
          <Route path="/manage-post" element={<ManagePost />} />
          <Route path="/manage-universities" element={<ManageUniversities />} />
          <Route path="/manage-user" element={<ManageUser />} />
          <Route path="/login/success" element={<GoogleCallBack />} />
          <Route path="/vnpay/success" element={<PaymentSuccess />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default MainRoutes;
