import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../actions/cartActions';

function ShippingScreen() {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;   

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    };

    const skipShippingHandler = () => {
        // Limpiar los campos de envío
        dispatch(saveShippingAddress({}));
        navigate('/payment');
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Envío</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Introduce tu dirección'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Introduce tu ciudad'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Código postal</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Introduce tu código postal'
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>País</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Introduce tu país'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </Form.Group>

                <Button variant='primary' type='submit'>
                    Continuar
                </Button>
            </Form>
            <br />
            <Button variant='primary' onClick={skipShippingHandler}>
                Saltar envío, busco el producto
            </Button>
        </FormContainer>
    );
}

export default ShippingScreen;
