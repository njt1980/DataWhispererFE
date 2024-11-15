import { fail } from '@sveltejs/kit';

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const username = formData.get('username');
        console.log("In delete user action..")
        // Validate that the username field is filled
        if (!username) {
            return fail(400, { error: 'Username is required.' });
        }

        try {
            // Send request to delete the user
            const response = await fetch('http://127.0.0.1:8002/users/delete-user/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });

            const result = await response.json();
            console.log("This is result from the delete user action :", result)
            console.log("Response in delete user :", response)
            // Handle API response errors
            if (!response.ok) {
                return fail(response.status, { error: result.detail || 'Failed to delete user.' });
            }

            // Success
            return { success: `User ${username} deleted successfully!` };
        } catch (err) {
            return fail(500, { error: 'Server error. Please try again later.' });
        }
    }
};
