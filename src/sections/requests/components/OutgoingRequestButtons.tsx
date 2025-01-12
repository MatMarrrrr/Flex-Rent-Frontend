import Button from "@/components/buttons/Button";
import Loader from "@/components/ui/Loader";
import { RequestStatus } from "@/types/types";
import {
  X as XIcon,
  Send as SendIcon,
  Pencil as PencilIcon,
} from "lucide-react";
import styled from "styled-components";

interface OutgoingRequestButtonsProps {
  requestId: number;
  requestStatus: RequestStatus;
  isUpdating: boolean;
  onCancelClick: () => void;
  onGoToChatClick: () => void;
  onChangePeriodClick: (requestId: number) => void;
}

const OutgoingRequestButtons: React.FC<OutgoingRequestButtonsProps> = ({
  requestId,
  requestStatus,
  isUpdating,
  onCancelClick,
  onGoToChatClick,
  onChangePeriodClick,
}) => (
  <>
    {requestStatus === "waiting" && (
      <Button
        desktopMaxWidth="500px"
        mobileStart={1320}
        mobileMaxWidth="700px"
        margin="20px 0px 0px 0px"
        disabled={isUpdating}
        onClick={onCancelClick}
      >
        <XIcon />
        {isUpdating ? "Anulowanie" : "Anuluj Prośbę"}
        {isUpdating && <Loader size={18} />}
      </Button>
    )}

    {requestStatus === "accepted" && (
      <>
        <Button
          desktopMaxWidth="500px"
          mobileStart={1320}
          mobileMaxWidth="700px"
          margin="20px 0px 0px 0px"
          disabled={isUpdating}
          onClick={onGoToChatClick}
        >
          <SendIcon />
          Wyślij wiadomość
        </Button>
      </>
    )}

    {(requestStatus === "waiting" || requestStatus === "accepted") && (
      <Button
        desktopMaxWidth="500px"
        mobileStart={1320}
        mobileMaxWidth="700px"
        margin="20px 0px 0px 0px"
        onClick={() => onChangePeriodClick(requestId)}
      >
        <PencilIcon />
        Zmień okres
      </Button>
    )}

    {requestStatus === "declined" && (
      <RequestStatusTextContainer>
        <XIcon />
        <RequestStatusText>
          Wynajem został odrzucony przez właściciela
        </RequestStatusText>
      </RequestStatusTextContainer>
    )}

    {requestStatus === "canceled" && (
      <RequestStatusTextContainer>
        <XIcon />
        <RequestStatusText>
          Wynajem został odrzucony przez ciebie
        </RequestStatusText>
      </RequestStatusTextContainer>
    )}
  </>
);

export default OutgoingRequestButtons;

const RequestStatusTextContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  align-items: center;
`;

const RequestStatusText = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: var(--dark);
`;
