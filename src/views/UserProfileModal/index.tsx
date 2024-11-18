import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function UserProfileModal({ isOpen, onOpenChange }: Props) {
  return (
    <Modal
      disableAnimation
      size="lg"
      radius="sm"
      placement="center"
      isOpen={isOpen}
      onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-2xl">
          User Profile
        </ModalHeader>
        <ModalBody></ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
