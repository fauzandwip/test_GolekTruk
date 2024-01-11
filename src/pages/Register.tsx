import React, { useState } from 'react';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import IconProfile from '../components/IconProfile';
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';

enum Section {
	profile = 'profile',
	authentication = 'authentication',
}

type User = {
	email: string;
	name: string;
	phone: string;
	password: string;
	age: number;
	photos: string[];
};

const Register = () => {
	const navigate = useNavigate();
	const [section, setSection] = useState(Section.profile);
	const [imageURL, setImageURL] = useState('');
	const [image, setImage] = useState<File | null>(null);
	const [user, setUser] = useState<User>({
		email: 'jack2@gmail.com',
		name: 'Test Jack',
		phone: '628912345678',
		password: '12345',
		age: 22,
		photos: [],
	});

	const onSetUser = (
		e: React.ChangeEvent<HTMLInputElement>,
		property: string
	) => {
		// console.log(e.target.value, property);
		setUser((prev) => {
			return {
				...prev,
				[property]: e.target.value,
			};
		});
	};

	const onUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.length) {
			const imageInput = e.target.files[0];
			// console.log(imageInput, typeof imageInput);
			setImage(imageInput);

			const reader = new FileReader();
			reader.onload = (e) => {
				// console.log(typeof e.target?.result);
				const result = e.target?.result as string;
				if (result) setImageURL(result);
			};
			reader.readAsDataURL(imageInput);
		}
		console.log(user);
	};

	const handleUploadImage = async () => {
		try {
			if (image) {
				const formData = new FormData();
				formData.append('file', image);

				const { data } = await api.post('/user/photo/upload', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				});
				console.log(data, 'from server upload image');
				return data;
			}
		} catch (error) {
			console.log(error);
			// console.log(error.response.data.detail);
		}
	};

	const handleOnRegister = async () => {
		try {
			console.log(user);
			const uuidImage = await handleUploadImage();
			console.log(user, 'after upload');

			const { data } = await api.post('/user', {
				...user,
				photos: [uuidImage],
			});
			console.log(data, 'register from server');
			navigate('/login');
		} catch (error) {
			console.log(error);
			// console.log(error.response.data.detail);
		}
	};

	console.log(user.photos);

	return (
		<div className="w-full h-screen flex">
			<div className="w-full lg:w-1/2 h-full flex justify-center items-center">
				<div className="w-3/4 h-max shadow-inner shadow-cyan-500 rounded-lg flex flex-col items-center justify-center py-10 px-10 gap-4">
					<h1 className="bg-clip-text text-transparent bg-cyan-600 font-bold text-5xl p-2 mb-10">
						Register
					</h1>

					{section === Section.profile ? (
						<>
							<div className="w-full h-full gap-10 flex flex-col justify-center items-center">
								<label
									htmlFor="file-input"
									className="relative aspect-square rounded-full bg-gray-300 w-60 flex justify-center items-center cursor-pointer"
								>
									<input
										type="file"
										name=""
										id="file-input"
										onChange={onUploadFile}
										className="hidden"
									/>
									{image ? (
										<img
											src={imageURL}
											alt="Profile Image"
											className=" aspect-square rounded-full"
										/>
									) : (
										<IconProfile />
									)}
									<div className="w-full h-full bg-gray-400 bg-opacity-30 hover:bg-opacity-70  rounded-full absolute flex justify-center items-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="black"
											className="w-10 h-10"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
											/>
										</svg>
									</div>
								</label>
								<div className="w-full flex gap-10">
									<div className="w-3/4">
										<CustomInput
											type="text"
											labelText="Name"
											id={'name-form'}
											value={user.name}
											placeholder={'name'}
											onChange={(e) => onSetUser(e, 'name')}
										/>
									</div>
									<div className="w-1/4">
										<CustomInput
											type="number"
											labelText="Age"
											id={'number-form'}
											value={user.age}
											onChange={(e) => onSetUser(e, 'age')}
											placeholder={'jack@gmail.com'}
										/>
									</div>
								</div>
							</div>
							<div className="w-full mt-8">
								<CustomButton
									value={'NEXT'}
									onClick={() => setSection(Section.authentication)}
								/>
							</div>
						</>
					) : (
						<>
							<CustomInput
								type="text"
								labelText="Phone"
								id={'phone-form'}
								value={user.phone}
								placeholder={'628xxxxxxxxx'}
								onChange={(e) => onSetUser(e, 'phone')}
							/>

							<CustomInput
								type="email"
								labelText="Email"
								id={'email-form'}
								value={user.email}
								placeholder={'jack@gmail.com'}
								onChange={(e) => onSetUser(e, 'email')}
							/>
							<CustomInput
								type="password"
								labelText="Password"
								id={'password-form'}
								value={user.password}
								placeholder={'password'}
								onChange={(e) => onSetUser(e, 'password')}
							/>
							<div className="w-full flex flex-col gap-4 mt-8">
								<CustomButton value={'REGISTER'} onClick={handleOnRegister} />
								<CustomButton
									value={'BACK'}
									onClick={() => setSection(Section.profile)}
								/>
							</div>
						</>
					)}
					<div className="text-sm">
						You have account?
						<Link to={'/login'}>
							<span className="text-cyan-700 ms-1 font-bold">Login now</span>
						</Link>
					</div>
				</div>
			</div>
			<div className="hidden w-1/2 h-full p-32 bg-gradient-to-t from-cyan-500 to-blue-500 lg:flex flex-col justify-center items-center gap-20">
				<img
					src="https://golektruk.com/registrasi.png"
					alt="Image"
					className="w-full h-full"
				/>
				<h1 className=" text-4xl text-white font-bold">GolekTruk</h1>
			</div>
		</div>
	);
};

export default Register;
