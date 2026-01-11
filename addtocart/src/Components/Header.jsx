import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';
import { NavLink } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch, useSelector} from 'react-redux';
import Table from 'react-bootstrap/Table'
import {DLT, ADD} from '../redux/actions/action'
import { useEffect } from 'react';

const Header = () => {
  const [price,setPrice] = useState(0);
  
  const getdata=useSelector((state)=> state.cartreducer.carts);
    console.log(getdata);

  const dispatch=useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dlt=(id)=>{
    dispatch(DLT(id));
  }

  const total=()=>{
    let price=0;
    getdata.map((el,k)=>{
      price=el.price+price
    });
    setPrice(price);
  }

  useEffect(()=>{
    total();
  },[total])
  
  return (
    <>
       <Navbar bg="dark" data-bs-theme="dark" style={{height:"60px"}}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-3">Add to Cart</NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light"
            >Home</NavLink>
          </Nav>
          <Nav className="ms-auto d-flex align-items-center" >
              <Badge 
                badgeContent={getdata.length} 
                color="primary"
                overlap="rectangular"
                      id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
              >
                <ShoppingCartOutlinedIcon style={{ color: "#fff", fontSize: 28,cursor:"pointer" }} />
              </Badge>
          </Nav>   
        </Container>

        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        {
            getdata.length ? 
            <div className='card_details' style={{width:"24rem",padding:10}}>
                <Table>
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Restaurant Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getdata.map((e)=>{
                                return (
                                    <>
                                        <tr>
                                            <td>
                                            <NavLink to={`/cart/${e.id}`}   onClick={handleClose}>
                                            <img src={e.imgdata} style={{width:"5rem",height:"5rem"}} alt="" />
                                            </NavLink>   
                                            </td>
                                            <td>
                                                <p>{e.rname}</p>
                                                <p>Price : ₹{e.price}</p>
                                                <p>Quantity : {e.qnty}</p>
                                                <p style={{color:"red",fontSize:20,cursor:"pointer"}} onClick={()=>dlt(e.id)}>
                                                    <DeleteIcon />
                                                </p>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                        <p className='text-center'>Total :₹ {price}</p>
                    </tbody>
                </Table>
            </div>:
            
            <div className='card-details d-flex justify-content-center align-items-center'>
              <p className='mx-2 my-2'>Your Cart is empty</p>
              <CloseIcon style={{position:"absolute",top:2,right:10,cursor:"pointer",fontSize:20}}/>

            </div>
        }
      </Menu>

      </Navbar>
    </>
  )
}

export default Header