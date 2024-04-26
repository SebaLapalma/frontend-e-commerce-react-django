import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

const SearchScreen = ({ history }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <Container>
      <h1>Buscar Productos</h1>
      <Form onSubmit={searchHandler}>
        <Form.Group controlId="keyword">
          <Form.Control
            type="text"
            placeholder="Buscar productos..."
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
          ></Form.Control>
        </Form.Group>
        <button type="submit" className="btn btn-primary">
          Buscar
        </button>
      </Form>
      {loading ? (
        <h2>Cargando...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Row>
          {filteredProducts.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Card className="my-3 p-3 rounded">
                <Link to={`/product/${product._id}`}>
                  <Card.Img src={product.image} variant="top" />
                </Link>
                <Card.Body>
                  <Link to={`/product/${product._id}`}>
                    <Card.Title as="div">
                      <strong>{product.name}</strong>
                    </Card.Title>
                  </Link>
                  <Card.Text as="div">
                    <div className="my-3">{product.description}</div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default SearchScreen;
