import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { PokemonDetails } from '../pages';
import pokemons from '../data';

describe('Teste o componente <PokemonDetails.js />', () => {
  beforeEach(() => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ {} }
      match={ { params: { id: '25' } } }
      pokemons={ pokemons }

    />);
  });
  it('Testa se as informações detalhadas do pokémon selecionado são mostradas ', () => {
    const pikachu = screen.getByText(/pikachu details/i);
    expect(pikachu).toBeInTheDocument();
    const heading = screen.getByRole('heading', {
      name: /summary/i, level: 2,
    });
    expect(heading).toBeInTheDocument();
  });
  it('Testa se as informações detalhadas do pokémon selecionado são mostradas ', () => {
    const heading = screen.getByRole('heading', {
      name: /Game Locations of Pikachu/i,
    });
    expect(heading).toBeInTheDocument();
    const location = screen.getAllByAltText(/location/i);
    expect(location).toHaveLength(2);
    const imgLocation = screen.getAllByRole('img', { name: /pikachu location/i });
    expect(imgLocation).toHaveLength(2);
    const summary = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make them/i,
    );
    expect(summary).toBeInTheDocument();
    expect(imgLocation[0].src).toBe('https://pwo-wiki.info/images/4/47/Viridian_Forest.gif');
    expect(imgLocation[1].src).toBe('https://pwo-wiki.info/images/5/5b/Pp.gif');
    // tive ajuda nesse requisito
  });
  it('Verifica se o usuário pode favoritar um pokemon nessa página', () => {
    const favoriteInput = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favoriteInput).toBeInTheDocument();
  });
});
