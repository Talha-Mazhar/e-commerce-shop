import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Messages from '../components/Messages'
import Product from '../components/Product'
import { useGetProductsQuery } from '../store/slices/product/productApiSlice'

const HomeScreen = () => {
    const { data: products, isLoading, error } = useGetProductsQuery()

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Messages variant='danger'>
                    {error?.data?.message || error.error}
                </Messages>
            ) : (
                <>
                    <h1>Latest Products</h1>
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </>
    )
}

export default HomeScreen
