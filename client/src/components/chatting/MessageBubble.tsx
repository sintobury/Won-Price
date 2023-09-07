import React, { useState, useEffect, FC } from "react";
import styled from "styled-components";
import axios from "axios";
import { currentChatRoomIdState } from "./chatState";
import { useRecoilValue } from "recoil";
// import NoMessages from "../../assets/images/chatting/NoMessages.svg";

const BubbleWrapper = styled.div<{ owner: "user" | "other" }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ owner }) => (owner === "user" ? "flex-end" : "flex-start")};
  margin: 0.5rem;
`;

const Bubble = styled.div<{ owner: "user" | "other" }>`
  max-width: 60%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: ${({ owner }) => (owner === "user" ? "#FFB300" : "#FFCD57")};
  color: ${({ owner }) => (owner === "user" ? "#222222" : "#222222")};
`;

const Time = styled.span`
  font-size: 0.625rem;
  color: grey;
  margin-top: 0.25rem;
  padding: 0.25rem;
`;

interface Message {
  messageId: number;
  senderId: number;
  content: string;
  createdAt: string;
}

interface MessageBubbleProps {
  owner: "user" | "other";
  message: string;
  time: string;
}

const MessageBubble: FC<MessageBubbleProps> = ({ owner, message, time }) => (
  <BubbleWrapper owner={owner}>
    <Bubble owner={owner}>{message}</Bubble>
    <Time>{time}</Time>
  </BubbleWrapper>
);

const ChatRoom: React.FC = () => {
  const chatRoomId = useRecoilValue(currentChatRoomIdState);
  // const { chatRoomId } = useParams<{ chatRoomId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  console.log(chatRoomId);

  // 로컬 스토리지에서 userId 값을 가져옵니다.
  const userIdFromLocalStorage = localStorage.getItem("Id");
  console.log(userIdFromLocalStorage);

  // 문자열을 숫자로 변환합니다. 로컬 스토리지에 값이 없으면 null로 설정합니다.
  const Id = userIdFromLocalStorage ? parseInt(userIdFromLocalStorage, 10) : null;

  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     try {
  //       const response = await axios.get(`${process.env.REACT_APP_API_URL}/chat/${chatRoomId}`);
  //       console.log(fetchMessages);

  //       setMessages(response.data);
  //     } catch (error) {
  //       console.error("Failed to fetch messages:", error);
  //     }
  //   };

  //   fetchMessages();
  //   // const intervalId = setInterval(fetchMessages, 5000); // 5초마다 메시지를 새로 가져옵니다.
  //   const intervalId = setInterval(fetchMessages, 3600000); // 1시간마다 메시지를 새로 가져옵니다.

  //   return () => {
  //     clearInterval(intervalId); // 컴포넌트가 언마운트되면 인터벌을 제거합니다.
  //   };
  // }, [chatRoomId]); // chatRoomId를 의존성으로 추가

  useEffect(() => {
    const fetchMessagesWithLongPolling = async () => {
      try {
        // 서버가 준비된 데이터를 보낼 때까지 대기
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/chat/${chatRoomId}`, {
          timeout: 50000, // 타임아웃을 길게 설정
        });
        setMessages(response.data);

        // 데이터를 받은 후 다음 Long Polling 요청을 바로 보냄
        fetchMessagesWithLongPolling();
      } catch (error) {
        console.error("An error occurred:", error);
        // 에러 발생 시 다시 Long Polling 시작
        fetchMessagesWithLongPolling();
      }
    };

    fetchMessagesWithLongPolling(); // 최초의 Long Polling 요청

    return () => {
      // 컴포넌트가 언마운트되면 여기에 정리 로직을 작성
    };
  }, [chatRoomId]); // chatRoomId가 변경될 때마다 Long Polling을 재시작

  return (
    <div>
      {messages.length === 0 ? (
        <div>{/* <NoMessages /> */}</div>
      ) : (
        messages.map((message) => (
          <MessageBubble
            key={message.messageId}
            owner={message.senderId === Id ? "user" : "other"}
            message={message.content}
            time={message.createdAt}
          />
        ))
      )}
    </div>
  );
};

export default ChatRoom;

// localStorage.getItem("refreshToken")
