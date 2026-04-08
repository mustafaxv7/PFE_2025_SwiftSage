// Centralized fetch wrapper to handle auth tokens, automatic refreshing, and JSON parsing
export const fetchWithAuth = async (url, options = {}) => {
    // Default to including credentials (cookies)
    const defaultOptions = {
        ...options,
        credentials: 'include',
    };

    // Automatically add Content-Type: application/json if sending a body
    if (options.body && !options.headers) {
        defaultOptions.headers = {
            'Content-Type': 'application/json'
        };
    }

    let response = await fetch(url, defaultOptions);

    // If 401 Unauthorized, try to refresh the token
    if (response.status === 401 && !url.includes('/auth/refresh')) {
        const refreshRes = await fetch('/auth/refresh', {
            method: 'POST',
            credentials: 'include'
        });

        if (refreshRes.ok) {
            // Token refreshed, retry the original request
            response = await fetch(url, defaultOptions);
        } else {
            // Refresh failed, redirect to login if not doing auth check
            if (!url.includes('/auth/me') && window.location.pathname !== '/login') {
                window.location.href = '/login';
                return null;
            }
        }
    }

    // Process the response
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    // Return parsed JSON if the response is JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return await response.json();
    }

    return response;
};
