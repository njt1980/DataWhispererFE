import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    console.log("In load function..");

    // Access user data from locals
    if (!locals.user) {
        throw redirect(303, '/login');
    }

    // Log the user data
    console.log("userData:", locals.user);

    return {
        user: locals.user,
    };
}
