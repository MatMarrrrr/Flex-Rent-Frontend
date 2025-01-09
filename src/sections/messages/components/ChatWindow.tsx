import styled from "styled-components";
import { Send as SendIcon } from "lucide-react";
import { ChatMessage } from "@/sections/messages/components/ChatMessage";
import { forwardRef, useState } from "react";
import Loader from "@/components/ui/Loader";
import apiClient from "@/utils/apiClient";
import { useUser } from "@/contexts/UserContext";

interface Message {
  id: number;
  content: string;
  sender: {
    name: string;
    surname: string;
    profile_image: string;
  };
  sender_id: number;
}
interface ChatWindowProps {
  chatId: number;
  messagesLoading: boolean;
  listing: string;
  receiver: string;
  messages: Message[];
}

export const ChatWindow = forwardRef<HTMLDivElement, ChatWindowProps>(
  ({ messagesLoading, listing, receiver, messages, chatId }, ref) => {
    const { token, user } = useUser();
    const [message, setMessage] = useState<string>("");

    const getInitials = (message: Message): string => {
      const fullName = `${message.sender.name} ${message.sender.surname}`;
      const initials = fullName
        .trim()
        .split(" ")
        .map((word) => word[0].toUpperCase())
        .join("");

      return initials;
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(e.target.value);
    };

    const handleMessageKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    };

    const sendMessage = async () => {
      if (message.trim() === "") return;
      await apiClient.post(
        `messages`,
        {
          chat_id: chatId,
          content: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("");
    };

    return (
      <ChatWindowContainer ref={ref} data-aos="fade-up">
        <ChatTitleContainer>
          <ChatTitle>Rozmawiasz z {receiver}</ChatTitle>
          <ChatTitle>{listing}</ChatTitle>
        </ChatTitleContainer>
        <ChatMessagesContainer>
          {messagesLoading ? (
            <LoaderContainer>
              <Loader />
              <LoaderText>Wczytywanie wiadomości</LoaderText>
            </LoaderContainer>
          ) : messages.length > 0 ? (
            messages.map((message) => (
              <ChatMessage
                key={message.id}
                profilePicture={message.sender.profile_image}
                profileText={getInitials(message)}
                isSender={user?.id === message.sender_id}
                content={message.content}
              />
            ))
          ) : (
            <span>Brak wiadomości</span>
          )}
        </ChatMessagesContainer>
        <ChatInputContainer>
          <ChatInput
            type="text"
            onChange={handleMessageChange}
            value={message}
            onKeyDown={handleMessageKeyDown}
          />
          <ChatSendButton onClick={sendMessage} />
        </ChatInputContainer>
      </ChatWindowContainer>
    );
  }
);

const ChatWindowContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 500px;

  @media (max-width: 1250px) {
    width: 100%;
  }
`;

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const LoaderText = styled.p`
  font-size: 20px;
  color: var(--dark);
  font-weight: bold;
  text-align: center;
`;

const ChatTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const ChatTitle = styled.p`
  color: var(--dark);
  font-size: 16px;
`;

const ChatMessagesContainer = styled.div`
  flex-grow: 2;
  height: 100%;
  width: 100%;
  padding: 20px;
  border: 1px solid var(--dark-25);
  border-radius: 8px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ChatInputContainer = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 10px;
  position: relative;
`;

const ChatInput = styled.input`
  width: 100%;
  outline: none;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 18px;
  border: 1px solid var(--dark-25);
`;

const ChatSendButton = styled(SendIcon)`
  position: absolute;
  right: 15px;
  top: 10px;
  cursor: pointer;
`;
