import React, {useEffect} from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'


function CartScreen() {
    const location = useLocation();
    const {id} = useParams();
    const navigate = useNavigate();
    
    const productId = Number(id)
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()
    
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    

    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    },[dispatch, productId, qty])

    const removeFromCartHandler = (id) =>{
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () =>{
        navigate(`/login?redirect=/shipping`)
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Carrito de compras</h1>
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Tu carrito está vacío <Link to='/'>Atrás</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link style={{ textDecoration: 'none' }} to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>

                                    <Col md={2}>
                                        ${item.price}
                                    </Col>

                                    <Col md={3}>
                                        <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                    { 
                                    [...Array(item.stock).keys()].map((x) =>(
                                        <option key={x+1} value={x+1}>
                                        {x+1}
                                        </option>
                                    ) )
                                    }
                                </Form.Control>
                                    </Col>

                                    <Col md={1}>
                                        <Button
                                        type='button'
                                        variant='light'
                                        onClick={() => removeFromCartHandler(item.product)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal {cartItems.reduce((acc, item) => acc + item.qty, 0)} producto(s)</h2>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)} 
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup.Item>
                        <Button
                        type='button'
                        className='btn-block'
                        disabled={cartItems.length === 0}
                        onClick={checkoutHandler}>
                              Pagar
                        </Button>
                    </ListGroup.Item>
                </Card>
            </Col>
        </Row>
  )
}

export default CartScreen
