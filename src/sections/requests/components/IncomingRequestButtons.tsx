import Button from "@/components/buttons/Button";
import Loader from "@/components/ui/Loader";
import { RequestAction, RequestStatus } from "@/types/types";
import { Check as CheckIcon, X as XIcon, Send as SendIcon } from "lucide-react";

interface IncomingRequestButtonsProps {
  requestStatus: RequestStatus;
  isUpdating: boolean;
  updatingAction: RequestAction | null;
  onAcceptClick: () => void;
  onDeclineClick: () => void;
  onSendMessageClick: () => void;
}

const IncomingRequestButtons: React.FC<IncomingRequestButtonsProps> = ({
  requestStatus,
  isUpdating,
  updatingAction,
  onAcceptClick,
  onDeclineClick,
  onSendMessageClick,
}) => (
  <>
    {requestStatus !== "declined" && (
      <Button
        desktopMaxWidth="500px"
        mobileStart={1320}
        mobileMaxWidth="700px"
        margin="20px 0px 0px 0px"
        disabled={requestStatus === "accepted" || isUpdating}
        onClick={onAcceptClick}
      >
        <CheckIcon />
        {isUpdating && updatingAction === "accepting" ? (
          <>
            Akceptowanie
            <Loader size={18} />
          </>
        ) : requestStatus === "accepted" ? (
          "Zaakceptowano"
        ) : (
          "Zaakceptuj"
        )}
      </Button>
    )}
    {requestStatus !== "accepted" && (
      <Button
        desktopMaxWidth="500px"
        mobileStart={1320}
        mobileMaxWidth="700px"
        margin="20px 0px 0px 0px"
        disabled={requestStatus === "declined" || isUpdating}
        onClick={onDeclineClick}
      >
        <XIcon />
        {isUpdating && updatingAction === "declining" ? (
          <>
            Odrzucanie
            <Loader size={18} />
          </>
        ) : requestStatus === "declined" ? (
          "Odrzucono"
        ) : (
          "Odrzuć"
        )}
      </Button>
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

export default IncomingRequestButtons;
