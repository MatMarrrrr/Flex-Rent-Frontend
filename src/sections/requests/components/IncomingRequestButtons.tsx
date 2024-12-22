import Button from "@/components/buttons/Button";
import Loader from "@/components/ui/Loader";
import { RequestAction, RequestStatus } from "@/types/types";
import { Check as CheckIcon, X as XIcon, Send as SendIcon } from "lucide-react";
import styled from "styled-components";

interface IncomingRequestButtonsProps {
  requestStatus: RequestStatus;
  isUpdating: boolean;
  updatingAction: RequestAction | null;
  onAcceptClick: () => void;
  onDeclineClick: () => void;
  onSendMessageClick: () => void;
  onConfirmRentalClick: () => void;
}

const IncomingRequestButtons: React.FC<IncomingRequestButtonsProps> = ({
  requestStatus,
  isUpdating,
  updatingAction,
  onAcceptClick,
  onDeclineClick,
  onSendMessageClick,
  onConfirmRentalClick,
}) => (
  <>
    {requestStatus === "confirmed" && (
      <RequestStatusTextContainer>
        <CheckIcon />
        <RequestStatusText>Wynajem został potwierdzony</RequestStatusText>
      </RequestStatusTextContainer>
    )}
    {requestStatus === "declined" && (
      <RequestStatusTextContainer>
        <XIcon />
        <RequestStatusText>Prośba została odrzucona</RequestStatusText>
      </RequestStatusTextContainer>
    )}
    {requestStatus === "accepted" && (
      <Button
        desktopMaxWidth="500px"
        mobileStart={1320}
        mobileMaxWidth="700px"
        margin="20px 0px 0px 0px"
        disabled={isUpdating && updatingAction === "confirming"}
        onClick={onConfirmRentalClick}
      >
        <CheckIcon />
        {isUpdating && updatingAction === "confirming" ? (
          <>
            Zatwierdzanie
            <Loader size={18} />
          </>
        ) : (
          "Zatwierdź wynajem"
        )}
      </Button>
    )}
    {requestStatus === "waiting" && (
      <>
        <Button
          desktopMaxWidth="500px"
          mobileStart={1320}
          mobileMaxWidth="700px"
          margin="20px 0px 0px 0px"
          disabled={isUpdating}
          onClick={onAcceptClick}
        >
          <CheckIcon />
          {isUpdating && updatingAction === "accepting" ? (
            <>
              Akceptowanie
              <Loader size={18} />
            </>
          ) : (
            "Zaakceptuj"
          )}
        </Button>
        <Button
          desktopMaxWidth="500px"
          mobileStart={1320}
          mobileMaxWidth="700px"
          margin="20px 0px 0px 0px"
          disabled={isUpdating}
          onClick={onDeclineClick}
        >
          <XIcon />
          {isUpdating && updatingAction === "declining" ? (
            <>
              Odrzucanie
              <Loader size={18} />
            </>
          ) : (
            "Odrzuć"
          )}
        </Button>
      </>
    )}
    {(requestStatus === "accepted" || requestStatus === "confirmed") && (
      <Button
        desktopMaxWidth="500px"
        mobileStart={1320}
        mobileMaxWidth="700px"
        margin="20px 0px 0px 0px"
        disabled={isUpdating}
        onClick={onSendMessageClick}
      >
        <SendIcon />
        Wyślij wiadomość
      </Button>
    )}
  </>
);

export default IncomingRequestButtons;

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
