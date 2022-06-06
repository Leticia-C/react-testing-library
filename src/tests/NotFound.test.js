import React from 'react';
import { screen, render } from '@testing-library/react';
// import App from '../App';
import NotFound from '../pages/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test('', () => {
    render(<NotFound />);
    const pokedexHeading = screen.getByRole('heading', { level: 2 });
    const textPokedexHeading = screen.getByText(/Page requested not found/i);

    expect(pokedexHeading).toBeInTheDocument();
    expect(textPokedexHeading).toBeInTheDocument();
  });
  test('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif  ', () => {
    render(<NotFound />);
    const pokedexImg = screen.getByRole('img',
      { name: /Pikachu crying because the page requested was not found/i });

    expect(pokedexImg).toBeInTheDocument();
    expect(pokedexImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
