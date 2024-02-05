import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { AiFillCloseCircle } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();
  const notify = () => toast.success("Succcessfullly logged in");
  const { user, signIn,setAsUser } = UserAuth();

  console.log(user, "user");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isExistingUser, setIsExistingUser] = useState('')
  const [emailWrong, setEmailWrong] = useState('')
  const [passwordWrong, setPasswordWrong] = useState('')


  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleSubmit = async (e) => {
    if (!isValidEmail(email)) {
      setEmailWrong("Enter proper email");
      emailRef.current.focus();
      setTimeout(() => {
        setEmailWrong('');
      }, 3000);
      return;
    }
    if (password.length < 6) {
      setPasswordWrong("Password must be more than 6 charecters");
      passwordRef.current.focus();
      setTimeout(() => {
        setPasswordWrong('');
      }, 3000);
      return;
    }
    e.preventDefault();
    try {
      const userCredential = await signIn(email, password);
      console.log(userCredential,"userCredential");
      setAsUser(userCredential.displayName);
      notify()
      navigate('/')
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode);

      if (errorCode === "auth/invalid-email") {
        setEmailWrong('Invalid Email');
        emailRef.current.focus();
        setTimeout(() => {
            setEmailWrong('');
        }, 3000);
      } else if (errorCode === "auth/invalid-login-credentials") {
        setIsExistingUser("invalide Username or Password");
        passwordRef.current.focus();
        setTimeout(() => {
            setIsExistingUser('');
        }, 3000);
      } else if (errorCode === 'auth/missing-password') {
        setPasswordWrong("Invalid Password");
        setTimeout(() => {
            setPasswordWrong('');
        }, 3000);
      }else if(errorCode === 'auth/invalid-credential'){
        setPasswordWrong("invalid credentials");
        setTimeout(() => {
            setPasswordWrong('');
        }, 3000);
      } else {
        console.log("an error occurred:", errorMessage);
      }
    }
  };

  return (
    <>
      <div className="fixed w-full px-4 py-24 z-50">
        <div className="max-w-[450px] h-[600px] mx-auto bg-gray-200 text-black rounded">
          <button
            className="ml-auto p-3 bg-transparent border-0 text-black/40 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            onClick={() => navigate("/")}
          >
            <AiFillCloseCircle />
          </button>
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl md:text-4xl font-bold">Sign In</h1>
            {isExistingUser && (
                                <div>
                                    <p className="text-red-600 p-3 font-semibold">
                                        {isExistingUser}
                                    </p>
                                </div>
                            )}
            <form onSubmit={handleSubmit} className="w-full flex flex-col py-4">
              
            
              <input
                ref={emailRef}
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="p-3 my-2 bg-gray-50 rounded"
                placeholder="Email"
                type="email"
                autoComplete="email"
              />
              {emailWrong && (
                                    <p className="text-red-600 p-3 text-xs">
                                        {emailWrong}
                                    </p>
                                )}
              <input
                ref={passwordRef}
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="p-3 my-2 bg-gray-50 rounded"
                placeholder="Password"
                type="password"
                autoComplete="current-password"
              />
              {passwordWrong && (
                                    <p className="text-red-600 p-3 text-xs">
                                        {passwordWrong}
                                    </p>
                                )}
              {/* <input
                  required
                  onChange={(e)=>{
                    setConfirmPassword(e.target.value)
                  }}
                    className="p-3 my-2 bg-gray-600 rounded"
                    placeholder="Confirm Password"
                    type="password"
                    autoComplete="current-password"
                  /> */}

              <button className="bg-blue-500 text-white py-3 my-6 rounded font-bold">
                Sign Up
              </button>

              <p className="py-8">
                <span className="text-gray-500">New here?</span>
                <Link to="/signup"> Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      <Toaster />
    </>
  );
};

export default Login;
