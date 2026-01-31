import { useState, useCallback } from 'react';

interface ActionState<T = any> {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  data: T | null;
}

export function useActionState<T = any>() {
  const [state, setState] = useState<ActionState<T>>({
    isLoading: false,
    isSuccess: false,
    error: null,
    data: null,
  });

  const runAction = useCallback(async (action: () => Promise<any>, options?: {
    onSuccess?: (data: any) => void;
    onError?: (error: string) => void;
  }) => {
    setState({ isLoading: true, isSuccess: false, error: null, data: null });

    try {
      const result = await action();

      if (result?.error) {
        setState({ isLoading: false, isSuccess: false, error: result.error, data: null });
        options?.onError?.(result.error);
        return { error: result.error, success: false };
      }

      setState({ isLoading: false, isSuccess: true, error: null, data: result?.data || result });
      options?.onSuccess?.(result?.data || result);
      return { data: result?.data || result, success: true };
    } catch (err: any) {
      const errorMessage = err.message || 'An unexpected error occurred';
      setState({ isLoading: false, isSuccess: false, error: errorMessage, data: null });
      options?.onError?.(errorMessage);
      return { error: errorMessage, success: false };
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      isLoading: false,
      isSuccess: false,
      error: null,
      data: null,
    });
  }, []);

  return {
    ...state,
    runAction,
    reset,
  };
}
