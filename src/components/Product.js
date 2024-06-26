import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Product.css'

function Product({ product }) {
  return (
    <Card className='my-3 p-3 rounded product-card'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>
      <Card.Body>
        <Link style={{ textDecoration: 'none' }} to={`/product/${product._id}`}>
            <Card.Title as="div">
                <strong>{product.name}</strong>
            </Card.Title>
        </Link>
        {/* <Card.Text as='div'>
            <div className="my-3">
              <Rating value={product.rating} text={`${product.numReviews} reseñas`} color={'#f8e825'} />
            </div>
        </Card.Text> */}
        <Card.Text as="h3">
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
