<script>
    import { page } from '$app/stores';  // Import the $page store to access the data
</script>

<!-- Display error message if data fetching failed -->
{#if $page.data.error}
    <p class="error-message">{$page.data.error}</p>
{/if}

<!-- Display the table only if users exist -->
{#if $page.data.users && $page.data.users.length > 0}
    <table class="user-table">
        <thead>
            <tr>
                <th>UserName</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>User Type</th>
                <th>User ID</th>
                <th>Created On</th>
            </tr>
        </thead>
        <tbody>
            {#each $page.data.users as user}
                <tr>
                    <td>{user.UserName}</td>
                    <td>{user.Email}</td>
                    <td>{user.FirstName}</td>
                    <td>{user.LastName}</td>
                    <td>{user.UserType}</td>
                    <td>{user.UserId}</td>
                    <td>{user.CreatedOn}</td>
                </tr>
            {/each}
        </tbody>
    </table>
{/if}

<style>
    /* Set font to Calibri for the whole page */
    @import url('https://fonts.googleapis.com/css2?family=Calibri:wght@400;700&display=swap');

    :global(body) {
        font-family: 'Calibri', sans-serif;
    }

    .error-message {
        color: red;
        text-align: center;
        font-weight: bold;
        margin: 20px;
    }

    .user-table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px auto;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        text-align: left;
    }

    .user-table th, .user-table td {
        padding: 10px;
        border: 1px solid #ddd;
    }

    .user-table th {
        background-color: #f4f4f4;
        font-weight: bold;
    }

    .user-table tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    .user-table tr:hover {
        background-color: #f1f1f1;
    }

    /* Center the table on larger screens */
    .user-table {
        max-width: 800px;
        margin: 0 auto;
    }
</style>
