import React, { useEffect, useRef, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { db, storage } from "../firebase/config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [PhoneNumber,setPhoneNumber]=useState('');
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage,setPreviewImage]=useState(null)
  const { user } = UserAuth();
  const [isExisting,setIsExisting]=useState(false);
  const [productNameState, setProductNameState] = useState("");
  const [categoryState, setCategoryState] = useState("");
  const [priceState, setPriceState] = useState("");
  const [imageState, setImageState] = useState("");
  const [phoneState,setPhoneState] = useState('');
  const productRef = useRef();
  const phoneRef = useRef();
  // const categoryRef = useRef();
  // const priceRef = useRef();
  // const imageRef = useRef();
  function isValidNumber(phoneNumber){
    const phoneNumberPattern = /^\+?\d{0,4}\d{10}$/;
    return phoneNumberPattern.test(phoneNumber)
  }
  const checkIfProductExists = async (productName) => {
    const productRef = collection(db, 'products');
    const q = query(productRef, where('productName', '==', productName), where('userId', '==', user.userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.empty;
  };
  // useEffect(()=>{
  //   console.log(checkIfProductExists(productName),"sdj ");
  // },[productName])
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    if(!isValidNumber(PhoneNumber)){
      setPhoneState("Enter valid phone number with country code");
      phoneRef.current.focus();
      setTimeout(()=>{
        setPhoneState('');
      },3000)
      return
    }
    // console.log(checkIfProductExists(productName),"=====================================");
    if(!await checkIfProductExists(productName)){
      setIsExisting(true);
      productRef.current.focus();
      setTimeout(()=>{
        setIsExisting(false);
      },3000)
      return
    }
    const date = new Date();
    if (
      productName?.trim() === null ||
      productName?.trim() === "" ||
      category?.trim() === null ||
      category?.trim() === "" ||
      price === null ||
      price === undefined ||
      isNaN(price) ||
      price < 1 ||
      image === null
    ) {
      console.log("in if");
      if (
        productName?.trim() === null &&
        category?.trim() === null &&
        price === null
      ) {
        productRef.current.focus();
        setProductNameState("Field requried");
        setCategoryState("Field requried");
        setPriceState("Field requried");
        setImageState("Field requried");
        setTimeout(() => {
          setProductNameState("");
          setCategoryState("");
          setPriceState("");
          setImageState("");
        }, 3000);
      } else {
        console.log(image);
        if (
          productName === null ||
          productName.trim() === null ||
          productName.trim() === ""
        ) {
          setProductNameState("Enter Product name");
          setTimeout(() => {
            setProductNameState("");
          }, 3000);
        }
        if (
          category === null ||
          category?.trim() === null ||
          category?.trim() === ""
        ) {
          setCategoryState("Enter Category name");
          setTimeout(() => {
            setCategoryState("");
          }, 3000);
        }
        if (
          price === null ||
          isNaN(price) ||
          price === undefined ||
          price < 1
        ) {
          setPriceState("Enter a proper price");
          setTimeout(() => {
            setPriceState("");
          }, 3000);
        }
        if (image === null || image === undefined) {
          setImageState("Select a image");
          setTimeout(() => {
            setImageState("");
          }, 3000);
        }
      }
      return;
    } else {
      try {
        const verifiedPrice = Math.abs(price);
        const storageRef = ref(storage, `products/${image.name}`);

        // Uploading the image to Firebase Storage
        const { metadata } = await uploadBytes(storageRef, image);

        // Getting the download URL of the uploaded image
        const url = await getDownloadURL(storageRef);

        // Adding a document to the "products" collection in Firestore
        await addDoc(collection(db, "products"), {
          userId: user.userId,
          userName:user.userName,
          productName,
          category,
          price: verifiedPrice,
          image: url,
          createdAt: date,
          Phone:PhoneNumber
        });

        console.log("Product added successfully");
        notify();
        navigate("/");
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file)
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };
  const navigate = useNavigate();
  const notify = () => toast.success("successfully added the product");

  return (
    <>
      <div className="container flex items-center w-full h-screen mt-24">
        <div className="max-w-sm rounded bg-gray-100  overflow-hidden shadow-lg mx-auto p-10">
          <h2 className="text-2xl font-bold mb-4">Add Product</h2>
          {isExisting && (
                                <div>
                                    <p className="text-red-600 p-3 font-semibold">
                                        The product is already published
                                    </p>
                                </div>
                            )}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-4">
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-600"
              >
                Product Name
              </label>
              <input
              ref={productRef}
                type="text"
                id="productName"
                name="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
              {productNameState && (
                <p className="text-red-600 p-3 text-xs">{productNameState}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-600"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
              {categoryState && (
                <p className="text-red-600 p-3 text-xs">{categoryState}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-600"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={(e) => {
                  const newPrice = parseFloat(e.target.value);
                  if (!isNaN(newPrice) && newPrice >= 1) {
                    setPrice(newPrice);
                  }
                }}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
              {priceState && (
                <p className="text-red-600 p-3 text-xs">{priceState}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="Phone"
                className="block text-sm font-medium text-gray-600"
              >
                Contact info
              </label>
              <input
                placeholder="eg:- +919999999999"
                type="tel"
                id="Phone"
                ref={phoneRef}
                name="Phone"
                value={PhoneNumber}
                onChange={(e) => {
                    setPhoneNumber(e.target.value);
                }}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
              {phoneState && (
                <p className="text-red-600 p-3 text-xs">{phoneState}</p>
              )}
            </div>
            
            {image && (
        <div className="mb-4">
          
          <img src={previewImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
        </div>
      )}
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-600"
              >
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
              {imageState && (
                <p className="text-red-600 p-3 text-xs">{imageState}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
