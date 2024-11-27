// export const handle = async ({ event, resolve }) => {
//     // Retrieve the session from the cookies
//     const userData = event.cookies.get('session');

//     if (userData) {
//         try {
//             const user = JSON.parse(userData);
//             event.locals.user = user; // Set user data in locals
//         } catch (error) {
//             console.error('Failed to parse user data:', error);
//         }
//     } else {
//         event.locals.user = null; // No user data available
//     }

//     // Proceed with the request
//     return resolve(event);
// };

// 

export const handle = async ({ event, resolve }) => {
    // Add logging for POST requests
    if (event.request.method === 'POST') {
        console.log('POST request details:');
        console.log('- Path:', event.url.pathname);
        console.log('- Search params:', event.url.search);
        console.log('- Headers:', Object.fromEntries(event.request.headers));
        console.log('- Cookies:', event.cookies.get('session'));
        
        // Log the request body if needed (note: request body can only be read once)
        try {
            const clonedRequest = event.request.clone();
            const body = await clonedRequest.text();
            console.log('- Request body:', body);
        } catch (error) {
            console.log('- Could not read request body:', error);
        }
    }

    // Existing session handling
    console.log('All cookies:', event.cookies.getAll());
    const userData = event.cookies.get('session');

    if (userData) {
        try {
            const user = JSON.parse(userData);
            event.locals.user = user; // Set user data in locals
            console.log('User session found:', user);
        } catch (error) {
            console.error('Failed to parse user data:', error);
            event.locals.user = null;
        }
    } else {
        event.locals.user = null; // No user data available
        console.log('No user session found');
    }

    // Disable CSRF protection for this request
    const response = await resolve(event, {
        csrfCheckOrigin: false // Disables CSRF protection
    });

    // Log response status
    console.log('Response status:', response.status);

    return response;
};
