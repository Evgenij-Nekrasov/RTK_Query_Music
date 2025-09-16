import { toast } from 'react-toastify';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function showApiError(error: FetchBaseQueryError) {
  switch (error.status) {
    case 'CUSTOM_ERROR':
    case 'FETCH_ERROR':
    case 'PARSING_ERROR':
    case 'TIMEOUT_ERROR':
      toast(error.error, { type: 'error', theme: 'colored' });
      break;

    case 400: {
      const msg = (error.data as { errors: { detail: string }[] }).errors[0]
        .detail;
      toast(`${msg.slice(0, 100)}...`, { type: 'error', theme: 'colored' });
      break;
    }

    case 401: {
      const msg = (error.data as { message: string }).message;
      toast(msg, { type: 'error', theme: 'colored' });
      break;
    }

    case 403: {
      const msg = (error.data as { errors: { detail: string }[] }).errors[0]
        .detail;
      toast(msg, { type: 'error', theme: 'colored' });
      break;
    }

    case 404: {
      const msg = (error.data as { error: string }).error;
      toast(msg, { type: 'error', theme: 'colored' });
      break;
    }

    case 429: {
      const msg = (error.data as { message: string }).message;
      toast(msg, { type: 'error', theme: 'colored' });
      break;
    }

    default:
      if (
        typeof error.status === 'number' &&
        error.status >= 500 &&
        error.status < 600
      ) {
        toast('Server error occurred. Please try again later', {
          type: 'error',
          theme: 'colored',
        });
      } else {
        toast('Some error occurred', { type: 'error', theme: 'colored' });
      }
  }
}
