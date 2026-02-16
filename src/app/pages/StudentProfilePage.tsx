import { useState } from "react";
import { Link } from "react-router";
import { User, Mail, Lock, Phone, GraduationCap, Calendar, Camera, ArrowLeft, Save } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Avatar, AvatarFallback } from "../components/ui/avatar";

export default function StudentProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Ahmad Wijaya",
    email: "ahmad.wijaya@binus.ac.id",
    phone: "+62 812-3456-7890",
    nim: "2540120123",
    major: "Computer Science",
    year: "2024",
    semester: "6",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Handle save logic here
  };

  return (
    <div className="min-h-screen bg-[#F3F8FA]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#0A1B45] to-[#308279] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/student-dashboard">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Kembali
              </Button>
            </Link>
          </div>
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
                    <AvatarFallback className="bg-gradient-to-br from-[#308279] to-[#0A1B45] text-white text-3xl">
                      AW
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0 bg-[#308279] hover:bg-[#308279]/90"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <h3 className="font-bold text-[#0A1B45] text-lg">{formData.name}</h3>
                <p className="text-[#476074] text-sm">{formData.nim}</p>
                <p className="text-[#476074] text-sm">{formData.major}</p>
              </div>

              <div className="mt-6 pt-6 border-t space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#476074]">Status</span>
                  <span className="font-medium text-[#0A1B45]">Active Student</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#476074]">Semester</span>
                  <span className="font-medium text-[#0A1B45]">Semester {formData.semester}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#476074]">Tahun Masuk</span>
                  <span className="font-medium text-[#0A1B45]">{formData.year}</span>
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

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#308279]" />
                        Nama Lengkap
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={!isEditing}
                        className="disabled:opacity-70"
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
                        disabled={!isEditing}
                        className="disabled:opacity-70"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#308279]" />
                        Nomor Telepon
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={!isEditing}
                        className="disabled:opacity-70"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nim" className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-[#308279]" />
                        NIM
                      </Label>
                      <Input
                        id="nim"
                        value={formData.nim}
                        disabled
                        className="disabled:opacity-70"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="major">Program Studi</Label>
                      <Select
                        value={formData.major}
                        onValueChange={(value) => setFormData({ ...formData, major: value })}
                        disabled={!isEditing}
                      >
                        <SelectTrigger id="major">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Computer Science">Computer Science</SelectItem>
                          <SelectItem value="Information Systems">Information Systems</SelectItem>
                          <SelectItem value="Business">Business</SelectItem>
                          <SelectItem value="Accounting">Accounting</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="year">Tahun Masuk</Label>
                      <Select
                        value={formData.year}
                        onValueChange={(value) => setFormData({ ...formData, year: value })}
                        disabled={!isEditing}
                      >
                        <SelectTrigger id="year">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2021">2021</SelectItem>
                          <SelectItem value="2022">2022</SelectItem>
                          <SelectItem value="2023">2023</SelectItem>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2025">2025</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="semester">Semester</Label>
                      <Select
                        value={formData.semester}
                        onValueChange={(value) => setFormData({ ...formData, semester: value })}
                        disabled={!isEditing}
                      >
                        <SelectTrigger id="semester">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                            <SelectItem key={sem} value={sem.toString()}>
                              Semester {sem}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Password Lama</Label>
                        <Input id="current-password" type="password" placeholder="Masukkan password lama" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Password Baru</Label>
                        <Input id="new-password" type="password" placeholder="Masukkan password baru" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex gap-3 pt-6 border-t">
                    <Button
                      type="submit"
                      className="bg-[#308279] hover:bg-[#308279]/90"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Simpan Perubahan
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="border-[#476074]/30"
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
