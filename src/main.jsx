import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Auth from './components/Auth/Auth.jsx';
import {Layout} from './layout/Layout.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '',
                element: <App/>,
            },
            {
                path: '/auth',
                element: <Auth/>
            }
        ]
    }
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
            <RouterProvider router={router}/>
    </StrictMode>
);