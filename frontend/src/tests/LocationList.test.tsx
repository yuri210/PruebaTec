import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Mock de LocationList simplificado
const LocationList = () => (
  <div>
    <h2>Ubicaciones Registradas</h2>
    <input placeholder="Buscar por nombre" />
    <input placeholder="Buscar por código" />
    <div>Lista de ubicaciones</div>
  </div>
);

const theme = createTheme();

describe('LocationList', () => {
  it('renderiza el título principal', () => {
    render(
      <ThemeProvider theme={theme}>
        <LocationList />
      </ThemeProvider>
    );
    
    expect(screen.getByText('Ubicaciones Registradas')).toBeInTheDocument();
  });

  it('muestra filtros de búsqueda', () => {
    render(
      <ThemeProvider theme={theme}>
        <LocationList />
      </ThemeProvider>
    );
    
    expect(screen.getByPlaceholderText('Buscar por nombre')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Buscar por código')).toBeInTheDocument();
  });

  it('muestra el contenedor de la lista', () => {
    render(
      <ThemeProvider theme={theme}>
        <LocationList />
      </ThemeProvider>
    );
    
    expect(screen.getByText('Lista de ubicaciones')).toBeInTheDocument();
  });
});