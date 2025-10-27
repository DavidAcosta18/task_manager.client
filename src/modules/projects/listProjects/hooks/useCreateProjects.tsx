import { useMutation } from '@tanstack/react-query';
import type { Project } from '../../common/project.types';
import { apiAxiosInstance, type HttpError } from '../../../../api/config';

export const useCreateProjects = ({ onSuccess, onError }: any) => {
  return useMutation<void, HttpError, Project>({
    mutationFn: formData => apiAxiosInstance.post('/projects/', formData),
    onSuccess,
    onError,
  });
};
