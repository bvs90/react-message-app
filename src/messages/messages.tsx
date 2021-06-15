import React from 'react';

import { fetchMessages } from '../message-data.service';

export function Messages(): React.ReactElement {
  const data = [];

  React.useEffect(() => {
    fetchMessages().then((messages) => {
      console.log(messages);
    });
  });

  return <div className="message-container"></div>;
}
