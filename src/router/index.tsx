import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';

const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				path: '',
				element: <div>Home</div>,
			},
			{
				path: '/register',
				element: <div>Register</div>,
			},
			{
				path: '/login',
				element: <Login />,
			},
		],
	},
]);

export default router;
