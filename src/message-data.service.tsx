// import './messages.json';
import { IMessage } from './message/message.interface';

export function fetchMessages(): Promise<IMessage[]> {
  return fetch('messages.json', {
    headers: {
      'Content-Type': 'applicaton/json',
      'Accept': 'application/json'
    }
  }).then((response) => {
    return response.json();
  });
}
