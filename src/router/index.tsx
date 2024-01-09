import { createBrowserRouter } from 'react-router-dom';

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
				element: <div>Login</div>,
			},
		],
	},
]);

export default router;
