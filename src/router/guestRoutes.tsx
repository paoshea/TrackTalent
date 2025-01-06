// import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { DemoRoutes } from './demoRoutes';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import VerifyEmail from '../pages/auth/VerifyEmail';
import Landing from '../pages/Landing';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Careers from '../pages/Careers';

export function GuestRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/careers" element={<Careers />} />
      
      {/* Auth Routes */}
      <Route path="/auth/sign-in" element={<SignIn />} />
      <Route path="/auth/sign-up" element={<SignUp />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      <Route path="/auth/verify-email" element={<VerifyEmail />} />

      {/* Demo Routes */}
      <Route path="/demo/*" element={<DemoRoutes />} />
    </Routes>
  );
}
