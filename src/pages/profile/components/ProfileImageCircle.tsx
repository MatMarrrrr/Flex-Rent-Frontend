import React, { useState } from "react";
import styled from "styled-components";
import { Camera as CameraIcon } from "lucide-react";
import SkeletonLoaderImage from "@/components/ui/SkeletonLoaderImage";

type ProfileImageType = string | null;

interface ProfileImageCircleProps {
  profileImage: ProfileImageType;
  profileText: string;
  setImageFile: (file: File | null) => void;
  disabled?: boolean;
}

const ProfileImageCircle: React.FC<ProfileImageCircleProps> = ({
  profileImage,
  profileText,
  setImageFile,
  disabled = false,
}) => {
  const [image, setImage] = useState<ProfileImageType>(
    typeof profileImage === "string" ? profileImage : null
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const file = event.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  return (
    <Container>
      <ImageCircle>
        {image ? (
          <ProfileImage src={image} alt="Profile" />
        ) : (
          <ProfileText>{profileText}</ProfileText>
        )}
      </ImageCircle>
      <ChangeImageButton disabled={disabled}>
        <StyledCameraIcon />
        <ChangeImageText>Zmień zdjęcie</ChangeImageText>
        <FileInput
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleImageChange}
          disabled={disabled}
        />
      </ChangeImageButton>
    </Container>
  );
};

export default ProfileImageCircle;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageCircle = styled.div`
  height: 128px;
  width: 128px;
  background-color: var(--primary);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ProfileText = styled.div`
  color: var(--white);
  font-size: 28px;
  font-weight: bold;
`;

const ProfileImage = styled(SkeletonLoaderImage)`
  height: 128px;
  width: 128px;
  object-fit: cover;
  border-radius: 50%;
`;

const ChangeImageButton = styled.label<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  position: relative;
  visibility: ${({ disabled }) => (disabled ? "hidden" : "visible")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

const StyledCameraIcon = styled(CameraIcon)`
  height: 24px;
  width: 24px;
`;

const ChangeImageText = styled.p`
  font-size: 16px;
  color: var(--dark);
  position: relative;
`;

const FileInput = styled.input`
  display: none;
`;
