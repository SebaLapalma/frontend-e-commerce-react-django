import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails } from '../actions/productActions'

function ProductScreen() {
  const [qty,setQty] = useState(1)
  const navigate = useNavigate();
  const { id } = useParams()
  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [dispatch, id])

  const addToCartHandler = () =>{
    navigate(`/cart/${id}?qty=${qty}`);
  }

  return (
      <div>
        <Link to="/" className="btn btn-light my-3">Atrás</Link>
          {loading ? 
            <Loader/ >
            : error
              ? <Message variant='danger'>{error}</Message>
            
            :(
              <Row> 
              <Col md={6}>
                <Image src={ product.image } alt={product.name} fluid />
              </Col>
    
              <Col md={3}>
                <ListGroup variant="flush">
    
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  
                  {/* <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reseñas`} color={'#f8e825'} />
                  </ListGroup.Item> */}
                  
                  <ListGroup.Item>
                    {product.description}
                  </ListGroup.Item>
    
                  <ListGroup.Item>
                    Cabeza: {product.head}
                  </ListGroup.Item>
    
                  <ListGroup.Item>
                    Corazón: {product.heart}
                  </ListGroup.Item>
    
                  <ListGroup.Item>
                    Familia olfativa: {product.smellFamily}
                  </ListGroup.Item>
    
                  <ListGroup.Item>
                    Precio: ${product.price}
                  </ListGroup.Item>
    
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant='flush'>
    
                    <ListGroup.Item>
                      <Row>
                        <Col>Precio:</Col>
                        <Col><strong>${product.price}</strong></Col>
                      </Row>
                    </ListGroup.Item>
    
                    <ListGroup.Item>
                      <Row>
                        <Col>Estado:</Col>
                        <Col>{product.stock > 0 ? 'En stock' : 'Sin stock'}</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>

                      {product.stock > 0 && (
                        <ListGroup.Item>
                          <Row>
                            <Col>Cantidad</Col>
                            <Col xs='auto' className='my-1'>
                              <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                { 
                                  [...Array(product.stock).keys()].map((x) =>(
                                    <option key={x+1} value={x+1}>
                                      {x+1}
                                    </option>
                                  ) )
                                }
                              </Form.Control>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}

                    </ListGroup.Item>
    
                    <ListGroup.Item>
                      <Button onClick={addToCartHandler} className='btn-block' disabled= {product.stock === 0 }type='button'>
                        Añadir al carrito
                      </Button>
                    </ListGroup.Item>
    
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            )
}
      </div>
  )
}

export default ProductScreen
