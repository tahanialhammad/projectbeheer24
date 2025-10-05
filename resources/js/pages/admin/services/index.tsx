import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useCan } from '@/lib/can';


type Service = {
    id: number;
    name: string;
    description: string;
    price: number;

};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Services',
        href: '/services',
    },
];

export default function Index({ services }: { services: Service[] }) {
    const canCreate = useCan('services.create');
    const canEdit = useCan('services.edit');
    const canDelete = useCan('services.delete');

    function handleDelete(id: number) {
        if (confirm('Are you sure you want to remove this service?')) {
            router.delete(route('services.destroy', id));
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Services" />
            <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-gray-800">services list</h2>
                    {canCreate && (  
                    <Link href={route('services.create')} className="rounded-md bg-blue-600 px-4 py-2 text-white shadow transition hover:bg-blue-700">
                        Add new service
                    </Link>)}
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full rounded-lg border border-gray-300 shadow-md">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border-b p-3 text-left">ID</th>
                                <th className="border-b p-3 text-left">Name</th>
                                <th className="border-b p-3 text-left">Description</th>
                                <th className="border-b p-3 text-left">Price</th>
                                <th className="border-b p-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map(({ id, name, description, price }) => (
                                <tr key={id} className="transition even:bg-gray-50 hover:bg-gray-100 border-b-1 border-gray-200">
                                    <td className="px-2">{id}</td>
                                    <td className="px-2">{name}</td>
                                    <td className="px-2 line-clamp-2">{description}</td>
                                    <td className="px-2">{price}</td>
                                    <td className="flex space-x-2 px-2">
                                        
                                        <Link
                                            href={route('services.show', id)}
                                            className="rounded bg-gray-600 px-3 py-1 text-white transition hover:bg-green-700"
                                        >
                                            view
                                        </Link>
                                  {canEdit && (       
                                        <Link
                                            href={route('services.edit', id)}
                                            className="rounded bg-green-600 px-3 py-1 text-white transition hover:bg-green-700"
                                        >
                                            Edit
                                        </Link>)}
                                        {canDelete && (  
                                        <button
                                            onClick={() => handleDelete(id)}
                                            className="rounded bg-red-600 px-3 py-1 text-white transition hover:bg-red-700"
                                        >
                                            Delete
                                        </button>)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
