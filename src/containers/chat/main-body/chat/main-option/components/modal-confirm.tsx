
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { useState } from "react";

interface ModalConfirmProps {
	isOpen: boolean;
	onOpenChange: () => void;
	onConfirm: (blockUser: boolean) => void;
}

export const ModalConfirm = ({ isOpen, onOpenChange, onConfirm }: ModalConfirmProps) => {
	const [blockUser, setBlockUser] = useState(false);

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			placement="center"
		>
			<ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Xác nhận</ModalHeader>
                        <ModalBody>
                            <p>Bạn có chắc chắn muốn xóa thành viên này khỏi nhóm?</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                variant="light"
                                onPress={onClose}
                            >
                                Đóng
                            </Button>
                            <Button
                                color="danger"
                                onPress={() => {
                                    onConfirm(blockUser);
                                    onClose();
                                }}
                            >
                                Đồng ý
                            </Button>
                        </ModalFooter>
                    </>
                )}
			</ModalContent>
		</Modal>
	);
};
