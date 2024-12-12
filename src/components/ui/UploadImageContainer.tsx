import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import uploadImage from "../../assets/icons/uploadImage.svg";
import SkeletonLoaderImage from "./SkeletonLoaderImage";

interface UploadImageContainerProps {
  setImageFile: (file: File) => void;
}

export const UploadImageContainer: React.FC<UploadImageContainerProps> = ({
  setImageFile,
}) => {
  const [isImageAdded, setIsImageAdded] = useState<boolean>(false);
  const [previewSrc, setPreviewSrc] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const preview = URL.createObjectURL(file);
      setPreviewSrc(preview);
      setIsImageAdded(true);
      setImageFile(file);
    }
  };

  return (
    <Container>
      <FileInput
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleFileChange}
      />
      {!isImageAdded ? (
        <NoImageContainer>
          <NoImageIcon src={uploadImage} />
          <NoImageText>Wgraj zdjęcie</NoImageText>
        </NoImageContainer>
      ) : (
        <>
          <Image src={previewSrc} alt="Podgląd obrazu" />
          <ChangeImageText>Zmień zdjęcie</ChangeImageText>
        </>
      )}
    </Container>
  );
};

export default UploadImageContainer;

const Container = styled.label`
  height: 300px;
  width: 400px;
  border-radius: 8px;
  background-color: var(--dark-5);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;

  @media (max-width: 1100px) {
    width: 100%;
    max-width: 500px;
    height: 100%;
    max-height: 400px;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const NoImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 100%;
  height: 100%;
  aspect-ratio: 4/3;
`;
const NoImageIcon = styled.img`
  height: 80px;
  width: 80px;
`;
const NoImageText = styled.p``;

const Image = styled(SkeletonLoaderImage)`
  height: 100%;
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
`;

const ChangeImageText = styled.p`
  background: var(--dark-50);
  color: var(--white);
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 15px;
  text-align: center;
  border-radius: 8px;
`;
