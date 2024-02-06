import React from "react";
import { useData } from "../../context/DataContext";
import Card from "../Card/Card";
const Products = () => {
  const { data, incrementLimit, error } = useData();
  return (
    <>
    {
        data && (
            <div className="w-full ">
                <div className="m-16 rounded py-5 px-10 relative">
        <h1 className="text-2xl pb-3">Fresh Recommendations</h1>
        <div className="flex flex-wrap">
          {data.map((product) => {
            return <Card data={product} key={product.id} />;
          })}
          {error && (
            <div>
              <h1 className="text-red-500">{error}</h1>
            </div>
          )}
        </div>
      </div>
            </div>
          )
    }
    <div className="flex justify-center relative top-16 mb-6" onClick={incrementLimit}>
      <button className="border-2 rounded border-black p-3 font-bold hover:border-4 mb-10 hover:mb-9">
        Load More
      </button>
    </div>
    </>
  );
};

export default Products;
