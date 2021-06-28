import React from 'react';

import { fetchMessages } from '../message-data.service';
import { Message } from '../message/message';

export function Messages(): React.ReactElement {
  const [messages, setMessages] = React.useState([]);
  const [messageCount, setMessageCount] = React.useState(0);
  const [fetchState, setFetchState] = React.useState({
    isLoading: false,
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
      setFetchState({ ...fetchState, ...{ isLoading: false } });
    });
  }, [fetchState.offset, fetchState.sortDirection]);

  /**
   * Determine if the component should fetch the next page of data based on the scroll position.
   */
  function checkScrollPosition(): void {
    if (
      fetchState.isLoading ||
      (fetchState.offset + 2) * pageSize > messageCount
    ) {
      return;
    } else {
      const containerEl: HTMLElement = document.querySelector(
        '.message-list-container'
      );
      const listEl: HTMLElement = document.querySelector('.message-list');

      if (
        containerEl.scrollTop + containerEl.clientHeight >=
        (listEl.clientHeight / 100) * 90
      ) {
        setFetchState({
          ...fetchState,
          ...{ offset: (fetchState.offset += 1), isLoading: true }
        });
      }
    }
  }

  /**
   * Deletes a message from the view.
   * @param  messageId  The ID of the message to delete.
   */
  function deleteMessage(messageId: string): void {
    const messagesCopy = [...messages].filter((message) => {
      return message.uuid !== messageId;
    });

    setMessages(messagesCopy);
  }

  /**
   * Re-fetches the messages per the passed in direction.
   * @param  direction  The chosen sort direction.
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
        <ul className="message-list" onScroll={() => checkScrollPosition()}>
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
            <div>There are no messages to display</div>
          )}
        </ul>
      </div>
    </div>
  );
}
