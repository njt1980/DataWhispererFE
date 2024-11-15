export async function load() {
    try {
        // Fetch data from the API
        const response = await fetch('http://127.0.0.1:8002/users/get-all/');
        const users = await response.json();

        // Check if the response was successful
        if (!response.ok) {
            return { error: 'Failed to fetch users.' };
        }

        // Return the list of users
        return { users };
    } catch (error) {
        return { error: 'Failed to fetch users.' };
    }
}
