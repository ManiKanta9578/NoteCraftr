import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import LoadingSpinner from '@/components/LoadingSpinner';
// import NotesPage from '@/components/NotesPage';

const NotesPage = dynamic(
  () => import('@/components/NotesPage'),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

const TechnologyPage = () => {
  const isLoading = useSelector((state) => state.loading);
  const router = useRouter();
  const { technology } = router.query;

  if (!technology) {
    return <LoadingSpinner />;
  }

  return <NotesPage technology={technology} />;
};

export default TechnologyPage;