<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Location;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LocationModelTest extends TestCase
{
    use RefreshDatabase;

    #[\PHPUnit\Framework\Attributes\Test]
    public function puede_crear_ubicacion_con_datos_validos()
    {
        $location = Location::create([
            'code' => 'TEST001',
            'name' => 'Ubicación de Prueba',
            'image' => 'https://ejemplo.com/imagen.jpg'
        ]);

        $this->assertInstanceOf(Location::class, $location);
        $this->assertEquals('TEST001', $location->code);
        $this->assertEquals('Ubicación de Prueba', $location->name);
        $this->assertDatabaseHas('locations', [
            'code' => 'TEST001',
            'name' => 'Ubicación de Prueba'
        ]);
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function scope_filter_by_name_funciona_correctamente()
    {
        Location::factory()->create(['name' => 'Oficina Madrid', 'code' => 'MAD001']);
        Location::factory()->create(['name' => 'Oficina Barcelona', 'code' => 'BCN001']);
        Location::factory()->create(['name' => 'Centro Valencia', 'code' => 'VAL001']);

        $results = Location::filterByName('Oficina')->get();

        $this->assertCount(2, $results);
        $this->assertTrue($results->every(fn($location) => str_contains($location->name, 'Oficina')));
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function scope_filter_by_code_funciona_correctamente()
    {
        Location::factory()->create(['name' => 'Oficina Madrid', 'code' => 'MAD001']);
        Location::factory()->create(['name' => 'Oficina Barcelona', 'code' => 'BCN001']);
        Location::factory()->create(['name' => 'Centro Valencia', 'code' => 'VAL001']);

        $results = Location::filterByCode('MAD')->get();

        $this->assertCount(1, $results);
        $this->assertEquals('MAD001', $results->first()->code);
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function fillable_attributes_estan_configurados()
    {
        $location = new Location();
        $expected = ['code', 'name', 'image'];

        $this->assertEquals($expected, $location->getFillable());
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function casts_estan_configurados_correctamente()
    {
        $location = Location::factory()->create();

        $this->assertInstanceOf(\Carbon\Carbon::class, $location->created_at);
        $this->assertInstanceOf(\Carbon\Carbon::class, $location->updated_at);
    }
}