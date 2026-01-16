import Talk from "talkjs";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import "../../App.css";

export default function Chat() {
  const chatRef = useRef(null);
  const sessionRef = useRef(null);
  const [searchParams] = useSearchParams();

  const conversationId = "conv_" + searchParams.get("conv_id");
  const recieverId = searchParams.get("id");
  const recieverName = searchParams.get("name");
  const recieverRole = searchParams.get("role");

  useEffect(() => {
    if (!recieverId) return;

    let mounted = true;

    Talk.ready.then(() => {
      if (!mounted) return;

      const sender = new Talk.User({
        id: localStorage.getItem("userId"),
        name: localStorage.getItem("name"),
        role: localStorage.getItem("role"),
      });

      sessionRef.current = new Talk.Session({
        appId: "tFsuVWIU",
        me: sender,
      });

      const recieverUser = new Talk.User({
        id: `reciever_${recieverId}`,
        name: recieverName || "Receiver",
        role: recieverRole || "user",
      });

      const conversation =
        sessionRef.current.getOrCreateConversation(conversationId);

      conversation.setParticipant(sender);
      conversation.setParticipant(recieverUser);

      const chatbox = sessionRef.current.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(chatRef.current);
    });

    return () => {
      mounted = false;
      sessionRef.current?.destroy();
    };
  }, [recieverId, recieverName]);

  return (
    <div className="talkjs-fullscreen">
      <div ref={chatRef} className="talkjs-container" />
    </div>
  );
}
