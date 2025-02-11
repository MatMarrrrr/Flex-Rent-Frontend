import styled from "styled-components";

interface HamburgerButtonProps {
  isOpen: boolean;
  toggleMobileNavbar: () => void;
}

interface LineProps {
  $isOpen: boolean;
  $position: "top" | "middle" | "bottom";
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  isOpen,
  toggleMobileNavbar,
}) => {
  return (
    <Hamburger onClick={toggleMobileNavbar}>
      <Line $isOpen={isOpen} $position="top" />
      <Line $isOpen={isOpen} $position="middle" />
      <Line $isOpen={isOpen} $position="bottom" />
    </Hamburger>
  );
};

export default HamburgerButton;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 48px;
  height: 32px;
  cursor: pointer;
  z-index: 100;
  position: fixed;
  top: 25px;
  right: 30px;
  z-index: 102;

  @media (max-width: 800px) {
    display: flex;
  }
`;

const Line = styled.div<LineProps>`
  width: 100%;
  height: 4px;
  background-color: white;
  transition: all 0.3s ease;

  ${({ $isOpen, $position }) =>
    $position === "top" &&
    $isOpen &&
    `
      transform: translateY(14px) rotate(45deg);
  `}

  ${({ $isOpen, $position }) =>
    $position === "middle" &&
    $isOpen &&
    `
      opacity: 0;
  `}

  ${({ $isOpen, $position }) =>
    $position === "bottom" &&
    $isOpen &&
    `
      transform: translateY(-14px) rotate(-45deg);
  `}
`;
