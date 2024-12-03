import styled from "styled-components";
import { SearchBar } from "../components/SearchBar";
import { CategoryCard } from "../components/CategoryCard";
import { categories } from "../consts/categories";

export default function MainPage() {
  const handleSearch = () => {};
  const handleCategoryClick = (id: number) => {};
  return (
    <>
      <MainHeaderContainer>
        <MainHeader>Wypożycz wszystko czego potrzebujesz</MainHeader>
        <SearchBar onSearch={handleSearch} />
      </MainHeaderContainer>
      <CategoryMainContainer>
        <CagtegoryMainHeader>Główne kategorie</CagtegoryMainHeader>
        <CategoriesContainer>
          {categories.map((category) => (
            <CategoryCard
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
