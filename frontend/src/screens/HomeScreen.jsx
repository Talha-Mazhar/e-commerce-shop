import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Messages from '../components/Messages'
import Product from '../components/Product'
import { useGetProductsQuery } from '../store/slices/product/productApiSlice'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

const HomeScreen = () => {
    const { pageNumber, keyword } = useParams()

    const { data, isLoading, error } = useGetProductsQuery({
        keyword,
        pageNumber,
    })

    return (
        <>
            {!keyword ? (
                <ProductCarousel />
            ) : (
                <Link to='/' className='btn btn-light mb-4'>
                    Go Back
                </Link>
            )}

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
                        {data.products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        pages={data.pages}
                        page={data.page}
                        keyword={keyword ? keyword : ''}
                    />
                </>
            )}
        </>
    )
}

export default HomeScreen
