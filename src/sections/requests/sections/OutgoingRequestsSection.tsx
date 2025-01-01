import styled from "styled-components";
import test_item from "@/assets/test_item.jpg";
import Loader from "@/components/ui/Loader";
import { useEffect, useState } from "react";
import MotionWrapper from "@/components/ui/MotionWrapper";
import { fromBottomVariants03 } from "@/consts/motionVariants";
import RequestCard from "@/sections/requests/components/RequestCard";
import OutgoingRequestButtons from "@/sections/requests/components/OutgoingRequestButtons";
import { RequestStatus } from "@/types/types";
import { Period, Request } from "@/types/interfaces";
import { useToast } from "@/contexts/ToastContext";
import { Range } from "react-date-range";
import ChangePeriodModal from "@/components/modals/ChangePeriodModal";
import { formatDateForDisplay } from "@/utils/dataHelpers";
import FilterCheckbox from "@/sections/requests/components/FilterCheckbox";

export default function OutgoingRequestsSection() {
  const { notify } = useToast();
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

  const updateRequestPeriod = (requestId: number, selectedRange: Range) => {
    setOutgoingRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId
          ? {
              ...request,
              rentedPeriod: {
                startDate: formatDateForDisplay(selectedRange.startDate!),
                endDate: formatDateForDisplay(selectedRange.endDate!),
              },
            }
          : request
      )
    );
  };

  const updateRequestStatus = (requestId: number, newStatus: RequestStatus) => {
    setOutgoingRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId ? { ...request, status: newStatus } : request
      )
    );
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

  const handleCancelClick = (requestId: number) => {
    setUpdatingRequestIds((prev) => [...prev, requestId]);

    setTimeout(() => {
      setUpdatingRequestIds((prev) => prev.filter((id) => id !== requestId));
      updateRequestStatus(requestId, "canceled");
      notify("Prośba została anulowana", "success");
    }, 1000);
  };

  const handleSendMessageClick = (chatId: number) => {
    console.log(chatId);
  };

  const handleChangePeriodClick = (requestId: number) => {
    showChangePeriodModal(requestId);
  };

  const handlePeriodChange = (requestId: number, selectedRange: Range) => {
    setIsChanging(true);

    setTimeout(() => {
      updateRequestPeriod(requestId, selectedRange);
      setIsChanging(false);
      setModalData((prev) => ({ ...prev, isVisible: false }));
      notify("Okres wypożyczenia został zmieniony", "success");
    }, 1000);
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
    setOutgoingRequests(requests);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
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
              {["waiting", "accepted", "canceled"].map((status) => (
                <FilterCheckbox
                  key={status}
                  label={
                    status === "waiting"
                      ? "Oczekujące"
                      : status === "accepted"
                      ? "Zaakceptowane"
                      : "Anulowane"
                  }
                  isChecked={filterStatuses.includes(status as RequestStatus)}
                  onChange={() => handleFilterChange(status as RequestStatus)}
                />
              ))}
            </FilterCheckboxesContainer>
          </FilterCheckboxesContainer>
          <MotionWrapper variants={fromBottomVariants03}>
            {filteredRequests.map((request) => (
              <RequestCard request={request} key={request.id}>
                <OutgoingRequestButtons
                  requestId={request.id}
                  requestStatus={request.status}
                  isUpdating={updatingRequestIds.includes(request.id)}
                  onCancelClick={() => handleCancelClick(request.id)}
                  onSendMessageClick={() => handleSendMessageClick(request.id)}
                  onChangePeriodClick={() =>
                    handleChangePeriodClick(request.id)
                  }
                />
              </RequestCard>
            ))}
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
