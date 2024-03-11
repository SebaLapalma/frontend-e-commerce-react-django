import React, {useState} from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../actions/cartActions'


function PaymentScreen() {

    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('MercadoPago')

    if(!shippingAddress.address) {
        navigate('/shipping')
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <Form onSubmit={submitHandler}>

        <Form.Group>
          <Form.Label as='legend'>
            Selecciona método de pago
          </Form.Label>
          <Col>
            <Form.Check
            type='radio'
            label='Transferencia o efectivo'
            id='transferencia'
            name='payment method'
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}>

            </Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continuar
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
