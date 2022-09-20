import React from "react";
import { Navigate, Outlet } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Welcome from '../pages/Welcome';
import NotFound from '../pages/NotFound';
//import Login from '../pages/Login';
//import Register from '../pages/Register';


const routes = () => [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'welcome', element: <Welcome /> },
      { path: 'home', element: <Home /> },
      { path: '*', element: <NotFound /> },
    ]
  },
];

export default routes;