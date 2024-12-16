import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { categories } from "@/consts/categories";
import currencyCodes from "currency-codes";
import { MoveLeft as ArrowBackIcon } from "lucide-react";
import { listingSchema } from "@/validations/listingSchema";
import UploadImageContainer from "@/components/ui/UploadImageContainer";
import FormikForm from "@/components/forms/FormikForm";
import FormikInputField from "@/components/forms/FormikInputField";
import FormikSelectField from "@/components/forms/FormikSelectField";
import FormikTextAreaField from "@/components/forms/FormikTextAreaField";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { excludedCurrencies } from "@/consts/excludedCurrencies";
import Loader from "@/components/ui/Loader";

type ImageType = File | null | string;

interface Category {
  id: number;
  name: string;
  icon: string;
}

interface ListingFormProps {
  initialValues: {
    name: string;
    category: string;
    price: number | null;
    currency: string;
    localization: string;
    description: string;
  };
  headerText: string;
  submitText: string;
  submittingText: string;
  initialImage: ImageType;
  isSubmitting: boolean;
  onSubmit: (values: any, imageFile: ImageType) => void;
  handleBack: () => void;
}

const ListingForm: React.FC<ListingFormProps> = ({
  initialValues,
  headerText,
  submitText,
  submittingText,
  initialImage,
  isSubmitting = false,
  onSubmit,
  handleBack,
}) => {
  const [imageFile, setImageFile] = useState<ImageType>(initialImage);
  const [isImageError, setIsImageError] = useState<boolean>(false);

  const options = categories.map((category: Category) => ({
    value: category.id.toString(),
    label: category.name,
  }));

  const currencies = currencyCodes.data
    .filter((currency) => !excludedCurrencies.includes(currency.code))
    .map((currency) => ({
      value: currency.code,
      label: `${currency.code}`,
    }));

  const handleSubmit = (values: {
    name: string;
    category: string;
    price: number | null;
    currency: string;
    localization: string;
    description: string;
  }) => {
    if (imageFile == null) {
      setIsImageError(true);
      return;
    }
    onSubmit(values, imageFile);
  };

  useEffect(() => {
    if (imageFile) setIsImageError(false);
  }, [imageFile]);

  return (
    <Wrapper>
      <LeftContainer>
        <MobileBackContainer onClick={handleBack}>
          <ArrowBack />
          <BackText>Powrót</BackText>
        </MobileBackContainer>
        <Header>{headerText}</Header>
        <UploadImageContainer
          setImageFile={setImageFile}
          initialImage={initialImage}
          disabled={isSubmitting}
        />
        {isImageError && (
          <ImageErrorText>Dodanie zdjęcia jest wymagane</ImageErrorText>
        )}
      </LeftContainer>
      <RightContainer>
        <FormikForm
          initialValues={initialValues}
          validationSchema={listingSchema}
          onSubmit={handleSubmit}
        >
          <FormikInputField
            name="name"
            label="Nazwa przedmiotu"
            type="text"
            isRequired={true}
            margin="0px 0px 10px 0px"
            disabled={isSubmitting}
          />
          <FormikSelectField
            name="category"
            label="Kategoria"
            options={options}
            startValue="Wybierz kategorię"
            isRequired={true}
            margin="0px 0px 25px 0px"
            disabled={isSubmitting}
          />
          <PriceInputContainer>
            <FormikInputField
              name="price"
              label="Cena"
              type="number"
              isRequired={true}
              margin="0px 0px 15px 0px"
              disabled={isSubmitting}
            />
            <PerDayText>za dzień</PerDayText>
          </PriceInputContainer>
          <FormikSelectField
            name="currency"
            label="Waluta"
            options={currencies}
            startValue="Wybierz walutę"
            isRequired={true}
            margin="0px 0px 25px 0px"
            disabled={isSubmitting}
          />
          <FormikInputField
            name="localization"
            label="Lokalizacja"
            type="text"
            isRequired={true}
            margin="0px 0px 15px 0px"
            disabled={isSubmitting}
          />
          <FormikTextAreaField
            name="description"
            label="Opis"
            type="text"
            isRequired={true}
            margin="0px 0px 15px 0px"
            disabled={isSubmitting}
          />
          <PrimaryButton
            type="submit"
            margin="15px 0px 0px 0px"
            background="var(--gradient)"
            fontColor="var(--white)"
            disabled={isSubmitting}
          >
            {isSubmitting ? submittingText : submitText}
            {isSubmitting && <Loader size={20} color="var(--white)" />}
          </PrimaryButton>
        </FormikForm>
      </RightContainer>
    </Wrapper>
  );
};

export default ListingForm;

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

const ArrowBack = styled(ArrowBackIcon)`
  height: 30px;
  width: 30px;
  stroke-width: 1.5;
`;

const BackText = styled.p`
  font-size: 16px;
  color: var(--dark);
`;

const MobileBackContainer = styled.div`
  display: none;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin-bottom: 10px;
  max-width: 980px;
  cursor: pointer;
  transition: transform 0.3s ease;
  margin-bottom: 0;

  @media (max-width: 1230px) {
    display: flex;
  }

  &:hover {
    transform: scale(1.003);
  }

  @media (max-width: 500px) {
    margin-left: 0%;
  }
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
