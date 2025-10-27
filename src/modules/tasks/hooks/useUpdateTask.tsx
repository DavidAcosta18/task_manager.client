import { useMutation } from '@tanstack/react-query';

import { apiAxiosInstance, type HttpError } from '../../../api/config';

export const useUpdateTask = ({ onSuccess, onError }: any) => {
  return useMutation<void, HttpError, Record<string, unknown>>({
    mutationFn: formData => apiAxiosInstance.patch('/tasks/', formData),
    onSuccess,
    onError,
  });
};
