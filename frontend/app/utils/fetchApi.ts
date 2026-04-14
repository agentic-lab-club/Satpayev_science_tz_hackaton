export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

type FetchOptions = RequestInit & {
  requiresAuth?: boolean;
};

export async function fetchApi(endpoint: string, options: FetchOptions = {}) {
  const { requiresAuth = true, ...customOptions } = options;
  const headers = new Headers(customOptions.headers || {});
  
  if (!headers.has('Content-Type') && !(customOptions.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
  }

  const getAccessToken = () => {
    if (typeof window !== 'undefined') {
       return localStorage.getItem('access_token');
    }
    return null;
  };

  const getRefreshToken = () => {
    if (typeof window !== 'undefined') {
       return localStorage.getItem('refresh_token');
    }
    return null;
  };

  const setTokens = (accessToken: string, refreshToken: string) => {
    if (typeof window !== 'undefined') {
       localStorage.setItem('access_token', accessToken);
       localStorage.setItem('refresh_token', refreshToken);
    }
  };

  const clearAuth = () => {
    if (typeof window !== 'undefined') {
       localStorage.removeItem('access_token');
       localStorage.removeItem('refresh_token');
       window.location.href = '/login';
    }
  };

  if (requiresAuth) {
    const token = getAccessToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...customOptions,
    headers,
  });

  if (response.status === 401 && requiresAuth) {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      try {
        const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          setTokens(data.access_token, data.refresh_token);
          
          // Retry original request
          headers.set('Authorization', `Bearer ${data.access_token}`);
          response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...customOptions,
            headers,
          });
        } else {
          clearAuth();
          throw new Error('Срок действия сессии истек');
        }
      } catch (error) {
        clearAuth();
        throw error;
      }
    } else {
      clearAuth();
      throw new Error('Необходима авторизация');
    }
  }

  // Optionally check for content to parse
  const text = await response.text();
  let data = null;
  
  if (text) {
    try {
      data = JSON.parse(text);
    } catch (e) {
      // Супрессим warning для 404 и других текстовых ответов, так как это ожидаемое поведение
      data = { message: text };
    }
  }
  
  if (!response.ok) {
     throw new Error(data?.message || 'Произошла ошибка при выполнении запроса');
  }

  return data;
}
