import { MessageData } from './message/message.interface';

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
      const { messageCount, messages } = data;
      // sort the response accoring to the direction specified
      const sortedMessages = sortMessages(sortDir, messages);

      // take the 5 messages that are required - look at the offset

      console.log(pageWindow);

      const messagesToSend = sortedMessages.slice(
        pageWindow,
        pageWindow + pageSize
      );

      console.log('messageToSend: ', messagesToSend);

      // deDupe messagesToSend
      // track if any are duplicates and pull the next one
      // update the total number of messages in the response based on de-deduplication?
      // console.log(messagesToSend);

      // Sort the resposne according to dirtection

      const messagesData = {
        messageCount,
        messages: messagesToSend
      };

      return messagesData;
    })
    .then((messageData) => {
      // Simulate a network request by delaying the response
      return new Promise((resolve) => {
        setTimeout(() => resolve(messageData), 3000);
      });
    });
}

function sortMessages(direction: string, messages) {
  if (direction === 'asc') {
    return messages.sort((messageA, messageB) => {
      return messageA.sentAt > messageB.sentAt
        ? 1
        : messageA.sentAt === messageB.sentAt
        ? 0
        : -1;
    });
  } else {
    return messages.sort((messageA, messageB) => {
      return messageA.sentAt < messageB.sentAt
        ? 1
        : messageA.sentAt === messageB.sentAt
        ? 0
        : -1;
    });
  }
}
// else {
// }

// return;
// }
