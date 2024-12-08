import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { categories } from "../../consts/categories";
import xIcon from "../../assets/icons/x.svg";

interface CategoryModalProps {
  isVisible: boolean;
  onClose: () => void;
  onCategoryClick: (categoryId: number) => void;
}

interface ModalOverlayProps {
  isClosing: boolean;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isVisible,
  onClose,
  onCategoryClick,
}) => {
  const [isClosing, setisClosing] = useState<boolean>(false);

  const handleCategoryClick = (categoryId: number) => {
    onCategoryClick(categoryId);
    handleClose();
  };

  const handleClose = () => {
    setisClosing(true);
    setTimeout(() => {
      onClose();
      setisClosing(false);
    }, 300);
  };

  if (!isVisible && !isClosing) return null;

  return (
    <ModalOverlay isClosing={isClosing}>
      <ModalContent>
        <CloseButton onClick={handleClose} src={xIcon} />
        <ModalTitle>Kategorie</ModalTitle>
        <CategoriesContainer>
          {categories.map((category) => (
            <CategoryContainer
              key={category.name}
              onClick={() => handleCategoryClick(category.id)}
            >
              <CategoryText>{category.name}</CategoryText>
            </CategoryContainer>
          ))}
        </CategoriesContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CategoryModal;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const ModalOverlay = styled.div<ModalOverlayProps>`
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
  animation: ${({ isClosing }) => (isClosing ? fadeOut : fadeIn)} 0.3s ease;
`;

const ModalContent = styled.div`
  background: var(--light);
  padding: 40px 20px;
  border-radius: 6px;
  box-shadow: var(--shadow);
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;

  @media (max-width: 700px) {
    margin: 0 10px;
  }
`;

const CloseButton = styled.img`
  height: 35px;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ModalTitle = styled.p`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: var(--dark);
`;

const CategoriesContainer = styled.div`
  width: 100%;
`;

const CategoryText = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: var(--dark);
`;

const CategoryContainer = styled.div`
  padding: 10px;
  border-radius: 6px;
  background-color: var(--light);

  cursor: pointer;
  &:hover {
    background-color: var(--dark);

    ${CategoryText} {
      color: var(--light);
    }
  }
`;
