import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomeScreen from '../screens/HomeScreen.jsx'
import NotFound from '../screens/NotFound.jsx'
import ErrorPage from '../screens/ErrorPage.jsx'
import ProductScreen from '../screens/ProductScreen.jsx'
import App from '../App'
import CartScreen from '../screens/CartScreen.jsx'
import LoginScreen from '../screens/LoginScreen.jsx'
import RegisterScreen from '../screens/RegisterScreen.jsx'
import ShippingScreen from '../screens/ShippingScreen.jsx'
import PrivateRoute from '../components/PrivateRoute.jsx'
import PaymentScreen from '../screens/PaymentScreen.jsx'
import PlaceOrderScreen from '../screens/PlaceOrderScreen.jsx'
import OrderScreen from '../screens/OrderScreen.jsx'
import ProfileScreen from '../screens/ProfileScreen.jsx'

const AllRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<App />} errorElement={<ErrorPage />}>
                    <Route
                        index
                        element={<HomeScreen />}
                        errorElement={<ErrorPage />}
                    />
                    <Route
                        path='/product/:id'
                        element={<ProductScreen />}
                        errorElement={<ErrorPage />}
                    />
                    <Route
                        path='/cart'
                        element={<CartScreen />}
                        errorElement={<ErrorPage />}
                    />
                    <Route
                        path='/login'
                        element={<LoginScreen />}
                        errorElement={<ErrorPage />}
                    />
                    <Route
                        path='/register'
                        element={<RegisterScreen />}
                        errorElement={<ErrorPage />}
                    />

                    <Route path='' element={<PrivateRoute />}>
                        <Route
                            path='/shipping'
                            element={<ShippingScreen />}
                            errorElement={<ErrorPage />}
                        />
                        <Route
                            path='/payment'
                            element={<PaymentScreen />}
                            errorElement={<ErrorPage />}
                        />
                        <Route
                            path='/placeorder'
                            element={<PlaceOrderScreen />}
                            errorElement={<ErrorPage />}
                        />
                        <Route
                            path='/order/:id'
                            element={<OrderScreen />}
                            errorElement={<ErrorPage />}
                        />
                        <Route
                            path='/profile'
                            element={<ProfileScreen />}
                            errorElement={<ErrorPage />}
                        />
                    </Route>
                </Route>
                <Route
                    path='*'
                    element={<NotFound />}
                    errorElement={<ErrorPage />}
                />
            </Routes>
        </Router>
    )
}

export default AllRoutes
