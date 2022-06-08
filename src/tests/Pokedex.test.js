import React from 'react';
import { screen } from '@testing-library/react';
// import App from '../App';
import userEvent from '@testing-library/user-event';
import Pokedex from '../pages/Pokedex';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

const objetos = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};
// peguei essa dica do objeto e de passar as props do Mathues durante a mentoria do Humberto
describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ objetos }
    />);
    const pokedexHeading = screen.getByRole('heading',
      { name: /Encountered pokémons/i, level: 2 });

    expect(pokedexHeading).toBeInTheDocument();
  });
  test(
    'Teste se é exibido o próximo pokémon da lista quando o botão Próximo é clicado',
    () => {
      renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ objetos }
      />);
      const pokedexbutton = screen.getByRole('button', { name: /Próximo pokémon/i });
      pokemons.forEach((pokemon) => {
        expect(screen.getByTestId('next-pokemon', { name: pokemon }))
          .toBeInTheDocument();
        userEvent.click(pokedexbutton);
        // Dica do Saturnino, usar um for e a lógica DENTRO DELE
      });
      expect(pokedexbutton).toBeInTheDocument();
    },
  );
  test(
    'O primeiro pokémon da lista deve ser mostrado ao clicar no botão.',
    () => {
      renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ objetos }
      />);
      const firstPokemon = pokemons.some((pikachu) => pikachu.name === 'Pikachu');
      expect(firstPokemon).toBe(true);
    },
  );
  test('Teste se é mostrado apenas um pokémon por vez;',
    () => {
      renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ objetos }
      />);
      const perPAge = screen.getAllByRole('img', { name: /pikachu/i });
      expect(perPAge)
        .toHaveLength(1);
      /// Dica do Andre na mentoria
    });
});
