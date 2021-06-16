import React from 'react';

import { fetchMessages } from '../message-data.service';
import { Message } from '../message/message';
import { IMessage } from '../message/message.interface';

export function Messages(): React.ReactElement {
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    fetchMessages().then((messageData) => {
      // console.log(messageData);
      setMessages(messageData);
    });
  }, []);

  function deleteMessage(messageId: string) {
    // console.log('deleting message: ', messageId);

    const messagesCopy = [...messages].filter((message) => {
      return message.senderUuid !== messageId;
    });

    setMessages(messagesCopy);
  }

  return (
    <div className="message-container">
      <ul>
        {messages.length > 0 &&
          messages.map((message) => {
            return (
              <Message
                key={message.senderUuid}
                {...message}
                deleteMessage={deleteMessage}
              />
            );
          })}
      </ul>
    </div>
  );
}
