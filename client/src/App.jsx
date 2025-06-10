import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ForumPage from './pages/ForumPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import Header from './components/Header';
import Footer from './components/Footer';
import ForumCreatePage from './components/ForumCreatePage';
import ForumTopicPage from './pages/ForumTopicPage';
import AboutPage from './pages/AboutPage'
import AdminPanelPage from './pages/AdminPanelPage';
import ContactsPage from './pages/ContactsPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetailPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forum/create/:id" element={<ForumCreatePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPanelPage />} />
          <Route path="/forum/topic/:id" element={<ForumTopicPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;