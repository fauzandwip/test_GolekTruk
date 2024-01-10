type Props = {
	value: string;
	onClick?: () => void;
};

const CustomButton = ({ value, onClick }: Props) => {
	return (
		<button
			type="submit"
			className="w-full py-2 px-4 mt-8 rounded-md hover:cursor-pointer bg-gradient-to-r from-blue-500 to-cyan-500 placeholder-slate-300 box-border text-slate-100 hover:opacity-80 text-lg font-bold"
			onClick={onClick}
		>
			{value}
		</button>
	);
};

export default CustomButton;
