import { render } from '@testing-library/react';

import App from './app';

// moviesApi reads import.meta.env, which Jest cannot parse, and it calls TMDB
// over the network — neither belongs in a unit test.
jest.mock('../api/moviesApi', () => ({
  fetchMovies: jest
    .fn()
    .mockResolvedValue([
      { id: 1, title: 'Project Hail Mary', vote_average: 8.6 },
    ]),
}));

describe('App', () => {
  it('should render the movies list', async () => {
    const { findByText } = render(<App />);

    expect(await findByText('Project Hail Mary')).toBeTruthy();
  });
});
