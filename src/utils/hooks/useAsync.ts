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

function isApiResponse<T>(response: unknown): response is { data: T } {
  return (
    typeof response === "object" && response !== null && "data" in response
  );
}

const useAsync = <T>(
  asyncFn: (...args: unknown[]) => Promise<T | { data: T }>,
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
        const resolvedData: T = isApiResponse(response)
          ? response.data
          : response;

        setData(resolvedData);
        if (onSuccess) {
          onSuccess(resolvedData);
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
