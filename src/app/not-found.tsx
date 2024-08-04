import { ErrorMessage } from '@/components/ErrorMessage';
import { fetchNotFound } from '@/graphql';

export default async function NotFound() {
  const { heading, description } = await fetchNotFound();

  return <ErrorMessage heading={heading} description={description} />;
}
