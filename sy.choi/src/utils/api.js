import { replace } from './router';

export const API_END_POINT = '';

export const request = async(url, (options = {}), (username = 'saeyoung')) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username' : username,
      }
    })

    if (res.ok) {
      return await res.json()
    }

    throw new Error('API 처리 중 오류!')
  } catch (e) {
    console.error('error', e)
    replace('/')
  } 
};
