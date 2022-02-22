import { useRouter } from 'next/router';
import { useAuth } from '../../lib/auth/hooks';

export default function AuthWrapper(props) {
  const { loading, isLoggedIn, user } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div>
        Loading auth...
      </div>
    )
  }

  if (isLoggedIn) {
    return (
      <props.children user={user} />
    )
  }

  if (!isLoggedIn) {
    router.push('/login');
    return null;
  }
}