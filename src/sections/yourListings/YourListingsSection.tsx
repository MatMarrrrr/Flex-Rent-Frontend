import styled from "styled-components";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import ListingItem from "@/sections/yourListings/components/ListingItem";
import test_item from "@/assets/test_item.jpg";
import Loader from "@/components/ui/Loader";
import { useEffect, useState } from "react";
import MotionWrapper from "@/components/ui/MotionWrapper";
import { fromBottomVariants03 } from "@/consts/motionVariants";
import { useNavigate } from "react-router";
import DeleteListingModal from "@/components/ui/DeleteListingModal";
import { useToast } from "@/contexts/ToastContext";
import { Listing, Period } from "@/types/interfaces";
import { ListingStatus } from "@/types/types";

const YourListingsSection = () => {
  const navigate = useNavigate();
  const { notify } = useToast();

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

  const handleDeleteClick = (listingId: number) => {
    setIsDeleting(true);

    setTimeout(() => {
      setIsDeleting(false);
      hideDeleteListingModal();
      updateListingsStatus(listingId, "deleted");
      notify("Ogłoszenie zostało usunięte", "success");
    }, 2000);
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

  useEffect(() => {
    const listings = Array.from({ length: 5 }, (_, index) => ({
      id: index + 1,
      image: test_item,
      name: `Nazwa rzeczy do wypożyczenia ${index + 1}`,
      category: "Kategoria",
      price: 100,
      currency: "PLN",
      localization: `Lokalizacja`,
      rentedPeriods: [
        { startDate: "12.12.2024", endDate: "20.12.2024" },
        { startDate: "22.12.2024", endDate: "28.12.2024" },
      ] as Period[],
      status: "active" as ListingStatus,
    }));

    setYourListings(listings);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
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
        ) : (
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
