import styled from "styled-components";
import { MapPin as MapPinIcon } from "lucide-react";
import SkeletonLoaderImage from "@/components/ui/SkeletonLoaderImage";
import getSymbolFromCurrency from "currency-symbol-map";

interface ResultCardProps {
  id: number;
  image: string;
  name: string;
  price: number;
  currencyCode: string;
  localization: string;
  onClick: (id: number) => void;
}

const ResultCard: React.FC<ResultCardProps> = ({
  id,
  image,
  name,
  price,
  currencyCode,
  localization,
  onClick,
}) => {
  return (
    <ResultCardContainer onClick={() => onClick(id)}>
      <Image src={image} />
      <ItemName>{name}</ItemName>
      <ItemDetailsContainer>
        <ItemDetailText>
          {price}
          {getSymbolFromCurrency(currencyCode)} / Dzień
        </ItemDetailText>
        <ItemLocalizationContainer>
          <ItemLocalizationIcon />
          <ItemDetailText>{localization}</ItemDetailText>
        </ItemLocalizationContainer>
      </ItemDetailsContainer>
    </ResultCardContainer>
  );
};

export default ResultCard;

const ResultCardContainer = styled.div`
  padding: 20px;
  border-radius: 6px;
  box-shadow: var(--shadow);
  border-bottom: 4px solid var(--primary);
  height: 100%;
  min-width: 240px;
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

const Image = styled(SkeletonLoaderImage)`
  width: 100%;
  max-width: 400px;
  height: 300px;
  border-radius: 6px;
  margin-bottom: 10px;
`;

const ItemName = styled.p`
  font-size: 20px;
  font-weight: 900;
  color: var(--dark);
  margin-bottom: 5px;
  text-align: center;

  @media (max-width: 430px) {
    font-size: 16px;
  }
`;

const ItemDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  @media (max-width: 430px) {
    gap: 5px;
  }
`;

const ItemDetailText = styled.p`
  font-size: 16px;
  color: var(--dark);

  @media (max-width: 430px) {
    font-size: 14px;
  }
`;

const ItemLocalizationContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const ItemLocalizationIcon = styled(MapPinIcon)`
  height: 18px;
  width: 18px;
  color: var(--dark);
`;
