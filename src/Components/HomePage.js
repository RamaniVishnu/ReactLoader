import { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import SpinnerLoader from "./loader/SpinnerLoader";

function HomePage() {
    const [product,setProduct] = useState([]);
    const [loader,setLoader] = useState(false);
    const [count,setCount] = useState(0);

    const loadProducts = useCallback(async()=>{
        if(loader || product.length> 0) return;
        setLoader(true);
        await axios.get(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=covergirl`)
        .then((response)=>{
            setProduct(response.data);
            setLoader(false)
        })
        .catch((error)=> console.log(error))
    },[product,loader])

    useEffect(()=>{
        loadProducts();
    },[loadProducts]);


    if(loader){
        return <SpinnerLoader />
    } else {
    return (
        <div>
            {

                product.map((prod)=> <img src={prod.image_link} alt="imfffff"/>)
            }
        </div>
    );
    }
}

export default HomePage;