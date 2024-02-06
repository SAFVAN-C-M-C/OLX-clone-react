import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import AddProduct from "./pages/AddProduct";
import { AuthContextProvider } from "./context/AuthContext";
import {NavBar} from "./components/NavBar/NavBar";
import ProductDetailPage from "./pages/ProductDetailPage";
import Footer from "./components/Footer/Footer";
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
          <Route path="/Product-details/:id" element={<ProductDetailPage />} />
          <Route path="*" element={<h1>404 Page not found</h1>} />
        </Routes>
        <Footer/>

      </AuthContextProvider>
    </>
  );
}

export default App;
