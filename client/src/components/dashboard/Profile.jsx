import React, { useState } from 'react';

export default function AdminProfilePage() {
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@BetterProposals.com',
    role: 'Administrator',
    profilePicture: 'https://via.placeholder.com/150', // Placeholder profile picture URL
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState(null);

  // Handle input changes for editing profile
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Handle save profile
  const handleSaveProfile = () => {
    // Logic to save the profile (e.g., API call to update profile)
    console.log('Profile updated:', profile);
    setIsEditing(false);
  };

  // Handle profile picture upload
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle logout
  const handleLogout = () => {
    // Clear user session data (e.g., tokens, localStorage, etc.)
    localStorage.removeItem('userToken'); // Example of clearing session
    window.location.href = '/'; // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Admin Profile</h2>

        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={newProfilePicture || profile.profilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-600"
            />
            <label htmlFor="profilePicture" className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1 rounded-full cursor-pointer">
              <span className="text-xs">Change</span>
            </label>
            <input
              type="file"
              id="profilePicture"
              onChange={handleProfilePictureChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full bg-transparent text-gray-800 border border-gray-300 rounded-lg p-2 mt-1 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full bg-transparent text-gray-800 border border-gray-300 rounded-lg p-2 mt-1 outline-none"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Role</label>
            <input
              type="text"
              name="role"
              value={profile.role}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full bg-transparent text-gray-800 border border-gray-300 rounded-lg p-2 mt-1 outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <button
              onClick={toggleEditMode}
              className="text-sm text-indigo-600 hover:underline"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
            {isEditing && (
              <button
                onClick={handleSaveProfile}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Save Changes
              </button>
            )}
          </div>

          {/* Password change */}
          <div className="mt-4">
            <a
              href="#"
              className="text-sm text-indigo-600 hover:underline"
            >
              Change Password
            </a>
          </div>

          {/* Logout Button */}
          <div className="mt-6">
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
