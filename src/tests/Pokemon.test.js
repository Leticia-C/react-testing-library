import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

// const { averageWeight, id, image, name, type } = pokemons;
// const { measurementUnit, value } = averageWeight;

test('Teste se é renderizado um card com as informações de determinado pokémon:',
  () => {
    renderWithRouter(<Pokemon
      pokemons={ pokemons }
    />);
    const buttonDragon = screen.getByRole('button',
      { name: /Dragon/i });
    userEvent.click(buttonDragon);
    const dragonair = screen.getByAltText(/Dragonair/i);
    const summary = screen.getByText(/They say that if it emits an aura from its whole/i);
    expect(dragonair).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
  });

/*
Teste se é renderizado um card com as informações de determinado pokémon:
O nome correto do pokémon deve ser mostrado na tela;

O tipo correto do pokémon deve ser mostrado na tela;

O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do pokémon e sua unidade de medida;

A imagem do pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon.
O nome correto do pokémon deve ser mostrado na tela;

O tipo correto do pokémon deve ser mostrado na tela;

O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do pokémon e sua unidade de medida;

A imagem do pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon. */
