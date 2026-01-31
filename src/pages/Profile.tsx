import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { User, Mail, Phone, Calendar, MapPin, Shield } from "lucide-react";

// Define a comprehensive type that includes all possible fields
interface ProfileData {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token?: string;
  // Optional fields from API
  phone?: string;
  birthDate?: string;
  address?: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

const Profile: React.FC = () => {
  const { user, token } = useAuthStore();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("https://dummyjson.com/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load profile");
        // Fallback to store data if API fails
        if (user) {
          setProfile({
            id: user.id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            image: user.image,
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token, user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-red-800">
          Error Loading Profile
        </h3>
        <p className="text-red-600 mt-2">{error}</p>
      </div>
    );
  }

  const displayProfile = profile || user;

  if (!displayProfile) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-900">No Profile Data</h3>
        <p className="text-gray-600 mt-2">Please log in to view your profile</p>
      </div>
    );
  }

  // Type guard to check if displayProfile has phone property
  const hasPhone = (
    profile: ProfileData,
  ): profile is ProfileData & { phone: string } => {
    return "phone" in profile && profile.phone !== undefined;
  };

  // Type guard to check if displayProfile has birthDate property
  const hasBirthDate = (
    profile: ProfileData,
  ): profile is ProfileData & { birthDate: string } => {
    return "birthDate" in profile && profile.birthDate !== undefined;
  };

  // Type guard to check if displayProfile has address property
  const hasAddress = (
    profile: ProfileData,
  ): profile is ProfileData & {
    address: {
      address: string;
      city: string;
      state: string;
      postalCode: string;
    };
  } => {
    return "address" in profile && profile.address !== undefined;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
        <p className="text-gray-600">Manage your account information</p>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={displayProfile.image}
              alt={displayProfile.username}
              className="h-32 w-32 rounded-full border-4 border-white shadow-lg"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-white">
                {displayProfile.firstName} {displayProfile.lastName}
              </h2>
              <p className="text-blue-100">@{displayProfile.username}</p>
              <div className="flex items-center justify-center sm:justify-start mt-4 space-x-4">
                <span className="flex items-center text-blue-100">
                  <Shield className="h-4 w-4 mr-2" />
                  {displayProfile.gender}
                </span>
                <span className="flex items-center text-blue-100">
                  <Mail className="h-4 w-4 mr-2" />
                  {displayProfile.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Personal Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-medium">
                      {displayProfile.firstName} {displayProfile.lastName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Email Address</p>
                    <p className="font-medium">{displayProfile.email}</p>
                  </div>
                </div>

                {hasPhone(displayProfile) && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Phone Number</p>
                      <p className="font-medium">{displayProfile.phone}</p>
                    </div>
                  </div>
                )}

                {hasBirthDate(displayProfile) && (
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Birth Date</p>
                      <p className="font-medium">
                        {new Date(
                          displayProfile.birthDate,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Account Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Account Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold text-lg">ID</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">User ID</p>
                    <p className="font-medium">{displayProfile.id}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold">@</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Username</p>
                    <p className="font-medium">{displayProfile.username}</p>
                  </div>
                </div>

                {hasAddress(displayProfile) && (
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium">
                        {displayProfile.address.address}
                      </p>
                      <p className="text-sm text-gray-600">
                        {displayProfile.address.city},{" "}
                        {displayProfile.address.state}{" "}
                        {displayProfile.address.postalCode}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Account Activity</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="text-lg font-bold mt-1">2024</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Role</p>
                <p className="text-lg font-bold mt-1">User</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Status</p>
                <p className="text-lg font-bold text-green-600 mt-1">Active</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Last Login</p>
                <p className="text-lg font-bold mt-1">Today</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
