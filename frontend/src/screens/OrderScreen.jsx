import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetOrderDetailsQuery } from '../store/slices/orders/ordersApiSlice'
import Loader from '../components/Loader'
import Messages from '../components/Messages'
import { Button, Col, ListGroup, Row } from 'react-bootstrap'

const OrderScreen = () => {
    const { id: orderId } = useParams()

    const {
        data: order,
        refetch,
        isLoading,
        error,
    } = useGetOrderDetailsQuery(orderId)

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Messages variant='danger' />
            ) : (
                <>
                    <h1>Order {order._id}</h1>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name: </strong>{' '}
                                        {order.user.name}
                                    </p>
                                    <p>
                                        <strong>Email:</strong>{' '}
                                        {order.user.email}
                                    </p>
                                    <p>
                                        <strong>Address:</strong>
                                        {` `}
                                        {order.shippingAddress.address},{' '}
                                        {order.shippingAddress.city},
                                        {order.shippingAddress.postalCode},
                                        {order.shippingAddress.country}
                                    </p>
                                    {order.isDelivered ? (
                                        <Messages variant='success'>
                                            Delivered on {order.deliveredAt}
                                        </Messages>
                                    ) : (
                                        <Messages variant='danger'>
                                            Not Delivered
                                        </Messages>
                                    )}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h2>Payment Method</h2>
                                    <p>
                                        <strong>Method: </strong>
                                        {order.paymentMethod}
                                    </p>
                                    {order.isPaid ? (
                                        <Messages variant='success'>
                                            Paid on {order.paidAt}
                                        </Messages>
                                    ) : (
                                        <Messages variant='danger'>
                                            Not Paid
                                        </Messages>
                                    )}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Order Items</h2>
                                    {order.orderItems.length === 0 ? (
                                        <Messages>Order is empty</Messages>
                                    ) : (
                                        <ListGroup variant='flush'>
                                            {order.orderItems.map(
                                                (item, index) => (
                                                    <ListGroup.Item key={index}>
                                                        <Row>
                                                            <Col md={1}>
                                                                <Image
                                                                    src={
                                                                        item.image
                                                                    }
                                                                    alt={
                                                                        item.name
                                                                    }
                                                                    fluid
                                                                    rounded
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <Link
                                                                    to={`/product/${item._id}`}
                                                                >
                                                                    {item.name}
                                                                </Link>
                                                            </Col>
                                                            <Col md={4}>
                                                                {item.qty} x $
                                                                {item.price} = $
                                                                {item.qty *
                                                                    item.price}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                )
                                            )}
                                        </ListGroup>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items</Col>
                                            <Col>${order.itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping</Col>
                                            <Col>${order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax</Col>
                                            <Col>${order.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total</Col>
                                            <Col>${order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {/* PAY ORDER PLACEHOLDER */}
                                    {/* MARK AS DELIVERED PLACEHOLDER */}
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
}

export default OrderScreen
