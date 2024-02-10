import React, {useState, useEffect} from 'react'
import { Button, Col, Row, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { redirect, useLocation, useNavigate } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react'
import axios from 'axios'

function PlaceOrderScreen() {
    const [preferenceId, setPreferenceId] = useState(null)

    const orderCreate = useSelector(state => state.orderCreate)

    const {order, error, success} = orderCreate

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)

    cart.shippingPrice = cart.itemsPrice > 10000 ? 0 : 500

    cart.totalPrice = Number(cart.shippingPrice + cart.itemsPrice)

    useEffect(() => {
        if (!cart.paymentMethod) {
          navigate('/payment')
        }
      }, [cart.paymentMethod, navigate])
      

    useEffect(() => {
        if(success){
            navigate(`/order/${order._id}`)
            dispatch({type:ORDER_CREATE_RESET})

        }
    }, [success, navigate])

    const placeOrder = () => (
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice,
        }))
    )

    initMercadoPago('TEST-bc16cac7-44f6-4ad7-8460-7073b9bb1ce2')


    const createPreference = async () => {
        try {
            const response = await axios.post('http://localhost:8080/create_preference', {
                    description: 'laura',
                    price: 1,
                    quantity: 1,
                }
            )
            const { id } = response.data
            console.log(response.data)
            return id
        } catch (error) {
            console.log(error)
        }
    }

    const handleBuy = async () => {
        const id = await createPreference()
        if (id) {
            setPreferenceId(id)
        }
        console.log(preferenceId)
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Envío</h2>
                            <p>
                                <strong>Envío: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                                {'    '}
                                {cart.shippingAddress.postalCode},
                                {'    '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Método de pago</h2>
                            <p>
                                <strong>Método: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Productos</h2>
                            {cart.cartItems.length === 0 ? <Message variant='info'>
                                Tu carrito está vacío
                            </Message> :(
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>

                                                <Col>
                                                    <Link style={{ textDecoration: 'none' }} to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
                
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Resumen de compra</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Producto:
                                    </Col>

                                    <Col>
                                        ${cart.itemsPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Envío:
                                    </Col>

                                    <Col>
                                        ${cart.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total:
                                    </Col>

                                    <Col>
                                        ${cart.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                type='button'
                                className='btn-block'
                                disabled={cart.cartItems === 0}
                                onClick={handleBuy}>
                                    Confirmar compra
                                </Button>
                                {preferenceId && <Wallet initialization={{preferenceId}} />}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
  )
}

export default PlaceOrderScreen
