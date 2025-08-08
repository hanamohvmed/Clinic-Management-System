// import { jwtDecode } from "jwt-decode";
// import React from "react";
// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children, allowedRoles }) {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     return <Navigate to="/" replace />;
//   }

//   const decoded = jwtDecode(token);
//   const role =
//     decoded[
//       "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
//     ]?.toLowerCase();
// //   if (decoded.exp * 1000 < Date.now()) {
// //     localStorage.removeItem("token");
// //     return <Navigate to="/" replace />;
// //   }
//   if (!role) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   if (!allowedRoles.map((r) => r.toLowerCase()).includes(role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return children;
// }

// export default ProtectedRoute;


import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" replace />;
  }

  const decoded = jwtDecode(token);
  console.log("Decoded Token:", decoded); // ✅ نشوف كل القيم اللي فيه

  const role =
    decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].toLowerCase();
  console.log("Extracted Role:", role); // ✅ نشوف إيه اللي بيطلع

  if (!role) {
    return <Navigate to="/unauthorized" replace />;
  }
  if (!allowedRoles.map((r) => r.toLowerCase()).includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;

