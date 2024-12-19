import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { categories } from "@/consts/categories";
import styled from "styled-components";
import SearchBar from "@/components/elements/SearchBar";
import ResultCard from "@/pages/search/components/ResultCard";
import test_item from "@/assets/test_item.jpg";
import Loader from "@/components/ui/Loader";
import MotionWrapper from "@/components/ui/MotionWrapper";
import { fromRightVariants01 } from "@/consts/motionVariants";

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [result, setResult] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const queryParam = searchParams.get("query") ?? "";
  const categoryIdParam = parseInt(searchParams.get("categoryId") ?? "0", 10);
  const localizationParam = searchParams.get("localization") ?? "";
  const isEmptyParams =
    queryParam.trim() === "" &&
    categoryIdParam === 0 &&
    localizationParam.trim() === "";

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

  const getCategoryName = (categoryId: number) => {
    const categoryObj = categories.find(
      (category) => category.id === categoryId
    );
    return categoryObj?.name ?? "";
  };

  const getResultsText = (found: boolean) => {
    const parts: string[] = [];

    if (queryParam) parts.push(queryParam);
    if (categoryIdParam) parts.push(getCategoryName(categoryIdParam));
    if (localizationParam) parts.push(localizationParam);

    const baseText = found ? "Wyniki dla:" : "Brak wyników dla:";
    return [baseText, ...parts];
  };

  useEffect(() => {
    setIsLoading(true);
    const tempResults = Array.from({ length: 8 }, (_, index) => ({
      id: index + 1,
      image: test_item,
      name: `Nazwa rzeczy do wypożyczenia ${index + 1}`,
      price: 100,
      currencyCode: "PLN",
      localization: `Lokalizacja`,
    }));

    setResult(tempResults);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [queryParam, categoryIdParam, localizationParam]);

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
          <LoaderContainer>
            <Loader />
            <LoaderText>Pobieranie wyników</LoaderText>
          </LoaderContainer>
        ) : (
          <>
            <ResultsTextContainer>
              {isEmptyParams ? (
                <ResultsText>
                  Brak parametrów wyszukiwania. Wprowadź dane, aby zobaczyć
                  wyniki.
                </ResultsText>
              ) : (
                getResultsText(result.length > 0).map((line, index) => (
                  <ResultsText key={index}>{line}</ResultsText>
                ))
              )}
            </ResultsTextContainer>
            <ResultsContainer>
              <MotionWrapper variants={fromRightVariants01}>
                {result.length > 0 &&
                  result.map((item) => (
                    <ResultCard
                      key={item.id}
                      id={item.id}
                      image={item.image}
                      name={item.name}
                      price={item.price}
                      currencyCode={item.currencyCode}
                      localization={item.localization}
                      onClick={() => handleItemClick(item.id)}
                    />
                  ))}
              </MotionWrapper>
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

const LoaderContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  min-height: calc(100vh - 570px);
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LoaderText = styled.div`
  font-size: 24px;
  color: var(--dark);
  font-weight: bold;
  text-align: center;
`;

const ResultsTextContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const ResultsText = styled.p`
  font-size: 28px;
  font-weight: bold;
  color: var(--dark);
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
