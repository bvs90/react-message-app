export interface MessageData {
  messageCount: number;
  messages: [content: string, senderUuid: string, sentAt: string, uuid: string];
}
