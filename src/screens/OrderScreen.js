import React, {useState, useEffect} from 'react'
import { Button, Col, Row, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { redirect, useLocation, useNavigate, useParams } from 'react-router-dom'
import { getOrderDetails } from '../actions/orderActions'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

function OrderScreen() {
    
    initMercadoPago('TEST-d56b6131-9b6d-4a28-92df-6d54957ae376')

    const {id} = useParams()

    const orderId = Number(id)

    const orderDetails = useSelector(state => state.orderDetails)

    const {order, error, loading} = orderDetails

    const dispatch = useDispatch()

    const navigate = useNavigate()

    if (!loading && !error){
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    }
      
    useEffect(() => {
        if(!order || order._id !== Number(orderId)){
            dispatch(getOrderDetails(orderId))
        }         
    }, [dispatch, order, orderId])

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div>
            <h1>Pedido número {orderId}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Envío</h2>
                            <p><strong>Nombre: </strong>{order.user.name}</p>
                            <p><strong>Email: </strong><a style={{textDecoration: 'none'}} href={`mailto: ${order.user.email}`}>{order.user.email}</a></p>

                            <p>
                                <strong>Envío: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}
                                {'    '}
                                {order.shippingAddress.postalCode},
                                {'    '}
                                {order.shippingAddress.country}
                            </p>
                            { order.isDelivered ? (
                                <Message variant='success'>Enviado en { order.deliveredAt }</Message>
                            ) : (
                                <Message variant='warning'>No enviado</Message>
                            )}
                        </ListGroup.Item>
                        

                        <ListGroup.Item>
                            <h2>Método de pago</h2>
                            <p>
                                <strong>Método: </strong>
                                {order.paymentMethod}
                            </p>
                            { order.isPaid ? (
                                <Message variant='success'>Pagado en { order.paidAt }</Message>
                            ) : (
                                <Message variant='warning'>No pagado</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Productos</h2>
                            {order.orderItems.length === 0 ? <Message variant='info'>
                                Pedido vacío
                            </Message> :(
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
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
                                        ${order.itemsPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Envío:
                                    </Col>

                                    <Col>
                                        ${order.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total:
                                    </Col>

                                    <Col>
                                        ${order.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                                <div id="wallet_container">
                                    <Wallet initialization={{ preferenceId: 'wallet_container' }} />
                                </div>
                            <ListGroup.Item>
                            </ListGroup.Item>
                            
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
  )
}

export default OrderScreen