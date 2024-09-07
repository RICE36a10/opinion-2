import { useState, useEffect, useCallback } from "react";

interface UseAsyncOptions<T> {
  immediate?: boolean;
  onError?: (err: unknown) => void;
  onSuccess?: (data: T) => void;
}

interface UseAsyncReturn<T> {
  execute: (...args: unknown[]) => Promise<void>;
  data: T | null;
  loading: boolean;
  error: boolean;
}

const useAsync = <T>(
  asyncFn: (...args: unknown[]) => Promise<T>,
  options: UseAsyncOptions<T> = {}
): UseAsyncReturn<T> => {
  const { immediate = false, onSuccess, onError } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const execute = useCallback(
    async (...args: unknown[]): Promise<void> => {
      setLoading(true);
      setError(false);
      setData(null);

      try {
        const response = await asyncFn(...args);
        setData(response);
        if (onSuccess) {
          onSuccess(response);
        }
      } catch (err) {
        setData(null);
        setError(true);

        if (onError) {
          onError(err);
        }
      } finally {
        setLoading(false);
      }
    },
    [asyncFn, onError, onSuccess]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate]);

  return { execute, data, loading, error };
};

export default useAsync;
