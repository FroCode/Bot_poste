const useChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isWelcomePage, setIsWelcomePage] = useState(true);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
  
    const toggleChatbox = () => {
      setIsOpen((prev) => !prev);
      if (!isOpen) {
        setIsWelcomePage(true);
        setMessages([]);
      }
    };
  
    const startChat = () => {
      setIsWelcomePage(false);
      setMessages([]);
    };
  
    const sendMessage = (message) => {
      if (message.trim()) {
        const currentTime = new Date().toLocaleTimeString();
        setMessages((prev) => [
          ...prev,
          { sender: "user", text: message, time: currentTime },
          { sender: "bot", text: "Thanks for your message. We'll respond shortly.", time: currentTime },
        ]);
      }
    };
  
    return {
      isOpen,
      isWelcomePage,
      messages,
      newMessage,
      toggleChatbox,
      startChat,
      setNewMessage,
      sendMessage,
    };
  };
  