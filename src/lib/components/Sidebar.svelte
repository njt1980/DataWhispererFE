<script>
    export let user;
    console.log("user in Sidebar :", user)
</script>

<nav>
    <ul>
        <li><a href='/authenticated/chat'>Chat Page</a></li>
        {#if user}
            {#if user.UserType === 'admin'}
                <li><strong>Admin</strong></li>
                <li><a href="/authenticated/admin/create-user">Create User</a></li>
                <li><a href="/authenticated/admin/delete-user">Delete User</a></li>
                <li><a href="/authenticated/admin/display-users">Display Users</a></li>
            {/if}
        {/if}
        <li><a href="/authenticated/admin/reset-password">Reset Password</a></li>
    </ul>
</nav>

<style>
    nav {
        width: 200px;
        background-color: #2a2d3e;
        color: white;
        padding: 20px;
        font-family: 'Calibri', sans-serif;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        margin-bottom: 10px;
    }
    a {
        color: white;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
</style>