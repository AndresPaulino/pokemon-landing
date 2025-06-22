'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function useAuthRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const redirectToOrder = () => {
    if (status === 'loading') {
      // Don't redirect while loading
      return;
    }

    if (!session) {
      // User is not signed in, redirect to signin
      router.push('/signin');
    } else {
      // User is signed in, redirect to order page
      router.push('/order');
    }
  };

  return {
    redirectToOrder,
    isAuthenticated: !!session,
    isLoading: status === 'loading'
  };
} 