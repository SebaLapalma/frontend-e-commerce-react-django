import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions'


function Header() {
  const userLogin = useSelector(state => state.userLogin)

  const {userInfo} = userLogin

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand href="/">NUNA FRAGANCIAS</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/cart">
              <Nav.Link><i className='fas fa-shopping-cart'></i>Carrito</Nav.Link>
            </LinkContainer>

            {userInfo ? (
              <NavDropdown style={{ textDecoration: 'none' }} title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>
                    Perfil
                  </NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Item onClick={logoutHandler}>
                    Cerrar sesión
                  </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
              <Nav.Link ><i className='fas fa-user'></i>Login</Nav.Link>
            </LinkContainer>
            )}
            <NavDropdown title="Redes" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
              <a style={{ textDecoration: 'none' }} rel='noopener noreferrer' href='https://www.facebook.com/profile.php?id=100088168151860' target='_blank'>Facebook</a>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                <a style={{ textDecoration: 'none' }} rel='noopener noreferrer' href='https://www.instagram.com/nuna.fragancias/' target='_blank'>Instagram</a>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Bagues 50ml</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Homenaje
            </Nav.Link>
            <NavDropdown title="Otros" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                <a style={{ textDecoration: 'none' }} rel='noopener noreferrer' href='/decoesencias'>DecoEsencias</a>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                <a style={{ textDecoration: 'none' }} rel='noopener noreferrer' href='/vespero'>Véspero</a>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  );
}

export default Header
