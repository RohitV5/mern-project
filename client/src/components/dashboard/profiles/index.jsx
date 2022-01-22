import React from "react";
import AdminLayout from "../../hoc/adminLayout";
import AuthProfile from "./auth-profile";
import UserProfile from "./user-profile";

const Profile = () => {
  return (
    <AdminLayout>
      <AuthProfile></AuthProfile>
      <UserProfile></UserProfile>
    </AdminLayout>
  );
};


export default Profile;