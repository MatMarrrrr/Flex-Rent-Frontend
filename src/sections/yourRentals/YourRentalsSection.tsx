import Loader from "@/components/ui/Loader";
import MotionWrapper from "@/components/ui/MotionWrapper";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { fromBottomVariants03 } from "@/consts/motionVariants";
import RentalItem from "@/sections/yourRentals/components/RentalItem";
import { Rental } from "@/types/interfaces";
import apiClient from "@/utils/apiClient";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router";

const YourRentalsSection = () => {
  const { token } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [yourRentals, setYourRentals] = useState<Rental[]>([]);

  const handleGoToChatClick = async (rentalId: number) => {
    const response = await apiClient.get(`chats/rental/${rentalId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    navigate(`/dashboard/messages`, {
      state: { chatId: response.data.chat.id },
    });
  };

  const getYourRentals = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(`rentals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setYourRentals(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getYourRentals();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <LoaderContainer>
          <Loader />
          <LoaderText>Wczytywanie ogłoszeń</LoaderText>
        </LoaderContainer>
      ) : (
        <MotionWrapper variants={fromBottomVariants03}>
          {yourRentals.map((rental) => (
            <RentalItem
              key={rental.id}
              rental={rental}
              onGoToChatClick={() => handleGoToChatClick(rental.id)}
            />
          ))}
          {yourRentals.length === 0 && (
            <NoResultsText>Aktualnie nie masz żadnych wypożyczeń</NoResultsText>
          )}
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
  font-size: 24px;
  color: var(--dark);
  font-weight: bold;
  text-align: center;
`;

const NoResultsText = styled.p`
  font-size: 24px;
  text-align: start;
  color: var(--dark);
  font-weight: bold;

  @media (max-width: 620px) {
    text-align: center;
  }
`;
