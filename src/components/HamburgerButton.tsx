import styled from "styled-components";

interface HamburgerButtonProps {
  isOpen: boolean;
  toggleMobileNavbar: () => void;
}

export const HamburgerButton = ({
  isOpen,
  toggleMobileNavbar,
}: HamburgerButtonProps) => {
  return (
    <Hamburger onClick={toggleMobileNavbar}>
      <Line isOpen={isOpen} position="top" />
      <Line isOpen={isOpen} position="middle" />
      <Line isOpen={isOpen} position="bottom" />
    </Hamburger>
  );
};

interface LineProps {
  isOpen: boolean;
  position: "top" | "middle" | "bottom";
}

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 48px;
  height: 32px;
  cursor: pointer;
  z-index: 100;
  position: absolute;
  top: 25px;
  right: 30px;

  @media(max-width: 700px){
    display: flex;
  }
`;

const Line = styled.div<LineProps>`
  width: 100%;
  height: 4px;
  background-color: white;
  transition: all 0.3s ease;

  ${({ isOpen, position }) =>
    position === "top" &&
    isOpen &&
    `
      transform: translateY(14px) rotate(45deg);
  `}

  ${({ isOpen, position }) =>
    position === "middle" &&
    isOpen &&
    `
      opacity: 0;
  `}

  ${({ isOpen, position }) =>
    position === "bottom" &&
    isOpen &&
    `
      transform: translateY(-14px) rotate(-45deg);
  `}
`;
