import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';

export function MainLayout() {
  return (
    <>
      <Sidebar />
      <main>
        <Header />
        <Outlet />
      </main>
    </>
  );
}
