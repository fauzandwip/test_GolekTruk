import { useState } from 'react';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import api from '../api';
import { setToken } from '../helpers/localStorage';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('jack1@gmail.com');
	const [password, setPassword] = useState('12345');

	const handleOnLogin = async () => {
		try {
			console.log('on login');
			console.log({ email, password });
			const { data } = await api.post(
				'/login',
				{
					username: email,
					password,
				},
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				}
			);
			console.log(data, 'data from server');
			setToken(data.access_token);
			navigate('/');
		} catch (error) {
			console.log(error);
			const err = error as AxiosError;
			console.log(err.response?.data.detail);
		}
	};

	return (
		<div className="w-full h-screen flex">
			<div className="w-1/2 h-full bg-gradient-to-t from-cyan-500 to-blue-500 flex flex-col justify-center items-center gap-20">
				<img src="https://golektruk.com/login.png" alt="Image" />
				<h1 className=" text-4xl text-white font-bold">GolekTruk</h1>
			</div>
			<div className="w-1/2 h-full flex justify-center items-center">
				<div className="w-3/4 h-max shadow-inner shadow-cyan-500 rounded-lg flex flex-col items-center py-20 px-10 gap-4">
					<h1 className="bg-clip-text text-transparent bg-cyan-600 font-bold text-5xl p-2">
						Login
					</h1>
					<CustomInput
						type="email"
						labelText="Email"
						id={'email-form'}
						value={email}
						placeholder={'jack@gmail.com'}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<CustomInput
						type="password"
						labelText="Password"
						id={'password-form'}
						value={password}
						placeholder={'password'}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
					<CustomButton value={'LOGIN'} onClick={handleOnLogin} />
				</div>
			</div>
		</div>
	);
};

export default Login;
