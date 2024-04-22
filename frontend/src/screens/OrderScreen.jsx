import React from 'react'
import { Link, useParams } from 'react-router-dom'
import {
    useGetOrderDetailsQuery,
    useGetPayPalClientIdQuery,
    usePayOrderMutation,
    useDeliverOrderMutation,
} from '../store/slices/orders/ordersApiSlice'
import Loader from '../components/Loader'
import Messages from '../components/Messages'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const OrderScreen = () => {
    const { id: orderId } = useParams()

    const {
        data: order,
        refetch,
        isLoading,
        error,
    } = useGetOrderDetailsQuery(orderId)

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation()

    const [deliverOrder, { isLaoding: loadingDeliver }] =
        useDeliverOrderMutation()

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()

    const {
        data: paypal,
        isLoading: loadingPayPal,
        error: errorPayPal,
    } = useGetPayPalClientIdQuery()

    const { userInfo } = useSelector(state => state.auth)

    useEffect(() => {
        if (!errorPayPal && !loadingPayPal && paypal.clientId) {
            const loadPayPalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': paypal.clientId,
                        'currency': 'USD',
                    },
                })
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
            }
            if (order && !order.isPaid) {
                if (!window.paypal) {
                    loadPayPalScript()
                }
            }
        }
    }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal])

    function onApprove(data, actions) {
        return actions.order.capture().then(async details => {
            try {
                await payOrder({ orderId, details }).unwrap()
                refetch()
                toast.success('Payment successfull')
            } catch (err) {
                toast.error(err?.data?.message || err.message)
            }
        })
    }
    //Only for development, remove before production and use personal account from paypal sandbox
    // async function onApproveTest() {
    //     await payOrder({ orderId, details: { payer: {} } })
    //     refetch()
    //     toast.success('Payment successfull')
    // }
    function onError(err) {
        toast.error(err)
    }

    function createOrder(data, actions) {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: {
                            value: order.totalPrice,
                        },
                    },
                ],
            })
            .then(orderId => {
                return orderId
            })
    }

    const deliverOrderHandler = async () => {
        try {
            await deliverOrder(orderId)
            refetch()
            toast.success('Order Delivered')
        } catch (err) {
            toast.error(err?.data?.message || err.message)
        }
    }

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

                                    {!order.idPaid && (
                                        <ListGroup.Item>
                                            {loadingPay && <Loader />}
                                            {isPending ? (
                                                <Loader />
                                            ) : (
                                                <div>
                                                    {/* <Button
                                                        onClick={onApproveTest}
                                                        style={{
                                                            marginBottom:
                                                                '10px',
                                                        }}
                                                    >
                                                        Test Pay Order
                                                    </Button> */}
                                                    <div>
                                                        <PayPalButtons
                                                            createOrder={
                                                                createOrder
                                                            }
                                                            onApprove={
                                                                onApprove
                                                            }
                                                            onError={onError}
                                                        ></PayPalButtons>
                                                    </div>
                                                </div>
                                            )}
                                        </ListGroup.Item>
                                    )}
                                    {loadingDeliver && <Loader />}
                                    {userInfo &&
                                        userInfo.isAdmin &&
                                        order.isPaid &&
                                        !order.isDelivered && (
                                            <ListGroup.Item>
                                                <Button
                                                    type='submit'
                                                    className='btn btn-block'
                                                    onClick={
                                                        deliverOrderHandler
                                                    }
                                                >
                                                    Mark As Delivered
                                                </Button>
                                            </ListGroup.Item>
                                        )}
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
