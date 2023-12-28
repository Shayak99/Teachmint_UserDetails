import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { UserProfile } from '../../pages/UserProfile';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        phone: '1234567890',
        company: {
          catchPhrase: 'Hello World!',
        },
        address: {
          street: '123 Street',
          city: 'City',
          zipcode: '12345',
        },
      }),
  })
);

describe('UserProfile component', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders user profile data', async () => {
    render(
      <MemoryRouter initialEntries={['/user/1']}>
        <Route path="/user/:userId">
          <UserProfile />
        </Route>
      </MemoryRouter>
    );

    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeInTheDocument();
    await screen.findByText('Name: John Doe');

    expect(screen.getByText('Name: John Doe')).toBeInTheDocument();
    expect(screen.getByText('Username: johndoe')).toBeInTheDocument();
  });

  it('handles post click and displays popup', async () => {
    render(
      <MemoryRouter initialEntries={['/user/1']}>
        <Route path="/user/:userId">
          <UserProfile />
        </Route>
      </MemoryRouter>
    );

    await screen.findByText('Name: John Doe');

    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              id: 1,
              title: 'Post Title',
              body: 'Post Body',
            },
          ]),
      })
    );

    const postCard = screen.getByText('Title: Post Title').closest('.card');
    fireEvent.click(postCard);

    expect(screen.getByText('Title: Post Title')).toBeInTheDocument();
    expect(screen.getByText('Body: Post Body')).toBeInTheDocument();

    const closeBtn = screen.getByText('×');
    fireEvent.click(closeBtn);

    expect(screen.queryByText('Title: Post Title')).toBeNull();
    expect(screen.queryByText('Body: Post Body')).toBeNull();
  });
});
