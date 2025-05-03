import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { NavLink, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Register = () => {
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false)
  const [inputValue, setInputValue] = useState({
    fullname:"",
    email:"",
    phonenumber:"",
    password:"",
  })
  const [data ] = useState([]); //setData 
  console.log(inputValue)

  const getData = (e) =>{
    const{value,name} = e.target;

    setInputValue(()=>{
      return{
        ...inputValue,[name]:value
      }
    })
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    const {fullname,email,phonenumber,password} = inputValue

    if (fullname === "") {
      toast.error(' name field is requred!',{
          position: "top-right",
      });
  } else if (email === phonenumber === "") {
       toast.error('email field is requred',{
          position: "top-center",
      });
  } else if (!email.includes("@")) {
       toast.error('plz enter valid email addres',{
          position: "top-center",
      });
  
  } else if (password === "") {
       toast.error('password field is requred',{
          position: "top-center",
      });
  } else if (password.length < 5) {
       toast.error('password length greater five',{
          position: "top-center",
      });
  } 
  else{
    console.log("data added successfully")
    setIsLoading(true)
    navigate("/login")
    localStorage.setItem("user",JSON.stringify([...data,inputValue]))
    
  }
}

return (
  <div className=" max-w-[1300px]  bg-[#FAFAF9] mx-auto shadow-card overflow-x-hidden">
      <div className="px-2 container flex justify-center items-center">
        <div className="outer">
        <ToastContainer/>
        </div>

        <div className= "bg-white translate-y-[5%] md:translate-y-[5%] md:w-[436px] w-full  h-[550px] opacity-50 rounded-lg hover:opacity-90 flex  flex-col px-4 md:px-[20px] py-[30px]">
          <h3 className="text-[30px] flex justify-center w-full text-blue-500 font-bold">Create an accout</h3>
          <form className="flex flex-col gap-3  md:px-[30px] mt-4">
              <label>Fullname:</label>
              <input type="name" name='fullname'  onChange={getData} className="px-4 placeholder-blue-300 py-[16px] rounded-lg border-[1.8px] border-blue-400" />
              <label>Email/PhoneNumber:</label>
              <input type="email" name='email'  onChange={getData} className="px-4 placeholder-blue-300 py-[16px] rounded-lg border-[1.8px] border-blue-400" />
              <label>Password:</label>
              <input type="password" name='password' onChange={getData} className="px-4 focus:border-blue-500 placeholder-gray-600 py-[16px] rounded-lg border-[1.8px] border-blue-400" />
             {/*  <div className="flex justify-between  mt-2">
               <div className="flex items-center gap-1">
                <input type="checkbox" className=""/>
                <span className="text-[px2rem(12)]">Remenber Me</span>
               </div>
               <div>
                <span  className="text-[px2rem(12)] text-blue-500 underline cursor-pointer">Forget password?</span>
               </div>
              </div> */}
              <div className="w-full flex justify-center">
              <button onClick={handleSubmit} className="mt-2 rounded-lg border-[1.8px]  hover:bg-blue-400 bg-blue-500  text-[#fff] text-[20px] border-blue-500 w-full py-3 flex justify-center font-normal">
              {isLoading ? <ClipLoader size={20} color="#fff" /> : "Submit"}
              </button>
              </div>
              <p className="flex w-full text-[14px]  justify-center  items-center">Already have an accout?<NavLink to="/login"  className="text-[12px]  text-blue-500 ml-1 cursor-pointer underline">Sign in here</NavLink></p>
          </form>
      </div>
      </div>
      </div>

  )
}

export default Register
