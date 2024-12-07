import React, { useState } from "react";
import styled from "styled-components";
import searchIcon from "./../../assets/icons/search.svg";
import categoriesIcon from "./../../assets/icons/categories.svg";
import localizationIcon from "./../../assets/icons/localization.svg";
import CategoryModal from "../ui/CategoryModal";

interface SearchBarProps {
  defaultQuery?: string;
  defaultCategory?: string;
  defaultLocation?: string;
  onSearch: (query: string, category: string, location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  defaultQuery = "",
  defaultCategory = "",
  defaultLocation = "",
  onSearch,
}) => {
  const [query, setQuery] = useState<string>(defaultQuery);
  const [category, setCategory] = useState<string>(defaultCategory);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [location, setLocation] = useState<string>(defaultLocation);

  const [isModalVisible, setModalVisible] = useState(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(query, category, location);
    }
  };

  const handleCategoryClick = () => {
    // document.body.style.overflow = "hidden";
    showModal();
  };

  return (
    <>
      <CategoryModal
        isVisible={isModalVisible}
        onClose={hideModal}
        onCategoryClick={(categoryId, category) => {
          setCategoryId(categoryId);
          setCategory(category);
          hideModal();
        }}
      />
      <Container data-aos="fade-up">
        <MainInputContainer>
          <Icon src={searchIcon} />
          <StyledInput
            placeholder="Czego szukasz?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </MainInputContainer>
        <Divider />
        <CategoryInputContainer onClick={handleCategoryClick}>
          <Icon src={categoriesIcon} />
          <StyledInput
            placeholder="Kategoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            readOnly
          />
        </CategoryInputContainer>
        <LocalizationInputContainer>
          <Icon src={localizationIcon} />
          <StyledInput
            placeholder="Lokalizacja"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </LocalizationInputContainer>
        <SearchButton onClick={handleSearchClick}>Wyszukaj</SearchButton>
      </Container>
    </>
  );
};

export default SearchBar;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 15px;
  background-color: var(--white);
  border-radius: 50px;
  box-shadow: var(--shadow);
  width: 100%;

  @media (max-width: 700px) {
    flex-direction: column;
    background-color: transparent;
    box-shadow: none;
  }
`;

const MainInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-grow: 1;

  @media (max-width: 700px) {
    background-color: var(--white);
    max-width: 400px;
    width: 100%;
    padding: 15px;
    border-radius: 50px;
  }
`;

const Divider = styled.div`
  height: 32px;
  width: 1px;
  background-color: var(--dark-25);

  @media (max-width: 700px) {
    display: none;
  }
`;

const CategoryInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  @media (max-width: 700px) {
    background-color: var(--white);
    max-width: 400px;
    width: 100%;
    padding: 15px;
    border-radius: 50px;
  }
`;

const LocalizationInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 700px) {
    background-color: var(--white);
    max-width: 400px;
    width: 100%;
    padding: 15px;
    border-radius: 50px;
  }
`;

const Icon = styled.img`
  height: 20px;
  width: 20px;
`;

const StyledInput = styled.input`
  border: none;
  background: none;
  font-size: 16px;
  color: var(--dark);
  width: 100%;
  outline: none;

  &:read-only {
    cursor: pointer;
  }

  &::placeholder {
    color: var(--dark-50);
  }
`;

const SearchButton = styled.button`
  background-color: var(--dark);
  color: var(--white);
  border: none;
  height: 50px;
  padding: 10px 30px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin: -10px -10px -10px 0;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.03);
  }

  @media (max-width: 700px) {
    max-width: 400px;
    width: 100%;
    margin: 0;
  }
`;
