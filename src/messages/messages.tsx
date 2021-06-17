import React from 'react';

import { fetchMessages } from '../message-data.service';
import { Message } from '../message/message';
// import { IMessage } from '../message/message.interface';

export function Messages(): React.ReactElement {
  const [messages, setMessages] = React.useState([]);
  const [messageCount, setMessageCount] = React.useState(0);
  // const [offset, setOffset] = React.useState(0);
  // const [sortDirection, setSortDirection] = React.useState('asc');

  const [fetchState, setFetchState] = React.useState({
    offset: 0,
    sortDirection: 'asc'
  });

  const pageSize = 5;

  // const messageListRef = React.useRef();

  React.useEffect(() => {
    // console.log('Fetch new data: ', offset);

    // sort direction changes need to clear the current messages
    // clear the offset so we can create a new window, or keep the current window if scrolling had already occured
    // fetch messages with the correct sorting direction
    const { offset, sortDirection } = fetchState;

    fetchMessages(offset, sortDirection).then((messageData) => {
      // Update the total number of messages in case there were duplicates
      setMessageCount(messageData.messageCount);
      setMessages(messages.concat(messageData.messages));
    });
  }, [fetchState]);

  function checkScrollPosition(event: React.UIEvent<HTMLElement, UIEvent>) {
    event.preventDefault();

    // check if there are pages remaining to fetch otherwise return
    // console.log(
    //   offset + 2 * pageSize > messageCount,
    //   offset + 2,
    //   pageSize,
    //   messageCount
    // );
    if (fetchState.offset + 2 * pageSize > messageCount) {
      return;
    }

    const containerEl: HTMLElement = document.querySelector(
      '.message-container'
    );
    const listEl: HTMLElement = document.querySelector('.message-list');

    if (
      containerEl.clientHeight + containerEl.scrollTop >=
      (listEl.clientHeight / 100) * 90
    ) {
      setFetchState({
        offset: fetchState.offset + 1,
        sortDirection: fetchState.sortDirection
      });
    }
  }

  function deleteMessage(messageId: string): void {
    const messagesCopy = [...messages].filter((message) => {
      return message.uuid !== messageId;
    });

    setMessages(messagesCopy);
  }

  function sortMessages(direction: string) {
    setMessages([]);
    setFetchState({ offset: 0, sortDirection: direction });
  }

  return (
    <div
      className="message-container"
      onScroll={(event) => checkScrollPosition(event)}
    >
      <button onClick={() => sortMessages('asc')}>Sort Ascending</button>
      <button onClick={() => sortMessages('desc')}>Sort Descending</button>

      <ul
        className="message-list"
        // ref={messageListRef}
      >
        {messages.length > 0 &&
          messages.map((message) => {
            return (
              <Message
                key={message.uuid}
                {...message}
                deleteMessage={deleteMessage}
              />
            );
          })}
      </ul>
    </div>
  );
}
