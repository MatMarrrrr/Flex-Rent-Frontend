import styled from "styled-components";
import test_item from "@/assets/test_item.jpg";
import Loader from "@/components/ui/Loader";
import { useEffect, useState } from "react";
import MotionWrapper from "@/components/ui/MotionWrapper";
import { fromBottomVariants03 } from "@/consts/motionVariants";
import RequestCard from "@/sections/requests/components/RequestCard";
import IncomingRequestButtons from "@/sections/requests/components/IncomingRequestButtons";
import { RequestStatus, RequestAction } from "@/types/types";
import { Period, Request } from "@/types/interfaces";
import { useToast } from "@/contexts/ToastContext";
import FilterCheckbox from "@/sections/requests/components/FilterCheckbox";

export default function IncomingRequestsSection() {
  const { notify } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [incomingRequests, setIncomingRequests] = useState<Request[]>([]);
  const [updatingRequests, setUpdatingRequests] = useState<
    { requestId: number; action: RequestAction }[]
  >([]);
  const [filterStatuses, setFilterStatuses] = useState<RequestStatus[]>([
    "waiting",
  ]);

  const handleFilterChange = (status: RequestStatus) => {
    setFilterStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const filteredRequests = incomingRequests.filter((request) =>
    filterStatuses.length > 0 ? filterStatuses.includes(request.status) : true
  );

  const handleAcceptClick = (requestId: number) => {
    setUpdatingRequests((prev) => [
      ...prev,
      { requestId, action: "accepting" },
    ]);

    setTimeout(() => {
      setUpdatingRequests((prev) =>
        prev.filter(
          (req) => req.requestId !== requestId || req.action !== "accepting"
        )
      );
      updateRequestStatus(requestId, "accepted");
      notify("Prośba została zaakceptowana", "success");
    }, 1000);
  };

  const handleDeclineClick = (requestId: number) => {
    setUpdatingRequests((prev) => [
      ...prev,
      { requestId, action: "declining" },
    ]);

    setTimeout(() => {
      setUpdatingRequests((prev) =>
        prev.filter(
          (req) => req.requestId !== requestId || req.action !== "declining"
        )
      );
      updateRequestStatus(requestId, "declined");
      notify("Prośba została odrzucona", "success");
    }, 1000);
  };

  const handleSendMessageClick = (chatId: number) => {
    console.log(chatId);
  };

  const handleConfirmRentalClick = (requestId: number) => {
    setUpdatingRequests((prev) => [
      ...prev,
      { requestId, action: "confirming" },
    ]);
    setTimeout(() => {
      setUpdatingRequests((prev) =>
        prev.filter(
          (req) => req.requestId !== requestId || req.action !== "confirming"
        )
      );
      updateRequestStatus(requestId, "confirmed");
      notify("Wynajem został potwierdzony", "success");
    }, 1000);
  };

  const updateRequestStatus = (requestId: number, newStatus: RequestStatus) => {
    setIncomingRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId ? { ...request, status: newStatus } : request
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
      rentedPeriod: {
        startDate: "22.12.2024",
        endDate: "28.12.2024",
      } as Period,
      status: index % 2 === 0 ? "waiting" : ("accepted" as RequestStatus),
    }));
    setIncomingRequests(requests);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Container>
      {isLoading ? (
        <LoaderContainer>
          <Loader />
          <LoaderText>Wczytywanie próśb</LoaderText>
        </LoaderContainer>
      ) : (
        <>
          <FilterCheckboxesContainer>
            <FilterText>Pokaż tylko:</FilterText>
            {["waiting", "accepted", "confirmed"].map((status) => (
              <FilterCheckbox
                key={status}
                label={
                  status === "waiting"
                    ? "Oczekujące"
                    : status === "accepted"
                    ? "Zaakceptowane"
                    : "Zatwierdzone"
                }
                isChecked={filterStatuses.includes(status as RequestStatus)}
                onChange={() => handleFilterChange(status as RequestStatus)}
              />
            ))}
          </FilterCheckboxesContainer>
          <MotionWrapper variants={fromBottomVariants03}>
            {filteredRequests.map((request) => {
              const isUpdatingAccept = updatingRequests.some(
                (req) =>
                  req.requestId === request.id && req.action === "accepting"
              );
              const isUpdatingDecline = updatingRequests.some(
                (req) =>
                  req.requestId === request.id && req.action === "declining"
              );
              const isUpdatingConfirm = updatingRequests.some(
                (req) =>
                  req.requestId === request.id && req.action === "confirming"
              );

              return (
                <RequestCard request={request} key={request.id}>
                  <IncomingRequestButtons
                    requestStatus={request.status}
                    isUpdating={
                      isUpdatingAccept || isUpdatingDecline || isUpdatingConfirm
                    }
                    updatingAction={
                      isUpdatingAccept
                        ? "accepting"
                        : isUpdatingDecline
                        ? "declining"
                        : isUpdatingConfirm
                        ? "confirming"
                        : null
                    }
                    onAcceptClick={() => handleAcceptClick(request.id)}
                    onDeclineClick={() => handleDeclineClick(request.id)}
                    onSendMessageClick={() =>
                      handleSendMessageClick(request.id)
                    }
                    onConfirmRentalClick={() =>
                      handleConfirmRentalClick(request.id)
                    }
                  />
                </RequestCard>
              );
            })}
            {filteredRequests.length === 0 && (
              <NoResultsText>Nie znaleziono próśb</NoResultsText>
            )}
          </MotionWrapper>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 10px 10% 60px 10%;
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

const FilterCheckboxesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  @media (max-width: 780px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
`;

const FilterText = styled.p`
  font-size: 22px;
  gap: 10px;
`;

const NoResultsText = styled.p`
  font-size: 24px;
  color: var(--dark);
  font-weight: bold;
`;
