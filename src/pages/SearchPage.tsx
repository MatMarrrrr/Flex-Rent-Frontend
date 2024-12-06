import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import SearchBar from "../components/elements/SearchBar";
import ResultCard from "../components/elements/ResultCard";
import test_item from "../assets/test_item.jpg";
import Loader from "../components/ui/Loader";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [result, setResult] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const query = searchParams.get("query");
  const category = searchParams.get("category");
  const location = searchParams.get("location");

  const handleSearch = () => {};
  const handleItemClick = (id: number) => {
    console.log(id);
  };

  return (
    <>
      <SearchContainer>
        <SearchBar onSearch={handleSearch} />
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
                id={0}
                image={test_item}
                name="Nazwa rzeczy do wypożyczenia"
                price="100"
                localization="Warszawa"
                onClick={handleItemClick}
              />
              <ResultCard
                id={0}
                image={test_item}
                name="Nazwa rzeczy do wypożyczenia"
                price="100"
                localization="Warszawa"
                onClick={handleItemClick}
              />
              <ResultCard
                id={0}
                image={test_item}
                name="Nazwa rzeczy do wypożyczenia"
                price="100"
                localization="Warszawa"
                onClick={handleItemClick}
              />
              <ResultCard
                id={0}
                image={test_item}
                name="Nazwa rzeczy do wypożyczenia"
                price="100"
                localization="Warszawa"
                onClick={handleItemClick}
              />
              <ResultCard
                id={0}
                image={test_item}
                name="Nazwa rzeczy do wypożyczenia"
                price="100"
                localization="Warszawa"
                onClick={handleItemClick}
              />
              <ResultCard
                id={0}
                image={test_item}
                name="Nazwa rzeczy do wypożyczenia"
                price="100"
                localization="Warszawa"
                onClick={handleItemClick}
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
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
`;
