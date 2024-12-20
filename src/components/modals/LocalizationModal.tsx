import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { X as XIcon, Check as CheckIcon } from "lucide-react";
import { fadeIn, fadeOut } from "@/styledComponents/keyframes";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import PrimaryButton from "../buttons/PrimaryButton";

interface LocalizationModalProps {
  isVisible: boolean;
  onClose: () => void;
  onLocalizationSelect: (localizationName: string) => void;
  languageCode: string;
}

interface Address {
  city?: string;
  town?: string;
  village?: string;
  city_district?: string;
  suburb?: string;
}

interface LocalizationResponse {
  address?: Address;
}

const LocalizationModal: React.FC<LocalizationModalProps> = ({
  isVisible,
  onClose,
  onLocalizationSelect,
  languageCode,
}) => {
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [selectedLocalization, setSelectedLocalization] = useState<
    string | null
  >(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const openStreetmapApiUrl = import.meta.env.VITE_OPEN_STREETMAP_API_URL;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  const handleAccept = async () => {
    if (selectedLocalization) {
      onLocalizationSelect(selectedLocalization);
      handleClose();
      setSelectedLocalization("");
    }
  };

  const parseLocalization = (address: Address | undefined): string => {
    if (!address) return "Nieznana lokalizacja";

    const city = address.city || address.town || address.village;
    const district = address.city_district || address.suburb;

    return city && district
      ? `${city} ${district}`
      : city || "Nieznana lokalizacja";
  };

  const fetchLocalizationData = async (
    lat: number,
    lng: number,
    apiUrl: string,
    languageCode: string
  ): Promise<LocalizationResponse> => {
    const response = await axios.get<LocalizationResponse>(apiUrl, {
      params: {
        lat,
        lon: lng,
        format: "json",
        "accept-language": languageCode,
      },
    });
    return response.data;
  };

  const handleMapClick = async (e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    try {
      const data = await fetchLocalizationData(
        lat,
        lng,
        openStreetmapApiUrl,
        languageCode
      );
      const localization = parseLocalization(data?.address);
      setSelectedLocalization(localization || "Nieznana lokalizacja");
    } catch (error) {
      console.error("Error fetching localization data:", error);
      setSelectedLocalization("Nieznana lokalizacja");
    }
  };

  useEffect(() => {
    if (isVisible && mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView(
        [52.2297, 21.0122],
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapInstance.current);

      mapInstance.current.on("click", handleMapClick);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.off("click", handleMapClick);
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [isVisible]);

  if (!isVisible && !isClosing) return null;

  return (
    <ModalOverlay $isClosing={isClosing}>
      <ModalContent>
        <CloseButton onClick={handleClose} />
        <ModalTitle>Wybierz lokalizację</ModalTitle>
        <MapContainer ref={mapRef} />
        <SelectedLocalizationContainer>
          <SelectedLocalizationText>
            {selectedLocalization
              ? `Wybrana lokalizacja: ${selectedLocalization}`
              : "Kliknij na mapę, aby wybrać lokalizację"}
          </SelectedLocalizationText>
        </SelectedLocalizationContainer>
        <ButtonContainer>
          <PrimaryButton
            onClick={handleAccept}
            disabled={
              !selectedLocalization ||
              selectedLocalization == "Nieznana lokalizacja"
            }
            desktopMaxWidth="300px"
          >
            <CheckIcon /> Akceptuj
          </PrimaryButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LocalizationModal;

const ModalOverlay = styled.div<{ $isClosing: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--dark-50);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${({ $isClosing }) => ($isClosing ? fadeOut : fadeIn)} 0.3s ease;
`;

const ModalContent = styled.div`
  background: var(--light);
  padding: 40px 20px;
  border-radius: 6px;
  box-shadow: var(--shadow);
  position: relative;
  display: flex;
  gap: 10px;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  height: 500px;

  @media (max-width: 700px) {
    margin: 0 10px;
  }
`;

const CloseButton = styled(XIcon)`
  height: 35px;
  width: 35px;
  color: var(--dark);
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ModalTitle = styled.p`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: var(--dark);
`;

const MapContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
`;

const SelectedLocalizationContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const SelectedLocalizationText = styled.p`
  font-size: 16px;
  color: var(--dark);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
