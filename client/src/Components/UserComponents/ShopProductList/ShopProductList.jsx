import React, { useEffect, useState } from 'react'
import './ShopProductList.css'
import { useDispatch, useSelector } from 'react-redux'
import UserProductTile from '../UserProductTile/UserProductTile'
import { fetchAllFilteredProducts, fetchProductDetails } from '../../../redux/shopProduct-slice'
import { useNavigate, useSearchParams } from 'react-router-dom'
// import { Link } from "react-router-dom";
function ShopProductList() {
    
    const {productList}=useSelector(state=>state.shopProducts)
    console.log("Product List",productList);
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(fetchAllFilteredProducts())
    }, [dispatch])

    
    const navigate=useNavigate()
    function handleGetProductDetails(getCurrentProductId){
        console.log(getCurrentProductId);
        dispatch(fetchProductDetails(getCurrentProductId))
        navigate('/user/product')
    }

   

    const [selectedCategoryOption, setSelectedCategoryOption] = useState(""); // Track selected value
    const [filteredProducts, setFilteredProducts] = useState(productList);
    const [selectedSortOption, setSelectedSortOption] = useState('');
    const [searchParams,setSearchParams]=useSearchParams()
    useEffect(() => {
        // Initialize filteredProducts with the full productList when productList changes
        setFilteredProducts(productList);
    }, [productList]);

    useEffect(() => {
        let updatedProducts = [...productList];

        // Apply category filter
        if (selectedCategoryOption && selectedCategoryOption !== 'All') {
            updatedProducts = updatedProducts.filter(
                (product) => product.category === selectedCategoryOption
            );
        }

        // Apply sorting
        if (selectedSortOption === 'LowToHigh') {
            updatedProducts.sort((a, b) => a.saleprice - b.saleprice);
        } else if (selectedSortOption === 'HighToLow') {
            updatedProducts.sort((a, b) => b.saleprice - a.saleprice);
        } else if (selectedSortOption === 'A-Z') {
            updatedProducts.sort((a, b) => 
                (a.title || '').localeCompare(b.title || '')
            );
        } else if (selectedSortOption === 'Z-A') {
            updatedProducts.sort((a, b) => 
                (b.title || '').localeCompare(a.title || '')
            );
        }

        setFilteredProducts(updatedProducts);
    }, [productList, selectedCategoryOption, selectedSortOption]);

    const handleCategoryChange = (event) => {
        // const category = event.target.value;
        setSelectedCategoryOption(event.target.value); // Update state with selected value

        // if(category==='All' || category==""){
        //     setFilteredProducts(productList)
        // }else{
        //     // setFilteredProducts(productList.filter((product) =>product.category===category));
        //     const filtered = productList.filter((product) => product.category === category);
        //     console.log("Filtered products:", filtered);
        //     setFilteredProducts(filtered);

        // }
    };
    // console.log(selectedCategoryOption);
    
    // function handleFilter(selectedCategoryOption) {
        
    // }
    const handleSortChange = (event) => {
        setSelectedSortOption(event.target.value);
    };

     useEffect(() => {
        // Update searchParams when selectedCategoryOption changes
        if (selectedCategoryOption) {
            setSearchParams({ category: selectedCategoryOption });
        } else {
            setSearchParams({});
        }
    }, [selectedCategoryOption, setSearchParams]);

  return (
    <div className='ShopProductList'>
        <div className="productlist-container">
            <div className="product-toolbar">
                <div className="dropdowns">
                    <div className="dropdown-one">
                        <label htmlFor="dropdown">CATEGORIES</label>
                        <select 
                            id="dropdown" 
                            name="options"
                            value={selectedCategoryOption}
                            onChange={handleCategoryChange}>
                            {/* <option id='All' value="All">All</option> */}
                            <option id='LivingRoom' value="LivingRoom">LivingRoom</option>
                            <option id='Bedroom' value="Bedroom">Bedroom</option>
                            <option id='Kitchen' value="Kitchen">Kitchen</option>
                        </select>
                    </div>
                    <div className="dropdown-one">
                    <label htmlFor="dropdown">PRICES</label>
                        <select 
                            id="sort-dropdown"
                            name="sort-options"
                            value={selectedSortOption}
                            onChange={handleSortChange}>
                            <option value="LowToHigh">LowToHigh</option>
                            <option value="HighToLow">HighToLow</option>
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="product-grid-container">
                <div className="product-grid">
                    {
                        // productList && productList.length>0 ?
                        filteredProducts && filteredProducts.length?
                        filteredProducts.map((productItem)=> <UserProductTile product={productItem} handleGetProductDetails={handleGetProductDetails} />) : null
                    }
                </div>
                <button className='showmore'>Show more</button>
            </div>
        </div>
    </div>
  )
}

export default ShopProductList