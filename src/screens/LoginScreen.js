import React, {useState, useEffect} from 'react'
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, NavItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)

    const {error, loading, userInfo} = userLogin

    useEffect(() => {
      if (userInfo){
        navigate(redirect)
      }
    }, [userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

  return (
    <FormContainer>
      <h1>Iniciar sesión</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>

        <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
                type='email'
                placeholder='Introduce tu email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
                type='password'
                placeholder='Introduce tu contraseña'
                value={password}
                onChange={(e) => setPassword(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <br></br>
        <Button
            type='submit'
            variant='primary'>
                Iniciar sesión
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
            ¿No tienes cuenta? <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register' }>
                ¡Regístrate!
              </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
