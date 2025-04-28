
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { useState } from "react";

interface ModalConfirmProps {
	isOpen: boolean;
    header: string;
	onOpenChange: () => void;
	onConfirm: () => void;
}

export const ModalConfirm = ({ isOpen, header, onOpenChange, onConfirm }: ModalConfirmProps) => {

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
                            <p>{header}</p>
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
                                    onConfirm()
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
