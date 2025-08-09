import { locationService } from '../services/locationService';

// Mock del servicio completo
jest.mock('../config/api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
  }
}));

import { api } from '../config/api';
const mockApi = api as jest.Mocked<typeof api>;

describe('LocationService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getLocations', () => {
    it('construye correctamente los parámetros de consulta', async () => {
      const mockResponse = {
        data: {
          data: [],
          meta: { current_page: 1, last_page: 1, per_page: 15, total: 0, from: 1, to: 0 },
          links: { first: null, last: null, prev: null, next: null }
        }
      };

      mockApi.get.mockResolvedValue(mockResponse);

      await locationService.getLocations(2, 'office', 'NYC', 20);

      expect(mockApi.get).toHaveBeenCalledWith(
        '/locations?page=2&per_page=20&name=office&code=NYC'
      );
    });

    it('omite parámetros vacíos', async () => {
      const mockResponse = {
        data: {
          data: [],
          meta: { current_page: 1, last_page: 1, per_page: 15, total: 0, from: 1, to: 0 },
          links: { first: null, last: null, prev: null, next: null }
        }
      };

      mockApi.get.mockResolvedValue(mockResponse);

      await locationService.getLocations(1, '', '');

      expect(mockApi.get).toHaveBeenCalledWith('/locations?page=1&per_page=15');
    });
  });

  describe('createLocation', () => {
    it('envía datos correctamente al endpoint', async () => {
      const mockResponse = {
        data: {
          data: {
            id: 1,
            code: 'TEST001',
            name: 'Test Location',
            image: 'https://example.com/test.jpg',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z'
          },
          message: 'Location created successfully'
        }
      };

      mockApi.post.mockResolvedValue(mockResponse);

      const locationData = {
        code: 'TEST001',
        name: 'Test Location',
        image: 'https://example.com/test.jpg'
      };

      const result = await locationService.createLocation(locationData);

      expect(mockApi.post).toHaveBeenCalledWith('/locations', locationData);
      expect(result).toEqual(mockResponse.data);
    });
  });
});