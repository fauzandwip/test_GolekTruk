import { useState } from 'react';
import CustomInput from '../components/CustomInput';
import ButtonSubmit from '../components/ButtonSubmit';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div className="w-full h-screen flex">
			<div className="w-1/2 h-full bg-gradient-to-t from-cyan-500 to-blue-500 flex flex-col justify-center items-center gap-20">
				<img src="https://golektruk.com/login.png" alt="" />
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
					<ButtonSubmit value={'Login'} />
				</div>
			</div>
		</div>
	);
};

export default Login;
