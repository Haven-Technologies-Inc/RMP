/**
 * VitalWatch API Hooks
 * React hooks for data fetching with loading/error states
 */

import { useState, useEffect, useCallback } from 'react';
import { ApiError } from '@/services/api/client';

interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: ApiError | null;
}

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: unknown) => void;
  onError?: (error: ApiError) => void;
}

export function useApi<T>(
  apiCall: () => Promise<T>,
  options: UseApiOptions = {}
) {
  const { immediate = true, onSuccess, onError } = options;

  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: immediate,
    error: null,
  });

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const data = await apiCall();
      setState({ data, isLoading: false, error: null });
      onSuccess?.(data);
      return data;
    } catch (error) {
      const apiError = error instanceof ApiError
        ? error
        : new ApiError(
            error instanceof Error ? error.message : 'Unknown error',
            'UNKNOWN',
            500
          );
      setState({ data: null, isLoading: false, error: apiError });
      onError?.(apiError);
      throw apiError;
    }
  }, [apiCall, onSuccess, onError]);

  useEffect(() => {
    let mounted = true;
    
    if (immediate) {
      const fetchData = async () => {
        try {
          const data = await apiCall();
          if (mounted) {
            setState({ data, isLoading: false, error: null });
            onSuccess?.(data);
          }
        } catch (error) {
          if (mounted) {
            const apiError = error instanceof ApiError
              ? error
              : new ApiError(
                  error instanceof Error ? error.message : 'Unknown error',
                  'UNKNOWN',
                  500
                );
            setState({ data: null, isLoading: false, error: apiError });
            onError?.(apiError);
          }
        }
      };
      fetchData();
    }
    
    return () => {
      mounted = false;
    };
  }, [immediate, apiCall, onSuccess, onError]);

  const refetch = useCallback(() => execute(), [execute]);

  return {
    ...state,
    execute,
    refetch,
  };
}

export function useMutation<T, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<T>,
  options: UseApiOptions = {}
) {
  const { onSuccess, onError } = options;

  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const mutate = useCallback(
    async (variables: TVariables) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const data = await mutationFn(variables);
        setState({ data, isLoading: false, error: null });
        onSuccess?.(data);
        return data;
      } catch (error) {
        const apiError = error instanceof ApiError
          ? error
          : new ApiError(
              error instanceof Error ? error.message : 'Unknown error',
              'UNKNOWN',
              500
            );
        setState((prev) => ({ ...prev, isLoading: false, error: apiError }));
        onError?.(apiError);
        throw apiError;
      }
    },
    [mutationFn, onSuccess, onError]
  );

  const reset = useCallback(() => {
    setState({ data: null, isLoading: false, error: null });
  }, []);

  return {
    ...state,
    mutate,
    reset,
  };
}
