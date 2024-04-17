import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Button } from "react-native";
import messagesData from "./messages.json";

const MessageInputComponent = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [typedIndex, setTypedIndex] = useState(0);
  const inputRef = useRef(null);

  const handleKeyPress = (event) => {
    const currentMessage = messagesData.find((message) => message.inAction);

    if (currentMessage) {
      if (event.nativeEvent.key === "Backspace") {
        setTypedIndex((prevIndex) => Math.max(0, prevIndex - 1));
      } else if (
        event.nativeEvent.key !== "Backspace" &&
        typedIndex < currentMessage.content.length
      ) {
        setTypedIndex((prevIndex) => prevIndex + 1);
      }
    }
  };

  const handleSubmit = () => {
    const currentMessage = messagesData.find((message) => message.inAction);

    if (currentMessage) {
      const newMessageObject = {
        id: currentMessage.id,
        content: newMessage,
        user: true,
        time: "",
        gap: currentMessage.gap,
        deliveryStatus: true,
        inAction: true,
      };

      console.log("New message submitted:", newMessageObject);
      setTypedIndex(0);
      setNewMessage("");
      setMessageIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    const currentMessage = messagesData.find((message) => message.inAction);

    if (currentMessage) {
      const typedMessage = currentMessage.content.substring(0, typedIndex);
      setNewMessage(typedMessage);
    } else {
      setNewMessage("");
    }
  }, [typedIndex, messageIndex]);

  return (
    <View style={{ margin: 10 }}>
      <TextInput
        ref={inputRef}
        placeholder="Type your message..."
        onKeyPress={handleKeyPress}
        value={newMessage}
        maxLength={newMessage.length}
        onSubmitEditing={handleSubmit}
        autoCorrect={false}
        autoComplete="off"
        multiline
      />
      <Button title="Send" onPress={handleSubmit} />
    </View>
  );
};

const App = () => {
  const [messages, setMessages] = useState(messagesData);
  const inActionMessages = messages.filter((message) => message.inAction);

  const handleNewMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <View style={{ margin: 40 }}>
      {messages.map((message) => (
        <View style={{ margin: 5 }} key={message.id}>
          <Text>{message.inAction ? null : message.content}</Text>
        </View>
      ))}
      <MessageInputComponent
        inActionMessages={inActionMessages}
        onNewMessage={handleNewMessage}
      />
    </View>
  );
};

export default App;
