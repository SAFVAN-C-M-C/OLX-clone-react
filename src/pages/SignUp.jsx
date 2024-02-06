import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { AiFillCloseCircle } from "react-icons/ai";

const SignUp = () => {
  const navigate = useNavigate();
  const notify = () => toast.success("Succcessfullly logged in");
  const { user, signUp, setAsUser } = UserAuth();

  console.log(user, "user");

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const phoneRef =useRef(null)
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber,setPhoneNumber]=useState('')
  const [isExistingUser, setIsExistingUser] = useState("");
  const [userNameState, setUserNameState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [emailState, setEmailState] = useState("");
  const [phoneState, setPhoneState] = useState("");

  const validateUserName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    if (name.trim().length < 4 || !regex.test(name)) {
      return false;
    }
    return true;
  };
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
function isValidNumber(phoneNumber){
  const phoneNumberPattern = /^\+?\d{0,4}\d{10}$/;
  return phoneNumberPattern.test(phoneNumber)
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setEmailState("Enter a proper email");
      emailRef.current.focus();
      setTimeout(() => {
        setEmailState("");
      }, 3000);
      return;
    }
    if (!validateUserName(userName)) {
      setUserNameState("Enter a proper name");
      nameRef.current.focus();
      setTimeout(() => {
        setUserNameState("");
      }, 3000);
      return;
    }
    if (password.length < 6) {
      setPasswordState("Password must be more than 6 charecters");
      passwordRef.current.focus();
      setTimeout(() => {
        setPasswordState("");
      }, 3000);
      return;
    }
    if(!isValidNumber(phoneNumber)){
      setPhoneState("Enter valid phone number with country code");
      phoneRef.current.focus();
      setTimeout(()=>{
        setPhoneState('');
      },3000)
      return
    }

    try {
      const userCredential = await signUp(email, password);
      console.log(userCredential.user, "usercredential in signup");
      const date = new Date().toLocaleDateString();
      const userData = {
        Username: userName,
        Email: email,
        Phone:phoneNumber,
        Password: password,
        CreatedAt: date,
      };

      console.log(`its uid ${userCredential.user.uid}`);

      await updateProfile(userCredential.user, { displayName: userName });

      await setDoc(doc(db, "users", userCredential.user.uid), userData);

      console.log("new user signed");
      setAsUser(userCredential.user);
      notify();
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode);

      if (errorCode === "auth/invalid-email") {
        setEmailState("invalid email");
        emailRef.current.focus();
        setTimeout(() => {
          setEmailState("");
        }, 3000);
      } else if (errorCode === "auth/weak-password") {
        setPasswordState("weak password");
        passwordRef.current.focus();
        setTimeout(() => {
          setPasswordState("");
        }, 3000);
      } else if (errorCode === "auth/email-already-in-use") {
        setIsExistingUser("email already in use");
        setTimeout(() => {
          setIsExistingUser("");
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
            <h1 className="text-3xl md:text-4xl font-bold">Sign Up</h1>
            {isExistingUser ? (
              <p className="p-2 my-2 bg-red-500">{isExistingUser}</p>
            ) : null}
            <form onSubmit={handleSubmit} className="w-full flex flex-col py-4">
              <input
                ref={nameRef}
                required
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                className="p-3 my-2 bg-gray-50 rounded"
                placeholder="Full name"
                type="text"
                autoComplete="name"
              />
              {userNameState && (
                <p className="text-xs text-red-600">{userNameState}</p>
              )}
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
              {emailState && (
                <p className="text-xs text-red-600">{emailState}</p>
              )}
              <input
                ref={phoneRef}
                required
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                className="p-3 my-2 bg-gray-50 rounded"
                placeholder="Phone number"
                type="tel"
                autoComplete="tel"
              />
              {phoneState && (
                <p className="text-xs text-red-600">{phoneState}</p>
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
              {passwordState && (
                <p className="text-xs text-red-600">{passwordState}</p>
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
                <span className="text-gray-500">Already have an Account?</span>
                <Link to="/login"> Sign In</Link>
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

export default SignUp;
