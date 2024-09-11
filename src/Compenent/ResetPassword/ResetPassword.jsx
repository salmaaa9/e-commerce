import { useState, useEffect, useContext } from "react";
import Style from "./ResetPassword.module.css";
import axios from "axios";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { UserContext } from "../../Context/UserContext";

let userSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number'),
});

function ResetPassword() {
  const [isLoading, setisLoading] = useState(false);
  const {setToken} = useContext(UserContext);
  const navigate = useNavigate()

  useEffect(() => {
    console.log("mounting ResetPassword");
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password:"",
    },
    onSubmit: resetPassword,
    validationSchema: userSchema,
  });

  async function resetPassword(values) {
    
    setisLoading(true)
    try {
      const res = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          "email": values.email,
          "newPassword": values.password 
        }
      );
      console.log(res.data);
      setToken(res.data.token);
      navigate('/')
    } catch (error) {
    console.log(error);

  }
    finally {
      setisLoading(false)
    }
  }

if(isLoading){
  return <Loading/>
}
  return (<>
  
    <div className="">
      <form onSubmit={formik.handleSubmit} action="" className="my-20 mx-12">
      <h2 className="mb-10 font-bold text-2xl">Reset your password</h2>
        <input
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="email" // Correct the name attribute
          id="email"
          placeholder="email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
        ) : null}
        <input
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="password" // Correct the name attribute
          id="password"
          placeholder="password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
        ) : null}
        
        <button
          type="submit"
          className="border-green-600 text-green-600 px-3 py-2 border-2 rounded-md mt-10 hover:bg-green-600 hover:text-white transition-all duration-300"
        >
          Reset Password
        </button>
        
      </form>
      
    </div>
  
  </>);
  
}

export default ResetPassword;