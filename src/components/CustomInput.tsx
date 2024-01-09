type Props = {
	type: string;
	labelText?: string;
	id?: string;
	value?: string;
	addClassName?: string;
	placeholder?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomInput = ({
	type = 'text',
	labelText,
	id,
	value,
	addClassName,
	placeholder,
	onChange,
}: Props) => {
	return (
		<label htmlFor="" className="w-full flex flex-col gap-1">
			{labelText}
			<input
				type={type}
				name=""
				id={id}
				value={value}
				className={`shadow-md w-full py-2 px-4 rounded-md bg-cyan-500 placeholder-slate-300 box-border text-slate-100 ${addClassName}`}
				placeholder={placeholder}
				onChange={onChange}
			/>
		</label>
	);
};

export default CustomInput;
