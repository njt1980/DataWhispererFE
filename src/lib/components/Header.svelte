<script>
    export let user;
</script>
  
<header>
   <div class="app-name">Talky</div>
   <div class="user-info">
     <span class="welcome">Welcome, {user.UserName}</span>
     <form method="POST" action="/logout">
        <button type="submit" class="logout-button">Logout</button>
     </form>
   </div>
</header>
  
<style>
    @import url('https://fonts.googleapis.com/css2?family=Calibri:wght@400;700&display=swap');
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background-color: #353746;
      font-family: 'Calibri', sans-serif;
      color: white;
    }
  
    .app-name {
      font-size: 20px;
      font-weight: bold;
    }
  
    .user-info {
      display: flex;
      align-items: center;
    }
  
    .welcome {
      margin-right: 10px; /* Adjust spacing as needed */
    }
  
    .logout-button {
      background-color: #f44336;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      font-family: 'Calibri', sans-serif;
      transition: background-color 0.2s   
   ease-in-out;
    }
  
    .logout-button:hover {
      background-color: #d32f2f;
    }
</style>