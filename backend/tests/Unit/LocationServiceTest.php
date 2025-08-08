<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Location;
use App\Services\LocationService;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LocationServiceTest extends TestCase
{
    use RefreshDatabase;

    private LocationService $locationService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->locationService = new LocationService();
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function puede_obtener_ubicaciones_paginadas()
    {
        Location::factory()->count(25)->create();

        $result = $this->locationService->getPaginatedLocations(1, 10);

        $this->assertCount(10, $result->items());
        $this->assertEquals(25, $result->total());
        $this->assertEquals(1, $result->currentPage());
        $this->assertEquals(3, $result->lastPage());
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function puede_filtrar_ubicaciones_por_nombre()
    {
        Location::factory()->create(['name' => 'Oficina Madrid']);
        Location::factory()->create(['name' => 'Centro Barcelona']);
        Location::factory()->create(['name' => 'Oficina Valencia']);

        $result = $this->locationService->getPaginatedLocations(1, 10, 'Oficina');

        $this->assertCount(2, $result->items());
        foreach ($result->items() as $location) {
            $this->assertStringContainsString('Oficina', $location->name);
        }
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function puede_crear_nueva_ubicacion()
    {
        $data = [
            'code' => 'NEW001',
            'name' => 'Nueva Ubicación',
            'image' => 'https://ejemplo.com/imagen.jpg'
        ];

        $location = $this->locationService->createLocation($data);

        $this->assertInstanceOf(Location::class, $location);
        $this->assertEquals('NEW001', $location->code);
        $this->assertDatabaseHas('locations', $data);
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function valida_codigo_unico_al_crear()
    {
        Location::factory()->create(['code' => 'DUP001']);

        $this->expectException(\Illuminate\Database\QueryException::class);

        $this->locationService->createLocation([
            'code' => 'DUP001',
            'name' => 'Ubicación Duplicada'
        ]);
    }
}