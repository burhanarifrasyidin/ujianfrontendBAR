import React from 'react'
import Axios from 'axios';
import { urlApi } from '../support/urlApi';
import { connect } from 'react-redux';
import {addToCart} from './../1.actions';
import swal from 'sweetalert';



class ProductDetail extends React.Component{
    state = {product : {}}
    componentDidMount(){
        this.getDataApi()
    }

    getDataApi = () => {
        var idUrl = this.props.match.params.id // id harus sesuai dengan yg ada di app.js yg di route product-detail
        Axios.get(urlApi + '/products/' + idUrl)
        .then((res) => {
            this.setState({product : res.data})
        })
        .catch((err) => console.log(err))
    }

    addBtnCart = () => {
        var qty = parseInt(this.refs.inputQty.value)
        var note = this.refs.note.value
        var newObj={}
        newObj={...this.state.product,id_product:this.state.product.id,id_user : this.props.id, qty:qty,note:note}
        delete newObj.id
        swal("Add To Cart!!", "Selamat Anda Berhasil Add Product", "success");
        this.props.addToCart(newObj)


    }

    qtyValidation = () => {
        var qty = this.refs.inputQty.value
        if(qty < 1){
            this.refs.inputQty.value = 1
        }
    }

    render(){
        var{nama,harga,discount,img,deskripsi} = this.state.product
        return(
            <div className='container'>
                <div  className='row'>
                    <div className='col-md-4'>
                        <div className="card" style={{width: '100%'}}>
                            <img src={img} className="card-img-top" alt="..." />
                            <div className="card-body">
                            <p className="card-text"></p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-8'>
                        <h1 style={{color:'#4C4C4C'}}>{nama}</h1>
                        <div style={{backgroundColor:'#D50000',width:'50px',height:'20px',color:'white',textAlign:'center',fontWeight:'bold',display:'inline-block'}}>
                            {discount}%
                        </div>
                        <span style={{fontWeight:'600',fontSize:'15px',color:'#606060',marginLeft:'10px',textDecoration:'line-through'}}> Rp. {harga}</span>
                        <div style={{fontWeight:'700',fontSize:'24px',color:'#FF5722',marginTop:'20px'}}>Rp. {harga-(harga*(discount/100))}</div>

                        <div className='row'>
                            <div className='col-md-2'>
                                <div style={{marginTop:'20px',color:'#606060',fontWeight:'700',fontSize:'14px'}}>Jumlah</div>
                                <input type='number' ref='inputQty' onChange={this.qtyValidation} min={1} className='form-control' style={{width:'60px',marginTop:'10px'}}></input>
                            </div>
                            <div className='col-md-6'>
                                <div style={{marginTop:'20px',color:'#606060',fontWeight:'700',fontSize:'14px'}}>Catatan Untuk Penjual (Optional)</div>
                                <input ref ='note' type='text' placeholder='Ex : Contoh Warna Putih, Ukuran XL, Edisi ke-2'className='form-control' style={{width:'100%',marginTop:'10px'}}></input>   
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-md-8'>
                                <p style={{color:'#606060',fontStyle:'italic'}}>{deskripsi}</p>
                            </div>
                        </div>
                        {
                            this.props.username === '' ?
                        <div className='row mt-4'>
                            <input type='button' className='btn border-secondary col-md-2 ml-3' disabled value='Add To Wishlist'></input>
                            <input type='button' className='btn btn-primary col-md-2 ml-3' disabled value='Beli Sekarang'></input>
                            <input type='button' className='btn btn-success col-md-3 ml-3' disabled value='Masukkan Ke Keranjang'></input>
                        </div>
                         :
                         <div className='row mt-4'>
                         <input type='button' className='btn border-secondary col-md-2 ml-3' value='Add To Wishlist'></input>
                         <input type='button' className='btn btn-primary col-md-2 ml-3' value='Beli Sekarang'></input>
                         <input type='button' className='btn btn-success col-md-3 ml-3' value='Add To Cart' onClick={this.addBtnCart}></input>
                     </div>
                        }
                    </div>
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

export default connect (mapStateToProps,{addToCart})(ProductDetail);