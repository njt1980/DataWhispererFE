import { fail } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, locals }) => {
        const data = await request.formData();
        const newPassword = data.get('newPassword');
        let username = data.get('username');

        // If the user is not an admin, use their own username
        if (locals.user.UserType !== 'admin') {
            username = locals.user.UserName;
        }

        if (!username || !newPassword) {
            return fail(400, { message: 'Username and new password are required' });
        }

        try {
            const response = await fetch('http://fastapi-be-service/users/reset-password/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    new_password: newPassword
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                return fail(response.status, { message: errorData.message || 'Failed to reset password' });
            }

            return { success: true };
        } catch (error) {
            console.error('Error resetting password:', error);
            return fail(500, { message: 'An unexpected error occurred' });
        }
    }
};