import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../pages/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import pokemon from '../data';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test(
    'Teste se é exibida na tela a mensagem No favorite pokemon found',
    () => {
      renderWithRouter(<FavoritePokemons />);
      const withoutFav = screen.getByText(/no favorite pokemon found/i);
      expect(withoutFav).toBeInTheDocument();
    },
  );
  test(
    'Teste se são exibidos os cards de pokemons favoritos',
    () => {
      renderWithRouter(<FavoritePokemons pokemons={ pokemon } />);
      const favOne = screen.getByRole('img', { name: /charmander sprite/i });
      const favTwo = screen.getByRole('img', { name: /alakazam sprite/i });

      expect(screen.queryByRole(('img',
      { name: /pikachu sprite/i }))).not.toBeInTheDocument();
      // tive ajuda do querido Daniel Farias
      expect(favOne).toBeInTheDocument();
      expect(favTwo).toBeInTheDocument();
    },
  );
});
