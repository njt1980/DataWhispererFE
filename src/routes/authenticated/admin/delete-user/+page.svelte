<script>
    import { page } from '$app/stores';  // Access form data from $page
</script>

<!-- Parent container to hold both the message and the form -->
<div class="form-container">
    <!-- Container for success or error messages -->
    <div class="message-container">
        {#if $page.form?.error}
            <p class="error-message">{$page.form.error}</p>
        {/if}

        {#if $page.form?.success}
            <p class="success-message">{$page.form.success}</p>
        {/if}
    </div>

    <!-- Delete user form -->
    <form method="POST" class="delete-user-form">

        <div class="form-group">
            <input 
                type="text" 
                id="username" 
                name="username" 
                placeholder="Enter the username to be deleted" 
                required 
            />
        </div>

        <button type="submit" class="submit-button">Delete User</button>
    </form>
</div>

<style>
    /* Global style for Calibri font */
    @import url('https://fonts.googleapis.com/css2?family=Calibri:wght@400;700&display=swap');

    :global(body) {
        font-family: 'Calibri', sans-serif;
    }

    /* Form container holding both the form and the message */
    .form-container {
        position: relative;
        width: 100%;
        max-width: 400px;
        margin: 50px auto;
        padding: 0 20px;  /* Padding to give space on both sides of the form */
    }

    /* Style the form container */
    .delete-user-form {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    h2 {
        text-align: center;
        margin-bottom: 20px;
        font-size: 1.5em;
    }

    .form-group {
        margin-bottom: 20px;
        text-align: center;
    }

    input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-size: 1.1em;
        width: 100%;
        max-width: 320px;  /* Limit input width */
        margin: 0 auto;    /* Center the input */
    }

    input:focus {
        border-color: #007BFF;
        outline: none;
    }

    .submit-button {
        background-color: #007BFF;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 1.1em;
        cursor: pointer;
        font-family: 'Calibri', sans-serif;
        transition: background-color 0.3s ease;
    }

    .submit-button:hover {
        background-color: #0056b3;
    }

    /* Success and error messages styling */
    .message-container {
        position: absolute;
        top: -40px;  /* Position above the form */
        left: 0;
        right: 0;
        text-align: center;
        font-weight: bold;
        height: 30px;  /* Reserve space for the message */
        line-height: 30px; /* Center the text vertically */
    }

    .error-message {
        color: red;
    }

    .success-message {
        color: green;
    }
</style>
