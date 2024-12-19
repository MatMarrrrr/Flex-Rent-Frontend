import styled from "styled-components";
import { useNavigate } from "react-router";
import ListingForm from "@/pages/listing/components/ListingForm";
import { listingInitialValues } from "@/consts/initialValues";
import { useState } from "react";
import { MoveLeft as ArrowBackIcon } from "lucide-react";
import { ImageType } from "@/types/types";

interface ListingFormValues {
  name: string;
  category: string;
  price: number | null;
  currency: string;
  localization: string;
  description: string;
}

export default function AddListingPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = (values: ListingFormValues, imageFile: ImageType) => {
    setIsSubmitting(true);
    const finalValues = { ...values, image: imageFile };
    console.log(finalValues);
  };

  return (
    <Container>
      <BackContainer onClick={handleBack}>
        <ArrowBack/>
        <BackText>Powrót</BackText>
      </BackContainer>
      <ListingForm
        initialValues={listingInitialValues}
        headerText="Utwórz ogłoszenie"
        submitText="Opublikuj ogłoszenie"
        submittingText="Publikowanie"
        initialImage={null}
        onSubmit={handleSubmit}
        handleBack={handleBack}
        isSubmitting={isSubmitting}
      />
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

const ArrowBack = styled(ArrowBackIcon)`
  height: 30px;
  width: 30px;
  stroke-width: 1.5;
`;

const BackText = styled.p`
  font-size: 16px;
  color: var(--dark);
`;
