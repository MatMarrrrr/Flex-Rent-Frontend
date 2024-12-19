import styled from "styled-components";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import ListingItem from "@/sections/yourListings/components/ListingItem";
import test_item from "@/assets/test_item.jpg";
import Loader from "@/components/ui/Loader";
import { useEffect, useState } from "react";
import MotionWrapper from "@/components/ui/MotionWrapper";
import { fromBottomVariants03 } from "@/consts/motionVariants";
import { useNavigate } from "react-router";

const YourListingsSection = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleAddClick = () => {
    navigate("/add-listing");
  };

  const handleEditClick = (id: number) => {
    navigate(`/edit-listing/${id}`);
  };

  const handleDeleteClick = (id: number) => {
    console.log(`Deleting ${id}`);
  };

  const listings = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    image: test_item,
    name: `Nazwa rzeczy do wypożyczenia ${index + 1}`,
    category: "Kategoria",
    price: 100,
    localization: `Lokalizacja`,
    rentedPeriods: [
      { from: "12.12.2024", to: "20.12.2024" },
      { from: "22.12.2024", to: "28.12.2024" },
    ],
  }));

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
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
          {listings.map((listing) => (
            <ListingItem
              key={listing.id}
              id={listing.id}
              image={listing.image}
              name={listing.name}
              category={listing.category}
              price={listing.price}
              localization={listing.localization}
              rentedPeriods={listing.rentedPeriods}
              onEditClick={() => handleEditClick(listing.id)}
              onDeleteClick={() => handleDeleteClick(listing.id)}
            />
          ))}
        </MotionWrapper>
      )}
    </Container>
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
