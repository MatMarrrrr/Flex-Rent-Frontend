import styled from "styled-components";
import { useNavigate } from "react-router";
import ListingForm from "@/pages/listing/components/ListingForm";
import { listingInitialValues } from "@/consts/initialValues";
import { useState } from "react";
import { MoveLeft as ArrowBackIcon } from "lucide-react";
import { ImageType } from "@/types/types";
import { useToast } from "@/contexts/ToastContext";
import apiClient from "@/utils/apiClient";
import { useUser } from "@/contexts/UserContext";
import { createFormData } from "@/utils/formDataHelpers";
import HttpStatusCodes from "@/consts/httpStatusCodes";

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
  const { notify } = useToast();
  const { token } = useUser();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmited, setIsSubmited] = useState<boolean>(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (
    values: ListingFormValues,
    imageFile: ImageType
  ) => {
    setIsSubmitting(true);
    const finalValues = createFormData(values);
    finalValues.append("image", imageFile!);
    for (let pair of finalValues.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await apiClient.post("/listings", finalValues, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === HttpStatusCodes.CREATED) {
        notify("Ogłoszenie zostało dodane!", "success");
      } else {
        notify("Wystąpił bład podczas dodawania ogłoszenia", "error");
      }
    } catch {
      notify("Wystąpił bład podczas dodawania ogłoszenia", "error");
    } finally {
      setIsSubmited(true);
      setIsSubmitting(false);
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    }
  };

  return (
    <Container>
      <BackContainer onClick={handleBack}>
        <ArrowBack />
        <BackText>Powrót</BackText>
      </BackContainer>
      <ListingForm
        initialValues={listingInitialValues}
        headerText="Utwórz ogłoszenie"
        submitText="Opublikuj ogłoszenie"
        submittingText="Publikowanie"
        submitedText="Opublikowano"
        initialImage={null}
        onSubmit={handleSubmit}
        handleBack={handleBack}
        isSubmitting={isSubmitting}
        isSubmited={isSubmited}
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
