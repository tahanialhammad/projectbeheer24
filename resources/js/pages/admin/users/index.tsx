import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Users',
    href: '/users',
  },
];

export default function Index({ users }: { users: User[] }) {

   function handleDelete(id) {
    if(confirm("Are you sure you want to remove this user?")){
      //  e.preventDefault();
       // destroy(`/users/${id}`);
       // destroy(route("users.destroy"));
router.delete(route("users.destroy", id ))
    }
    }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Users" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-gray-800">User list</h2>
          <Link 
          href={route('users.create')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition">
            Add new user
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg border border-gray-300 shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="border-b p-3 text-left">ID</th>
                <th className="border-b p-3 text-left">Name</th>
                <th className="border-b p-3 text-left">E-mail</th>
                <th className="border-b p-3 text-left">Role</th>
                <th className="border-b p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(({ id, name, email, role }) => (
                <tr key={id} className="transition even:bg-gray-50 hover:bg-gray-100">
                  <td className="border-b p-3">{id}</td>
                  <td className="border-b p-3">{name}</td>
                  <td className="border-b p-3">{email}</td>
                  <td className="border-b p-3 capitalize">{role}</td>
                  <td className="border-b p-3 space-x-2 flex">
                     <Link  href={route('users.show', id)}
                     className="px-3 py-1 rounded bg-gray-600 text-white hover:bg-green-700 transition">
                      view
                    </Link>
                    <Link  href={route('users.edit', id)}
                     className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 transition">
                      Edit
                    </Link>
                    <button onClick={()=>handleDelete(id)} 
                     className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition">
                      Delete
                    </button>
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
