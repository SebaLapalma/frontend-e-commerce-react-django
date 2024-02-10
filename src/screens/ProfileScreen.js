import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, NavItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

function ProfileScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile 

    

    useEffect(() => {
      if (!userInfo) {
        navigate('/login')
      } else {
        if (!user || !user.name || success) {
          dispatch({ type: USER_UPDATE_PROFILE_RESET })
          dispatch(getUserDetails('profile'))
        } else {
          setName(user.name)
          setEmail(user.email)
        }
      }
    }, [dispatch, navigate, userInfo, user, success])
    

    const submitHandler = (e) => {
        e.preventDefault()
        if(password != confirmPassword){
            setMessage('¡Las contraseñas no coinciden!')
        } else{
            dispatch(updateUserProfile({
              'id': user._id,
              'name': name,
              'email': email,
              'password': password
            }))
            setMessage('')
        }
    }

  return (
    <Row>
      <Col md={3}>
        <h2>Perfil</h2>
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
            <Form.Label>Nueva contraseña</Form.Label>
            <Form.Control
                
                type='password'
                placeholder='Introduce tu contraseña'
                value={password}
                onChange={(e) => setPassword(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='passwordConfirm'>
            <Form.Label>Confirma la contraseña</Form.Label>
            <Form.Control
                
                type='password'
                placeholder='Confirma tu contraseña'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <br></br>
        <Button
            type='submit'
            variant='primary'>
                Actualizar
        </Button>
      </Form>

      </Col>

      <Col md={9}>
        <h2>Mis pedidos</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen
