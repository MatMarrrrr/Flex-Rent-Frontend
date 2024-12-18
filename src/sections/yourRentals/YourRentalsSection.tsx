import Loader from "@/components/ui/Loader";
import MotionWrapper from "@/components/ui/MotionWrapper";
import { useEffect, useState } from "react";
import test_item from "@/assets/test_item.jpg";
import styled from "styled-components";
import { fromBottomVariants03 } from "@/consts/motionVariants";
import RentalItem from "@/sections/yourRentals/components/RentalItem";

const YourRentalsSection = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleSendMessageClick = (id: number) => {
    console.log("Message" + id);
  };

  const rentals = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    image: test_item,
    name: `Nazwa rzeczy do wypożyczenia ${index + 1}`,
    category: "Kategoria",
    price: 100,
    currency: "PLN",
    localization: `Warszawa`,
    rentedPeriod: { from: "22.12.2024", to: "28.12.2024" },
  }));

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Container>
      {isLoading ? (
        <LoaderContainer>
          <Loader isCenter={true} />
          <LoaderText>Wczytywanie ogłoszeń</LoaderText>
        </LoaderContainer>
      ) : (
        <MotionWrapper variants={fromBottomVariants03}>
          {rentals.map((rental) => (
            <RentalItem
              key={rental.id}
              id={rental.id}
              image={rental.image}
              name={rental.name}
              category={rental.category}
              price={rental.price}
              currency={rental.currency}
              localization={rental.localization}
              rentedPeriod={rental.rentedPeriod}
              onSendMessageClick={() => handleSendMessageClick(rental.id)}
            />
          ))}
        </MotionWrapper>
      )}
    </Container>
  );
};

export default YourRentalsSection;

const Container = styled.div`
  padding: 30px 10% 60px 10%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  background-color: var(--light);
  min-height: calc(100vh - 493px);

  @media (max-width: 1320px) {
    align-items: center;
  }
`;

const LoaderContainer = styled.div`
  padding: 20px 10% 40px 10%;
  display: flex;
  gap: 10px;
  flex-grow: 1;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const LoaderText = styled.p`
  font-size: 30px;
  color: var(--dark);
  font-weight: bold;
  text-align: center;
`;
