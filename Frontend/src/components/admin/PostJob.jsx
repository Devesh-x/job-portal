import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectValue,
} from "../ui/select";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";

const PostJob = () => {
  useGetAllCompanies(); // Fetch companies when component mounts
  
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 1,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company)=>company.name.toLowerCase() === value);
    setInput({...input, companyId:selectedCompany._id}); 
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!input.title || !input.description || !input.requirements || !input.salary || 
        !input.location || !input.jobType || !input.experience || !input.position || !input.companyId) {
      toast.error("Please fill in all fields and select a company");
      return;
    }
    
    try {
        setLoading(true);
        console.log("Posting job with data:", input);
        const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        if(res.data.success){
            toast.success(res.data.message);
            navigate("/admin/jobs");
        }
    } 
    catch(error){
        console.error("Job posting error:", error);
        const errorMessage = error.response?.data?.message || "Failed to post job. Please try again.";
        toast.error(errorMessage); 
    }
    finally{
        setLoading(false);
    }  
  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form onSubmit={submitHandler} className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md">
          <h1 className="font-bold text-2xl mb-6 text-center">Post New Job</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Job Title *</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="e.g. Senior React Developer"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                required
              />
            </div>
            <div>
              <Label>Company *</Label>
              {companies.length > 0 ? (
                <Select onValueChange={selectChangeHandler} required>
                  <SelectTrigger className="w-full my-1">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <Input 
                  disabled 
                  placeholder="No companies available" 
                  className="my-1"
                />
              )}
            </div>
            <div className="col-span-2">
              <Label>Job Description *</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Describe the role and responsibilities"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                required
              />
            </div>
            <div className="col-span-2">
              <Label>Requirements *</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                placeholder="e.g. React, Node.js, 3+ years experience (comma separated)"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                required
              />
            </div>
            <div>
              <Label>Salary *</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                placeholder="e.g. 80000"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                required
              />
            </div>
            <div>
              <Label>Location *</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="e.g. San Francisco, CA or Remote"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                required
              />
            </div>
            <div>
              <Label>Job Type *</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                placeholder="e.g. Full-time, Part-time, Contract"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                required
              />
            </div>
            <div>
              <Label>Experience Level (years) *</Label>
              <Input
                type="number"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                placeholder="e.g. 3"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                required
              />
            </div>
            <div className="col-span-2">
              <Label>Number of Positions *</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                placeholder="e.g. 2"
                min="1"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                required
              />
            </div>
          </div>

            {
            loading? <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait </Button> : <Button type="submit" className="w-full my-4">Post New Job</Button>
          }
          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please register a company first, before posting jobs{" "}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
