import React from "react";
import Navbar from "@/layouts/homepage/Navbar";

const EditProfile = () => {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-100 dark:bg-neutral-800">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <div className="w-full md:w-1/7 p-6 border-r bg-white dark:bg-neutral-700 dark:border-neutral-600 shrink-0 relative z-0">
          <div className="flex items-center gap-2 mb-6 text-purple-700 dark:text-purple-400 font-medium cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
            <span>Edit profile</span>
          </div>

          <div className="flex items-center gap-2 mb-6 text-gray-500 dark:text-gray-300 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span>Notification</span>
          </div>

          <div className="flex items-center gap-2 mb-6 text-gray-500 dark:text-gray-300 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>Security</span>
          </div>

          <div className="flex items-center gap-2 mb-6 text-gray-500 dark:text-gray-300 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            <span>Appearance</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 text-gray-900 dark:text-gray-100">
          <div className="relative">
            {/* Purple Banner */}
            <div
              className="rounded-lg w-full overflow-hidden"
              style={{
                background: "linear-gradient(45deg, #9333ea, #c026d3)",
                height: "clamp(150px, 30vh, 250px)",
                position: "relative"
              }}
            >
              <div className="absolute inset-0">
                <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg" opacity="0.25">
                  <path
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    d="M0,50 C150,100 350,0 500,50 C650,100 700,50 800,70 L800,200 L0,200 Z"
                  />
                  <path
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    d="M0,30 C150,80 350,10 500,40 C650,80 700,30 800,50 L800,200 L0,200 Z"
                  />
                </svg>
              </div>
            </div>

            {/* User Card */}
            <div className="absolute left-0 right-0 mx-auto top-[clamp(100px,22vh,200px)] w-full max-w-5xl">
              <div className="bg-gray-50 dark:bg-neutral-700 rounded-lg p-4 border border-gray-300 dark:border-gray-600 shadow-lg">
                <div className="flex items-center gap-3">
                  <img
                    src="https://img.upanh.tv/2025/03/14/avata-dep-nam-2.jpg"
                    alt="User"
                    className="w-12 h-12"
                  />
                  <div>
                    <h3 className="font-medium">Esthera Jackson</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">esthera@simmmple.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="h-16 md:h-20"></div>

          {/* Edit Profile Form */}
          <div className="bg-gray-50 dark:bg-neutral-700 rounded-lg p-4 md:p-6 mt-0 border border-gray-300 dark:border-gray-600 shadow-lg w-full max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Edit profile</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-neutral-600 text-gray-900 dark:text-gray-100"
                  defaultValue="Lê"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-neutral-600 text-gray-900 dark:text-gray-100"
                  defaultValue="Mehrabbozorgi.business@gmail.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-neutral-600 text-gray-900 dark:text-gray-100"
                  defaultValue="thanh trúc"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Address</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-neutral-600 text-gray-900 dark:text-gray-100"
                  defaultValue="33062 Zboncak Isle"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">City</label>
                <select className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 appearance-none bg-white dark:bg-neutral-600 text-gray-900 dark:text-gray-100">
                  <option>Mehrab</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Contact Number</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-neutral-600 text-gray-900 dark:text-gray-100"
                  defaultValue="58077.79"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-2">
              <button className="px-6 py-2 border border-purple-500 text-purple-500 dark:text-purple-400 dark:border-purple-400 rounded">
                Cancel
              </button>
              <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;