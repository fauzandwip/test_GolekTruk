import { createBrowserRouter, redirect } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { getToken } from '../helpers/localStorage';

const router = createBrowserRouter([
	{
		path: '/',
		loader: () => (getToken() ? null : redirect('/login')),
		children: [
			{
				path: '',
				element: <div>Home</div>,
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
