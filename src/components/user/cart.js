import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Axios from 'axios';
import { Button,Icon,Input } from 'semantic-ui-react';
import { urlApi } from '../../support/urlApi';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';



const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class CustomPaginationActionsTable extends React.Component {
  state = {
    rows: [],
    page: 0,
    rowsPerPage: 5,
    isEdit : false,
    editItem : {},
    
  };

  componentDidMount(){
    this.getDataApi()
  }

  getDataApi = () => {
      Axios.get(urlApi + '/cart?id_user=' + this.props.id)
      .then((res) => this.setState({rows : res.data}))
      .catch((err) => console.log(err))
  }

  
  handleChangePage = (event, page) => {
      this.setState({ page });
    };
    
    
    onBtnEditClick = (param) => {
        this.setState({isEdit : true, editItem : param})
    } 
    
    onBtnDelete = (id) => {
        Axios.delete(urlApi + '/cart/' + id)
        .then(() => {
            this.getDataApi()
            swal("Delete Product", "Selamat Anda Berhasil Delete", "success");
        })
        .catch((err) => console.log(err))
    };
    
    onBtnSave = () => {
        var nama = this.state.editItem.nama
        var harga = this.state.editItem.harga
        var discount = this.state.editItem.discount
        var category = this.state.editItem.category
        var img = this.state.editItem.img
        var deskripsi = this.state.editItem.deskripsi
        var id_product = this.state.id
        var id_user = this.props.id
        var qty = parseInt(this.qty.inputRef.value) === '' ? parseInt(this.state.editItem.qty) : parseInt(this.qty.inputRef.value)
        var note = this.state.editItem.note
    var newData = {id_user,id_product,note,nama,harga,discount,category,img,deskripsi,qty}
    Axios.put(urlApi + '/cart/'+ this.state.editItem.id,newData)
    .then((res) => {
        swal("Selamat!!", "Anda Berhasil Save Qty Produk", "success");
        this.getDataApi()
        this.setState({isEdit : false, editItem : {}})
        
    })
    .catch((err) => console.log(err))
}

onBtnCancel = () => {
    swal("Selamat!!", "Anda Berhasil Cancel Edit Qty Produk", "success");
    this.setState({isEdit : false, editItem : {}})
}

getTotalHarga = () => {
    var harga = 0 
    for(var i =0;i<this.state.rows.length;i++){
        harga += parseInt((this.state.rows[i].harga-(this.state.rows[i].harga*(this.state.rows[i].discount/100)))*this.state.rows[i].qty)
    }
    return harga
}

cekOut = () => {
    
    Axios.get(urlApi+'/cart?userId='+this.props.id)
    .then((res)=>{
    if (res.data.length>0){
      var arrCart = []
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = dd + '/' + mm + '/' + yyyy;
      var id_user =this.props.id
      var username = this.props.username
      var jumlahItem =res.data.length
      var newData = {tanggal:today,username,id_user,jumlahItem}
      for (var i=0; i < this.state.rows.length; i++){

      var qty = res.data[i].qty
      var nama = res.data[i].nama 
      var harga = res.data[i].harga 
      var discount= res.data[i].discount 
      var category = res.data[i].category 
      var img = res.data[i].img 
      var deskripsi = res.data[i].deskripsi
      var totalHarga = parseInt(qty*(harga-(harga*(discount/100))) )
      var dataCart = {id_user,qty,nama,harga,discount,category,img,deskripsi,totalHarga}
      arrCart.push(dataCart)
     
    

    Axios.post(urlApi+"/history/",{...newData, cart : arrCart})
    .then((res)=>{
    swal("Thank you","Please Come Again","success")
    })
    .catch((err)=>console.log(err))
   
    Axios.delete(urlApi+"/cart/"+this.state.rows[i].id)
    .then((res)=>{console.log(res)
    this.getDataApi()
    
    })
    .catch((err)=>console.log(err))
   
   
    }
    
    }else{
    swal("Item Kosong","Blank","error")
    }
    })
    .catch((err)=>console.log(err))
    }

  renderJsx = () => {
    var jsx = this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((val) => {
        return (
            <TableRow key={val.id}>
                <TableCell>{val.id}</TableCell>
                  <TableCell component="th" scope="row">
                    {val.nama}
                  </TableCell>
                  <TableCell>Rp. {val.harga}</TableCell>
                  <TableCell>{val.discount}%</TableCell>
                  <TableCell>{val.qty}</TableCell>
                  {/* {
                    this.state.isEdit===true && this.state.editIndex===index?
                  <TableCell align="center">
                  <input ref="quantity" type="number" defaultValue={val.qty}>
                  </input></TableCell>:
                  <TableCell align="center">{val.qty}</TableCell>
                  } */}
                  <TableCell>
                  <CurrencyFormat value={val.harga - (val.harga*(val.discount/100))*val.qty} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={value => <div>{value}</div>} />
                  </TableCell>
                  <TableCell>
                  <Button animated color='blue' onClick={() => this.onBtnEditClick(val)}>
                    <Button.Content visible>Edit</Button.Content>
                    <Button.Content hidden>
                    <Icon name='edit' />
                     </Button.Content>
                 </Button>
                 <Button animated color='red' onClick={() => this.onBtnDelete(val.id)}>
                    <Button.Content visible>Del</Button.Content>
                    <Button.Content hidden>
                    <Icon name='delete' />
                     </Button.Content>
                 </Button>
                 </TableCell>
            </TableRow>
        )
    })
    return jsx
  }

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    // destructering untuk manggil di place holder dengan cukup nama,harga dll
    // var {nama,harga,discount,category,deskripsi,img} = this.state.editItem;
    
      return (
        <div className='container'>
        { rows.length > 0 ?
        <div>
        <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
              <Table className={classes.table}>
              <TableHead>
                  <TableRow>
                      <TableCell style={{fontSize:'24px',fontWeight:'600'}}>ID</TableCell>
                      <TableCell style={{fontSize:'24px',fontWeight:'600'}}>NAMA</TableCell>
                      <TableCell style={{fontSize:'24px',fontWeight:'600'}}>HARGA</TableCell>
                      <TableCell style={{fontSize:'24px',fontWeight:'600'}}>DISC</TableCell>
                      <TableCell style={{fontSize:'24px',fontWeight:'600'}}>QTY</TableCell>
                      <TableCell style={{fontSize:'24px',fontWeight:'600'}}>TOTAL</TableCell>
                      <TableCell style={{fontSize:'24px',fontWeight:'600'}}>ACT</TableCell>
                  </TableRow>
              </TableHead>
                <TableBody>
                    {this.renderJsx()}
                  {emptyRows > 0 && (
                    <TableRow>
                      <TableCell colSpan={7}>
                        <h1 style={{fontWeight:'bold'}}>Total Belanja : <b> Rp. {this.getTotalHarga()},00 </b> </h1>
                        </TableCell>
                      <TableCell colSpan={6} >
                      <Link to='/history'><Button style={{marginLeft:'-250px'}} animated color='blue' onClick={this.cekOut}>
                          <Button.Content visible>CheckOut</Button.Content>
                          <Button.Content hidden>
                          <Icon name='check' />
                          </Button.Content>
                      </Button></Link>
                      </TableCell>

                      <TableCell colSpan={6} >
                      <Link to='/product'><Button style={{marginLeft:'-180px'}} animated color='green' onClick={this.conShop}>
                          <Button.Content visible>Continue Shop</Button.Content>
                          <Button.Content hidden>
                          <Icon name='check' />
                          </Button.Content>
                      </Button>
                      </Link>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>

                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      colSpan={3}
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        native: true,
                      }}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActionsWrapped}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </Paper>
        
        </div>
        : <p style={{fontSize:'27px',fontWeight:'bold',textAlign:'center'}}>Your Cart Is Empty, Continue Shopping</p>
        } 
        
          
          {
          this.state.isEdit === true ?
          <Paper className='mt-3'>
              <Table>
                  <TableHead>
                    <TableRow>
                        <TableCell style={{fontSize:'24px',fontWeight:'600'}}>EDIT QTY PRODUCT</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      <TableRow>
                          <TableCell>
                            <Input ref={input => this.qty = input} type='number' min={0} placeholder='Qty' className='mt-2 ml-2 mb-2'></Input>
                             <Button animated color='teal' className='mt-2 ml-2 mb-2' onClick={this.onBtnSave}>
                                <Button.Content visible>Save</Button.Content>
                                <Button.Content hidden>
                                <Icon name='save' />
                                </Button.Content>
                            </Button>
    
                            <Button animated color='yellow' className='mt-2 ml-2 mb-2' onClick={this.onBtnCancel}>
                                <Button.Content visible>Cancel</Button.Content>
                                <Button.Content hidden>
                                <Icon name='cancel' />
                                </Button.Content>
                            </Button>
                            </TableCell>
                      </TableRow>
                  </TableBody>
            </Table>
          </Paper>
          : null
          }
          </div>
        );
    
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return{
    role : state.user.role,
    id : state.user.id,
    cart : state.cart.cart,
    username : state.user.username
  }
}

export default connect (mapStateToProps)(withStyles(styles)(CustomPaginationActionsTable));