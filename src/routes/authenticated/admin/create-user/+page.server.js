import { fail } from '@sveltejs/kit';

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();

        // Collect form fields
        const UserName = formData.get('UserName');
        const Email = formData.get('Email');
        const FirstName = formData.get('FirstName');
        const LastName = formData.get('LastName');
        const password = formData.get('password');
        const UserType = formData.get('UserType');

        // Validate required fields
        if (!UserName || !Email || !FirstName || !LastName || !password || !UserType) {
            return fail(400, { error: 'All fields are required!' });
        }

        try {
            // Send data to FastAPI backend for user creation
            const response = await fetch('http://127.0.0.1:8002/users/create-user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    UserName,
                    Email,
                    FirstName,
                    LastName,
                    password,
                    UserType,
                })
            });

            const result = await response.json();

            if (!response.ok) {
                return fail(response.status, { error: result.detail || 'Failed to create user' });
            }

            // Return success message
            return { success: 'User created successfully!' };

        } catch (err) {
            return fail(500, { error: 'Server error. Please try again later.' });
        }
    }
};
