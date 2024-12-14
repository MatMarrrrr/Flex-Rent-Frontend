import styled from "styled-components";
import UploadImageContainer from "@/components/ui/UploadImageContainer";
import { useEffect, useState } from "react";
import FormikForm from "@/components/forms/FormikForm";
import arrowBack from "@/assets/icons/arrowBack.svg";
import FormikInputField from "@/components/forms/FormikInputField";
import { categories } from "@/consts/categories";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import FormikSelectField from "@/components/forms/FormikSelectField";
import FormikTextAreaField from "@/components/forms/FormikTextAreaField";
import { useNavigate } from "react-router";
import { listingSchema } from "@/validations/listingSchema";

export default function AddListingPage() {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isImageError, setIsImageError] = useState<boolean>(false);

  interface Category {
    id: number;
    name: string;
    icon: string;
  }

  const options = categories.map((category: Category) => ({
    value: category.id.toString(),
    label: category.name,
  }));

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = (values: {
    name: string;
    category: string;
    price: number | null;
    localization: string;
    description: string;
  }) => {
    if (imageFile == null) {
      setIsImageError(true);
      return;
    }

    const finalValues = { ...values, image: imageFile };
    console.log("Przesłane wartości:", finalValues);
  };

  useEffect(() => {
    if (imageFile) setIsImageError(false);
  }, [imageFile]);

  return (
    <Container>
      <BackContainer onClick={handleBack}>
        <ArrowBack src={arrowBack} />
        <BackText>Powrót</BackText>
      </BackContainer>
      <Wrapper>
        <LeftContainer>
          <MobileBackContainer onClick={handleBack}>
            <ArrowBack src={arrowBack} />
            <BackText>Powrót</BackText>
          </MobileBackContainer>
          <Header>Utwórz ogłoszenie</Header>
          <UploadImageContainer setImageFile={setImageFile} />
          {isImageError && (
            <ImageErrorText>Dodanie zdjęcia jest wymagane</ImageErrorText>
          )}
        </LeftContainer>
        <RightContainer>
          <FormikForm
            initialValues={{
              name: "",
              category: "",
              price: null,
              localization: "",
              description: "",
            }}
            validationSchema={listingSchema}
            onSubmit={handleSubmit}
          >
            <FormikInputField
              name="name"
              label="Nazwa przedmiotu"
              type="text"
              isRequired={true}
              margin="0px 0px 10px 0px"
            />
            <FormikSelectField
              name="category"
              label="Kategoria"
              options={options}
              startValue="Wybierz kategorię"
              isRequired={true}
              margin="0px 0px 25px 0px"
            />
            <PriceInputContainer>
              <FormikInputField
                name="price"
                label="Cena"
                type="number"
                isRequired={true}
                margin="0px 0px 15px 0px"
              />
              <PerDayText>za dzień</PerDayText>
            </PriceInputContainer>
            <FormikInputField
              name="localization"
              label="Lokalizacja"
              type="text"
              isRequired={true}
              margin="0px 0px 15px 0px"
            />
            <FormikTextAreaField
              name="description"
              label="Opis"
              type="text"
              isRequired={true}
              margin="0px 0px 15px 0px"
            />
            <PrimaryButton
              type="submit"
              margin="15px 0px 0px 0px"
              background="var(--gradient)"
              fontColor="var(--white)"
            >
              Opublikuj ogłoszenie
            </PrimaryButton>
          </FormikForm>
        </RightContainer>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  padding: 40px 10%;
  min-height: calc(100vh - 308px);
  background-color: var(--light);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 500px) {
    padding: 0 0 30px 0;
  }
`;

const BackContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin-bottom: 10px;
  max-width: 980px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.003);
  }

  @media (max-width: 1230px) {
    display: none;
  }

  @media (max-width: 500px) {
    margin-left: 0%;
  }
`;

const MobileBackContainer = styled(BackContainer)`
  display: none;
  margin-bottom: 0;

  @media (max-width: 1230px) {
    display: flex;
  }
`;

const ArrowBack = styled.img`
  height: 36px;
`;

const BackText = styled.p`
  font-size: 16px;
  color: var(--dark);
`;

const Wrapper = styled.div`
  display: flex;
  padding: 40px;
  gap: 10%;
  border-radius: 8px;
  background-color: var(--white);

  @media (max-width: 1230px) {
    padding-top: 20px;
  }

  @media (max-width: 1100px) {
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }

  @media (max-width: 500px) {
    padding: 20px;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
`;

const ImageErrorText = styled.div`
  margin-top: 10px;
  color: var(--error);
  font-size: 16px;
  font-weight: bold;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 500px;
  padding-top: 50px;

  @media (max-width: 1100px) {
    padding-top: 0;
    min-width: 100%;
    align-items: center;
  }
`;

const Header = styled.h1`
  margin-bottom: 10px;
  font-size: 32px;

  @media (max-width: 500px) {
    font-size: 26px;
  }
`;

const PriceInputContainer = styled.div`
  display: flex;
  gap: 10px;
  max-width: 300px;
`;

const PerDayText = styled.div`
  margin-top: 34px;
  white-space: nowrap;
`;
