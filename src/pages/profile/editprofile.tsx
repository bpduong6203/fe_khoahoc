import React from "react";
import EditProfile from "@/layouts/user/profile/editprofile";
import "../../app/globals.css";
import AppLayoutClient from "@/layouts/app-layout-client";

export default function EditProfilePage () {
  return (
    <AppLayoutClient>
      <EditProfile />
    </AppLayoutClient>
  )
}