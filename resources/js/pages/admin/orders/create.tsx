import { useForm } from '@inertiajs/react';
import SiteLayout from '@/layouts/site-layout';

type Service = {
  id: number;
  name: string;
};

type Props = {
  services: Service[];
  selected_service_id?: number;
};

export default function Create({ services, selected_service_id }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    service_id: selected_service_id || '',
    quantity: 1,
  });

  // Zoek de geselecteerde service voor weergave
  const selectedService = services.find(s => s.id === Number(data.service_id));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    post(route('orders.store'));
  }

  return (
    <SiteLayout title="Nieuwe bestelling">
      <h1 className="text-2xl font-bold mb-4">Bestel een service</h1>

      <form onSubmit={submit} className="max-w-md space-y-4">
        <div>
          <label className="block mb-1 font-medium">Service</label>
          <input
            type="text"
            value={selectedService ? selectedService.name : ''}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
          />
          <input
            type="hidden"
            value={data.service_id}
            name="service_id"
          />
          {errors.service_id && <div className="text-red-600">{errors.service_id}</div>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Aantal</label>
          <input
            type="number"
            value={data.quantity}
            min={1}
            onChange={e => setData('quantity', parseInt(e.target.value, 10))}
            className="w-full border px-3 py-2 rounded"
            required
          />
          {errors.quantity && <div className="text-red-600">{errors.quantity}</div>}
        </div>

        {/* Meer velden kan je hier toevoegen */}

        <button
          type="submit"
          disabled={processing}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Bestel
        </button>
      </form>
    </SiteLayout>
  );
}
