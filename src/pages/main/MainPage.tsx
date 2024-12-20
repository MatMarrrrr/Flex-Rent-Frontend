import { categories } from "@/consts/categories";
import { useNavigate } from "react-router";
import styled from "styled-components";
import SearchBar from "@/components/elements/SearchBar";
import CategoryCard from "@/pages/main/components/CategoryCard";

export default function MainPage() {
  const navigate = useNavigate();

  const formatLocalization = (localization: string): string => {
    return localization
      .split(",")
      .map((part) => part.trim())
      .filter((part) => part)
      .join(" ");
  };

  const handleSearch = (
    query: string,
    categoryId: number,
    localization: string
  ) => {
    const searchParams = new URLSearchParams();

    if (query) searchParams.set("query", query.trim());
    if (categoryId) searchParams.set("categoryId", categoryId.toString());
    if (localization)
      searchParams.set("localization", formatLocalization(localization));

    navigate(`/search?${searchParams.toString()}`);
  };

  const handleCategoryClick = (categoryId: number) => {
    const searchParams = new URLSearchParams();

    if (categoryId) searchParams.set("categoryId", categoryId.toString());

    navigate(`/search?${searchParams.toString()}`);
  };

  return (
    <>
      <MainHeaderContainer>
        <MainHeader data-aos="fade-up">
          Wypożycz wszystko czego potrzebujesz
        </MainHeader>
        <SearchBar onSearch={handleSearch} isFadeIn={true} />
      </MainHeaderContainer>
      <CategoryMainContainer>
        <CagtegoryMainHeader data-aos="fade-up">
          Główne kategorie
        </CagtegoryMainHeader>
        <CategoriesContainer data-aos="fade-up">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              image={category.icon}
              category={category.name}
              onClick={() => handleCategoryClick(category.id)}
            />
          ))}
        </CategoriesContainer>
      </CategoryMainContainer>
    </>
  );
}

const MainHeaderContainer = styled.div`
  padding: 100px 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--gradient);
  gap: 50px;

  @media (max-width: 700px) {
    padding: 100px 2%;
  }
`;

const MainHeader = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: var(--light);
  text-align: center;
  margin-bottom: 60px;
`;

const CategoryMainContainer = styled.div`
  padding: 100px 10%;
  background: var(--white);

  @media (max-width: 700px) {
    padding: 100px 2%;
  }
`;

const CagtegoryMainHeader = styled(MainHeader)`
  color: var(--dark);
`;

const CategoriesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 40px;
  justify-content: center;
  margin: 0 auto;

  @media (max-width: 1300px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, max-content));
    justify-content: center;
  }
`;
