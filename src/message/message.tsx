import React from 'react';

interface messageProps {
  content: string;
  sentAt: string;
  senderUuid: string;
  deleteMessage: {
    (messageId: string): void;
  };
}

export function Message({
  content,
  sentAt,
  senderUuid,
  deleteMessage
}: messageProps): React.ReactElement {
  return (
    <li className="message">
      <div className="message-date">{sentAt}</div>
      <div className="message-content">{content}</div>
      <button onClick={() => deleteMessage(senderUuid)}>Delete</button>
    </li>
  );
}
