import styled from "styled-components";
import test_item from "@/assets/test_item.jpg";
import Loader from "@/components/ui/Loader";
import { useEffect, useState } from "react";
import MotionWrapper from "@/components/ui/MotionWrapper";
import { fromBottomVariants03 } from "@/consts/motionVariants";
import RequestCard from "@/sections/requests/components/RequestCard";
import OutgoingRequestButtons from "@/sections/requests/components/OutgoingRequestButtons";
import { RequestStatus } from "@/types/types";
import { Request } from "@/types/interfaces";

export default function OutgoingRequestsSection() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [outgoingRequests, setOutgoingRequests] = useState<Request[]>([]);

  const handleCancelClick = (requestID: number) => {
    updateRequestStatus(requestID, "canceled");
  };

  const handleSendMessageClick = (chatId: number) => {
    console.log(chatId);
  };

  const updateRequestStatus = (id: number, newStatus: RequestStatus) => {
    setOutgoingRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  useEffect(() => {
    const requests = Array.from({ length: 5 }, (_, index) => ({
      id: index + 1,
      image: test_item,
      name: `Nazwa rzeczy do wypożyczenia ${index + 1}`,
      category: "Kategoria",
      price: 100,
      currency: "PLN",
      localization: `Warszawa`,
      rentedPeriod: { from: "22.12.2024", to: "28.12.2024" },
      status: "waiting" as RequestStatus,
    }));
    setOutgoingRequests(requests);

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
          <LoaderText>Wczytywanie próśb</LoaderText>
        </LoaderContainer>
      ) : (
        <MotionWrapper variants={fromBottomVariants03}>
          {outgoingRequests.map((request) => (
            <RequestCard request={request}>
              <OutgoingRequestButtons
                requestStatus={request.status}
                onCancelClick={() => handleCancelClick(request.id)}
                onSendMessageClick={() => handleSendMessageClick(request.id)}
              />
            </RequestCard>
          ))}
        </MotionWrapper>
      )}
    </Container>
  );
}

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
