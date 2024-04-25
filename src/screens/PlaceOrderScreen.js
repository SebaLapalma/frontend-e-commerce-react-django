import React, { useEffect } from 'react';
import { Button, Col, Row, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

function PlaceOrderScreen() {
    const orderCreate = useSelector(state => state.orderCreate);
    const { order, error, success } = orderCreate;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    cart.shippingPrice = cart.itemsPrice > 10000 ? 0 : 500;
    cart.totalPrice = Number(cart.shippingPrice + cart.itemsPrice);

    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart.paymentMethod, navigate]);

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [success, navigate]);

    const placeOrder = () => {
        const orderDetails = {
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice,
        };

        dispatch(createOrder(orderDetails));
        return orderDetails;
    };

    const handlePlaceOrder = () => {
        const orderDetails = placeOrder();
    
        // Construir el mensaje de WhatsApp
        let addressInfo = '';
        if (orderDetails.shippingAddress && Object.values(orderDetails.shippingAddress).some(value => value !== undefined)) {
        addressInfo = `Dirección: ${orderDetails.shippingAddress.address}, ${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.postalCode}, ${orderDetails.shippingAddress.country}\n`;
        } else {
        addressInfo = 'Busca el producto\n';
        }
        // Crear una lista de nombres de productos separados por coma y espacio
        const productNames = orderDetails.orderItems.map(item => item.name + `($${item.price})`).join(', ');
    
        const whatsappMessage = `¡Pedido realizado!\nDetalles del pedido:\n\n` +
            `Producto(s): ${productNames}\n` +
            addressInfo +
            `\nTotal: $${orderDetails.totalPrice}`;
    
        const whatsappLink = `https://wa.me/+543455083098/?text=${encodeURIComponent(whatsappMessage)}`;
    
        // Abrir WhatsApp en una nueva pestaña
        window.open(whatsappLink, '_blank');
    };

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Envío</h2>
                            {cart.shippingAddress.address !== undefined ? (
                                <p>
                                    <strong>Envío: </strong>
                                    {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                                </p>
                            ) : (
                                <p>
                                    <strong>Lo retira en sucursal</strong>
                                    
                                </p>
                            )}
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
                            </Message> : (
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
                                        Producto(s):
                                    </Col>

                                    <Col>
                                        ${cart.itemsPrice}
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
                                    onClick={handlePlaceOrder}>
                                    Confirmar compra
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen;
