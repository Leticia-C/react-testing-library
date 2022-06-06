import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <App.js />', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação:',
    () => {
      renderWithRouter(<App />);

      const linkHome = screen.getByRole('link', { name: 'Home' });
      const linkAbout = screen.getByRole('link', { name: 'About' });
      const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });

      expect(linkHome).toBeInTheDocument();
      expect(linkAbout).toBeInTheDocument();
      expect(linkFavorite).toBeInTheDocument();
    });
  test('Teste se ao clickar em Home a página é direcionada para a URL /', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);

    const moveToHome = screen.getByRole('heading',
      { name: 'Encountered pokémons' });

    expect(moveToHome).toBeInTheDocument();
  });
  test('Teste se ao clickar em About a página é direcionada para a URL /about', () => {
    renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: 'About' });

    userEvent.click(linkAbout);

    const testAbout = screen.getByRole('heading',
      { name: 'About Pokédex' });
    expect(linkAbout).toBeInTheDocument();
    expect(testAbout).toBeInTheDocument();
  });
  test('Teste se ao clickar em FavPoke a página é direcionada para /favorites', () => {
    renderWithRouter(<App />);

    const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });

    userEvent.click(linkFavorite);

    const testFav = screen.getByRole('heading',
      { name: 'Favorite pokémons' });
    expect(linkFavorite).toBeInTheDocument();
    expect(testFav).toBeInTheDocument();
  });
  test('Teste se a página Not Found é carregada ao entrar em uma URL desconhecida.',
    () => {
      const history = createMemoryHistory();
      render(
        <Router history={ history }>
          <App />
        </Router>,
      );

      history.push('/pagenotfound');

      renderWithRouter(<App />);

      const notFoundTitle = screen.getByText('Page requested not found');

      expect(notFoundTitle).toBeInTheDocument();
    });
});
