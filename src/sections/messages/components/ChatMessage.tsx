import SkeletonLoaderImage from "@/components/ui/SkeletonLoaderImage";
import styled from "styled-components";

interface ChatMessageProps {
  isSender: boolean;
  content: string;
  profilePicture: string | null;
  profileText: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  isSender,
  content,
  profilePicture,
  profileText,
}) => {
  return (
    <MessageContainer $isSender={isSender}>
      {!isSender &&
        (profilePicture ? (
          <SenderImage src={profilePicture} />
        ) : (
          <ChatProfileText>{profileText}</ChatProfileText>
        ))}
      <Message $isSender={isSender}>{content}</Message>
    </MessageContainer>
  );
};

const MessageContainer = styled.div<{ $isSender: boolean }>`
  display: flex;
  max-width: 70%;
  gap: 10px;
  align-self: ${({ $isSender }) => ($isSender ? "flex-end" : "flex-start")};
`;

const SenderImage = styled(SkeletonLoaderImage)`
  min-height: 28px;
  min-width: 28px;
  height: 28px;
  width: 28px;
  border-radius: 50%;
`;

const ChatProfileText = styled.div`
  min-height: 28px;
  min-width: 28px;
  height: 28px;
  width: 28px;
  font-size: 12px;
  border-radius: 50%;
  background-color: var(--primary);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: var(--white);
`;

const Message = styled.div<{ $isSender: boolean }>`
  padding: 10px;
  color: ${({ $isSender }) => ($isSender ? "var(--light)" : "var(--dark)")};
  background-color: ${({ $isSender }) =>
    $isSender ? "var(--accent)" : "var(--dark-5)"};
  border-radius: 8px;
`;
