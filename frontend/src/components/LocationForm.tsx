import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Alert,
  CircularProgress,
  Collapse,
} from '@mui/material';
import { Add, CheckCircle } from '@mui/icons-material';
import { locationService } from '../services/locationService';
import { LocationFormData } from '../types/location';

// Schema de validación con Zod
const locationSchema = z.object({
  code: z.string()
    .min(1, 'El código es obligatorio')
    .max(10, 'Máximo 10 caracteres')
    .regex(/^[A-Z0-9]+$/, 'Solo mayúsculas y números permitidos'),
  name: z.string()
    .min(1, 'El nombre es obligatorio')
    .max(255, 'Máximo 255 caracteres'),
  image: z.string()
    .url('Debe ser una URL válida')
    .optional()
    .or(z.literal('')),
});

interface LocationFormProps {
  onLocationCreated?: () => void;
  onClose?: () => void;
}

const LocationForm: React.FC<LocationFormProps> = ({ onLocationCreated, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LocationFormData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Limpiar imagen vacía
      const cleanData = {
        ...data,
        image: data.image?.trim() || undefined,
      };

      await locationService.createLocation(cleanData);
      
      setSuccess(true);
      reset();
      
      // Notificar éxito y actualizar lista
      if (onLocationCreated) {
        setTimeout(() => {
          onLocationCreated();
        }, 1500);
      }

      // Auto-cerrar después del éxito
      if (onClose) {
        setTimeout(() => {
          onClose();
        }, 2000);
      }

    } catch (err: any) {
      const errorMessage = err.response?.data?.error?.message || 
                          err.response?.data?.message ||
                          'Error al crear la ubicación';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper 
      elevation={3}
      sx={{ 
        p: 3, 
        mb: 3,
        borderRadius: 2,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Add sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
          Crear Nueva Ubicación
        </Typography>
      </Box>

      <Collapse in={!!error}>
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      </Collapse>

      <Collapse in={success}>
        <Alert 
          severity="success" 
          sx={{ mb: 2 }}
          icon={<CheckCircle />}
        >
          ¡Ubicación creada exitosamente!
        </Alert>
      </Collapse>

      <Box 
        component="form" 
        onSubmit={handleSubmit(onSubmit)} 
        sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
      >
        <TextField
          label="Código de Ubicación"
          placeholder="Ej: NYC001"
          {...register('code')}
          error={!!errors.code}
          helperText={errors.code?.message || 'Máximo 10 caracteres, solo mayúsculas y números'}
          disabled={loading}
          fullWidth
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'white',
            }
          }}
        />

        <TextField
          label="Nombre de la Ubicación"
          placeholder="Ej: Oficina Nueva York"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message || 'Máximo 255 caracteres'}
          disabled={loading}
          fullWidth
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'white',
            }
          }}
        />

        <TextField
          label="URL de Imagen (Opcional)"
          placeholder="https://ejemplo.com/imagen.jpg"
          {...register('image')}
          error={!!errors.image}
          helperText={errors.image?.message || 'URL válida de una imagen'}
          disabled={loading}
          fullWidth
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'white',
            }
          }}
        />

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          {onClose && (
            <Button
              variant="outlined"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
          )}
          
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !isValid}
            startIcon={loading ? <CircularProgress size={20} /> : <Add />}
            sx={{
              minWidth: 140,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
              }
            }}
          >
            {loading ? 'Creando...' : 'Crear Ubicación'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default LocationForm;