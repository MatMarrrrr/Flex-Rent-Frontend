import PrimaryButton from "@/components/buttons/PrimaryButton";
import FormikForm from "@/components/forms/FormikForm";
import FormikInputField from "@/components/forms/FormikInputField";
import { profileDataSchema } from "@/validations/profileSchema";
import styled from "styled-components";
import ProfileImageCircle from "@/pages/profile/components/ProfileImageCircle";
import { useState } from "react";
import Loader from "@/components/ui/Loader";
import { ImageType } from "@/types/types";
import { useToast } from "@/contexts/ToastContext";
import { useUser } from "@/contexts/UserContext";
import apiClient from "@/utils/apiClient";

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
  const { notify } = useToast();
  const { user, token, setUser } = useUser();

  const profileData = {
    email: user!.email,
    name: user!.name,
    surname: user!.surname,
    city: user!.city,
    province: user!.province,
  };

  const profileText = `${user!.name[0]}${user!.surname[0]}`;
  const profileImage = user!.profile_image ?? null;

  const handleSubmit = async (values: ProfileData) => {
    setIsSubmitting(true);

    try {
      const response = await apiClient.patch("/user", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const updatedData = response.data.updated_data;

        setUser({
          ...user!,
          ...updatedData,
        });

        if (imageFile) {
          const formData = new FormData();
          formData.append("profile_image", imageFile);

          const imageResponse = await apiClient.post(
            "/user/profile-image",
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (imageResponse.status === 200) {
            const { image_url } = imageResponse.data;
            setUser({
              ...user!,
              profile_image: image_url,
            });
          } else {
            notify(
              "Wystąpił błąd podczas aktualizacji zdjęcia profilowego",
              "error"
            );
          }
        }

        notify("Dane konta zostały poprawnie zmienione", "success");
      }
    } catch (error) {
      notify("Wystąpił błąd podczas zmieniania danych konta", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Wrapper data-aos="fade-up">
        <Header>Twój profil</Header>
        <ProfileImageCircle
          profileImage={profileImage}
          profileText={profileText}
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
    </Container>
  );
}

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
