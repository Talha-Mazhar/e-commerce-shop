import React from 'react'
import { useParams } from 'react-router-dom'
import { Button, Col, Row, Table } from 'react-bootstrap'
import {
    useCreateProductMutation,
    useGetProductsQuery,
    useDeleteProductMutation,
} from '../../store/slices/product/productApiSlice'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import Messages from '../../components/Messages'
import Loader from '../../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import { toast } from 'react-toastify'
import Paginate from '../../components/Paginate'

const ProductListScreen = () => {
    const { pageNumber } = useParams()

    const { data, isLoading, error, refetch } = useGetProductsQuery({
        pageNumber,
    })

    const [createProduct, { isLoading: loadingCreate }] =
        useCreateProductMutation()

    const [deleteProduct, { isLoading: loadingDelete }] =
        useDeleteProductMutation()

    const createProductHandler = async () => {
        if (window.confirm('Are you sure you want to create a new product?')) {
            try {
                await createProduct()
                refetch()
            } catch (err) {
                toast.error(err?.data?.messsage || err?.message)
            }
        }
    }

    const deleteHandler = async id => {
        if (window.confirm('Are you sure?')) {
            try {
                await deleteProduct(id)
                refetch()
                toast.success('Product Deleted')
            } catch (err) {
                toast.error(err?.data?.messsage || err.message)
            }
        }
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-end'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <FaPlus /> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingCreate && <Loader />}
            {loadingDelete && <Loader />}

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Messages variant='danger'>
                    {error?.data?.message || error?.message}
                </Messages>
            ) : (
                <>
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        className='table-sm'
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer
                                            to={`/admin/product/${product._id}/edit`}
                                        >
                                            <Button
                                                variant='light'
                                                className='btn-sm mx-2'
                                            >
                                                <FaEdit />
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={() =>
                                                deleteHandler(product._id)
                                            }
                                        >
                                            <FaTrash
                                                style={{ color: 'white' }}
                                            />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate
                        pages={data.pages}
                        page={data.page}
                        isAdmin={true}
                    />
                </>
            )}
        </>
    )
}

export default ProductListScreen
