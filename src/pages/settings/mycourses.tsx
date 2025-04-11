import React from "react";
import MyCoursesPage from "@/layouts/settings/mycourses";
import SettingsLayout from "@/layouts/settings/layout";

export default function ProfileSettings() {
  return (
    <SettingsLayout>
      <MyCoursesPage />
    </SettingsLayout>
  );
}