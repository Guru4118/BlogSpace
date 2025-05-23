import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import RequireAuth from './components/RequireAuth';

// Blog Pages
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import Home from './pages/Home';
import Profile from './pages/profile';

function Dashboard() {
  return <h2 className="text-center mt-10 text-xl">Welcome to Dashboard</h2>;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
        path='/profile'
        element={<Profile/>}>

        </Route>
        <Route 
          path="/dashboard" 
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          } 
        />
        <Route path="/home"
        element={
          
            <Home/>
          //</RequireAuth>
        }
        />
        <Route 
          path="/blogs" 
          element={
            //<RequireAuth>
              <BlogList />
            //</RequireAuth>
          } 
        />
        <Route 
          path="/blogs/:id" 
          element={
            //<RequireAuth>
              <BlogDetail />
            //</RequireAuth>
          } 
        />
        <Route 
          path="/blogs/create" 
          element={
            <RequireAuth>
              <CreateBlog />
            </RequireAuth>
          } 
        />
        <Route 
          path="/blogs/edit/:id" 
          element={
            <RequireAuth>
              <EditBlog />
            </RequireAuth>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
