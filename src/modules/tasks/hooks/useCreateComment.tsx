import { useMutation } from '@tanstack/react-query';

import { apiAxiosInstance, type HttpError } from '../../../api/config';
import type { TaskComment } from '../common/tasks.types';

export const useCreateComment = ({ onSuccess, onError }: any) => {
  return useMutation<void, HttpError, TaskComment>({
    mutationFn: formData => apiAxiosInstance.post('/comments/', formData),
    onSuccess,
    onError,
  });
};
