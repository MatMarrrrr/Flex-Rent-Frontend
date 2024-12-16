import React, { useState, ChangeEvent, useEffect } from "react";
import styled from "styled-components";
import { ImageUp as ImageUpIcon } from "lucide-react";
import SkeletonLoaderImage from "@/components/ui/SkeletonLoaderImage";

type ImageType = File | string | null;

interface UploadImageContainerProps {
  setImageFile: (file: ImageType) => void;
  initialImage?: ImageType;
  disabled?: boolean;
}

export const UploadImageContainer: React.FC<UploadImageContainerProps> = ({
  setImageFile,
  initialImage = null,
  disabled = false,
}) => {
  const [isImageAdded, setIsImageAdded] = useState<boolean>(!!initialImage);
  const [previewSrc, setPreviewSrc] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewSrc(reader.result as string);
        setIsImageAdded(true);
      };

      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  useEffect(() => {
    if (initialImage) {
      setIsImageAdded(true);
      if (typeof initialImage === "string") {
        setPreviewSrc(initialImage);
      } else if (initialImage instanceof File) {
        setPreviewSrc(URL.createObjectURL(initialImage));
      }
    }
  }, [initialImage]);

  return (
    <Container disabled={disabled}>
      <FileInput
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleFileChange}
        disabled={disabled}
      />
      {!isImageAdded ? (
        <NoImageContainer>
          <NoImageIcon />
          <NoImageText>
            <RequiredStar>*</RequiredStar>Wgraj zdjęcie
          </NoImageText>
        </NoImageContainer>
      ) : (
        <>
          <Image src={previewSrc} alt="Podgląd obrazu" />
          <ChangeImageText $disabled={disabled}>Zmień zdjęcie</ChangeImageText>
        </>
      )}
    </Container>
  );
};

export default UploadImageContainer;

const Container = styled.label<{ disabled?: boolean }>`
  height: 300px;
  width: 400px;
  border-radius: 8px;
  background-color: var(--dark-5);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};

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

const RequiredStar = styled.span`
  color: red;
  margin-right: 5px;
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
const NoImageIcon = styled(ImageUpIcon)`
  height: 80px;
  width: 80px;
  stroke-width: 0.7;
  color: var(--dark);
`;
const NoImageText = styled.p``;

const Image = styled(SkeletonLoaderImage)`
  height: 100%;
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
`;

const ChangeImageText = styled.p<{ $disabled: boolean }>`
  background: var(--dark-50);
  color: var(--white);
  position: absolute;
  bottom: 0;
  visibility: ${({ $disabled }) => ($disabled ? "hidden" : "visible")};
  width: 100%;
  padding: 15px;
  text-align: center;
  border-radius: 8px;
`;
