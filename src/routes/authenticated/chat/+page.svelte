<script>
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { enhance } from '$app/forms';
  import ChartComponent from '$lib/components/ChartComponent.svelte';
  
  let userMessage = '';
  let chatMessages = [{ text: 'Hello! How can I assist you today?', sender: 'bot' }];
  let isChart = false;
  let chartType = null;
  let chartData = null;
  let chartOptions = null;

  // Form submission handler with enhanced progressive enhancement
  function handleSubmit({ form, data, action, cancel }) {
      // Add user message to chat immediately
      chatMessages = [...chatMessages, { text: userMessage, sender: 'user' }];
      userMessage = ''; // Clear input

      return async ({ result, update }) => {
          if (result.type === 'success') {
              if (result.data.hasChart) {
                  isChart = true;
                  const { chartConfig } = result.data;
                  chartType = chartConfig.chartType;
                  chartData = chartConfig.chartData;
                  chartOptions = chartConfig.chartOptions;
              } else {
                  isChart = false;
                  if (result.data.message) {
                      chatMessages = [...chatMessages, { 
                          text: result.data.message, 
                          sender: 'bot' 
                      }];
                  }
              }
          } else {
              chatMessages = [...chatMessages, { 
                  text: result.data.error || 'An error occurred', 
                  sender: 'bot' 
              }];
          }
      };
  }

  function handleKeydown(event) {
      if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          document.querySelector('form')?.requestSubmit();
      }
  }
</script>

<div class="chat-and-chart-container {isChart ? 'has-chart' : ''}">
  <!-- Chat Area -->
  <div class="chat-container">
      <div class="chat-messages">
          {#each chatMessages as message, i}
              <div 
                  transition:fly={{ x: 200, duration: 300 }} 
                  class="message {message.sender}"
              >
                  {message.text}
              </div>
          {/each}
      </div>
      
      <form 
          method="POST" 
          use:enhance={handleSubmit} 
          class="chat-input-container"
      >
          <input
              name="message"
              class="chat-input"
              type="text"
              bind:value={userMessage}
              on:keydown={handleKeydown}
              placeholder="Type your message..."
          />
          <button type="submit" class="send-btn">⏎</button>
      </form>
  </div>

  <!-- Chart Area -->
  <div class="chart-container {isChart ? '' : 'empty'}">
      {#if isChart}
          <ChartComponent {chartType} {chartData} {chartOptions} />
      {:else}
          <p>No chart to display.</p>
      {/if}
  </div>
</div>

<style>
  .chat-and-chart-container {
      display: flex;
      gap: 1rem;
      height: 100vh;
      padding: 1rem;
  }

  .chat-and-chart-container.has-chart {
      grid-template-columns: 1fr 1fr;
  }

  .chat-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 800px;
  }

  .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
  }

  .message {
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      max-width: 80%;
  }

  .message.user {
      align-self: flex-end;
      background-color: #007bff;
      color: white;
  }

  .message.bot {
      align-self: flex-start;
      background-color: #f0f0f0;
  }

  .chat-input-container {
      display: flex;
      gap: 0.5rem;
      padding: 1rem;
  }

  .chat-input {
      flex: 1;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 0.5rem;
  }

  .send-btn {
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
  }

  .chart-container {
      flex: 1;
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 0.5rem;
  }

  .chart-container.empty {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666;
  }
</style>