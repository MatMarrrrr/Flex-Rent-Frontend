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
  state?: string;
  city?: string;
  town?: string;
  village?: string;
  city_district?: string;
  suburb?: string;
}

interface LocalizationResponse {
  address?: Address;
}

interface LocalizationState {
  selected: string | null;
  error: boolean;
}

const LocalizationModal: React.FC<LocalizationModalProps> = ({
  isVisible,
  onClose,
  onLocalizationSelect,
  languageCode,
}) => {
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [localizationState, setLocalizationState] = useState<LocalizationState>(
    { selected: null, error: false }
  );

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
    if (localizationState.selected) {
      onLocalizationSelect(localizationState.selected);
      handleClose();
      setLocalizationState((prev) => ({ ...prev, selected: null }));
    }
  };

  const capitalizeFirstLetter = (text: string): string => {
    if (text.length === 1) return text.toUpperCase();
    return text[0].toUpperCase() + text.slice(1);
  };

  const getProvinceValue = (text: string) => {
    const parts = text.split(" ");
    return parts.length > 0
      ? capitalizeFirstLetter(parts[1])
      : capitalizeFirstLetter(text);
  };

  const parseLocalization = (address: Address | undefined): string | null => {
    if (!address) return null;

    const province = address.state ? getProvinceValue(address.state) : null;
    const city = address.city || address.town || address.village || null;
    const district = address.city_district || address.suburb || null;

    const parts = [province, city, district].filter(Boolean);
    return parts.length > 0 ? parts.join(" ") : null;
  };

  const fetchLocalizationData = async (
    lat: number,
    lng: number,
    apiUrl: string,
    languageCode: string
  ): Promise<LocalizationResponse | null> => {
    try {
      const response = await axios.get<LocalizationResponse>(apiUrl, {
        params: {
          lat,
          lon: lng,
          format: "json",
          "accept-language": languageCode,
        },
      });

      if (!response.data?.address) {
        return null;
      }

      return response.data;
    } catch {
      return null;
    }
  };

  const handleMapClick = async (e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;

    const data = await fetchLocalizationData(
      lat,
      lng,
      openStreetmapApiUrl,
      languageCode
    );

    if (data && data.address) {
      const localization = parseLocalization(data.address);
      if (localization) {
        setLocalizationState((prev) => ({ ...prev, selected: localization }));
        setLocalizationState((prev) => ({ ...prev, error: false }));
      } else {
        setLocalizationState((prev) => ({ ...prev, error: true }));
      }
    } else {
      setLocalizationState((prev) => ({ ...prev, error: true }));
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
            {localizationState.error
              ? "Nie udało się wybrać lokalizacji. Spróbuj ponownie."
              : localizationState.selected
              ? `Wybrana lokalizacja: ${localizationState.selected}`
              : "Kliknij na mapę, aby wybrać lokalizację"}
          </SelectedLocalizationText>
        </SelectedLocalizationContainer>
        <ButtonContainer>
          <PrimaryButton
            onClick={handleAccept}
            disabled={!localizationState.selected || localizationState.error}
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
