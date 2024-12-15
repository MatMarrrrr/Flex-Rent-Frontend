import PrimaryButton from "@/components/buttons/PrimaryButton";
import FormikForm from "@/components/forms/FormikForm";
import FormikInputField from "@/components/forms/FormikInputField";
import { profileDataSchema } from "@/validations/profileSchema";
import styled from "styled-components";
import ProfileImageCircle from "./components/ProfileImageCircle";
import { useState } from "react";
import Loader from "@/components/ui/Loader";

type ImageType = File | string | null;

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

  const profileData = {
    email: "email@email.com",
    name: "Imię",
    surname: "Nazwisko",
    city: "Miasto",
    province: "Województwo",
  };

  const handleSubmit = (values: ProfileData) => {
    setIsSubmitting(true);
    const finalValues = { ...values, profileImage: imageFile };
    console.log(finalValues);
  };

  return (
    <Container>
      <Wrapper>
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
            Zmień {isSubmitting && <Loader size={18} />}
          </PrimaryButton>
        </FormikForm>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  padding: 40px 10%;
  display: flex;
  gap: 10px;
  justify-content: center;
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
