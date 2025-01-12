import styled from "styled-components";
import { Chat } from "@/sections/messages/components/Chat";
import { ChatWindow } from "@/sections/messages/components/ChatWindow";
import { useEffect, useRef, useState } from "react";
import Loader from "@/components/ui/Loader";
import MotionWrapper from "@/components/ui/MotionWrapper";
import { fromBottomVariants01 } from "@/consts/motionVariants";
import { ChatStatus } from "@/types/types";
import apiClient from "@/utils/apiClient";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/contexts/ToastContext";
import echo from "@/utils/pusher";
import HttpStatusCodes from "@/consts/httpStatusCodes";
import { useLocation } from "react-router";

interface ChatData {
  id: number;
  recipient: {
    name: string;
    surname: string;
    profile_image: string;
  };
  request: {
    listing: {
      name: string;
    };
  };
  status: ChatStatus;
  name: string;
  profilePicture: string;
  messages: Message[];
}

interface Message {
  id: number;
  content: string;
  sender: {
    profile_image: string;
    name: string;
    surname: string;
  };
  sender_id: number;
}

const MessagesSection = () => {
  const { token } = useUser();
  const { notify } = useToast();
  const location = useLocation();
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messagesLoading, setMessagesLoading] = useState<boolean>(true);
  const [chats, setChats] = useState<ChatData[]>([]);
  const [activeChatId, setActiveChatId] = useState<number>(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const isPusherDebug =
    import.meta.env.VITE_APP_PUSHER_DEBUG === "true" || false;

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

  const getChatName = (chat: ChatData) => {
    return `${chat.recipient.name} ${chat.recipient.surname}`;
  };

  const getActiveChat = (): ChatData | undefined => {
    return chats.find((chat) => chat.id === activeChatId);
  };

  const getActiveChatListingName = () => {
    const activeChat = getActiveChat();
    return activeChat!.request.listing.name;
  };

  const getActiveChatReceiverName = () => {
    const activeChat = getActiveChat();
    return `${activeChat!.recipient.name} ${activeChat!.recipient.surname}`;
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

  const handleChatClick = async (id: number) => {
    scrollToChatWindow();
    setChats((prevChats) => updateChatStatus(prevChats, id));
    setActiveChatId(id);
    setMessagesLoading(true);

    const response = await apiClient.get(`messages/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setMessages(response.data.messages);

    setTimeout(() => {
      setMessagesLoading(false);
    }, 1000);
  };

  const getChats = async () => {
    try {
      const response = await apiClient.get(`chats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === HttpStatusCodes.OK) {
        const chatsData = response.data;

        if (chatsData.length === 0) {
          setChats([]);
          setIsLoading(false);
          return;
        }

        const defaultChatId = location.state?.chatId ?? chatsData[0]?.id;

        const chats = updateChatStatus(chatsData, defaultChatId);
        const activeChat = chats.find((chat) => chat.id === defaultChatId);
        const messages = activeChat?.messages ?? [];

        setActiveChatId(defaultChatId);
        setChats(chats);
        setMessages(messages);
        setMessagesLoading(false);
      } else {
        notify("Wystąpił błąd podczas pobierania chatów", "error");
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isPusherDebug) {
      console.log("Initializing channel for chatId:", activeChatId);
    }

    const channel = echo.channel(`chat.${activeChatId}`);

    if (isPusherDebug) {
      echo.connector.pusher.connection.bind("connected", () => {
        console.log("Connected to Pusher");
        console.log(
          "Connection state:",
          echo.connector.pusher.connection.state
        );
      });

      echo.connector.pusher.connection.bind("error", (err: any) => {
        console.error("Pusher connection error:", err);
      });
    }

    channel.listen("MessageSent", (message: Message) => {
      if (isPusherDebug) {
        console.log("Received message:", message);
      }

      if (message) {
        setMessages((prevMessages) => [...prevMessages, message]);
      } else {
        console.error("Invalid message data received:", message);
      }
    });

    if (isPusherDebug) {
      channel.error((error: any) => {
        console.error("Channel subscription error:", error);
      });
    }

    return () => {
      echo.leaveChannel(`chat.${activeChatId}`);
    };
  }, [activeChatId]);

  useEffect(() => {
    getChats();
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
              {chats.length > 0 ? (
                chats.map((chat) => (
                  <Chat
                    key={chat.id}
                    status={chat.status}
                    onClick={() => handleChatClick(chat.id)}
                    id={chat.id}
                    name={getChatName(chat)}
                    profilePicture={chat.recipient.profile_image ?? null}
                  />
                ))
              ) : (
                <NoResultsText>
                  Nie masz aktualnie żadnych wiadomości
                </NoResultsText>
              )}
            </MotionWrapper>
          </ChatsContainer>
          {chats.length > 0 && (
            <ChatWindow
              messagesLoading={messagesLoading}
              ref={chatWindowRef}
              receiver={getActiveChatReceiverName()}
              listing={getActiveChatListingName()}
              messages={messages}
              chatId={activeChatId}
            />
          )}
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

const NoResultsText = styled.p`
  font-size: 24px;
  color: var(--dark);
  font-weight: bold;
  text-align: center;
`;
