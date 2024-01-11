import { createBrowserRouter, redirect } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { getToken } from '../helpers/localStorage';
import AnalyticPage from '../pages/Analytic';

const router = createBrowserRouter([
	{
		path: '/',
		loader: () => (getToken() ? null : redirect('/login')),
		children: [
			{
				path: '',
				element: <AnalyticPage />,
			},
		],
	},
	{
		path: '/',
		loader: () => (getToken() ? redirect('/') : null),
		children: [
			{
				path: '/register',
				element: <Register />,
			},
			{
				path: '/login',
				element: <Login />,
			},
		],
	},
]);

export default router;
