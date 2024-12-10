import React from "react";
import styled from "styled-components";
import SkeletonLoaderImage from "../ui/SkeletonLoaderImage";

interface CategoryCardProps {
  id: number;
  image: string;
  category: string;
  onClick: (id: number) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  image,
  category,
  onClick,
}) => {
  return (
    <CardContainer onClick={() => onClick(id)}>
      <Image src={image} alt={category} />
      <Overlay />
      <CategoryName>{category}</CategoryName>
      <GradientOverlay />
    </CardContainer>
  );
};

export default CategoryCard;

const CardContainer = styled.button`
  position: relative;
  border: 0;
  width: 200px;
  height: 200px;
  cursor: pointer;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

const Image = styled(SkeletonLoaderImage)`
  width: 100%;
  height: 100%;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--dark-50);
`;

const GradientOverlay = styled.div`
  height: 80px;
  width: 100%;
  background: var(--gradient-50);
  position: absolute;
  bottom: 0;

  mask-image: var(--mask-gradient);
  -webkit-mask-image: var(--mask-gradient);
`;

const CategoryName = styled.div`
  position: absolute;
  bottom: 40%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;
