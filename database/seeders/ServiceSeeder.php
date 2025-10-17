<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\FormField;
use Illuminate\Support\Str;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      //  Service::factory(2)->create();

// Voorbeeld Form Fields
        $fieldDomain = FormField::firstOrCreate(
            ['name' => 'domain_name'],
            [
                'label' => 'Wat is je domeinnaam?',
                'type' => 'text',
                'required' => true,
                'options' => null
            ]
        );

        $fieldPlan = FormField::firstOrCreate(
            ['name' => 'plan'],
            [
                'label' => 'Kies een plan',
                'type' => 'select',
                'required' => true,
                'options' => json_encode(['Basic', 'Premium', 'Enterprise'])
            ]
        );

        $fieldNewsletter = FormField::firstOrCreate(
            ['name' => 'newsletter'],
            [
                'label' => 'Wil je de nieuwsbrief ontvangen?',
                'type' => 'checkbox',
                'required' => false,
                'options' => null
            ]
        );

     // Services
        $serviceHosting = Service::create([
            'name' => 'Web Hosting',
            'slug' => Str::slug('Web Hosting'),
            'description' => 'Snelle en betrouwbare web hosting.',
            'price' => 49.99,
            'image' => 'services/hosting.jpg', // image in storage/app/public/services
        ]);

        $serviceDomain = Service::create([
            'name' => 'Domein Registratie',
            'slug' => Str::slug('Domein Registratie'),
            'description' => 'Registreer je domeinnaam eenvoudig.',
            'price' => 9.99,
            'image' => 'services/domain.jpg',
        ]);

        // Koppel form fields via pivot
        $serviceHosting->formFields()->attach([$fieldDomain->id, $fieldPlan->id]);
        $serviceDomain->formFields()->attach([$fieldDomain->id]);
    }
}
