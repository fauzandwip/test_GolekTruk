import { useState } from 'react';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import IconProfile from '../components/IconProfile';

enum Section {
	profile = 'profile',
	authentication = 'authentication',
}

const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [section, setSection] = useState(Section.profile);

	return (
		<div className="w-full h-screen flex">
			<div className="w-1/2 h-full flex justify-center items-center">
				<div className="w-3/4 h-max shadow-inner shadow-cyan-500 rounded-lg flex flex-col items-center justify-center py-10 px-10 gap-4">
					<h1 className="bg-clip-text text-transparent bg-cyan-600 font-bold text-5xl p-2 mb-10">
						Register
					</h1>

					{section === Section.profile ? (
						<>
							<div className="w-full h-full gap-10 flex flex-col justify-center items-center">
								<label
									htmlFor="file-input"
									className=" aspect-square rounded-full bg-gray-300 w-60 flex justify-center items-center"
								>
									<input
										type="file"
										name=""
										id="file-input"
										className="hidden"
									/>
									<IconProfile />
								</label>
								<div className="w-full flex gap-10">
									<div className="w-3/4">
										<CustomInput
											type="email"
											labelText="Fullname"
											id={'email-form'}
											value={email}
											placeholder={'jack@gmail.com'}
											onChange={(e) => {
												setEmail(e.target.value);
											}}
										/>
									</div>
									<div className="w-1/4">
										<CustomInput
											type="number"
											labelText="Age"
											id={'number-form'}
											value={1}
											placeholder={'jack@gmail.com'}
										/>
									</div>
								</div>
							</div>
							<CustomButton
								value={'NEXT'}
								onClick={() => setSection(Section.authentication)}
							/>
						</>
					) : (
						<>
							<CustomInput
								type="email"
								labelText="Phone"
								id={'email-form'}
								value={email}
								placeholder={'jack@gmail.com'}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>

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
							<div className="w-full flex flex-col">
								<CustomButton value={'REGISTER'} />
								<CustomButton
									value={'BACK'}
									onClick={() => setSection(Section.profile)}
								/>
							</div>
						</>
					)}
				</div>
			</div>
			<div className="w-1/2 h-full p-32 bg-gradient-to-t from-cyan-500 to-blue-500 flex flex-col justify-center items-center gap-20">
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
