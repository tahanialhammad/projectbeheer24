<?php

namespace Database\Seeders;

use App\Models\FormField;
use App\Models\Service;
use Illuminate\Database\Seeder;

class FormFieldSeeder extends Seeder
{
    public function run(): void
    {
        // Zorg dat er minstens één service bestaat
$service = Service::firstOrCreate(
    ['name' => 'Website laten maken'],
    [
        'slug' => 'website-laten-maken',
        'description' => 'Professionele website op maat',
        'price' => 999,
    ]
);
        // Voeg formulier velden toe
        $service->formFields()->createMany([
            [
                'label' => 'Wat is je domeinnaam?',
                'name' => 'domain_name',
                'type' => 'text',
                'required' => true,
            ],
            [
                'label' => 'Heb je al een logo?',
                'name' => 'has_logo',
                'type' => 'select',
                'options' => json_encode(['Ja', 'Nee']),
                'required' => true,
            ],
            [
                'label' => 'Wat is het doel van je website?',
                'name' => 'website_purpose',
                'type' => 'textarea',
                'required' => false,
            ],
        ]);
    }
}
