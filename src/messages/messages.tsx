import React from 'react';

import { fetchMessages } from '../message-data.service';
import { Message } from '../message/message';

export function Messages(): React.ReactElement {
  const [messages, setMessages] = React.useState([]);
  const [messageCount, setMessageCount] = React.useState(0);
  const [fetchState, setFetchState] = React.useState({
    offset: 0,
    sortDirection: 'asc'
  });

  const pageSize = 5;

  React.useEffect(() => {
    const { offset, sortDirection } = fetchState;

    fetchMessages(offset, sortDirection).then((messageData) => {
      // Update the total number of messages
      setMessageCount(messageData.messageCount);
      setMessages([...messages, ...messageData.messages]);
    });
  }, [fetchState]);

  /**
   * Determine if the component should fetch the next page of data based on the scroll position.
   */
  function checkScrollPosition(): void {
    // check if there are pages remaining to fetch otherwise return
    if (fetchState.offset + 2 * pageSize > messageCount) {
      return;
    }

    const containerEl: HTMLElement = document.querySelector(
      '.message-list-container'
    );
    const listEl: HTMLElement = document.querySelector('.message-list');

    if (containerEl.scrollTop >= (listEl.clientHeight / 100) * 40) {
      setFetchState({
        ...fetchState,
        ...{ offset: fetchState.offset + 1 }
      });
    }
  }

  /**
   * Deletes a message from the view.
   * @param messageId  The ID of the message to delete.
   */
  function deleteMessage(messageId: string): void {
    const messagesCopy = [...messages].filter((message) => {
      return message.uuid !== messageId;
    });

    setMessages(messagesCopy);
  }

  /**
   * Re-fetches the messages per
   * @param direction  The chosen sort direction.
   */
  function sortMessages(direction: string): void {
    setMessages([]);
    setFetchState({
      ...fetchState,
      ...{ offset: 0, sortDirection: direction }
    });
  }

  return (
    <div className="message-container">
      <h1>Message App</h1>
      <button
        className="button-primary"
        disabled={fetchState.sortDirection === 'asc'}
        onClick={() => sortMessages('asc')}
      >
        Sort Asc
      </button>
      <button
        className="button-primary"
        disabled={fetchState.sortDirection === 'desc'}
        onClick={() => sortMessages('desc')}
      >
        Sort Desc
      </button>

      <div
        className="message-list-container"
        onScroll={() => checkScrollPosition()}
      >
        <ul className="message-list">
          {messages.length > 0 ? (
            messages.map((message) => {
              return (
                <Message
                  key={message.uuid}
                  {...message}
                  deleteMessage={deleteMessage}
                />
              );
            })
          ) : (
            <div>Loading initial messages..</div>
          )}
        </ul>
      </div>
    </div>
  );
}
