import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { User, Mail, Lock, Phone, Camera, Save, Loader2 } from "lucide-react";
import { gql } from "@apollo/client";
import { apolloClient } from "../api/graphql";
import { useAuth } from "../auth/AuthContext";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateUserProfile(input: $input) {
      id
      name
      email
      contact
      avatarUrl
    }
  }
`;

interface UpdateProfileData {
  updateUserProfile: {
    id: string;
    name: string;
    email: string;
    contact: string | null;
    avatarUrl: string | null;
  };
}

export default function StudentProfilePage() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
  });

  // Initialize form data when user loads
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        contact: user.contact || "",
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F3F8FA] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#308279] mx-auto mb-4" />
          <p className="text-[#476074]">Loading profile...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const result = await apolloClient.mutate<UpdateProfileData>({
        mutation: UPDATE_PROFILE_MUTATION,
        variables: {
          input: {
            name: formData.name.trim(),
            email: formData.email.trim(),
            contact: formData.contact.trim() || null,
          },
        },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });

      if (result.data?.updateUserProfile) {
        // Update form with response data
        setFormData({
          name: result.data.updateUserProfile.name,
          email: result.data.updateUserProfile.email,
          contact: result.data.updateUserProfile.contact || "",
        });
        setSuccessMessage("Profil berhasil diperbarui!");
        setIsEditing(false);
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update profile";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-[#F3F8FA]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#0A1B45] to-[#308279] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold">Profil Saya</h1>
          <p className="text-white/80 mt-2">Kelola informasi profil dan akun kamu</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Picture Section */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={user.avatarUrl || undefined} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-[#308279] to-[#0A1B45] text-white text-3xl">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      disabled
                      className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0 bg-[#308279] hover:bg-[#308279]/90 opacity-60 cursor-not-allowed"
                      title="Avatar upload coming soon"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <h3 className="font-bold text-[#0A1B45] text-lg text-center">{user.name}</h3>
                <p className="text-[#476074] text-sm">{user.username}</p>
                <p className="text-[#476074] text-sm capitalize">{user.role}</p>

                <div className="mt-6 pt-6 border-t w-full space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#476074]">Status</span>
                    <span className="font-medium text-[#0A1B45] capitalize">{user.role}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#0A1B45]">Informasi Pribadi</h2>
                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-[#308279] hover:bg-[#308279]/90"
                  >
                    Edit Profil
                  </Button>
                )}
              </div>

              {successMessage && (
                <div className="mb-4 rounded-lg border border-[#92B7B0] bg-[#E8F3F1] p-3 text-sm text-[#0A1B45]">
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="mb-4 rounded-lg border border-[#F3B7B7] bg-[#FFF5F5] p-3 text-sm text-[#A33A3A]">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#308279]" />
                      Nama Lengkap
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!isEditing || isLoading}
                      placeholder="Nama lengkap"
                      className="disabled:opacity-70"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#308279]" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!isEditing || isLoading}
                      placeholder="email@example.com"
                      className="disabled:opacity-70"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact" className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#308279]" />
                      Nomor Telepon
                    </Label>
                    <Input
                      id="contact"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      disabled={!isEditing || isLoading}
                      placeholder="+62 812-3456-7890"
                      className="disabled:opacity-70"
                    />
                  </div>
                </div>

                {/* Username Display */}
                <div className="pt-6 border-t">
                  <h3 className="font-bold text-[#0A1B45] mb-4">Informasi Akun</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#476074]" />
                        Username
                      </Label>
                      <Input
                        id="username"
                        value={user.username}
                        disabled
                        className="disabled:opacity-70 disabled:cursor-not-allowed"
                      />
                      <p className="text-xs text-[#476074]">Username tidak dapat diubah</p>
                    </div>
                  </div>
                </div>

                {/* Change Password Section */}
                {isEditing && (
                  <div className="pt-6 border-t space-y-4">
                    <h3 className="font-bold text-[#0A1B45] flex items-center gap-2">
                      <Lock className="w-5 h-5 text-[#308279]" />
                      Ubah Password
                    </h3>
                    <p className="text-sm text-[#476074]">
                      Untuk mengubah password, silakan kunjungi halaman{" "}
                      <a href="#" className="text-[#308279] hover:underline">
                        pengaturan keamanan
                      </a>
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex gap-3 pt-6 border-t">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-[#308279] hover:bg-[#308279]/90 disabled:opacity-60"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Menyimpan...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Simpan Perubahan
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setErrorMessage(null);
                        // Reset form to current user data
                        if (user) {
                          setFormData({
                            name: user.name,
                            email: user.email,
                            contact: user.contact || "",
                          });
                        }
                      }}
                      disabled={isLoading}
                      className="border-[#476074]/30 disabled:opacity-60"
                    >
                      Batal
                    </Button>
                  </div>
                )}
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
