import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import AddProduct from "./pages/AddProduct";
import NavBar from "./components/NavBar";
import { AuthContextProvider } from "./context/AuthContext";
function App() {
  return (
    <>
      <AuthContextProvider>

        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>

      </AuthContextProvider>
    </>
  );
}

export default App;
