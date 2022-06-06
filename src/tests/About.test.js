import React from 'react';
import { screen, render } from '@testing-library/react';
// import App from '../App';
import About from '../pages/About';
// import renderWithRouter from '../types/renderWithRouter';

describe('Teste o componente <About.js />', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    render(<About />);
    const pokeInfo = screen.getByText(/This application simulates a Pokédex/i);

    expect(pokeInfo).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const pokedexHeading = screen.getByRole('heading',
      { name: 'About Pokédex', level: 2 });

    expect(pokedexHeading).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);

    const pokedexP = screen.getAllByText(/Pokédex/i);
    //  expect(pokedexP).toBeInTheDocument();
    expect(pokedexP).toHaveLength(2);
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.', () => {
    render(<About />);
    const pokedexImg = screen.getByRole('img');

    expect(pokedexImg).toBeInTheDocument();
    expect(pokedexImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
