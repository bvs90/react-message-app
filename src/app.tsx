import React from "react";

interface AppProps {
  lang: string;
  username: string;
}

export function App({ lang, username }: AppProps): React.ReactElement {
  return (
    <h1>
      Hi {username}, welcome to {lang}!
    </h1>
  );
}
