import React from 'react';
import Axios from 'axios';
import { urlApi } from './../support/urlApi';
import {Link} from 'react-router-dom';


class History extends React.Component {
    state={rows: [],
        page: 0,
        rowsPerPage: 5}

        componentDidMount(){
            this.getDataApi()
        }

        getDataApi = () => {
            Axios.get(urlApi + '/history?' + this.props.id)
            .then((res) => this.setState({rows : res.data}))
            .catch((err) => console.log(err))
        }

        onBtnEditClick = (param) => {
            this.setState({isEdit : true, editItem : param})
          }

    renderJsx = () => {
        var jsx = this.state.rows.map((val) => {

            return(   
            <tr>
                <td>{val.id}</td>
                <td>{val.tanggal}</td>
                <td>{val.username}</td>
                <td>{val.jumlahItem}</td>
                <button type="button" onClick={() => this.onBtnEditClick(val)} class="btn btn-outline-primary">Detail</button>
            </tr>

            )
        })
        return jsx
    }

    renderJsx1 = () => {
        var jsx1= this.state.rows.map((val) => {

            return(   
                <tr>
                <td>{val.id_user}</td>
                <td>{val.nama}</td>
                <td>{val.harga}</td>
                <td>{val.discount}</td>
                <td>{val.qty}</td>
                <td>{val.category}</td>
                <td>{val.img}</td>
                <td>{val.deskripsi}</td>
                <td>{val.totalHarga}</td>
                
            </tr>

            )
        })
        return jsx1
    }


render(){
    return(
        <table class="table table-striped">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tanggal</th>
                    <th scope="col">Username</th>
                    <th scope="col">Item</th>
                    </tr>

                    {this.renderJsx()}



                {
                this.state.isEdit === true ?
          
                <tbody>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Harga</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Category</th>
                    <th scope="col">Img</th>
                    <th scope="col">Deskripsi</th>
                    <th scope="col">TotalHarga</th>
                    </tr>
                    <tbody>
                    {this.renderJsx1()}
                    </tbody>
                    <Link to='/'><button type="button" onClick={this.onBtnEditClick} class="btn btn-outline-primary">Close</button></Link>
                </tbody>
                : null
                }
        </table>
    )
}
}

export default History;