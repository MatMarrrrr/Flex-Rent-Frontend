import SkeletonLoaderImage from "@/components/ui/SkeletonLoaderImage";
import test_image from "@/assets/test_item.jpg";
import styled from "styled-components";

interface ChatMessageProps {
  isSender: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ isSender }) => {
  return (
    <MessageContainer $isSender={isSender}>
      {!isSender && <SenderImage src={test_image} />}
      <Message $isSender={isSender}>
        Proin nec ex in justo posuere dictum. Proin id tempus metus, ac luctus.
      </Message>
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

const Message = styled.div<{ $isSender: boolean }>`
  padding: 10px;
  color: ${({ $isSender }) => ($isSender ? "var(--light)" : "var(--dark)")};
  background-color: ${({ $isSender }) =>
    $isSender ? "var(--accent)" : "var(--dark-5)"};
  border-radius: 8px;
`;
