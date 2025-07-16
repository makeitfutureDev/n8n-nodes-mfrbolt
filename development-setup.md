# n8n Node Development Setup

## Quick Development Setup

1. **Clone n8n repository:**
   ```bash
   git clone https://github.com/n8n-io/n8n.git
   cd n8n
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Copy your node files to n8n:**
   ```bash
   # Copy your credentials
   cp /path/to/your/credentials/CompanyApiCredentials.ts packages/nodes-base/credentials/

   # Copy your node files
   cp -r /path/to/your/nodes/CompanyApi packages/nodes-base/nodes/
   ```

4. **Register your node in n8n:**
   Add to `packages/nodes-base/package.json`:
   ```json
   {
     "n8n": {
       "credentials": [
         "dist/credentials/CompanyApiCredentials.js"
       ],
       "nodes": [
         "dist/nodes/CompanyApi/CompanyApi.node.js"
       ]
     }
   }
   ```

5. **Build and start:**
   ```bash
   npm run build
   npm run start
   ```

## Testing Your Node

1. **Start n8n** (using any method above)

2. **Access the UI** at `http://localhost:5678`

3. **Set up credentials:**
   - Go to Credentials
   - Add "Company API Credentials"
   - Enter your API Key and Base URL

4. **Create a workflow:**
   - Add your "Company API" node
   - Configure the operation (Get/Create Company)
   - Test with sample data

## Environment Variables for Testing

Create a `.env` file for testing:
```env
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=password
```

## Debugging

- Check n8n logs for errors
- Use `console.log()` in your node code
- Test API endpoints separately with tools like Postman
- Verify your credentials are working

## Common Issues

1. **Node not appearing:** Check package.json registration
2. **Credential errors:** Verify API key and base URL
3. **Build errors:** Run `npm run build` after changes
4. **Import errors:** Check TypeScript imports and types