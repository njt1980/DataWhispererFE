import { fail, redirect } from '@sveltejs/kit';
export const actions = {
    login : async({ request,fetch,cookies }) => {
        const data = await request.formData()
        console.log(data)
        const username = data.get('username')
        const password = data.get('password')
        console.log("username :", username)
        console.log("password :", password)
        if( !username || !password ){
            return fail(400, {error: 'Username and password are required.'})
        }

        const payload = {
            username : username,
            password : password
        }

        let response;

        try{
            response = await fetch('http://fastapi-be-service/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
                credentials: 'include'
            });
            
        } catch (error) {
            console.error('Error while authentication :', error)
            return fail(500, { error : 'An error occurred during login. Please try again later'})
        }
        if(response.ok){
            const responseData = await response.json();
            console.log("responseData :", responseData)
            // const token = responseData;
            cookies.set('session',JSON.stringify(responseData),{
                path: '/',
                secure: false,
                httpOnly: false,
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7
            });
            console.log('Authenticated..')
            const token_from_cookie = cookies.get('session')
            console.log(token_from_cookie)
            throw redirect(303,'/authenticated/chat')
            return {
                success : true
            }
        } else {
            const errorData = await response.json();
            return fail(response.status, { error : errorData.detail || 'Login failed'})
        }
    }
}