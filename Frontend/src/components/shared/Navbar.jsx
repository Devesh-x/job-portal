import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { LogOut, User2, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
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
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div>
          <Link to="/" className="group flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
              Job<span className="text-orange-500">Portal</span>
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-8">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <a href="/login">
                <Button variant="outline">Login</Button>
              </a>
              <a href="/signup">
                <Button
                  variant="outline"
                  className="bg-[#2973B2] hover:bg-[#155E95]"
                >
                  Signup
                </Button>
              </a>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer h-10 w-10 border-2 border-gray-200 hover:border-gray-300 transition-colors">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt={user?.fullname}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                    {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent 
                className="w-80 p-0 bg-white border border-gray-200 rounded-lg shadow-xl z-50" 
                align="end" 
                sideOffset={8}
              >
                <div className="p-4">
                  {/* User Info Header */}
                  <div className="flex gap-4 items-center pb-4 border-b border-gray-100">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt={user?.fullname}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold text-lg">
                        {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{user?.fullname}</h4>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {user?.profile?.bio || "No bio available"}
                      </p>
                      <p className="text-xs text-gray-400 capitalize">
                        {user?.role}
                      </p>
                    </div>
                  </div>

                  {/* Menu Options */}
                  <div className="py-2 space-y-1">
                    {/* Profile Link - Available for all users */}
                    <Link to="/profile" className="block">
                      <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors cursor-pointer">
                        <User2 className="w-4 h-4" />
                        <span className="text-sm font-medium">View Profile</span>
                      </div>
                    </Link>

                    {/* Settings for recruiters */}
                    {user && user.role === "recruiter" && (
                      <Link to="/admin/companies" className="block">
                        <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors cursor-pointer">
                          <Settings className="w-4 h-4" />
                          <span className="text-sm font-medium">Dashboard</span>
                        </div>
                      </Link>
                    )}

                    {/* Logout */}
                    <div 
                      onClick={logoutHandler}
                      className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm font-medium">Logout</span>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
