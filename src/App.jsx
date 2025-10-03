import React from 'react';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login/Login';
import { UserStorage } from './UserContext';
import ProtectedRoute from './Components/Helper/ProtectedRoute';
import User from './Components/User/User';
import Photo from './Components/Photo/Photo';
import UserProfile from './Components/User/UserProfile';

const App = () => {
  return (
    <div>
      <UserStorage>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/*" element={<Login />} />
          <Route
            path="/conta/*"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
          <Route path="foto/:id" element={<Photo />} />
          <Route path="perfil/:username" element={<UserProfile />} />
        </Routes>
        <Footer />
      </UserStorage>
    </div>
  );
};

export default App;
