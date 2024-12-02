import React, { useContext, useEffect } from 'react'
import '../ProductStock/ProductStock.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, fetchAllProducts } from '../../../redux/product-slice';
import { Card } from "@mui/material";
import {Edit,Trash2 } from "lucide-react";
import { EditFormContext } from '../../../Contexts/Editform';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function ProductStock() {
    const {productList}=useSelector(state=>state.adminProducts);
    console.log(productList);
    const dispatch=useDispatch()
    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [dispatch])
    const navigate=useNavigate()

    const toastOptions = {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      };
    const{setFormValues,formValues}=useContext(EditFormContext)
    const{setcurrentEditedId,currentEditedId}=useContext(EditFormContext)
    // const handleEdit = () => {
    //     navigate('/admin/addproduct',{ state: { id: item._id }})
    //     setcurrentEditedId(item._id);
    //     setFormValues({
    //       image: item.image,
    //       title: item.title,
    //       description: item.description,
    //       saleprice: item.saleprice,
    //       realprice: item.realprice,
    //       measurement: item.measurement,
    //       colors: item.colors,
    //       category: item.category,
    //       stock: item.stock,
    //       label: item.label
    //     });
    //   };

    const handleDelete = (currentProductId) => {
        if (currentProductId) {
            dispatch(deleteProduct(currentProductId)).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllProducts());
                    // setFormValues('');  
                    // setImageFile(null)
                    toast.success('Product Deleted Succesfully',toastOptions)
                    navigate('/admin/products')
                }
            });
        }
    };
    
  return (
    <div className='ProductStock'>
        <div className="admin-productstock-content">
            <div className="titlstock">
                <h2>ProductStock</h2>
            </div>
            <div className="table-div">
            <table className="product-stock-table">
                <thead>
                <tr>
                    <th className='headtable'>Image</th>
                    <th className='headtable'>Product Title</th>
                    <th className='headtable'>Category</th>
                    <th>Piece</th>
                    <th>Available Color</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {productList.length > 0 ? (
                    productList.map((item, index) => (
                    <tr key={item.id || index}>
                        <td className='datatable'>
                            <Card className="product-image">
                                <img src={item.image} alt={item.title} />
                            </Card>
                        </td>
                        <td className='datatable'>{item.title}</td>
                        <td className='datatable'>{item.category}</td>
                        <td className='datatable'>{item.stock}</td>
                        <td>
                        <div className="color-container">
                            {item?.colors.map((color, i) => (
                            <div
                                key={i}
                                className="colorsList"
                                style={{ backgroundColor: color }}
                                title={color}
                            ></div>
                            ))}
                        </div>
                        </td>
                        <td className="stock-action-button">
                        <div className="footerButtons">
                            <div
                            className="pagemove-left"
                              onClick={() => {
                                setcurrentEditedId(item._id);
                                setFormValues(item);
                                navigate('/admin/addproduct',{ state: { id: item._id }});
                              }}
                            >
                            <Edit size={15} />
                            </div>
                            <div
                            className="pagemove-right"
                              onClick={() => handleDelete(item._id)}
                            >
                            <Trash2 size={15} color="#ef3826" strokeWidth={1.2} />
                            </div>
                        </div>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                        No Products Available
                    </td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>
        </div>
    </div>
  )
}

export default ProductStock