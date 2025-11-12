# Webhook Setup Guide

## Error: "Webhook not registered"

If you're seeing this error, it means the n8n webhook endpoint is not configured correctly.

## Quick Fix Options

### Option 1: Set up n8n Webhook (Recommended)

1. **Start n8n** (if not already running):
   ```bash
   npx n8n
   ```
   Or if installed globally:
   ```bash
   n8n start
   ```

2. **Create a Webhook Node in n8n**:
   - Open n8n at `http://localhost:5678`
   - Create a new workflow
   - Add a "Webhook" node
   - Set the webhook path to: `webhook` (or any name you prefer)
   - Set HTTP Method to: `POST`
   - Save and activate the workflow

3. **Configure the webhook to return a response**:
   - Add a "Respond to Webhook" node after your webhook
   - Set the response body to:
     ```json
     {
       "reply": "Your AI response here"
     }
     ```

4. **Update your .env file** (if using a custom path):
   ```env
   VITE_WEBHOOK_PATH=your-webhook-name
   ```

### Option 2: Use Direct Webhook URL

1. Create a `.env` file in the project root:
   ```env
   VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook
   ```

2. Or if using ngrok:
   ```env
   VITE_N8N_WEBHOOK_URL=https://your-ngrok-url.ngrok.io/webhook
   ```

### Option 3: Mock/Demo Mode (For Testing UI)

If you just want to test the UI without n8n, you can modify `src/utils/api.js` to return a mock response:

```javascript
export async function sendToWebhook(message) {
  // Mock response for testing
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`I received your message: "${message}". This is a mock response. Set up your n8n webhook to get real AI responses.`)
    }, 1000)
  })
}
```

## Troubleshooting

### Error: "Cannot connect to server"
- Make sure n8n is running on `localhost:5678`
- Check if the port is correct in `vite.config.js`

### Error: "Webhook endpoint not found"
- Verify the webhook path matches in n8n
- Check that the workflow is activated in n8n
- Try accessing the webhook directly: `http://localhost:5678/webhook`

### Error: "Microphone permission denied"
- Allow microphone access in your browser settings
- Make sure you're using HTTPS or localhost (required for microphone access)

## Expected Webhook Response Format

Your n8n webhook should return JSON in this format:
```json
{
  "reply": "Your AI assistant's response text here"
}
```

## Example n8n Workflow

1. **Webhook Node**:
   - Path: `webhook`
   - Method: `POST`
   - Response Mode: `Last Node`

2. **AI/LLM Node** (e.g., OpenAI, Anthropic):
   - Process the incoming message
   - Generate a response

3. **Respond to Webhook Node**:
   - Response Body: `{{ $json.response }}` or format as `{ "reply": "..." }`

