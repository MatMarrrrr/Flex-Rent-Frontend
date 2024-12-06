import React from "react";
import styled, { keyframes } from "styled-components";

interface LoaderProps {
  size?: number;
  color?: string;
  isCenter?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ size, color, isCenter }) => {
  return isCenter ? (
    <StyledLoaderContainer>
      <StyledLoader size={size} color={color} />
    </StyledLoaderContainer>
  ) : (
    <StyledLoader size={size} color={color} />
  );
};

export default Loader;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledLoaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const StyledLoader = styled.div<LoaderProps>`
  display: inline-block;
  width: ${({ size }) => size || 40}px;
  height: ${({ size }) => size || 40}px;
  color: ${({ color }) => color || "var(--dark)"};

  &:after {
    content: " ";
    display: block;
    width: ${({ size }) => (size ? size * 0.8 : 32)}px;
    height: ${({ size }) => (size ? size * 0.8 : 32)}px;
    margin: auto;
    border-radius: 50%;
    border: ${({ size }) => (size ? size * 0.1 : 4)}px solid currentColor;
    border-color: currentColor transparent currentColor transparent;
    animation: ${rotate} 1.2s linear infinite;
  }
`;
