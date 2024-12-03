import './App.css';
import { atomWithQuery } from 'jotai-tanstack-query';
import { useAtom } from 'jotai/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

let count = 0;

const atom = atomWithQuery(() => ({
  queryKey: ['key'],
  queryFn() {
    return ++count;
  },
}));

const useCount = () =>
  useQuery({
    queryKey: ['key'],
    queryFn() {
      return ++count;
    },
  });

function App() {
  const queryClient = useQueryClient();
  const { data: fromQuery } = useCount();
  const [{ data: fromAtom }] = useAtom(atom);

  return (
    <>
      <button
        onClick={() => {
          queryClient.invalidateQueries({ queryKey: ['key'] });
        }}
      >
        invalidate
      </button>
      <p>{fromQuery}</p>
      <p>{fromAtom}</p>
    </>
  );
}

export default App;
