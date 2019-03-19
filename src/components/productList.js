import React from 'react';
import axios from 'axios';
import { urlApi } from './../support/urlApi';
import './../support/css/product.css';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import {addToCart} from './../1.actions';



class ProductList extends React.Component{
    state = {listProduct : [],product : {}}

    // componentdidmount digunakan ketika langsung mau tampil di web sedangkan kalau onclick tidak perlu componennpm didmount
    componentDidMount = () => {
        this.getDataProduct() 
    }

    getDataProduct = () => {
        axios.get(urlApi + '/products')
        .then((res) => this.setState({listProduct : res.data}))

        .catch((err) => console.log(err))
    }

    getDataApi = () => {
        var idUrl = this.props.match.params.id // id harus sesuai dengan yg ada di app.js yg di route product-detail
        axios.get(urlApi + '/products/' + idUrl)
        .then((res) => {
            this.setState({product : res.data})
        })
        .catch((err) => console.log(err))
    }

    AddBtnCart = () => {
        var qty = parseInt(this.refs.inputQty.value)
        var note = this.refs.note.value
        var newObj={}
        newObj={...this.state.product,id_product:this.state.product.id,id_user : this.props.id, qty:qty,note:note}
        delete newObj.id
        swal("Add To Cart!!", "Selamat Anda Berhasil Add Product", "success");
        this.props.addToCart(newObj)


    }

    renderProdukJsx = () => {
        var jsx = this.state.listProduct.map((val) => {
            // untuk kolom search button
            // if(val.nama.toLowerCase().includes(this.props.search.toLowerCase())){
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
                                 <input type="button" className="d-block btn btn-primary" onClick={this.AddBtnCart} value="Add To Cart"></input>
                            </div>
                    </div>
                ) 
            // }
            
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

const mapStateToProps = (state) => {
    return{
      username : state.user.username,
      id : state.user.id,
      cart : state.cart.cart
    }
  }

export default connect (mapStateToProps,{addToCart})(ProductList)