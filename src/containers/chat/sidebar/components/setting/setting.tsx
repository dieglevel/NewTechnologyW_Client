import { SettingIcon } from "@/assets/svgs";
import { SVGButton } from "@/components/ui";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@heroui/dropdown";
import { handleLogOut } from "./handle";

const Setting = () => {

	return (
		<Dropdown placement="right-start">
			<DropdownTrigger>
				<div className={`flex h-fit w-fit items-center justify-center rounded-md p-2 hover:bg-icon-active`}>
					<SettingIcon className="size-8 stroke-[3px] text-icon-active" />
				</div>
			</DropdownTrigger>
			<DropdownMenu>
					<DropdownItem
						key={"logout"}
						color="danger"
						className="text-danger font-bold"
						onPress={handleLogOut}
						textValue="Đăng xuất"
					>
						<p className="font-bold">Đăng xuất</p>
					</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};

export default Setting;
