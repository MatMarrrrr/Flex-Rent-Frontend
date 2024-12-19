import React, { useState } from "react";
import styled from "styled-components";
import Button from "@/components/buttons/Button";
import Loader from "@/components/ui/Loader";
import { fadeIn, fadeOut } from "@/styledComponents/keyframes";

interface DeleteListingModalProps {
  isVisible: boolean;
  isDeleting: boolean;
  listingId: number;
  listingName: string;
  onDeleteClick: (listingId: number) => void;
  onClose: () => void;
}

const DeleteListingModal: React.FC<DeleteListingModalProps> = ({
  isVisible,
  isDeleting,
  listingId,
  listingName,
  onDeleteClick,
  onClose,
}) => {
  const [isClosing, setisClosing] = useState<boolean>(false);

  const handleClose = () => {
    setisClosing(true);
    setTimeout(() => {
      onClose();
      setisClosing(false);
    }, 300);
  };

  if (!isVisible && !isClosing) return null;

  return (
    <ModalOverlay $isClosing={isClosing}>
      <ModalContent>
        <ModalTitle>
          Czy na pewno chcesz usunąć ogłoszenie: {listingName}
        </ModalTitle>
        <ButtonsContainer>
          <Button disabled={isDeleting} onClick={handleClose}>
            Nie
          </Button>
          <Button
            disabled={isDeleting}
            borderColor="var(--error)"
            background="var(--error)"
            fontColor="var(--white)"
            onClick={() => onDeleteClick(listingId)}
          >
            Tak{isDeleting && <Loader size={18} color="var(--white)" />}
          </Button>
        </ButtonsContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DeleteListingModal;

const ModalOverlay = styled.div<{ $isClosing: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--dark-50);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${({ $isClosing }) => ($isClosing ? fadeOut : fadeIn)} 0.3s ease;
`;

const ModalContent = styled.div`
  background: var(--light);
  padding: 40px 20px;
  border-radius: 6px;
  box-shadow: var(--shadow);
  position: relative;
  display: flex;
  gap: 20px;
  flex-direction: column;
  width: 100%;
  max-width: 700px;

  @media (max-width: 700px) {
    margin: 0 10px;
  }
`;

const ModalTitle = styled.p`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: var(--dark);
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 50px;

  @media (max-width: 450px) {
    flex-direction: column-reverse;
    gap: 20px;
  }
`;
