import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { FavoritePokemons } from '../pages';
import pokemons from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const name = screen.getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    const pikachu = screen.getByAltText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();

    const type = screen.getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();
    expect(type).toHaveTextContent(/Electric/);

    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toBeInTheDocument();
    expect(weight).toHaveTextContent('6.0 kg');

    const nameImg = screen.getByRole('img', { name: /Pikachu/i });
    expect(nameImg).toBeInTheDocument();
    expect(nameImg.src).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png');
  });
  it('Teste se o card do pokémon indicado na Pokédex contém um link de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });

    userEvent.click(details);

    expect(history.location.pathname).toBe('/pokemons/25');
  });
  test('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const favorite = screen.queryByRole('img',
      { name: /Pikachu is marked as favorite/i });

    expect(favorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
