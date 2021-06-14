import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { App } from './app';

describe('App component', () => {
  it('should render a username', () => {
    render(<App lang="TypeScript" username="Ben" />);

    const el = screen.getByText(/Hi/);
    expect(el.textContent).toContain('Ben');
  });

  it('should render a language', () => {
    render(<App lang="TypeScript" username="Ben" />);

    const el = screen.getByText(/Hi/);
    expect(el.textContent).toContain('TypeScript');
  });
});
