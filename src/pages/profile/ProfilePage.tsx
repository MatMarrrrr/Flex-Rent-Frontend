import PrimaryButton from "@/components/buttons/PrimaryButton";
import FormikForm from "@/components/forms/FormikForm";
import FormikInputField from "@/components/forms/FormikInputField";
import { profileDataSchema } from "@/validations/profileSchema";
import styled from "styled-components";
import ProfileImageCircle from "@/pages/profile/components/ProfileImageCircle";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import { ImageType } from "@/types/types";
import { useToast } from "@/contexts/ToastContext";

interface ProfileData {
  email: string;
  name: string;
  surname: string;
  city: string;
  province: string;
}

export default function ProfilePage() {
  const [imageFile, setImageFile] = useState<ImageType>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { notify } = useToast();

  const profileData = {
    email: "email@email.com",
    name: "Imię",
    surname: "Nazwisko",
    city: "Miasto",
    province: "Województwo",
  };

  const handleSubmit = (values: ProfileData) => {
    setIsSubmitting(true);
    setTimeout(() => {
      const finalValues = { ...values, profileImage: imageFile };
      setIsSubmitting(false);
      console.log(finalValues);
      notify("Dane zostały poprawnie zmienione", "success");
    }, 1000);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Container>
      {isLoading ? (
        <LoaderContainer>
          <Loader />
          <LoaderText>Wczytywanie danych</LoaderText>
        </LoaderContainer>
      ) : (
        <Wrapper data-aos="fade-up">
          <Header>Twój profil</Header>
          <ProfileImageCircle
            profileImage={null}
            profileText="MM"
            setImageFile={setImageFile}
            disabled={isSubmitting}
          />
          <FormHeader>Twoje Dane</FormHeader>
          <FormikForm
            initialValues={profileData}
            onSubmit={handleSubmit}
            validationSchema={profileDataSchema}
          >
            <FormikInputField
              name="email"
              label="E-mail"
              type="text"
              isRequired={true}
              margin="0px 0px 15px 0px"
              disabled={isSubmitting}
            />
            <FormikInputField
              name="name"
              label="Imie"
              type="text"
              isRequired={true}
              margin="0px 0px 15px 0px"
              disabled={isSubmitting}
            />
            <FormikInputField
              name="surname"
              label="Nazwisko"
              type="text"
              isRequired={true}
              margin="0px 0px 15px 0px"
              disabled={isSubmitting}
            />
            <FormikInputField
              name="city"
              label="Miasto"
              type="text"
              isRequired={true}
              margin="0px 0px 15px 0px"
              disabled={isSubmitting}
            />
            <FormikInputField
              name="province"
              label="Województwo"
              type="text"
              isRequired={true}
              margin="0px 0px 15px 0px"
              disabled={isSubmitting}
            />
            <PrimaryButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Zmienianie" : "Zmień"}
              {isSubmitting && <Loader size={18} />}
            </PrimaryButton>
          </FormikForm>
        </Wrapper>
      )}
    </Container>
  );
}

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const LoaderText = styled.p`
  text-align: center;
  color: var(--dark);
  font-size: 24px;
  font-weight: bold;
`;

const Container = styled.div`
  padding: 40px 10%;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  background-color: var(--light);
  min-height: calc(100vh - 308px);

  @media (max-width: 650px) {
    padding: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 600px;
  border-radius: 8px;
  background-color: var(--white);
  padding: 50px 100px;
  align-items: center;
  box-shadow: var(--shadow);

  @media (max-width: 650px) {
    min-width: 100%;
    width: 100%;
    padding: 50px 20px;
  }
`;

const Header = styled.h1`
  color: var(--dark);
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const FormHeader = styled.h3`
  margin: 10px 0;
  max-width: 400px;
  width: 100%;
`;
