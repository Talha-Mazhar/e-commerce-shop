import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomeScreen from '../screens/HomeScreen.jsx'
import NotFound from '../screens/NotFound.jsx'
import ErrorPage from '../screens/ErrorPage.jsx'
import ProductScreen from '../screens/ProductScreen.jsx'
import App from '../App'
import CartScreen from '../screens/CartScreen.jsx'
import LoginScreen from '../screens/LoginScreen.jsx'

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
