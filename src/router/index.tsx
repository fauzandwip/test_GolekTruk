import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';

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
