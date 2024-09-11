
import axios from "axios";
import { useFormik } from "formik"
import { useContext, useEffect, useState } from "react"
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { UserContext } from "../../Context/UserContext";



// validation
  let userSchema = yup.object({
    name: yup.string().required().min(3).max(10),
    email: yup.string().required().email(),
    password: yup.string().required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number'),
    rePassword: yup.string().required().oneOf([yup.ref('password')],'the repassword is not compatible with password'),
    phone: yup.string().required().matches(/^01[0125][0-9]{8}$/,'phone must be egyption starts with'),
  });
// submit 

function Register() {
  const {setToken} = useContext(UserContext)
  const navigate = useNavigate();
  const [errMsg,setErrMsg] =  useState('');
  const [isLoading,setIsLoading] =  useState(false);

  async function handleSubmit(values){
    setIsLoading(true)
  try{
    const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
    console.log(data.message)
    if(data.message == 'success'){
      setToken(data.token);
      navigate('/');
    }
    setErrMsg('')
  }
  catch (error){
    console.log("da5lt fl catch");
    setErrMsg(error.response.data.message);
    console.log(error.response.data.message)
    }
    finally{
      setIsLoading(false);
    }
    
  }



    const formik = useFormik(
      {
        initialValues: {
          name: "",
          email: "",
          password: "",
          rePassword: "",
          phone:""
          },
          onSubmit: handleSubmit,
          validationSchema: userSchema,
      }
    )
     
    useEffect(()=>
        console.log("mounting Register")
        ,[])

  return (
   <>   
  <form onSubmit={formik.handleSubmit} className="mx-auto mt-14 container max-w-5xl relative px-4 dark:bg-gray-800">
  <h2 className="text-3xl font-bold mb-9 text-green-500">Register Now</h2>


  {errMsg!=''?<div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
  </svg>
  <span className="sr-only">Info</span>
  <div>
    <span className="font-medium">{errMsg}</span>
  </div>
  </div>:null
  }
  
  <div className="relative z-0 w-full mb-5 group">
      <input value={formik.values.name} onChange={formik.handleChange}  onBlur={formik.handleBlur} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
      {formik.errors.name && formik.touched.name?
     <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
     <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
     </svg>
     <span className="sr-only">Info</span>
     <div>
     <span className="font-medium">{formik.errors.name}</span> 
    </div>
     </div>: <div></div>
     }
  </div>

  <div className="relative z-0 w-full mb-5 group">
    <input value={formik.values.email} onChange={formik.handleChange}  onBlur={formik.handleBlur} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
    {formik.errors.email && formik.touched.email?
     <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
     <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
     </svg>
     <span className="sr-only">Info</span>
     <div>
     <span className="font-medium">{formik.errors.email}</span> 
    </div>
     </div>: <div></div>
     }
  </div>

  <div className="relative z-0 w-full mb-5 group">
    <input value={formik.values.password} onChange={formik.handleChange}  onBlur={formik.handleBlur} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
     
    {formik.errors.password && formik.touched.password?
     <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
     <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
     </svg>
     <span className="sr-only">Info</span>
     <div>
     <span className="font-medium">{formik.errors.password}</span> 
    </div>
     </div>: <div></div>
     }
  </div>

  <div className="relative z-0 w-full mb-5 group">
    <input value={formik.values.rePassword} onChange={formik.handleChange}  onBlur={formik.handleBlur} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
    <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
  
    {formik.errors.rePassword && formik.touched.rePassword?
     <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
     <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
     </svg>
     <span className="sr-only">Info</span>
     <div>
     <span className="font-medium">{formik.errors.rePassword}</span> 
    </div>
     </div>: <div></div>
     }
  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input value={formik.values.phone} onChange={formik.handleChange}  onBlur={formik.handleBlur} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
  
      {formik.errors.phone && formik.touched.phone ?
     <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
     <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
     </svg>
     <span className="sr-only">Info</span>
     <div>
     <span className="font-medium">{formik.errors.phone}</span> 
    </div>
     </div>: <div></div>
     }
  </div>

  <button disabled={isLoading} type="submit" className="text-white dark:disabled:bg-green-800 disabled:text-gray-400 disabled:hover: bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto absolute end-0 top-full mt-4 px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
    {isLoading?<FaSpinner className="animate-spin"/>:'Submit'}
    </button>
  </form>
   </>
  )
}

export default Register