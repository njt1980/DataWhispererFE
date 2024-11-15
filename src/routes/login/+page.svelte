<!-- <script>
    export let form
</script>
<form method="POST" action="?/login">
	<label>
		Email
		<input name="username">
	</label>
	<label>
		Password
		<input name="password" type="password">
	</label>
	<button>Log in</button>
</form>

{#if form?.success}
    <p>Successfully logged in</p>
{/if}

{#if form?.error}
    <p style="color: red;">{form.error}</p>
{/if} -->

<script>
    export let form;
</script>

<div class="login-container">
    <div class="welcome-section">
        <h1>Welcome to Talky!</h1>
        <h1>Talk with your SQL Data.</h1>
    </div>
    <div class="form-section">
        <form method="POST" action="?/login">
            <div class="form-group">
                <label for="username">Username</label>
                <input id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input id="password" name="password" type="password" required>
            </div>
            <button type="submit" class="login-button">Log in</button>
        </form>

        {#if form?.success}
            <p class="success-message">Successfully logged in</p>
        {/if}

        {#if form?.error}
            <p class="error-message">{form.error}</p>
        {/if}
    </div>
</div>

<style>
    :global(body) {
        font-family: 'Poppins', sans-serif;
        color: #ffffff;
        background: #2a2d3e;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
    }

    form {
        background: #353746;
        padding: 20px; /* Ensures space around the edges inside the form */
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        width: 350px;
        box-sizing: border-box; /* Prevents padding from causing overflow */
    }

    label {
        display: block;
        margin-bottom: 8px;
        font-size: 14px;
    }

    input {
        width: 100%; /* Ensures input stays within the container */
        padding: 10px;
        margin: 5px 0; /* Adds spacing between inputs */
        box-sizing: border-box; /* Prevents overflow */
        border: none;
        border-radius: 5px;
        background-color: #0f3460;
        color: #ffffff;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
    }

    input::placeholder {
        color: #b0b0b0;
    }

    button {
        width: 100%;
        padding: 12px;
        margin-top: 10px;
        border: none;
        border-radius: 5px;
        background-color: #e94560;
        color: #ffffff;
        cursor: pointer;
        font-family: 'Poppins', sans-serif;
        font-size: 16px;
        font-weight: 600;
    }

    button:hover {
        background-color: #d03450;
    }

    p {
        text-align: center;
        margin-top: 15px;
        font-size: 14px;
    }

    .login-container {
        display: flex;
        height: 100vh;
        width: 100vw;
    }

    .welcome-section {
        flex: 1;
        background: linear-gradient(270deg, #6e45e2, #88d3ce);
        color: white;
        padding: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .form-section {
        flex: 1;
        background-color: #f0f0f0;
        padding: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .form-group {
        margin-bottom: 20px;
        width: 100%;
    }

    .login-button {
        width: 100%;
        padding: 10px;
        background-color: #6e45e2;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    }

    .login-button:hover {
        background-color: #5a37b8;
    }

    .success-message, .error-message {
        text-align: center;
        margin-top: 20px;
    }

    .error-message {
        color: red;
    }
</style>
