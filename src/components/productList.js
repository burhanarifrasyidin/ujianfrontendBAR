import React from 'react';
import axios from 'axios';
import { urlApi } from './../support/urlApi';
import './../support/css/product.css';
import {Link} from 'react-router-dom';

class ProductList extends React.Component{
    state = {listProduct : []}

    // componentdidmount digunakan ketika langsung mau tampil di web sedangkan kalau onclick tidak perlu componennpm didmount
    componentDidMount = () => {
        this.getDataProduct() 
    }

    getDataProduct = () => {
        axios.get(urlApi + '/products')
        .then((res) => this.setState({listProduct : res.data}))

        .catch((err) => console.log(err))
    }

    renderProdukJsx = () => {
        var jsx = this.state.listProduct.map((val) => {
                return (
                    <div className="card col-md-3 mr-5 mt-3" style={{width: '18rem'}}>
                        <Link to={'/product-detail/' + val.id}><img src={val.img} height="200px" className="card-img-top" alt=".." /></Link>
                        {/* pakai if ternary (karena melakukan pengkondisian dalam retun) */}
                        {
                            val.discount > 0 ?
                            <div className="discount">{val.discount}%</div>
                            : null
                        }                      
                            <div className="category">{val.category}</div>
                            <div className="card-body">
                                 <h4 className="card-text">{val.nama}</h4>
                                 <h6 className="card-text">{val.deskripsi}</h6>
                                 {
                                 val.discount > 0 ?
                                 <p className="card-text" style={{textDecoration:'line-through',color:'red',display:'inline'}}>Rp. {val.harga}</p>
                                 : null
                                 }
                                 <p style={{display:'inline',marginLeft:'10px',fontWeight:'400'}}>Rp. {val.harga - (val.harga*(val.discount/100))}</p>
                                 <input type="button" className="d-block btn btn-primary" value="Add To Cart"></input>
                            </div>
                    </div>
                ) 
            
            // if(val.discount > 0){
            //     return (
            //         <div className="card col-md-3 mr-5 mt-3" style={{width: '18rem'}}>
            //             <img src={val.img} height="200px" className="card-img-top" alt=".." />
            //             <div className="discount">{val.discount}%</div>
            //             <div className="category">{val.category}</div>
            //                 <div className="card-body">
            //                      <h4 className="card-text">{val.nama}</h4>
            //                      <h6 className="card-text">{val.deskripsi}</h6>
            //                      <p className="card-text" style={{textDecoration:'line-through',color:'red',display:'inline'}}>Rp. {val.harga}</p>
            //                      <p style={{display:'inline',marginLeft:'10px',fontWeight:'400'}}>Rp. {val.harga - (val.harga*(val.discount/100))}</p>
            //                      <input type="button" className="btn btn-primary" value="Add To Cart"></input>
            //                 </div>
            //         </div>
            //     ) 
            // } else {
            //     return (
            //         <div className="card col-md-3 mr-5 mt-3" style={{width: '18rem'}}>
            //             <img src={val.img} height="200px" className="card-img-top" alt="..." />
            //             <div className="discount"></div>
            //             <div className="category">{val.category}</div>
            //                 <div className="card-body">
            //                      <h4 className="card-text">{val.nama}</h4>
            //                      <h6 className="card-text">{val.deskripsi}</h6>
            //                      <p style={{display:'inline'}} className="card-text">Rp. {val.harga}</p><br/>
            //                      <input type="button" className="btn btn-primary" value="Add To Cart"></input>
            //                 </div>
            //         </div>
            //     )
            // }
             
        })
        return jsx
    }
    render(){
        return (
            <div className='container'>
                <div className='row justify-content-center'>
                {this.renderProdukJsx()}
                </div>
            </div>
        )
    }
}

export default ProductList