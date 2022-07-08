import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../pages/Pokedex';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

const isPokemonFavoriteById = {
  25: true,
};
// peguei essa dica do objeto e de passar as props do Matheus durante a mentoria do Humberto
describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ false }
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
        isPokemonFavoriteById={ false }
      />);
      const pokedexbutton = screen.getByRole('button', { name: /Próximo pokémon/i });
      pokemons.forEach((pokemon) => {
        expect(screen.getByTestId('next-pokemon', { name: pokemon }))
          .toBeInTheDocument();
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
        isPokemonFavoriteById={ false }
      />);
      const firstPokemon = pokemons.some((pikachu) => pikachu.name === 'Pikachu');
      expect(firstPokemon).toBe(true);
    },
  );
  test('Teste se é mostrado apenas um pokémon por vez;',
    () => {
      renderWithRouter(<App
        pokemons={ pokemons }
        // isPokemonFavoriteById={ isPokemonFavoriteById }
        //  isFavorite={ isPokemonFavoriteById[pokemons[0].id[0]] }
      />);
      const perPAge = screen.getAllByRole('img', { name: /pikachu/i });
      expect(perPAge)
        .toHaveLength(1);
      const name = screen.getAllByTestId('pokemon-name');
      expect(name).toHaveLength(1);
      /// Dica do Andre na mentoria
    });
  test('Teste se a Pokédex tem os botões de filtro:;',
    () => {
      renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ false }
      />);
      const AllButtons = 7;
      const getTypeWithId = screen.getAllByTestId('pokemon-type-button');
      getTypeWithId.map((type) => expect(type).toBeInTheDocument());
      expect(getTypeWithId).toHaveLength(AllButtons);
      const buttonAll = screen.getByRole('button',
        { name: /All/i });
      expect(buttonAll).toBeInTheDocument();
      const nextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
      expect(nextPokemon).toBeInTheDocument();
      const buttonElectric = screen.getByRole('button',
        { name: /Electric/i });
      expect(buttonElectric).toBeInTheDocument();
      userEvent.click(buttonElectric);
      const pikachu = screen.getByText(/Pikachu/i);
      expect(pikachu).toBeInTheDocument();
      expect(buttonAll).toBeInTheDocument();

      const buttonFire = screen.getByRole('button',
        { name: /Fire/i });
      userEvent.click(buttonFire);
      const charmander = screen.getByText(/Charmander/i);
      expect(charmander).toBeInTheDocument();
      expect(buttonAll).toBeInTheDocument();
      userEvent.click(nextPokemon);
      const rapidash = screen.getByText(/Rapidash/i);
      expect(rapidash).toBeInTheDocument();
      expect(buttonAll).toBeInTheDocument();

      const buttonBug = screen.getByRole('button',
        { name: /Bug/i });
      userEvent.click(buttonBug);
      const caterpie = screen.getByText(/Caterpie/i);
      expect(caterpie).toBeInTheDocument();
      expect(buttonAll).toBeInTheDocument();

      const buttonPoison = screen.getByRole('button',
        { name: /Poison/i });
      userEvent.click(buttonPoison);
      const ekans = screen.getByText(/Ekans/i);
      expect(ekans).toBeInTheDocument();
      expect(buttonAll).toBeInTheDocument();

      const buttonNormal = screen.getByRole('button',
        { name: /Normal/i });
      userEvent.click(buttonNormal);
      const snorlax = screen.getByText(/Snorlax/i);
      expect(snorlax).toBeInTheDocument();
      expect(buttonAll).toBeInTheDocument();

      const buttonDragon = screen.getByRole('button',
        { name: /Dragon/i });
      userEvent.click(buttonDragon);
      const dragonair = screen.getByText(/Dragonair/i);
      expect(dragonair).toBeInTheDocument();
      expect(buttonAll).toBeInTheDocument();

      const buttonPsychic = screen.getByRole('button',
        { name: /Psychic/i });
      userEvent.click(buttonPsychic);
      const alakazam = screen.getByText(/Alakazam/i);
      expect(alakazam).toBeInTheDocument();
      expect(buttonAll).toBeInTheDocument();
      userEvent.click(nextPokemon);
      const mew = screen.getByText(/Mew/i);
      expect(mew).toBeInTheDocument();
      expect(buttonAll).toBeInTheDocument();
      userEvent.click(buttonAll);
      expect(pikachu).toBeInTheDocument();

      expect(buttonAll).toBeInTheDocument();
      expect(buttonPsychic).toBeInTheDocument();
      expect(buttonFire).toBeInTheDocument();
      expect(buttonBug).toBeInTheDocument();
      expect(buttonPoison).toBeInTheDocument();
      expect(buttonNormal).toBeInTheDocument();
      expect(buttonDragon).toBeInTheDocument();
    });
  test('Teste se a Pokédex contém um botão para resetar o filtro:;',
    () => {
      renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);
      const buttonNormal = screen.getByRole('button',
        { name: /Normal/i });
      userEvent.click(buttonNormal);
      const snorlax = screen.getByText(/Snorlax/i);
      expect(snorlax).toBeInTheDocument();
      const buttonAll = screen.getByRole('button',
        { name: /All/i });
      expect(buttonAll).toBeInTheDocument();
      userEvent.click(buttonAll);
      const pikachu = screen.getByText(/Pikachu/i);
      expect(pikachu).toBeInTheDocument();
      expect(buttonAll).toBeInTheDocument();
    });
});
