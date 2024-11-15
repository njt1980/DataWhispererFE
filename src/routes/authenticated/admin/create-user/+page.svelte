<script>
    import { page } from '$app/stores';  // Import the $page store to access form data
</script>

<!-- Container for success or error messages -->
<div class="message-container">
    {#if $page.form?.error}
        <p class="error-message">{$page.form.error}</p>
    {/if}
    {#if $page.form?.success}
        <p class="success-message">{$page.form.success}</p>
    {/if}
</div>

<!-- Form structure -->
<form method="POST" class="user-form">
    <h2>Create User</h2> <!-- Added form header -->

    <div class="form-group">
        <label for="UserName">Username</label>
        <input type="text" id="UserName" name="UserName" placeholder="Enter username" required />
    </div>

    <div class="form-row">
        <div class="form-group">
            <label for="FirstName">First Name</label>
            <input type="text" id="FirstName" name="FirstName" placeholder="Enter first name" required />
        </div>

        <div class="form-group">
            <label for="LastName">Last Name</label>
            <input type="text" id="LastName" name="LastName" placeholder="Enter last name" required />
        </div>
    </div>

    <div class="form-group">
        <label for="Email">Email</label>
        <input type="email" id="Email" name="Email" placeholder="Enter email" required />
    </div>

    <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter password" required />
    </div>

    <div class="form-group">
        <label for="UserType">User Type</label>
        <select id="UserType" name="UserType" required>
            <option value="admin">Admin</option>
            <option value="regular">Regular</option>
        </select>
    </div>

    <button type="submit" class="submit-button">Create User</button>
</form>

<style>
    /* Center the form and add spacing for the text boxes */
    .user-form {
        max-width: 600px;
        margin: 0 auto;
        position: relative;  /* Add this to make it a positioning context for the message container */
        padding: 20px 40px; /* Added padding to ensure text boxes don't touch the boundaries */
    }

    /* Message container styling */
    .message-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10;
        text-align: center;
    }

    /* Error and success message styling */
    .error-message, .success-message {
        display: inline-block;
        padding: 10px 20px;
        border-radius: 5px;
        font-weight: bold;
        margin-bottom: 15px;
    }

    .error-message {
        background-color: rgba(255, 0, 0, 0.1);
        color: red;
    }

    .success-message {
        background-color: rgba(0, 255, 0, 0.1);
        color: green;
    }

    /* Form styling */
    @import url('https://fonts.googleapis.com/css2?family=Calibri:wght@400;700&display=swap');
    .user-form {
        display: flex;
        flex-direction: column;
        width: 100%; 
        background-color: #f9f9f9;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        font-family: 'Calibri', sans-serif;
        font-size: 0.9em;
    }

    .form-group {
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
    }

    .form-row {
        display: flex;
        gap: 20px; /* Add spacing between First Name and Last Name inputs */
    }

    .form-row .form-group {
        flex: 1; /* Make First Name and Last Name inputs take equal space */
    }

    label {
        font-weight: bold;
        margin-bottom: 8px;
        font-size: 1.2em;
    }

    input, select {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-size: 1.1em;
        width: 100%;
    }

    input:focus, select:focus {
        border-color: #007BFF;
        outline: none;
    }

    .submit-button {
        background-color: #007BFF;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 1em;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .submit-button:hover {
        background-color: #0056b3;
    }
</style>
