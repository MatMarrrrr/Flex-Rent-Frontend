import React, { useEffect, useState } from "react";
import { categories } from "@/consts/categories";
import styled from "styled-components";
import {
  Search as SearchIcon,
  LayoutGrid as LayoutGridIcon,
  MapPin as MapPinIcon,
} from "lucide-react";
import CategoryModal from "@/components/ui/CategoryModal";

interface SearchBarProps {
  initialQuery?: string;
  initialCategoryId?: number;
  initialLocalization?: string;
  isFadeIn?: boolean;
  onSearch: (query: string, categoryId: number, localization: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  initialQuery = "",
  initialCategoryId = 0,
  initialLocalization = "",
  isFadeIn = false,
  onSearch,
}) => {
  const [query, setQuery] = useState<string>(initialQuery);
  const [category, setCategory] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number>(initialCategoryId);
  const [localization, setLocalization] = useState<string>(initialLocalization);
  const [isSearchDisabled, setSearchDisabled] = useState<boolean>(true);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(query, categoryId, localization);
    }
  };

  const handleModalCategoryClick = (categoryId: number) => {
    setCategoryId(categoryId);
    hideModal();
  };

  useEffect(() => {
    const categoryObj = categories.find(
      (category) => category.id === categoryId
    );
    const categoryName = categoryObj?.name ?? "";
    setCategory(categoryName);
  }, [categoryId]);

  useEffect(() => {
    const isDisabled = !query && categoryId === 0 && !localization;
    setSearchDisabled(isDisabled);
  }, [query, categoryId, localization]);

  return (
    <>
      <CategoryModal
        isVisible={isModalVisible}
        onClose={hideModal}
        onCategoryClick={handleModalCategoryClick}
      />
      <Container data-aos={isFadeIn ? "fade-up" : undefined}>
        <MainInputContainer>
          <QueryIcon />
          <StyledInput
            placeholder="Czego szukasz?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </MainInputContainer>
        <Divider />
        <CategoryInputContainer onClick={showModal}>
          <CategoryIcon />
          <StyledInput
            placeholder="Kategoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            readOnly
          />
        </CategoryInputContainer>
        <LocalizationInputContainer>
          <LocalizationIcon />
          <StyledInput
            placeholder="Lokalizacja"
            value={localization}
            onChange={(e) => setLocalization(e.target.value)}
          />
        </LocalizationInputContainer>
        <SearchButton onClick={handleSearchClick} disabled={isSearchDisabled}>
          Wyszukaj
        </SearchButton>
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

const QueryIcon = styled(SearchIcon)`
  height: 20px;
  width: 20px;
  color: var(--dark);
`;

const CategoryIcon = styled(LayoutGridIcon)`
  height: 20px;
  width: 20px;
  color: var(--dark);
`;

const LocalizationIcon = styled(MapPinIcon)`
  height: 20px;
  width: 20px;
  color: var(--dark);
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

  &:disabled {
    &:hover {
      transform: none;
    }
    cursor: default;
    background-color: var(--dark-80);
  }

  @media (max-width: 700px) {
    max-width: 400px;
    width: 100%;
    margin: 0;
  }
`;
