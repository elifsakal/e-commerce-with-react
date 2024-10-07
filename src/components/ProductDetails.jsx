import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { setSelectedProduct } from '../redux/slices/productSlices';
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { addToBasket, calculateBasket } from "../redux/slices/basketslice"

function ProductDetails() {
    const {id} = useParams();
    const {products , selectedProduct} = useSelector((store) => store.product)

    const { price, image, title, description} = selectedProduct;

    const [count , setCount] = useState(0);

    const dispatch = useDispatch();

    const increment = () => {
        setCount(count +1)
    }

    const decrement = () => {
        setCount(count-1)
    }

    const addBasket = () => {
        const payload = {
            id,
            price,
            image,
            title,
            description,
            count 
        }
        dispatch (addToBasket(payload));
        dispatch (calculateBasket());
    }

    useEffect(() =>{
        getProductById();
    }, [])

    const getProductById = () => {
        products && products.map((product) => {
            if(product.id == id) {
                dispatch(setSelectedProduct(product))
            }
        })
    }

  return (
    <div style={{marginTop:"30px", display:"flex" , flexDirection:"row" , justifyContent: "center"}}>
        <div style={{marginRight:"40px"}}>
        <img src={image} width={340} height={500}/>
        </div>
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
            <h1>{price}₺</h1>
            <div style={{display:"flex" , alignItems:"center"}}>
            <CiCircleMinus onClick={decrement} style={{fontSize:"40px" , marginRight: "5px"}}/><span style={{fontSize:"35px"}}>{count}</span><CiCirclePlus onClick={increment} style={{fontSize:"40px" , marginLeft: "5px"}}/>
            </div>
            <div>
                <button onClick={addBasket} style={{ marginTop:"25px", border:"none" ,padding: "10px" ,backgroundColor:"orange" ,borderRadius:"5px"}}>Sepete Ekle</button>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails