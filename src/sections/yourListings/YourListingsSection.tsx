import styled from "styled-components";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import ListingItem from "@/sections/yourListings/components/ListingItem";
import Loader from "@/components/ui/Loader";
import { useEffect, useState } from "react";
import MotionWrapper from "@/components/ui/MotionWrapper";
import { fromBottomVariants03 } from "@/consts/motionVariants";
import { useNavigate } from "react-router";
import DeleteListingModal from "@/components/modals/DeleteListingModal";
import { useToast } from "@/contexts/ToastContext";
import { Listing } from "@/types/interfaces";
import { ListingStatus } from "@/types/types";
import apiClient from "@/utils/apiClient";
import { useUser } from "@/contexts/UserContext";

const YourListingsSection = () => {
  const navigate = useNavigate();
  const { notify } = useToast();
  const { token } = useUser();

  const [yourListings, setYourListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalData, setModalData] = useState<{
    isVisible: boolean;
    listingId: number | null;
    listingName: string | null;
  }>({
    isVisible: false,
    listingId: null,
    listingName: null,
  });
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const showDeleteListingModal = (listingId: number, listingName: string) => {
    setModalData({
      isVisible: true,
      listingId: listingId,
      listingName: listingName,
    });
  };

  const hideDeleteListingModal = () => {
    setModalData({
      isVisible: false,
      listingId: null,
      listingName: null,
    });
  };

  const handleAddClick = () => {
    navigate("/add-listing");
  };

  const handleEditClick = (listingId: number) => {
    navigate(`/edit-listing/${listingId}`);
  };

  const handleDeleteClick = async (listingId: number) => {
    setIsDeleting(true);
    const response = await apiClient.delete(`/listings/${listingId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      setIsDeleting(false);
      hideDeleteListingModal();
      updateListingsStatus(listingId, "deleted");
      notify("Ogłoszenie zostało usunięte", "success");
    } else {
      setIsDeleting(false);
      hideDeleteListingModal();
      notify("Wystąpił błąd podczas usuwania ogłoszenia", "error");
    }
  };

  const updateListingsStatus = (
    listingId: number,
    newStatus: ListingStatus
  ) => {
    setYourListings((prevListings) =>
      prevListings.map((listing) =>
        listing.id === listingId ? { ...listing, status: newStatus } : listing
      )
    );
  };

  const getListings = async () => {
    try {
      const response = await apiClient.get(`listings/owner`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setYourListings(response.data);
      } else {
        notify("Wystąpił błąd podczas pobierania ogłoszeń", "error");
      }

      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getListings();
  }, []);

  return (
    <>
      <DeleteListingModal
        isVisible={modalData.isVisible}
        isDeleting={isDeleting}
        listingId={modalData.listingId!}
        listingName={modalData.listingName!}
        onDeleteClick={() => handleDeleteClick(modalData.listingId!)}
        onClose={hideDeleteListingModal}
      />
      <Container>
        <PrimaryButton
          fontSize="20px"
          desktopMaxWidth="570px"
          mobileStart={1320}
          mobileMaxWidth="700px"
          onClick={handleAddClick}
        >
          Utwórz ogłoszenie
        </PrimaryButton>
        {isLoading ? (
          <LoaderContainer>
            <Loader />
            <LoaderText>Wczytywanie ogłoszeń</LoaderText>
          </LoaderContainer>
        ) : yourListings && yourListings.length > 0 ? (
          <MotionWrapper variants={fromBottomVariants03}>
            {yourListings
              .filter((listing) => listing.status !== "deleted")
              .map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing}
                  onEditClick={() => handleEditClick(listing.id)}
                  onDeleteClick={() =>
                    showDeleteListingModal(listing.id, listing.name)
                  }
                />
              ))}
          </MotionWrapper>
        ) : (
          <NoResultsContainer>
            <NoResultsText>Nie masz jeszcze żadnych ogłoszeń</NoResultsText>
          </NoResultsContainer>
        )}
      </Container>
    </>
  );
};

export default YourListingsSection;

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

const NoResultsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const NoResultsText = styled.p`
  font-size: 20px;
  color: var(--dark-50);
  text-align: center;
`;
