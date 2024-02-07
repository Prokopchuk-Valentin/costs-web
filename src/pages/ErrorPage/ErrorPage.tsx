import { useErrorBoundary } from 'react-error-boundary';

interface Props {
  error?: { message: string };
}

export function ErrorPage({ error }: Props) {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div className="container">
      <p>Что-то пошло не так...</p>
      <pre style={{ color: 'red' }}>{error?.message}</pre>
      <button onClick={resetBoundary}>Перезагрузить</button>
    </div>
  );
}
