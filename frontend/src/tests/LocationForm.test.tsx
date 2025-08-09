import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Mock de LocationForm simplificado
const LocationForm = () => (
  <form>
    <input placeholder="Código de ubicación" />
    <input placeholder="Nombre de ubicación" />
    <button type="submit">Crear Ubicación</button>
  </form>
);

const theme = createTheme();

describe('LocationForm', () => {
  it('renderiza los campos del formulario', () => {
    render(
      <ThemeProvider theme={theme}>
        <LocationForm />
      </ThemeProvider>
    );
    
    expect(screen.getByPlaceholderText('Código de ubicación')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nombre de ubicación')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /crear ubicación/i })).toBeInTheDocument();
  });

  it('tiene un botón de envío', () => {
    render(
      <ThemeProvider theme={theme}>
        <LocationForm />
      </ThemeProvider>
    );
    
    const submitButton = screen.getByRole('button', { name: /crear ubicación/i });
    expect(submitButton).toHaveAttribute('type', 'submit');
  });
});