import React, { Component } from 'react';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Manage from './components/admin/manageProduct'
import Register from './components/Register'
import Histori from './components/historyTrans'
import Product from './components/productList'
import PageNotFound from './components/pageNotFound'
import ProductDetail from './components/productDetail'
import ScrollToTop from './components/scrollToTop' 
import { connect } from 'react-redux'
import { keepLogin,keepCart,cookieChecked } from './1.actions'
import { Route,withRouter,Switch } from 'react-router-dom'    // withrouter =>untuk tersambung ke reducer dengan connect, tapi dalam komponen ada routing
import cookie from 'universal-cookie'
import Cart from './components/user/cart'
import './App.css';



const objCookie = new cookie()
class App extends Component {
  // Untuk menjalankan keep login ketika di refresh tidak assign ke awal
  componentDidMount(){
    var terserah = objCookie.get('userData')
    if(terserah !== undefined){
      this.props.keepLogin(terserah)

    }else{
      this.props.cookieChecked()
    }

    var arrCookie = objCookie.get('userDataCart')
    if(arrCookie !== undefined){
      this.props.keepCart(arrCookie)
    }
  }

  render() {
    if(this.props.cookie){
    return (
      <div>
          <Navbar/>
          <ScrollToTop>
          <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/login' component={Login} exact/>
          <Route path='/register' component={Register} exact/>
          <Route path='/product' component={Product} exact/>
          <Route path='/manage' component={Manage} exact/>
          {
            this.props.username === '' ?
          <Route path='/history/:id' component={Histori} exact/>
          : <Route path='/history' component={Histori} exact/>
          }
          <Route path='/product-detail/:id' component={ProductDetail} exact/>
          {
            this.props.username === '' ?
          <Route path='/cart/:id' component={Cart} exact/>
          : <Route path='/cart/' component={Cart} exact/>
          }
          <Route path='/*' component={PageNotFound} exact/>
          </Switch>
          </ScrollToTop>
      </div>
    );
  }
  return<div>loading...</div>
  }
}


const mapStateToProps=(state)=>{
return{
  cookie : state.user.cookie,
  id: state.user.id,
  username : state.user.username
}
}


export default withRouter(connect (mapStateToProps,{keepLogin,keepCart,cookieChecked})(App));
