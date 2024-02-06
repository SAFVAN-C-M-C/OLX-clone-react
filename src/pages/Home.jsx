import React from "react";
import Products from "../components/Products/Products";
import { DataContextProvider } from "../context/DataContext";
import CategoryNav from "../components/CategoryNav/CategoryNav";

const Home = () => {
  return (
    <>
      <div className="homeParentDiv pt-16">
        <CategoryNav/>
        <DataContextProvider>
          <Products />
        </DataContextProvider>
      </div>
    </>
  );
};

export default Home;
