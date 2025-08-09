import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LocationCard from '../components/LocationCard';
import { Location } from '../types/location';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

const mockLocation: Location = {
  id: 1,
  code: 'NYC001',
  name: 'Oficina Nueva York',
  image: 'https://example.com/image.jpg',
  created_at: '2024-01-15T10:30:00.000000Z',
  updated_at: '2024-01-15T10:30:00.000000Z'
};

describe('LocationCard', () => {
  it('renderiza correctamente la información de la ubicación', () => {
    renderWithTheme(<LocationCard location={mockLocation} />);
    
    expect(screen.getByText('Oficina Nueva York')).toBeInTheDocument();
    expect(screen.getByText('NYC001')).toBeInTheDocument();
    expect(screen.getByText(/Creado:/)).toBeInTheDocument();
  });

  it('muestra la imagen cuando está disponible', () => {
    renderWithTheme(<LocationCard location={mockLocation} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(image).toHaveAttribute('alt', 'Oficina Nueva York');
  });

  it('no muestra imagen cuando no está disponible', () => {
    const locationWithoutImage = { ...mockLocation, image: undefined };
    renderWithTheme(<LocationCard location={locationWithoutImage} />);
    
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('muestra botón de editar cuando se proporciona onEdit', () => {
    const mockOnEdit = jest.fn();
    renderWithTheme(<LocationCard location={mockLocation} onEdit={mockOnEdit} />);
    
    const editButton = screen.getByRole('button', { name: /editar ubicación/i });
    expect(editButton).toBeInTheDocument();
  });

  it('llama a onEdit cuando se hace clic en el botón de editar', () => {
    const mockOnEdit = jest.fn();
    renderWithTheme(<LocationCard location={mockLocation} onEdit={mockOnEdit} />);
    
    const editButton = screen.getByRole('button', { name: /editar ubicación/i });
    fireEvent.click(editButton);
    
    expect(mockOnEdit).toHaveBeenCalledWith(mockLocation);
  });

  it('no muestra botón de editar cuando no se proporciona onEdit', () => {
    renderWithTheme(<LocationCard location={mockLocation} />);
    
    expect(screen.queryByRole('button', { name: /editar ubicación/i })).not.toBeInTheDocument();
  });

  it('formatea correctamente las fechas', () => {
    renderWithTheme(<LocationCard location={mockLocation} />);
    
    expect(screen.getByText(/Creado: 15 ene 2024/)).toBeInTheDocument();
  });

  it('muestra fecha de actualización cuando es diferente a la creación', () => {
    const locationUpdated = {
      ...mockLocation,
      updated_at: '2024-01-16T10:30:00.000000Z'
    };
    
    renderWithTheme(<LocationCard location={locationUpdated} />);
    
    expect(screen.getByText(/Actualizado: 16 ene 2024/)).toBeInTheDocument();
  });
});