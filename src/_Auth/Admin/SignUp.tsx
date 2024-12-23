import React, { useState } from "react";
import { Link } from "react-router-dom";
import googleIcon from "../../assets/svgs/google-icon.svg";
import miscrosoftIcon from "../../assets/svgs/microsoft-icon.svg";

const SignUp = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission logic
  };

  return (
    <div className=" flex items-cente max-h-[621px] max-w-[480px] ">
      <div className=" w-full h-full">
        {/*  */}
        <div>
          <h2 className="text-3xl text-[#1B1818] font-bold">Create account</h2>
          <p className=" mb-4 text-[#645D5D] text-sm">
            Have an account ?{" "}
            <Link to="/signin">
              <span className=" text-primary900">Sign in</span>
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#101928] text-sm font-medium">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-lg"
              // required
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#101928] text-sm font-medium">
              Company Email Address
            </label>
            <input
              type="email"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-lg"
            />
          </div>
          {/* <div className="mb-4">
            <label className="block text-[#101928] text-sm font-medium">Company size</label>
            <input
              type="email"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-lg"
              required
            />
          </div> */}
          <div className="mb-4">
            <label className="block text-[#101928] text-sm font-medium">
              Password
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-lg"
              // required
            />
          </div>
          <div className="mb-6">
            <label className="block text-[#101928] text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-lg"
              // required
            />
          </div>
          <Link to="/otp">
            <button
              type="submit"
              className="w-full bg-primary500 text-white py-3 rounded-lg font-bold"
            >
              Sign Up
            </button>
          </Link>
        </form>
        <p className=" text-center my-4">or</p>
        <div className=" flex gap-4">
          <button className="w-full  border-[1.5px] border-[#D0D5DD] py-2 rounded-lg font-semibold text-[#344054] flex items-center justify-center gap-2 px-4 ">
            <img src={googleIcon} alt="" />
            Google
          </button>
          <button className="w-full  border-[1.5px] border-[#D0D5DD] py-2 rounded-lg font-semibold text-[#344054]  flex items-center justify-center gap-2 px-4 ">
            <img src={miscrosoftIcon} alt="" />
            Microsoft
          </button>
        </div>
        {/*  */}
        <div className=" flex items-start  gap-2 mt-4">
          <input type="checkbox" className=" mt-2" />
          <p className=" text-greyText text-sm">
            I agree to
            <span className=" text-[#001E88]">
              {" "}
              Pyralink Terms of Service, Payment Terms of Service{" "}
            </span>
            and I acknowledge{" "}
            <span className=" text-[#001E88]">Policy Privacy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
