import React, { useEffect, useState } from 'react'
import '../UserSearch/UserSearch.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getSearchResults, resetSearchResults } from '../../../redux/search-slice';
import UserProductTile from '../UserProductTile/UserProductTile';
import { fetchProductDetails } from '../../../redux/shopProduct-slice';
function UserSearch() {

    const [keyword, setKeyword] = useState('');
    const [searchParams,setSearchParams]=useSearchParams()
    const {searchResults}=useSelector(state=>state.shopSearch)
    const dispatch=useDispatch()
    useEffect(() => {
        if(keyword && keyword.trim()!=='' && keyword.trim().length>3){
            setTimeout(() => {
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
                dispatch(getSearchResults(keyword))
            }, 1000);
        }else{
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
            dispatch(resetSearchResults())
        }
    }, [keyword])
    console.log(searchResults,'seearch result');
    

    const navigate=useNavigate()
    function handleGetProductDetails(getCurrentProductId){
        console.log(getCurrentProductId);
        dispatch(fetchProductDetails(getCurrentProductId))
        navigate('/user/product')
    }
  return (
    <div className='UserSearch'>
        <div className="search-input">
            <input 
                type="text" 
                placeholder='Search'
                value={keyword}
                name='keyword'
                onChange={(event)=>setKeyword(event.target.value)}/>
        </div>
        <div className="search-result">
            {
                searchResults && searchResults.length>0?
                searchResults.map((item,idx) =><UserProductTile product={item} key={idx} handleGetProductDetails={handleGetProductDetails}/>):(
                    <h2>No Items Found!</h2>
                )
            }
        </div>
    </div>
  )
}

export default UserSearch