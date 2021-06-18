import { IMessage } from './message/message.interface';

interface MessageData {
  messageCount: number;
  messages: IMessage[];
}

export function fetchMessages(
  offset: number,
  sortDir: string
): Promise<MessageData> {
  const pageSize = 5;

  return fetch('messages.json', {
    headers: {
      'Content-Type': 'applicaton/json',
      'Accept': 'application/json'
    }
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const pageWindow = pageSize * offset;
      const { messages } = data;
      // sort the response accoring to the direction specified
      const sortedMessages = sortMessages(sortDir, messages);
      const deDupedMessages = deDupeMessages(sortedMessages);

      const messagesToSend = deDupedMessages.slice(
        pageWindow,
        pageWindow + pageSize
      );

      const messagesData = {
        messageCount: deDupedMessages.length,
        messages: messagesToSend
      };

      return messagesData;
    })
    .then((messageData) => {
      // Simulate a network request by delaying the response
      return new Promise((resolve) => {
        setTimeout(() => resolve(messageData), 300);
      });
    });
}

/**
 * Simple de-duplication of sorted messages by content and UUID
 * @param  messages
 * @return
 */
function deDupeMessages(messages: IMessage[]) {
  return messages.filter((message, index, messages) => {
    const previousMessage = messages[index - 1];
    let isDuplicate = false;

    if (previousMessage) {
      const hasSameContent = message.content === previousMessage.content;
      const hasSameUuid = message.uuid === previousMessage.uuid;
      isDuplicate = hasSameContent && hasSameUuid;
    }

    return !isDuplicate;
  });
}

/**
 * Sort all the messages by the sentAt property in the requested direction
 * @param   direction The chosen sort direction, either 'asc or 'desc'.
 * @param   messages  The messages to be sorted.
 * @return            An array of messages.
 */
function sortMessages(direction: string, messages: IMessage[]) {
  return messages.sort((messageA, messageB) => {
    const firstMessage = direction === 'asc' ? messageA : messageB;
    const secondMessage = direction === 'asc' ? messageB : messageA;

    return firstMessage.sentAt > secondMessage.sentAt
      ? 1
      : firstMessage.sentAt === secondMessage.sentAt
      ? 0
      : -1;
  });
}
