import React, { useEffect, useState } from "react";
import { categories } from "@/consts/categories";
import styled from "styled-components";
import {
  Search as SearchIcon,
  LayoutGrid as LayoutGridIcon,
  MapPin as MapPinIcon,
  Map as MapIcon,
} from "lucide-react";
import CategoryModal from "@/components/modals/CategoryModal";
import LocalizationModal from "@/components/modals/LocalizationModal";

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
  const [isSearchDisabled, setIsSearchDisabled] = useState<boolean>(true);
  const [isCategoryModalVisible, setIsCategoryModalVisible] =
    useState<boolean>(false);
  const [isLocalizationModalVisible, setIsLocalizationModalVisible] =
    useState<boolean>(false);

  const showCategoryModal = () => setIsCategoryModalVisible(true);
  const hideCategoryModal = () => setIsCategoryModalVisible(false);
  const showLocalizationModal = () => setIsLocalizationModalVisible(true);
  const hideLocalizationModal = () => setIsLocalizationModalVisible(false);

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(query, categoryId, localization);
    }
  };

  const handleModalCategoryClick = (categoryId: number) => {
    setCategoryId(categoryId);
    hideCategoryModal();
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
    setIsSearchDisabled(isDisabled);
  }, [query, categoryId, localization]);

  return (
    <>
      <CategoryModal
        isVisible={isCategoryModalVisible}
        onClose={hideCategoryModal}
        onCategoryClick={handleModalCategoryClick}
      />
      <LocalizationModal
        isVisible={isLocalizationModalVisible}
        onClose={hideLocalizationModal}
        onLocalizationSelect={(localization) => setLocalization(localization)}
        languageCode="pl"
      />
      <Container data-aos={isFadeIn ? "fade-up" : undefined}>
        <QueryInputContainer>
          <QueryIcon />
          <StyledInput
            placeholder="Czego szukasz?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </QueryInputContainer>
        <Divider />
        <CategoryInputContainer onClick={showCategoryModal}>
          <CategoryIcon />
          <StyledInput
            placeholder="Kategoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            readOnly
          />
        </CategoryInputContainer>
        <Divider />
        <LocalizationInputContainer>
          <LocalizationIcon />
          <StyledLocalizationInput
            placeholder="Lokalizacja"
            value={localization}
            onChange={(e) => setLocalization(e.target.value)}
          />
          <LocalizationMapIconWrapper onClick={showLocalizationModal}>
            <LocalizationMapIcon />
          </LocalizationMapIconWrapper>
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

const QueryInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-grow: 2.5;

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
  flex-grow: 0.6;

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
  position: relative;
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

const LocalizationMapIconWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 5%;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }

  @media (max-width: 700px) {
    top: 30%;
    right: 20px;
  }
`;

const LocalizationIcon = styled(MapPinIcon)`
  height: 20px;
  width: 20px;
  color: var(--dark);
`;

const LocalizationMapIcon = styled(MapIcon)`
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

const StyledLocalizationInput = styled(StyledInput)`
  padding-right: 40px;
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
