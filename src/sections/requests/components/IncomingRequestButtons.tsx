import Button from "@/components/buttons/Button";
import { Check as CheckIcon, X as XIcon } from "lucide-react";

interface IncomingRequestButtonsProps {
  requestStatus: RequestStatus;
  onAcceptClick: () => void;
  onDeclineClick: () => void;
}

type RequestStatus = "accepted" | "declined" | "waiting" | "canceled";

const IncomingRequestButtons: React.FC<IncomingRequestButtonsProps> = ({
  requestStatus,
  onAcceptClick,
  onDeclineClick,
}) => (
  <>
    {requestStatus !== "declined" && (
      <Button
        desktopMaxWidth="500px"
        mobileStart={1320}
        mobileMaxWidth="700px"
        margin="20px 0px 0px 0px"
        disabled={requestStatus === "accepted"}
        onClick={onAcceptClick}
      >
        <CheckIcon />
        {requestStatus === "accepted" ? "Zaakceptowano" : "Zaakceptuj"}
      </Button>
    )}
    {requestStatus !== "accepted" && (
      <Button
        desktopMaxWidth="500px"
        mobileStart={1320}
        mobileMaxWidth="700px"
        margin="20px 0px 0px 0px"
        disabled={requestStatus === "declined"}
        onClick={onDeclineClick}
      >
        <XIcon />
        {requestStatus === "declined" ? "Odrzucono" : "Odrzuć"}
      </Button>
    )}
  </>
);

export default IncomingRequestButtons;
