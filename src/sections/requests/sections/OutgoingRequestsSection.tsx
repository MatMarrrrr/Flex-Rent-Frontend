import styled from "styled-components";
import Loader from "@/components/ui/Loader";
import { useEffect, useState } from "react";
import MotionWrapper from "@/components/ui/MotionWrapper";
import { fromBottomVariants03 } from "@/consts/motionVariants";
import RequestCard from "@/sections/requests/components/RequestCard";
import OutgoingRequestButtons from "@/sections/requests/components/OutgoingRequestButtons";
import { RequestStatus } from "@/types/types";
import { Request } from "@/types/interfaces";
import { useToast } from "@/contexts/ToastContext";
import { Range } from "react-date-range";
import ChangePeriodModal from "@/components/modals/ChangePeriodModal";
import FilterCheckbox from "@/sections/requests/components/FilterCheckbox";
import apiClient from "@/utils/apiClient";
import { useUser } from "@/contexts/UserContext";
import { format } from "date-fns";

export default function OutgoingRequestsSection() {
  const { notify } = useToast();
  const { token } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [outgoingRequests, setOutgoingRequests] = useState<Request[]>([]);
  const [updatingRequestIds, setUpdatingRequestIds] = useState<number[]>([]);
  const [isChanging, setIsChanging] = useState<boolean>(false);
  const [modalData, setModalData] = useState<{
    isVisible: boolean;
    requestId: number | null;
  }>({
    isVisible: false,
    requestId: null,
  });
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

  const filteredRequests = outgoingRequests.filter((request) =>
    filterStatuses.length > 0 ? filterStatuses.includes(request.status) : true
  );

  const getStatusLabel = (status: RequestStatus) => {
    switch (status) {
      case "waiting":
        return "Oczekujące";
      case "accepted":
        return "Zaakceptowane";
      case "declined":
        return "Odrzucone";
      case "canceled":
        return "Anulowane";
      default:
        return "Nieznany status";
    }
  }

  const updateRequestPeriod = (requestId: number, selectedRange: Range) => {
    setOutgoingRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId
          ? {
              ...request,
              start_date: format(selectedRange.startDate!, "yyyy-MM-dd"),
              end_date: format(selectedRange.endDate!, "yyyy-MM-dd"),
            }
          : request
      )
    );
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
    setOutgoingRequests((prevRequests) => {
      const updatedRequests = prevRequests.map((request) =>
        request.id === requestId ? { ...request, status: newStatus } : request
      );
      return sortRequestsByStatus(updatedRequests);
    });
  };

  const showChangePeriodModal = (requestId: number) => {
    setModalData({
      isVisible: true,
      requestId: requestId,
    });
  };

  const hideChangePeriodModal = () => {
    setModalData({
      isVisible: false,
      requestId: null,
    });
  };

  const handleCancelClick = async (requestId: number) => {
    setUpdatingRequestIds((prev) => [...prev, requestId]);
    try {
      await apiClient.patch(`requests/${requestId}/cancel`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      updateRequestStatus(requestId, "canceled");
      notify("Prośba została anulowana", "success");
    } catch (error) {
      console.error(error);
      notify("Wystąpił błąd podczas anulowania prośby", "error");
    } finally {
      setUpdatingRequestIds((prev) => prev.filter((id) => id !== requestId));
    }
  };

  const handleSendMessageClick = (chatId: number) => {
    console.log(chatId);
  };

  const handleChangePeriodClick = (requestId: number) => {
    showChangePeriodModal(requestId);
  };

  const handlePeriodChange = async (
    requestId: number,
    selectedRange: Range
  ) => {
    setIsChanging(true);
    const { startDate, endDate } = selectedRange;
    if (!startDate || !endDate) return;
    const start_date = format(startDate, "yyyy-MM-dd");
    const end_date = format(endDate, "yyyy-MM-dd");

    try {
      await apiClient.patch(
        `requests/${requestId}/update-period`,
        { start_date: start_date, end_date: end_date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      updateRequestPeriod(requestId, selectedRange);
      setIsChanging(false);
      notify("Okres wypożyczenia został zmieniony", "success");
    } catch (error) {
      console.error(error);
      notify("Wystąpił błąd podczas zmiany okresu wypożyczenia", "error");
    } finally {
      setUpdatingRequestIds((prev) => prev.filter((id) => id !== requestId));
      setModalData((prev) => ({ ...prev, isVisible: false }));
    }
  };

  const getOutgoingRequests = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(`requests/outgoing`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOutgoingRequests(sortRequestsByStatus(response.data.requests));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOutgoingRequests();
  }, []);

  return (
    <Container>
      <ChangePeriodModal
        isVisible={modalData.isVisible}
        isChanging={isChanging}
        requestId={modalData.requestId!}
        onAcceptClick={handlePeriodChange}
        onClose={hideChangePeriodModal}
      />
      {isLoading ? (
        <LoaderContainer>
          <Loader />
          <LoaderText>Wczytywanie próśb</LoaderText>
        </LoaderContainer>
      ) : (
        <>
          <FilterCheckboxesContainer>
            <FilterText>Pokaż tylko: </FilterText>
            <FilterCheckboxesContainer>
              {["waiting", "accepted", "declined", "canceled"].map((status) => (
                <FilterCheckbox
                  key={status}
                  label={getStatusLabel(status as RequestStatus)}
                  isChecked={filterStatuses.includes(status as RequestStatus)}
                  onChange={() => handleFilterChange(status as RequestStatus)}
                />
              ))}
            </FilterCheckboxesContainer>
          </FilterCheckboxesContainer>
          <MotionWrapper variants={fromBottomVariants03}>
            {filteredRequests.map((request) => {
              console.log(request);
              return (
                <RequestCard request={request} key={request.id}>
                  <OutgoingRequestButtons
                    requestId={request.id}
                    requestStatus={request.status}
                    isUpdating={updatingRequestIds.includes(request.id)}
                    onCancelClick={() => handleCancelClick(request.id)}
                    onSendMessageClick={() =>
                      handleSendMessageClick(request.id)
                    }
                    onChangePeriodClick={() =>
                      handleChangePeriodClick(request.id)
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

  @media (max-width: 950px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
`;

const FilterText = styled.p`
  font-size: 20px;
  gap: 10px;
`;

const NoResultsText = styled.p`
  font-size: 24px;
  color: var(--dark);
  font-weight: bold;
`;
