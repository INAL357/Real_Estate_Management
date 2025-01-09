import {  useState } from "react";
import { Link } from "react-router-dom";
// import { MdUpload } from "react-icons/md";
import axios from "axios";



const Registration = () => {
  const [firstname,setFirstName] = useState('')
  const [lastname,setLastName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')


 
  const handleSubmit = async()=>{
      try {
        await axios.post("http://localhost:4000/api/auth/register",{
          firstname,
          lastname,
          email,
          password,
          confirmPassword,
        })
      } catch (error) {
        console.log(error.message)
      }
  }

  return (
    <div className="absolute inset-0 bg-black/40 z-50 flex items-center justify-center">
      <form
        className="flex flex-col gap-4 bg-white max-w-sm w-full p-8 rounded-xl shadow-lg text-sm"
        onSubmit={handleSubmit}
      >
        <h3 className="text-xl font-semibold text-center text-gray-800">Sign Up</h3>

        {/* First Name */}
        <input
          // onChange={handleChange}
          // value={formData.firstName}
          onChange={(e)=>setFirstName(e.target.value)}
          value={firstname}
          type="text"
          name="firstName"
          placeholder="First Name"
          required
          className="bg-gray-100 border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Last Name */}
        <input
          // onChange={handleChange}
          // value={formData.lastName}
          onChange={(e)=>setLastName(e.target.value)}
          value={lastname}
          type="text"
          name="lastName"
          placeholder="Last Name"
          required
          className="bg-gray-100 border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Email */}
        <input
          // onChange={handleChange}
          // value={formData.email}
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="bg-gray-100 border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password */}
        <input
          // onChange={handleChange}
          // value={formData.password}
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
          type="password"
          name="password"
          placeholder="Password"
          required
          className="bg-gray-100 border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Confirm Password */}
        <input
          // onChange={handleChange}
          // value={formData.confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          value={confirmPassword}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          className="bg-gray-100 border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password Mismatch Warning */}
        {/* {!passwordMatch && <p className="text-red-500 text-xs">Passwords do not match</p>} */}

        {/* Profile Image Upload */}
        {/* <input
          onChange={handleChange}
          type="file"
          name="profileImage"
          id="image"
          accept="image/*"
          hidden
        />
        <label
          htmlFor="image"
          className="flex items-center justify-center ring-1 ring-slate-900/10 p-1 h-16 w-16 rounded hover:ring-blue-500"
        >
          {formData.profileImage ? (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profileImg"
              className="p-1 h-16 object-contain aspect-square"
            />
          ) : (
            <MdUpload className="text-tertiary text-2xl" />
          )}
        </label> */}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
        >
          Register
        </button>

        {/* Redirect to Login */}
        <div className="text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Registration;
