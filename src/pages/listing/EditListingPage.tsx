import styled from "styled-components";
import { MoveLeft as ArrowBackIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import ListingForm from "@/pages/listing/components/ListingForm";
import test_item from "@/assets/test_item.jpg";
import { listingInitialValues } from "@/consts/initialValues";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import ErrorLayout from "@/components/ui/ErrorLayout";
import { ImageType } from "@/types/types";

interface ListingFormValues {
  name: string;
  category: string;
  price: number | null;
  currency: string;
  localization: string;
  description: string;
}

export default function EditListingPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [listingData, setListingData] =
    useState<ListingFormValues>(listingInitialValues);
  const [listingImage, setListingImage] = useState<ImageType>(null);
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = (values: ListingFormValues, imageFile: ImageType) => {
    setIsSubmitting(true);
    const finalValues = { ...values, image: imageFile };
    console.log(finalValues);
  };

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      setError("Nieprawidłowy identyfikator ogłoszenia.");
      setIsLoading(false);
      return;
    }

    const hasAccess = true;
    if (!hasAccess) {
      setError("Nie masz dostępu do tej strony");
      setIsLoading(false);
      return;
    }

    setListingData({
      name: `Nazwa przedmiotu ${id}`,
      category: `1`,
      price: 123,
      currency: "PLN",
      localization: `Warszawa`,
      description: `Opis przedmiotu ${id}`,
    });
    setListingImage(test_item);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (error) {
    return <ErrorLayout message={error} />;
  }

  return (
    <Container>
      {isLoading ? (
        <LoaderContainer>
          <Loader />
          <LoaderText>Wczytywanie szczegółów ogłoszenia</LoaderText>
        </LoaderContainer>
      ) : (
        <>
          <BackContainer onClick={handleBack}>
            <ArrowBack/>
            <BackText>Powrót</BackText>
          </BackContainer>
          <ListingForm
            initialValues={listingData}
            headerText="Edytuj ogłoszenie"
            submitText="Zapisz"
            submittingText="Zapisywanie"
            initialImage={listingImage}
            onSubmit={handleSubmit}
            handleBack={handleBack}
            isSubmitting={isSubmitting}
          />
        </>
      )}
    </Container>
  );
}

const LoaderContainer = styled.div`
  padding: 20px 10% 40px 10%;
  display: flex;
  gap: 10px;
  flex-grow: 1;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const LoaderText = styled.p`
  font-size: 24px;
  color: var(--dark);
  font-weight: bold;
  text-align: center;
`;

const Container = styled.div`
  padding: 40px 10%;
  min-height: calc(100vh - 308px);
  background-color: var(--light);
  display: flex;
  flex-direction: column;
  justify-content: center;
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
