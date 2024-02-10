import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

function RegisterScreen() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)

    const {error, loading, userInfo} = userRegister

    useEffect(() => {
      if (userInfo){
        navigate(redirect)
      }
    }, [userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('¡Las contraseñas no coinciden!')
        } else{
            dispatch(register(name, email, password))
        }
    }

  return (
    <FormContainer>
      <h1>Regístrate</h1>
      {message && <Message>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>

      <Form.Group controlId='name'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
                required
                type='name'
                placeholder='Introduce tu nombre'
                value={name}
                onChange={(e) => setName(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
                required
                type='email'
                placeholder='Introduce tu email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
                required
                type='password'
                placeholder='Introduce tu contraseña'
                value={password}
                onChange={(e) => setPassword(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='passwordConfirm'>
            <Form.Label>Confirma la contraseña</Form.Label>
            <Form.Control
                required
                type='password'
                placeholder='Confirma tu contraseña'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Button
            type='submit'
            variant='primary'>
                Registrarse
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
            ¿Ya tienes una cuenta? <Link
              to={redirect ? `/login?redirect=${redirect}` : '/login' }>
                ¡Inicia sesión!
              </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
