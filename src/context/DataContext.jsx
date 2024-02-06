import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/config";

const DataContext = createContext();
export const DataContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(8);
  // const [limitedData,setLimitedData]=useState([])

  useEffect(() => {
    const updateLimitedData=async()=>{
      const data =await getDataFromDb()
      const newLimitedData = [];

      if (limit <= data.length) {
        for (let i = 0; i < limit; i++) {
          newLimitedData.push(data[i]);
        }
      } else {
        for (let i = 0; i < data.length; i++) {
          newLimitedData.push(data[i]);
        }
      }

      if (!unmounted) {
        setData(newLimitedData);
      }
    };
    
    let unmounted = false;
    updateLimitedData();

    return () => {
      unmounted = true;
    };
  }, [limit]);

  const getDataFromDb = async () => {
    try {
      const Snapshot = await getDocs(collection(db, "products"));
      const products = [];
      Snapshot.forEach((snap) => {
        products.push({ productId: snap.id, snap: snap.data() });
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  };
  const incrementLimit = () => {
    setLimit((prevlimit) => prevlimit + 8);
    setLoading(true);
  };
  const getProduct=async(documentId)=>{
    const docRef = doc(db, "products", documentId);
    return getDoc(docRef);
  }

  return (
    <DataContext.Provider value={{ data, loading, error, incrementLimit,getProduct }}>
      {children}
    </DataContext.Provider>
  );
};


export const useData=()=>{
    return useContext(DataContext)
}