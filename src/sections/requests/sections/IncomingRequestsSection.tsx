import styled from "styled-components";
import Loader from "@/components/ui/Loader";
import { useEffect, useState } from "react";
import MotionWrapper from "@/components/ui/MotionWrapper";
import { fromBottomVariants03 } from "@/consts/motionVariants";
import RequestCard from "@/sections/requests/components/RequestCard";
import IncomingRequestButtons from "@/sections/requests/components/IncomingRequestButtons";
import { RequestStatus, RequestAction } from "@/types/types";
import { Request } from "@/types/interfaces";
import { useToast } from "@/contexts/ToastContext";
import FilterCheckbox from "@/sections/requests/components/FilterCheckbox";
import apiClient from "@/utils/apiClient";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router";

export default function IncomingRequestsSection() {
  const { notify } = useToast();
  const { token } = useUser();
  const navigate = useNavigate();
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

  const getStatusLabel = (status: RequestStatus) => {
    switch (status) {
      case "waiting":
        return "Oczekujące";
      case "accepted":
        return "Zaakceptowane";
      case "confirmed":
        return "Zatwierdzone";
      case "declined":
        return "Odrzucone";
      case "canceled":
        return "Anulowane";
    }
  };

  const getUpdatingAction = (requestId: number) => {
    const updatingRequest = updatingRequests.find(
      (req) => req.requestId === requestId
    );
    return updatingRequest?.action || null;
  };

  const handleAcceptClick = async (requestId: number) => {
    setUpdatingRequests((prev) => [
      ...prev,
      { requestId, action: "accepting" },
    ]);

    try {
      await apiClient.patch(`requests/${requestId}/accept`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      updateRequestStatus(requestId, "accepted");
      notify("Prośba została zaakceptowana", "success");
    } catch (error) {
      console.error(error);
      notify("Wystąpił błąd podczas akceptowania prośby", "error");
    } finally {
      setUpdatingRequests((prev) =>
        prev.filter(
          (req) => req.requestId !== requestId || req.action !== "accepting"
        )
      );
    }
  };

  const handleDeclineClick = async (requestId: number) => {
    setUpdatingRequests((prev) => [
      ...prev,
      { requestId, action: "declining" },
    ]);

    try {
      await apiClient.patch(`requests/${requestId}/decline`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      updateRequestStatus(requestId, "declined");
      notify("Prośba została odrzucona", "success");
    } catch (error) {
      console.error(error);
      notify("Wystąpił błąd podczas odrzucania prośby", "error");
    } finally {
      setUpdatingRequests((prev) =>
        prev.filter(
          (req) => req.requestId !== requestId || req.action !== "declining"
        )
      );
    }
  };

  const handleGoToChatClick = async (requestId: number) => {
    setUpdatingRequests((prev) => [
      ...prev,
      { requestId, action: "goingToChat" },
    ]);

    const response = await apiClient.get(`chats/${requestId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    navigate(`/dashboard/messages`, {
      state: { chatId: response.data.chat.id },
    });
  };

  const handleConfirmRentalClick = async (requestId: number) => {
    setUpdatingRequests((prev) => [
      ...prev,
      { requestId, action: "confirming" },
    ]);

    try {
      await apiClient.patch(`requests/${requestId}/confirm`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      updateRequestStatus(requestId, "confirmed");
      notify("Wynajem został potwierdzony", "success");
    } catch (error) {
      console.error(error);
      notify("Wystąpił błąd podczas potwierdzania wynajmu", "error");
    } finally {
      setUpdatingRequests((prev) =>
        prev.filter(
          (req) => req.requestId !== requestId || req.action !== "confirming"
        )
      );
    }
  };

  const sortRequestsByStatus = (requests: Request[]): Request[] => {
    const statusOrder: Record<RequestStatus, number> = {
      waiting: 1,
      accepted: 2,
      confirmed: 3,
      declined: 4,
      canceled: 5,
    };
    const DEFAULT_ORDER = 999;

    return [...requests].sort(
      (a, b) =>
        (statusOrder[a.status] || DEFAULT_ORDER) -
        (statusOrder[b.status] || DEFAULT_ORDER)
    );
  };

  const updateRequestStatus = (requestId: number, newStatus: RequestStatus) => {
    setIncomingRequests((prevRequests) => {
      const updatedRequests = prevRequests.map((request) =>
        request.id === requestId ? { ...request, status: newStatus } : request
      );
      return sortRequestsByStatus(updatedRequests);
    });
  };

  const getIncomingRequests = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(`requests/incoming`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIncomingRequests(sortRequestsByStatus(response.data.requests));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getIncomingRequests();
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
          {incomingRequests.length > 0 && (
            <FilterContainer>
              <FilterText>Pokaż tylko:</FilterText>
              <CheckboxesContainer>
                {[
                  "waiting",
                  "accepted",
                  "confirmed",
                  "declined",
                  "canceled",
                ].map((status) => (
                  <FilterCheckbox
                    key={status}
                    label={getStatusLabel(status as RequestStatus)}
                    isChecked={filterStatuses.includes(status as RequestStatus)}
                    onChange={() => handleFilterChange(status as RequestStatus)}
                  />
                ))}
              </CheckboxesContainer>
            </FilterContainer>
          )}

          <MotionWrapper variants={fromBottomVariants03}>
            {filteredRequests.map((request) => {
              const updatingAction = getUpdatingAction(request.id);
              const isUpdating = !!updatingAction;

              return (
                <RequestCard request={request} key={request.id}>
                  <IncomingRequestButtons
                    requestStatus={request.status}
                    isUpdating={isUpdating}
                    updatingAction={updatingAction}
                    onAcceptClick={() => handleAcceptClick(request.id)}
                    onDeclineClick={() => handleDeclineClick(request.id)}
                    onGoToChatClick={() => handleGoToChatClick(request.id)}
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

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  @media (max-width: 1320px) {
    width: 100%;
    max-width: 700px;
    justify-content: start;
    align-items: start;
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const CheckboxesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto);
  grid-template-rows: auto;
  column-gap: 15px;

  @media (max-width: 1320px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    row-gap: 15px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, 1fr);
  }
`;

const FilterText = styled.p`
  font-size: 20px;
  margin: 0 15px 0 0;

  @media (max-width: 600px) {
    margin: 0 0 10px 0;
  }
`;

const NoResultsText = styled.p`
  font-size: 24px;
  color: var(--dark);
  font-weight: bold;
  margin-top: 15px;
`;
