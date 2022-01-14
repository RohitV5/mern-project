import React from "react";
import AdminLayout from "../../hoc/adminLayout";
import AuthProfile from "./auth-profile";

const Profile = () => {
  return (
    <AdminLayout>
      <AuthProfile></AuthProfile>
    </AdminLayout>
  );
};


export default Profile;