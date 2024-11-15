<script>
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';

    let username = '', newPassword = '', confirmPassword = '', passwordMismatch = false;
    $: isAdmin = $page.data.user?.UserType === 'admin';

    function validateForm() {
        passwordMismatch = newPassword !== confirmPassword;
        return !passwordMismatch;
    }
</script>

<div class="container">
    <form method="POST" use:enhance={({ result }) => {
        if (result.type === 'failure') alert(result.data?.message || 'An error occurred');
        if (result.type === 'success') {
            alert('Password reset successfully');
            username = newPassword = confirmPassword = '';
        }
    }} on:submit|preventDefault={validateForm}>
        <h2>Reset Password</h2>
        {#if isAdmin}
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" bind:value={username} required>
            </div>
        {/if}
        <div class="form-group">
            <label for="newPassword">New Password</label>
            <input type="password" id="newPassword" name="newPassword" bind:value={newPassword} required>
        </div>
        <div class="form-group">
            <label for="confirmPassword">Confirm New Password</label>
            <input type="password" id="confirmPassword" bind:value={confirmPassword} required>
        </div>
        {#if passwordMismatch}
            <p class="error-message">Passwords do not match</p>
        {/if}
        <button type="submit" class="submit-button">Reset Password</button>
    </form>
</div>

<style>
    /* Ensure the container takes up the full viewport */
    :global(body, html) {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
    }

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        width: 100vw; /* Ensure full viewport width */
        background-color: #f0f2f5;
        font-family: 'Roboto', sans-serif;
    }

    form {
        width: 100%;
        max-width: 400px;
        padding: 2rem;
        background-color: white;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    h2 {
        text-align: center;
        color: #333;
        margin-bottom: 1.5rem;
    }

    .form-group {
        margin-bottom: 1.5rem;
        width: 100%;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        color: #4a5568;
        text-align: left;
    }

    input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        font-size: 1rem;
        box-sizing: border-box;
    }

    .error-message {
        color: #e53e3e;
        margin-top: 0.5rem;
        text-align: center;
    }

    .submit-button {
        width: 100%;
        background-color: #4299e1;
        color: white;
        border: none;
        padding: 0.75rem;
        border-radius: 8px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .submit-button:hover {
        background-color: #3182ce;
    }
</style>