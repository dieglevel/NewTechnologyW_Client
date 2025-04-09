interface Props {
	onClick?: () => void;
	className?: string;
	children?: React.ReactNode;
}

export const SVGButton = ({ children, className, onClick}: Props) => {
	return (
		<div
			className={`flex h-fit w-fit items-center justify-center rounded-md p-2 hover:bg-icon-active ${className}`}
			onClick={onClick}
		>
			{children}
		</div>
	);
};
