import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  TextField,
  Grid,
  Pagination,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  InputAdornment,
  Chip,
  Skeleton,
} from '@mui/material';
import { Search, FilterList, LocationOn } from '@mui/icons-material';
import { locationService } from '../services/locationService';
import { Location, LocationsResponse } from '../types/location';
import LocationCard from './LocationCard';

interface LocationListProps {
  refreshTrigger?: number;
}

const LocationList: React.FC<LocationListProps> = ({ refreshTrigger = 0 }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [nameFilter, setNameFilter] = useState('');
  const [codeFilter, setCodeFilter] = useState('');

  const fetchLocations = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response: LocationsResponse = await locationService.getLocations(
        page,
        nameFilter,
        codeFilter
      );
      
      setLocations(response.data);
      setTotalPages(response.meta.last_page);
      setTotalItems(response.meta.total);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error?.message || 
                          'Error al cargar las ubicaciones';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [page, nameFilter, codeFilter]);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  // Refrescar cuando cambie el trigger
  useEffect(() => {
    if (refreshTrigger > 0) {
      fetchLocations();
    }
  }, [refreshTrigger, fetchLocations]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNameFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(event.target.value);
    setPage(1); // Reset a primera página
  };

  const handleCodeFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCodeFilter(event.target.value);
    setPage(1); // Reset a primera página
  };

  const handleEditLocation = (location: Location) => {
    // TODO: Implementar edición
    console.log('Editar ubicación:', location);
  };

  // Loading skeleton
  const renderSkeleton = () => (
    <Grid container spacing={3}>
      {[...Array(6)].map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Paper sx={{ p: 0, overflow: 'hidden' }}>
            <Skeleton variant="rectangular" height={200} />
            <Box sx={{ p: 2 }}>
              <Skeleton variant="text" height={32} width="80%" />
              <Skeleton variant="text" height={24} width="40%" />
              <Skeleton variant="text" height={20} width="60%" />
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box>
      {/* Header con estadísticas */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LocationOn sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
            Ubicaciones Registradas
          </Typography>
        </Box>
        
        {!loading && (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip 
              label={`Total: ${totalItems}`} 
              color="primary" 
              variant="outlined" 
            />
            <Chip 
              label={`Página ${page} de ${totalPages}`} 
              color="secondary" 
              variant="outlined" 
            />
          </Box>
        )}
      </Box>

      {/* Filtros */}
      <Paper 
        elevation={2}
        sx={{ 
          p: 2.5, 
          mb: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FilterList sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Filtros de Búsqueda
          </Typography>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          flexWrap: 'wrap',
          '& .MuiTextField-root': {
            minWidth: { xs: '100%', sm: 250 },
          }
        }}>
          <TextField
            label="Buscar por nombre"
            placeholder="Ej: Office, Centro..."
            value={nameFilter}
            onChange={handleNameFilterChange}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                '&:hover': {
                  backgroundColor: 'white',
                }
              }
            }}
          />
          
          <TextField
            label="Buscar por código"
            placeholder="Ej: NYC, LAX..."
            value={codeFilter}
            onChange={handleCodeFilterChange}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                '&:hover': {
                  backgroundColor: 'white',
                }
              }
            }}
          />
        </Box>
      </Paper>

      {/* Error */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}

      {/* Loading */}
      {loading && renderSkeleton()}

      {/* Lista de ubicaciones */}
      {!loading && (
        <>
          <Grid container spacing={3}>
            {locations.map((location) => (
              <Grid item xs={12} sm={6} md={4} key={location.id}>
                <LocationCard 
                  location={location} 
                  onEdit={handleEditLocation}
                />
              </Grid>
            ))}
          </Grid>

          {/* Estado vacío */}
          {locations.length === 0 && (
            <Paper 
              sx={{ 
                p: 6, 
                textAlign: 'center',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
              }}
            >
              <LocationOn sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No se encontraron ubicaciones
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {nameFilter || codeFilter 
                  ? 'Intenta ajustar los filtros de búsqueda'
                  : 'Aún no hay ubicaciones registradas'
                }
              </Typography>
            </Paper>
          )}

          {/* Paginación */}
          {totalPages > 1 && (
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                mt: 4,
                mb: 2,
              }}
            >
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default LocationList;