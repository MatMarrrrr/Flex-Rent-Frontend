import SkeletonLoaderImage from "@/components/ui/SkeletonLoaderImage";
import styled from "styled-components";
import { Dot as DotIcon } from "lucide-react";
import { ChatStatus } from "@/types/types";

interface ChatProps {
  id: number;
  status: ChatStatus;
  name: string;
  profilePicture: string;
  onClick: () => void;
}

export const Chat: React.FC<ChatProps> = ({
  id,
  status,
  name,
  profilePicture,
  onClick,
}) => {
  const getProfileText = (fullName: string): string => {
    const words = fullName.trim().split(" ");
    const initials = words.map((word) => word[0].toUpperCase()).join("");

    return initials;
  };

  return (
    <ChatContainer key={id} $status={status} onClick={onClick}>
      {!profilePicture && (
        <ChatProfileText>{getProfileText(name)}</ChatProfileText>
      )}
      {profilePicture && <ChatProfileImage src={profilePicture} />}
      <ChatUserName $status={status}>{name}</ChatUserName>
      <ChatGreenDot $status={status} />
    </ChatContainer>
  );
};

const ChatContainer = styled.div<{ $status: ChatStatus }>`
  display: flex;
  align-items: center;
  border-radius: 8px;
  background-color: ${({ $status }) =>
    $status === "active" ? "var(--accent)" : "var(--light)"};
  padding: 5px 10px;
  min-width: 400px;
  width: 100%;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 1250px) {
    min-width: 100%;
  }
`;

const ChatProfileImage = styled(SkeletonLoaderImage)`
  width: 44px;
  height: 44px;
  border-radius: 50%;
`;

const ChatProfileText = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: var(--primary);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: var(--white);
`;

const ChatUserName = styled.p<{ $status: ChatStatus }>`
  font-size: 18px;
  margin-left: 10px;
  color: ${({ $status }) =>
    $status === "active" ? "var(--white)" : "var(--dark)"};
  font-weight: ${({ $status }) => ($status === "unread" ? "bold" : "normal")};
`;

const ChatGreenDot = styled(DotIcon)<{ $status: ChatStatus }>`
  margin-left: auto;
  background-color: var(--primary);
  border-radius: 50%;
  height: 12px;
  width: 12px;
  display: ${({ $status }) => ($status === "unread" ? "block" : "none")};
  color: var(--primary);
`;
