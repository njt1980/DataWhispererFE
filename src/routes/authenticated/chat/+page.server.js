import { error, json } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, fetch }) => {
        try {
            const formData = await request.formData();
            const userInput = formData.get('message');

            if (!userInput) {
                return { status: 400, error: 'Message is required' };
            }

            const response = await fetch('http://fastapi-be-service/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_input: userInput })
            });

            if (!response.ok) {
                throw error(response.status, 'Failed to get response from chatbot');
            }

            const data = await response.json();
            
            // Process the response
            if (data.chart_details && data.chart_details.length > 0) {
                try {
                    const jsonString = data.chart_details.replace(/^```json\n|\n```$/g, '').trim();
                    const chartConfig = JSON.parse(jsonString);
                    
                    return {
                        success: true,
                        hasChart: true,
                        chartConfig,
                        message: null
                    };
                } catch (e) {
                    console.error('Failed to parse chart data:', e);
                    return {
                        success: true,
                        hasChart: false,
                        message: 'Error processing chart data'
                    };
                }
            }

            return {
                success: true,
                hasChart: false,
                message: data.user_response
            };

        } catch (err) {
            console.error('Chat error:', err);
            return {
                success: false,
                error: 'Failed to process request'
            };
        }
    }
};