import React from "react";
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

const MainRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register-premium" element={<PremiumRegisterPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/calculate" element={<CalculatePage />} />
          <Route path="/universities" element={<UniversitiesPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/forum-post" element={<ForumPost />} />

          <Route
            path="/university-details/:name"
            element={<UniversityDetail />}
          />
          <Route path="/forum-details/:id" element={<ForumDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default MainRoutes;
