# Keyword Extraction App (Option 2 — Single combined server)

This project contains a React frontend served by an Express backend (single combined server).
The Express server serves the React production build from `client/build` and exposes a `/keyword` endpoint
that accepts `multipart/form-data` file uploads and returns mock keywords.

## Run locally

1. Install server deps:
```bash
npm install
```

2. Install client deps and build the React app:
```bash
cd client
npm install
npm run build
cd ..
```

3. Start the server:
```bash
npm start
```

4. Open in browser:
```
http://localhost:3000
```

The React app will POST uploads to `/keyword` and display returned keywords.

## Notes
- This is a mock keyword extractor — the server does not perform real NLP, it returns mock keywords.
- If you want hot-reloading for development, run the client separately (`cd client && npm start`) and use a proxy or CORS.
