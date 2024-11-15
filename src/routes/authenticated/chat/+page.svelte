<script>
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import ChartComponent from '$lib/components/ChartComponent.svelte'; // Import the ChartComponent

  let userMessage = '';
  let chatMessages = [{ text: 'Hello! How can I assist you today?', sender: 'bot' }];
  

  // Variables for chart data
  let isChart = false;
  let chartType = null;
  let chartData = null;
  let chartOptions = null;

  // Send user message to FastAPI backend and get response
  async function sendMessage() {
    if (userMessage.trim() !== '') {
      // Add user message to chat
      chatMessages = [...chatMessages, { text: userMessage, sender: 'user' }];
      let messageToSend = userMessage;
      userMessage = ''; // Clear input field

      // Call the backend API to get the response
      try {
        const response = await fetch('http://127.0.0.1:8002/chatbot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_input: messageToSend }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Data from API:",data)

          if (data.chart_details.length > 0){
            isChart = true
            let jsonString = data.chart_details.replace(/^```json\n|\n```$/g, '').trim();
            let chartConfig = JSON.parse(jsonString);
            console.log("chartConfig :", chartConfig)
            chartType = chartConfig.chartType;
            chartData = chartConfig.chartData;
            chartOptions = chartConfig.chartOptions;
          } else {
            isChart = false;
            chatMessages = [...chatMessages, { text: data.user_response, sender: 'bot' }];
          }
        } else {
          chatMessages = [
            ...chatMessages,
            { text: 'Error: Could not get a response from the server.', sender: 'bot' },
          ];
        }
      } catch (error) {
        chatMessages = [
          ...chatMessages,
          { text: 'Error: Failed to fetch response from the backend.', sender: 'bot' },
        ];
      }
    }
  }

  function handleKeydown(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }
</script>

<style>
  .chat-and-chart-container {
    display: flex;
    width: 100%;
    height: 100%;
  }

  /* Chat Area */
  .chat-container {
    width: 100%; /* Initially take full width */
    padding: 1rem;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    background: #f4f6f8;
    transition: width 0.3s ease; /* Smooth transition when resizing */
  }

  /* Adjust chat-container to take half space if isChart is true */
  .has-chart .chat-container {
    width: 50%;
  }

  .chat-messages {
    padding: 1rem;
    flex: 1;
    overflow-y: auto;
    height: 400px;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .message {
    padding: 10px;
    max-width: 70%;
    border-radius: 12px;
    display: inline-block;
    font-size: 0.9rem;
    font-family: 'Poppins', 'Quicksand', sans-serif;
  }

  .message.bot {
    background-color: #e6f7ff;
    align-self: flex-start;
    border: 1px solid #a3d5ff;
  }

  .message.user {
    background-color: #d4f4db;
    align-self: flex-end;
    border: 1px solid #b3e5c9;
  }

  .chat-input-container {
    display: flex;
    padding: 0.75rem;
    border-top: 1px solid #ddd;
    background: #fafafa;
  }

  .chat-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 25px;
    font-size: 1rem;
    outline: none;
    font-family: 'Poppins', 'Quicksand', sans-serif;
  }

  .send-btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 50%;
    margin-left: 10px;
    cursor: pointer;
    font-family: 'Poppins', 'Quicksand', sans-serif;
  }

  .send-btn:hover {
    background-color: #45a049;
  }

  /* Chart Area */
  .chart-container {
    width: 50%; /* Default width when chart is present */
    padding: 1rem;
    background-color: #f0f0f0;
    display: none; /* Hide initially when no chart */
    justify-content: center;
    align-items: center;
    font-family: 'Poppins', 'Quicksand', sans-serif;
  }

  .has-chart .chart-container {
    display: flex;
  }

  .chart-container.empty {
    color: #888;
    font-size: 1.2rem;
  }

  @media (max-width: 600px) {
    .chat-and-chart-container {
      flex-direction: column;
    }
    .chat-container,
    .chart-container {
      width: 100%;
    }
  }
</style>

<!-- Add the class "has-chart" dynamically based on whether isChart is true -->
<div class="chat-and-chart-container {isChart ? 'has-chart' : ''}">
  <!-- Chat Area -->
  <div class="chat-container">
    <div class="chat-messages">
      {#each chatMessages as message, i}
        <div transition:fly="{{ x: 200, duration: 300 }}" class="message {message.sender}">
          {message.text}
        </div>
      {/each}
    </div>

    <div class="chat-input-container">
      <input
        class="chat-input"
        type="text"
        bind:value={userMessage}
        on:keydown={handleKeydown}
        placeholder="Type your message..."
      />
      <button class="send-btn" on:click={sendMessage}>⏎</button>
    </div>
  </div>

  <!-- Chart Area -->
  <div class="chart-container {isChart ? '' : 'empty'}">
    {#if isChart}
      <!-- Render the chart component, passing the chart data -->
      <ChartComponent {chartType} {chartData} {chartOptions} />
    {:else}
      <p>No chart to display.</p> <!-- Default empty state -->
    {/if}
  </div>
</div>
