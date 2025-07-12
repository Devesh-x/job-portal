import React from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Pen, Mail, LogOut, User, Briefcase, Download } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);
  const { allAppliedJobs } = useSelector(store => store.job);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      {/* Profile Header */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-28 w-28 border-4 border-gray-100">
                <AvatarImage
                  src={user?.profile?.profilePhoto || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"}
                  alt="profile"
                />
              </Avatar>
              <div>
                <h1 className="font-bold text-3xl text-gray-900 mb-2">{user?.fullname}</h1>
                <p className="text-gray-600 text-lg mb-2">
                  {user?.profile?.bio || "No bio available"}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <User className="w-4 h-4" />
                  <span className="capitalize">{user?.role}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setOpen(true)} variant="outline" className="flex items-center gap-2">
                <Pen className="w-4 h-4" />
                Edit Profile
              </Button>
              <Button onClick={logoutHandler} variant="destructive" className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="w-5 h-5 text-gray-400" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Contact className="w-5 h-5 text-gray-400" />
                <span>{user?.phoneNumber}</span>
              </div>
            </div>
            
            {/* Resume Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 mb-3">Resume</h3>
              {user?.profile?.resume ? (
                <a
                  target="_blank"
                  href={user?.profile?.resume}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline"
                >
                  <Download className="w-4 h-4" />
                  {user?.profile?.resumeOriginalName || "Download Resume"}
                </a>
              ) : (
                <p className="text-gray-500">No resume uploaded</p>
              )}
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length > 0 ? (
                user.profile.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-gray-500">No skills added</p>
              )}
            </div>
          </div>
        </div>

        {/* Applied Jobs Section */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-6 h-6 text-gray-600" />
            <h2 className="font-bold text-2xl text-gray-900">Applied Jobs</h2>
            <Badge variant="outline" className="ml-2">
              {allAppliedJobs?.length || 0} applications
            </Badge>
          </div>
          <AppliedJobTable />
        </div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
