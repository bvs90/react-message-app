import React from 'react';

interface messageProps {
  content: string;
  sentAt: string;
  senderUuid: string;
  uuid: string;
  deleteMessage: {
    (messageId: string): void;
  };
}

export function Message({
  content,
  sentAt,
  senderUuid,
  uuid,
  deleteMessage
}: messageProps): React.ReactElement {
  function formatMessageDate(timestamp: string): string {
    const dateFormat: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      year: 'numeric',
      day: '2-digit'
    };

    const timeFormat: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };

    const formattedDate = new Date(timestamp).toLocaleDateString(
      'en-US',
      dateFormat
    );

    const formattedTime = new Date(timestamp).toLocaleTimeString(
      'en-US',
      timeFormat
    );

    return `${formattedDate} at ${formattedTime}`;
  }

  return (
    <li className="message">
      <div className="message-date">Sent At: {formatMessageDate(sentAt)}</div>
      <div className="message-content">Message: {content}</div>
      <div className="message-sender">Sender: {senderUuid}</div>
      <button onClick={() => deleteMessage(uuid)}>Delete</button>
    </li>
  );
}
