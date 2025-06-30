import React from 'react';
import { Navigate } from 'react-router-dom';

// isAuth: Kullanıcı giriş yapmış mı? (true/false)
// children: Korumalı rota içindeki bileşen (bizim durumumuzda AdminPage)
function ProtectedRoute({ isAuth, children }) {
  if (!isAuth) {
    // Eğer kullanıcı giriş yapmamışsa, onu /login sayfasına yönlendir.
    return <Navigate to="/login" replace />;
  }

  // Eğer giriş yapmışsa, gitmek istediği sayfayı (children) göster.
  return children;
}

export default ProtectedRoute;