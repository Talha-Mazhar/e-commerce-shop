import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/styles/bootstrap.custom.css'
import './assets/styles/index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen.jsx'
import NotFound from './screens/NotFound.jsx'
import ErrorPage from './screens/ErrorPage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path='/' element={<App />} errorElement={<ErrorPage />}>
                    <Route
                        index
                        element={<HomeScreen />}
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
    </React.StrictMode>
)
