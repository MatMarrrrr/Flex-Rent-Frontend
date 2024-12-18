import styled from "styled-components";
import { Chat } from "@/sections/messages/components/Chat";
import { ChatWindow } from "@/sections/messages/components/ChatWindow";
import { useEffect, useRef, useState } from "react";
import Loader from "@/components/ui/Loader";
import MotionWrapper from "@/components/ui/MotionWrapper";
import { fromBottomVariants01 } from "@/consts/motionVariants";
import test_image from "@/assets/test_item.jpg";

type ChatStatus = "active" | "unread" | "read";

interface ChatData {
  id: number;
  status: ChatStatus;
  name: string;
  profilePicture: string;
}

const MessagesSection = () => {
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messagesLoading, setMessagesLoading] = useState<boolean>(true);
  const [chats, setChats] = useState<ChatData[]>([]);

  const scrollToChatWindow = () => {
    if (window.innerWidth < 1250) {
      if (chatWindowRef.current) {
        const elementPosition =
          chatWindowRef.current.getBoundingClientRect().top +
          window.scrollY -
          200;

        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });
      }
    }
  };

  const updateChatStatus = (
    chats: ChatData[],
    activeChatId: number
  ): ChatData[] => {
    return chats.map((chat) => {
      if (chat.id === activeChatId) {
        return { ...chat, status: "active" };
      } else if (chat.status === "active") {
        return { ...chat, status: "read" };
      }
      return chat;
    });
  };

  const handleChatClick = (id: number) => {
    scrollToChatWindow();
    setChats((prevChats) => updateChatStatus(prevChats, id));

    setMessagesLoading(true);

    setTimeout(() => {
      setMessagesLoading(false);
    }, 1000);
  };

  const activeChatId = 2;

  useEffect(() => {
    const chatsData: ChatData[] = [
      {
        id: 1,
        status: "unread",
        name: "Jan Kowalski",
        profilePicture: test_image,
      },
      { id: 2, status: "unread", name: "Anna Nowak", profilePicture: "" },
      { id: 3, status: "read", name: "Krzysztof Kowalski", profilePicture: "" },
      {
        id: 4,
        status: "unread",
        name: "Maria Nowak",
        profilePicture: test_image,
      },
    ];

    const updatedChats = chatsData.map((chat, index) => {
      if (activeChatId) {
        return chat.id === activeChatId
          ? { ...chat, status: "active" as ChatStatus }
          : { ...chat, status: chat.status as ChatStatus };
      }
      return index === 0
        ? { ...chat, status: "active" as ChatStatus }
        : { ...chat, status: chat.status as ChatStatus };
    });

    setChats(updatedChats);

    const timeout = setTimeout(() => {
      setIsLoading(false);
      setMessagesLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Container>
      {isLoading ? (
        <LoaderContainer>
          <Loader />
          <LoaderText>Wczytywanie wiadomości</LoaderText>
        </LoaderContainer>
      ) : (
        <>
          <ChatsContainer>
            <MotionWrapper variants={fromBottomVariants01}>
              {chats.map((chat) => (
                <Chat
                  key={chat.id}
                  status={chat.status}
                  onClick={() => handleChatClick(chat.id)}
                  id={chat.id}
                  name={chat.name}
                  profilePicture={chat.profilePicture}
                />
              ))}
            </MotionWrapper>
          </ChatsContainer>
          <ChatWindow messagesLoading={messagesLoading} ref={chatWindowRef} />
        </>
      )}
    </Container>
  );
};

export default MessagesSection;

const Container = styled.div`
  padding: 30px 10% 60px 10%;
  min-height: calc(100vh - 493px);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  background-color: var(--white);

  @media (max-width: 1250px) {
    flex-direction: column;
  }

  @media (max-width: 500px) {
    padding: 20px 5% 30px 5%;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const LoaderText = styled.p`
  text-align: center;
  color: var(--dark);
  font-size: 24px;
  font-weight: bold;
`;

const ChatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 10px;
  flex-grow: 1;
  flex-shrink: 0;
  width: 100%;
  max-width: 500px;
  max-height: 450px;
  overflow-y: auto;
  align-self: flex-start;

  @media (max-width: 1250px) {
    flex-direction: column;
    max-width: 100%;
  }
`;
