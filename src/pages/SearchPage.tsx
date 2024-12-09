import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "../components/elements/SearchBar";
import ResultCard from "../components/elements/ResultCard";
import test_item from "../assets/test_item.jpg";
import Loader from "../components/ui/Loader";

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [result, setResult] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const queryParam = searchParams.get("query") ?? "";
  const categoryIdParam = parseInt(searchParams.get("categoryId") ?? "0", 10);
  const localizationParam = searchParams.get("localization") ?? "";

  const handleSearch = (
    query: string,
    categoryId: number,
    localization: string
  ) => {
    const newSearchParams = new URLSearchParams();
    if (query) newSearchParams.set("query", query);
    if (categoryId) newSearchParams.set("categoryId", categoryId.toString());
    if (localization) newSearchParams.set("localization", localization);

    navigate(`?${newSearchParams.toString()}`);
  };

  const handleItemClick = (id: number) => {
    navigate(`/item/${id}`);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <SearchContainer>
        <SearchBar
          initialQuery={queryParam}
          initialCategoryId={categoryIdParam}
          initialLocalization={localizationParam}
          onSearch={handleSearch}
        />
      </SearchContainer>
      <ResultsMainContainer>
        {isLoading ? (
          <Loader size={50} color="var(--dark)" isCenter={true} />
        ) : (
          <>
            <ResultsText>
              {result.length > 0
                ? 'Wyniki dla "Termin wyszukiwania"'
                : 'Brak wyników dla "Termin wyszukiwania"'}
            </ResultsText>
            <ResultsContainer>
              <ResultCard
                id={1}
                image={test_item}
                name="Nazwa rzeczy do wypożyczenia"
                price="100"
                localization="Warszawa"
                onClick={() => handleItemClick(1)}
              />
              <ResultCard
                id={2}
                image={test_item}
                name="Nazwa rzeczy do wypożyczenia"
                price="100"
                localization="Warszawa"
                onClick={() => handleItemClick(2)}
              />
              <ResultCard
                id={3}
                image={test_item}
                name="Nazwa rzeczy do wypożyczenia"
                price="100"
                localization="Warszawa"
                onClick={() => handleItemClick(3)}
              />
              <ResultCard
                id={4}
                image={test_item}
                name="Nazwa rzeczy do wypożyczenia"
                price="100"
                localization="Warszawa"
                onClick={() => handleItemClick(4)}
              />
              <ResultCard
                id={5}
                image={test_item}
                name="Nazwa rzeczy do wypożyczenia"
                price="100"
                localization="Warszawa"
                onClick={() => handleItemClick(5)}
              />
              <ResultCard
                id={6}
                image={test_item}
                name="Nazwa rzeczy do wypożyczenia"
                price="100"
                localization="Warszawa"
                onClick={() => handleItemClick(6)}
              />
            </ResultsContainer>
          </>
        )}
      </ResultsMainContainer>
    </>
  );
}

const SearchContainer = styled.div`
  padding: 40px 10% 80px 10%;
  background: var(--gradient);
`;

const ResultsMainContainer = styled.div`
  min-height: calc(100vh - 490px);
  padding: 40px 10%;
`;

const ResultsText = styled.p`
  font-size: 28px;
  font-weight: bold;
  color: var(--dark);
  margin-bottom: 30px;
`;

const ResultsContainer = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
