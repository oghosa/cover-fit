import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CatchAll() {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [router]);

  return null;
}
