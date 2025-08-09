import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Edit, LocationOn } from '@mui/icons-material';
import { Location } from '../types/location';

interface LocationCardProps {
  location: Location;
  onEdit?: (location: Location) => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, onEdit }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.shadows[8],
        }
      }}
    >
      {location.image && (
        <CardMedia
          component="img"
          height="200"
          image={location.image}
          alt={location.name}
          sx={{
            objectFit: 'cover',
          }}
        />
      )}
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="h2"
            sx={{ 
              fontWeight: 600,
              lineHeight: 1.2,
              flex: 1,
            }}
          >
            {location.name}
          </Typography>
          
          {onEdit && (
            <Tooltip title="Editar ubicación">
              <IconButton 
                size="small" 
                onClick={() => onEdit(location)}
                sx={{ ml: 1 }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LocationOn color="action" sx={{ fontSize: 18, mr: 0.5 }} />
          <Chip 
            label={location.code} 
            size="small" 
            variant="outlined"
            color="primary"
            sx={{ fontWeight: 500 }}
          />
        </Box>

        <Box sx={{ mt: 'auto' }}>
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ display: 'block' }}
          >
            Creado: {formatDate(location.created_at)}
          </Typography>
          {location.updated_at !== location.created_at && (
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ display: 'block' }}
            >
              Actualizado: {formatDate(location.updated_at)}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default LocationCard;