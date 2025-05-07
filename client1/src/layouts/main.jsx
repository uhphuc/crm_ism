import Header from '../components/header';
import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="main-layout p-0 m-0 flex flex-col bg-gray-300">
      <Header />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;