import Button from "@/components/buttons/Button";
import Loader from "@/components/ui/Loader";
import { RequestStatus } from "@/types/types";
import { X as XIcon, Check as CheckIcon, Send as SendIcon } from "lucide-react";
import styled from "styled-components";

interface OutgoingRequestButtonsProps {
  requestStatus: RequestStatus;
  isUpdating: boolean;
  onCancelClick: () => void;
  onSendMessageClick: () => void;
}

const OutgoingRequestButtons: React.FC<OutgoingRequestButtonsProps> = ({
  requestStatus,
  isUpdating,
  onCancelClick,
  onSendMessageClick,
}) => (
  <>
    {requestStatus !== "accepted" && (
      <Button
        desktopMaxWidth="500px"
        mobileStart={1320}
        mobileMaxWidth="700px"
        margin="20px 0px 0px 0px"
        disabled={requestStatus === "canceled" || isUpdating}
        onClick={onCancelClick}
      >
        <XIcon />
        {isUpdating
          ? "Anulowanie"
          : (requestStatus === "waiting" && "Anuluj Prośbę") ||
            (requestStatus === "canceled" && "Anulowano")}
        {isUpdating && <Loader size={18} />}
      </Button>
    )}

    {requestStatus === "waiting" && (
      <RequestStatusText>
        <CheckIcon />
        Prośba wysłana
      </RequestStatusText>
    )}

    {requestStatus === "accepted" && (
      <Button
        desktopMaxWidth="500px"
        mobileStart={1320}
        mobileMaxWidth="700px"
        margin="20px 0px 0px 0px"
        onClick={onSendMessageClick}
      >
        <SendIcon />
        Wyślij wiadomość
      </Button>
    )}
  </>
);

export default OutgoingRequestButtons;

const RequestStatusText = styled.p`
  color: var(--dark);
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
  font-size: 20px;
  max-width: 500px;
`;
