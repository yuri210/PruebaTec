import { api } from '../config/api';
import { Location, LocationFormData, LocationsResponse } from '../types/location';

export const locationService = {
  async getLocations(
    page = 1, 
    name = '', 
    code = '', 
    perPage = 15
  ): Promise<LocationsResponse> {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('per_page', perPage.toString());
    
    if (name.trim()) params.append('name', name.trim());
    if (code.trim()) params.append('code', code.trim());
    
    const response = await api.get(`/locations?${params}`);
    return response.data;
  },

  async createLocation(data: LocationFormData): Promise<{ data: Location; message: string }> {
    const response = await api.post('/locations', data);
    return response.data;
  },
};