import { useMutation } from '@tanstack/react-query';

import type { Task } from '../common/tasks.types';
import { apiAxiosInstance, type HttpError } from '../../../api/config';

export const useCreateTask = ({ onSuccess, onError }: any) => {
  return useMutation<void, HttpError, Task>({
    mutationFn: formData => apiAxiosInstance.post('/tasks/', formData),
    onSuccess,
    onError,
  });
};
