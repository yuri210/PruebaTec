import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Chip,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Pagination,
} from '@mui/material';
import {
  Business,
  Add,
  Close,
  GitHub,
  Api,
  LocationOn,
  Search,
} from '@mui/icons-material';
import { locationService } from './services/locationService';
import { Location, LocationFormData } from './types/location';

// Tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff5983',
      dark: '#9a0036',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

function App() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nameFilter, setNameFilter] = useState('');
  const [codeFilter, setCodeFilter] = useState('');

  // Formulario
  const [formData, setFormData] = useState<LocationFormData>({
    code: '',
    name: '',
    image: '',
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchLocations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await locationService.getLocations(page, nameFilter, codeFilter);
      setLocations(response.data);
      setTotalPages(response.meta.last_page);
    } catch (err: any) {
      setError('Error al cargar las ubicaciones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, [page, nameFilter, codeFilter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    try {
      await locationService.createLocation(formData);
      setFormData({ code: '', name: '', image: '' });
      setOpenForm(false);
      fetchLocations();
    } catch (err: any) {
      setFormError(err.response?.data?.error?.message || 'Error al crear la ubicación');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* App Bar */}
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Business sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Sistema de Gestión de Ubicaciones
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip 
              icon={<Api />}
              label="Laravel API"
              variant="outlined"
              sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
            />
            <Chip 
              icon={<GitHub />}
              label="React + TS"
              variant="outlined"
              sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Contenido principal */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{
              background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            🏢 Gestión de Ubicaciones
          </Typography>
          
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ mb: 2 }}
          >
            Prueba Técnica Full Stack 2025 - Laravel + React + TypeScript
          </Typography>
        </Box>

        {/* Filtros */}
        <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Buscar por nombre"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />,
            }}
          />
          <TextField
            label="Buscar por código"
            value={codeFilter}
            onChange={(e) => setCodeFilter(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />,
            }}
          />
        </Box>

        {/* Error */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Loading */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Lista de ubicaciones */}
        {!loading && (
          <>
            <Grid container spacing={3}>
              {locations.map((location) => (
                <Grid item xs={12} sm={6} md={4} key={location.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {location.image && (
                      <CardMedia
                        component="img"
                        height="200"
                        image={location.image}
                        alt={location.name}
                      />
                    )}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h2" gutterBottom>
                        {location.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationOn color="action" sx={{ fontSize: 18, mr: 0.5 }} />
                        <Chip label={location.code} size="small" color="primary" />
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        Creado: {new Date(location.created_at).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Paginación */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, value) => setPage(value)}
                  color="primary"
                />
              </Box>
            )}
          </>
        )}

        {/* FAB para agregar */}
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setOpenForm(true)}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
          }}
        >
          <Add />
        </Fab>

        {/* Dialog para formulario */}
        <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Nueva Ubicación
            <IconButton onClick={() => setOpenForm(false)}>
              <Close />
            </IconButton>
          </DialogTitle>
          
          <DialogContent>
            {formError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {formError}
              </Alert>
            )}
            
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
              <TextField
                label="Código"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                required
                fullWidth
              />
              <TextField
                label="Nombre"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                fullWidth
              />
              <TextField
                label="URL de Imagen (opcional)"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                disabled={formLoading}
                startIcon={formLoading ? <CircularProgress size={20} /> : <Add />}
              >
                {formLoading ? 'Creando...' : 'Crear Ubicación'}
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}

export default App;