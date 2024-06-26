import React, { useEffect } from 'react';
import { Col, Row, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';
import { getOrderDetails } from '../actions/orderActions';

function OrderScreen() {
    const navigate = useNavigate();
    const { id } = useParams();
    const orderId = Number(id);

    const orderDetails = useSelector(state => state.orderDetails);
    const { order, error, loading } = orderDetails;
    const dispatch = useDispatch();

    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    }

    useEffect(() => {
        if (!order || order._id !== Number(orderId)) {
            dispatch(getOrderDetails(orderId));
        } else {
            // Realizar acciones adicionales después de cargar los detalles del pedido
            // Puedes ajustar esto según tus necesidades
            // Puedes utilizar 'whatsappMessage' como desees
        }
    }, [dispatch, order, orderId]);

    const submitHandler = (e) => {
        e.preventDefault();
        navigate('/');
    };

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
                            <p><strong>Email: </strong><a style={{ textDecoration: 'none' }} href={`mailto: ${order.user.email}`}>{order.user.email}</a></p>

                            {order.shippingAddress ? (
                                <p>
                                    <strong>Envío: </strong>
                                    {order.shippingAddress.address}, {order.shippingAddress.city}
                                    {''}
                                    {order.shippingAddress.postalCode},
                                    {''}
                                    {order.shippingAddress.country}
                                </p>
                            ) : (
                                <p><strong>Envío: </strong> Lo retira en sucursal</p>
                            )}

                            {order.isDelivered ? (
                                <Message variant='success'>Enviado en {order.deliveredAt}</Message>
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
                            {order.isPaid ? (
                                <Message variant='success'>Pagado en {order.paidAt}</Message>
                            ) : (
                                <Message variant='warning'>No pagado</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Productos</h2>
                            {order.orderItems.length === 0 ? (
                                <Message variant='info'>Pedido vacío</Message>
                            ) : (
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

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    onClick={submitHandler}
                                >
                                    Confirmar
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default OrderScreen;
