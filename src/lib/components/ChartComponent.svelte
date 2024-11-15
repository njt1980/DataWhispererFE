<script>
    import { onMount, onDestroy } from 'svelte';
    import Chart from 'chart.js/auto';
  
    export let chartType = 'bar';
    export let chartData;
    export let chartOptions = {};
  
    let canvas;
    let chartInstance;
  
    onMount(() => {
      if (canvas && chartData) {
        chartInstance = new Chart(canvas, {
          type: chartType,
          data: chartData,
          options: chartOptions,
        });
      }
    });
  
    onDestroy(() => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    });
</script>
  
<canvas bind:this={canvas} style="width: 100%; height: 100%;"></canvas>
  