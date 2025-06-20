// import { usePage } from '@inertiajs/react';

// export function can (permission: string):boolean {
//     const {auth} = usePage().props as{
//         auth :{
//             permissions : string[]
//         };
//     };
//   return auth.permissions.includes(permission);
// };

import { usePage } from '@inertiajs/react';

interface PageProps {
  auth: {
    permissions: string[];
  };
}

export function useCan(permission: string): boolean {
  const { auth } = usePage<PageProps>().props;

  return auth.permissions.includes(permission);
}
