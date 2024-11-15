export const handle = async ({ event, resolve }) => {
    // Retrieve the session from the cookies
    const userData = event.cookies.get('session');

    if (userData) {
        try {
            const user = JSON.parse(userData);
            event.locals.user = user; // Set user data in locals
        } catch (error) {
            console.error('Failed to parse user data:', error);
        }
    } else {
        event.locals.user = null; // No user data available
    }

    // Proceed with the request
    return resolve(event);
};
