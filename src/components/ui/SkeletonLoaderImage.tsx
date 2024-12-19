import { useState } from "react";
import styled from "styled-components";

interface SkeletonLoaderImageProps {
  src: string;
  alt?: string;
  className?: string;
}

const SkeletonLoaderImage = ({
  src,
  alt,
  className,
}: SkeletonLoaderImageProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <ImageContainer className={className}>
      {!isImageLoaded && <Skeleton />}
      <StyledImage
        src={src}
        alt={alt}
        onLoad={() => setIsImageLoaded(true)}
        $isVisible={isImageLoaded}
        loading="lazy"
      />
    </ImageContainer>
  );
};

export default SkeletonLoaderImage;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #e0e0e0;
  border-radius: 8px;
`;

const Skeleton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  @keyframes loading {
    from {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }
`;

const StyledImage = styled.img<{ $isVisible: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;
