import React from 'react';
import AdminHeader from 'components/adminHeader';
import './adminLayout.scss';

const AdminLayout = ({ children }) => (
  <main>
    <AdminHeader />
    { children || null }
  </main>
);

export default AdminLayout;
