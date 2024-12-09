import styled from "styled-components";
import PrimaryButton from "../components/buttons/PrimaryButton";
import ListingItem from "../components/elements/ListingItem";
import test_item from "../assets/test_item.jpg";

const YourListings = () => {
  const handleAddClick = () => {};
  const handleEditClick = (id: number) => {
    console.log(id);
  };

  return (
    <Container>
      <PrimaryButton
        fontSize="20px"
        desktopMaxWidth="600px"
        mobileStart={1320}
        mobileMaxWidth="700px"
        onClick={handleAddClick}
      >
        Utwórz ogłoszenie
      </PrimaryButton>
      <ListingItem
        id={1}
        image={test_item}
        name="Nazwa rzeczy do wypożyczenia"
        price="100"
        localization="Lokalizacja"
        rentedPeriods={[
          { from: "12.12.2024", to: "20.12.2024" },
          { from: "22.12.2024", to: "28.12.2024" },
          { from: "12.12.2024", to: "20.12.2024" },
          { from: "22.12.2024", to: "28.12.2024" },
        ]}
        onEditClick={() => {
          handleEditClick(1);
        }}
      />
      <ListingItem
        id={2}
        image={test_item}
        name="Nazwa rzeczy do wypożyczenia"
        price="100"
        localization="Lokalizacja"
        rentedPeriods={[
          { from: "12.12.2024", to: "20.12.2024" },
          { from: "22.12.2024", to: "28.12.2024" },
          { from: "12.12.2024", to: "20.12.2024" },
          { from: "22.12.2024", to: "28.12.2024" },
        ]}
        onEditClick={() => {
          handleEditClick(1);
        }}
      />
      <ListingItem
        id={3}
        image={test_item}
        name="Nazwa rzeczy do wypożyczenia"
        price="100"
        localization="Lokalizacja"
        rentedPeriods={[
          { from: "12.12.2024", to: "20.12.2024" },
          { from: "22.12.2024", to: "28.12.2024" },
          { from: "12.12.2024", to: "20.12.2024" },
          { from: "22.12.2024", to: "28.12.2024" },
        ]}
        onEditClick={() => {
          handleEditClick(1);
        }}
      />
    </Container>
  );
};

export default YourListings;

const Container = styled.div`
  padding: 30px 10% 60px 10%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  min-height: calc(100vh - 494px);

  @media (max-width: 1320px) {
    align-items: center;
  }
`;
