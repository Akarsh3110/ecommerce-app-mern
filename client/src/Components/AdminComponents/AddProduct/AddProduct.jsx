import React, { useContext, useEffect, useState } from 'react'
import '../AddProduct/AddProduct.css'
import PenIcon from '../../../assets/SimpleIcons/icon-park-outline.png'
import AddSolidIcon from '../../../assets/SimpleIcons/zondicons_add.png'
import ImageUpload from '../ImageUpload/ImageUpload'
import ChevronRight from '../../../assets/SimpleIcons/chevron-right.png'
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from '../../../redux/product-slice'
import { toast } from "react-toastify";
import { useLocation, useNavigate } from 'react-router-dom'
import AdminProduct from '../AdminProduct/AdminProduct'
import { EditFormContext } from '../../../Contexts/Editform'

// const initialState={
//     image:null,
//     title:'',
//     description:'',
//     saleprice:'',
//     realprice:'',
//     measurement:'',
//     colors:[],
//     category:'',
//     stock:'',
//     label:'',
// }

function AddProduct() {
    // const [openAddProduct, setopenAddProduct] = useState(false)
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('')
    const [imageLoadingState, setImageLoadingState] = useState(false)
    // const [currentEditedId, setcurrentEditedId] = useState(null)
    
    // const [colors, setColors] = useState([]);
  
    // const [formValues, setFormValues] = useState({
    //     image:null,
    //     title:'',
    //     description:'',
    //     saleprice:'',
    //     realprice:'',
    //     measurement:'',
    //     colors:[],
    //     category:'',
    //     stock:'',
    //     label:'',
    // })

    const {formValues,setFormValues}=useContext(EditFormContext)
    const{setcurrentEditedId,currentEditedId}=useContext(EditFormContext)
   
      console.log(formValues);
      const location = useLocation();
    const currentProductId = location.state?.id;

      const handleInputs = (e) => {
        const { name, value } = e.target;
        setFormValues((prevformValues) => ({
            ...prevformValues,
            [name]: value,
        }));
    };

    //   const handleInputs=(e)=>{
    //     setFormValues({
    //       ...formValues,
    //       [e.target.name]:e.target.value
    //     })
    //   }

      const handleColorChange = (e) => {
        const newColor = e.target.value;
        setFormValues((prevformValues) => ({
            ...prevformValues,
            colors: [...prevformValues.colors, newColor],  // Add new color to the array
        }));
    };
    const toastOptions = {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      };
    
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {productList}=useSelector(state=>state.adminProducts)

      const handleSubmit=(e)=>{
        e.preventDefault();
        currentEditedId!==null?
        dispatch(editProduct({
            id:currentEditedId,
            formValues
        })).then((data)=>{
            console.log(data,"Edit");
            if(data?.payload?.success){
                dispatch(fetchAllProducts())
                setImageFile(null)
                setFormValues('')
                setcurrentEditedId(null)
                toast.success('Product Edited Succesfully',toastOptions)
                navigate('/admin/products')
            }
        })

        :dispatch(addNewProduct({
            ...formValues,
            image:uploadedImageUrl
        })).then((data)=>{
            console.log(data);
            if(data?.payload?.success){
                dispatch(fetchAllProducts())
                setImageFile(null)
                setFormValues('')
                toast.success('Product Added Succesfully',toastOptions)
                navigate('/admin/products')
            }
        })
      }

      useEffect(() => {
        dispatch(fetchAllProducts())
      }, [dispatch])

      console.log(productList,"productList");
      console.log(currentEditedId);
      
    //   function isFormValid(){
    //     return Object.keys(formValues).map((key)=>formValues[key]!=='').every((item)=>item)
    //   }

    

    // function handleDelete(id){
    //     // console.log(currentEditedId);
    //     dispatch(deleteProduct(id)).then((data)=>{
    //         if(data?.payload?.success){
    //             dispatch(fetchAllProducts())
    //             setFormValues('');
    //         }
    //     })
    // }
    const handleDelete = () => {
        if (currentProductId) {
            dispatch(deleteProduct(currentProductId)).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllProducts());
                    setFormValues('');  
                    setImageFile(null)
                    toast.success('Product Deleted Succesfully',toastOptions)
                    navigate('/admin/products')
                }
            });
        }
    };
      

  return (
    <div className='AddProduct'>
        <div className="addproduct-contents">
            <h2>
                {
                   currentEditedId !== null? 'Edit Product': 'Add Product'
                }
            </h2>
            <form onSubmit={handleSubmit} className="addproduct-container">
                {/* <div className="imageupload"></div> */}
                <ImageUpload 
                    formValues={formValues}
                    handleInputs={handleInputs}
                    imageFile={imageFile} 
                    setImageFile={setImageFile} 
                    uploadedImageUrl={uploadedImageUrl} 
                    setUploadedImageUrl={setUploadedImageUrl}
                    imageLoadingState={imageLoadingState}
                    setImageLoadingState={setImageLoadingState}
                />
                <div className="addproduct-form">
                    <div className="input-title">
                        <input 
                            type="text"  
                            required
                            placeholder='ADD PRODUCT TITLE'
                            name='title'
                            value={formValues.title}
                            onChange={handleInputs}/>
                        <img src={PenIcon} alt="edit" />
                    </div>
                    <input 
                        className='input-description' 
                        required
                        type="text" 
                        placeholder='Add description'
                        name='description'
                        value={formValues.description}
                        onChange={handleInputs}
                    />
                    <div className="prices">
                        <div className="sale-price">
                            <img src={AddSolidIcon} alt="add" />
                            <input 
                                type="number" 
                                required
                                placeholder='Add Price'
                                name='saleprice'
                                value={formValues.saleprice}
                                onChange={handleInputs}/>
                        </div>
                        <div className="real-price">
                            <img src={AddSolidIcon} alt="add" />
                            <input 
                                type="number" 
                                required
                                placeholder=' Add MRP or Price Before Discount'
                                name='realprice'
                                value={formValues.realprice}
                                onChange={handleInputs}
                            />
                        </div>
                    </div>
                    <div className="mid-form">
                        <div className="measurement">
                            <label>Measurements</label>
                            <input 
                                type="text"  
                                required
                                placeholder='Add details'
                                name='measurement'
                                value={formValues.measurement}
                                onChange={handleInputs}
                            />
                        </div>
                        <div className="color">
                            <label htmlFor="colorpicker">Add colors</label>
                            <input 
                                type="color" 
                                required
                                id="colorpicker" 
                                name='colors'
                                // value={formValues.colors}
                                onChange={handleColorChange}
                            />
                            <img src={ChevronRight} alt="right" />
                        </div>   
                    </div>
                    <input 
                        className='category' 
                        required
                        type="text" 
                        placeholder='Category'
                        name='category'
                        value={formValues.category}
                        onChange={handleInputs}
                    />
                    <input 
                        className='stock' 
                        required
                        type="number" 
                        placeholder='Stock'
                        name='stock'
                        value={formValues.stock}
                        onChange={handleInputs}
                    />
                    {currentEditedId !== null &&(
                    <button className='delete' onClick={()=>handleDelete(currentEditedId)}>
                        {currentEditedId!==null? 'Remove this product':''}
                    </button>)
                    }
                    <button className='saveAdd' type='submit'>
                        {currentEditedId!==null?'Save Changes':'Add Product'}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddProduct