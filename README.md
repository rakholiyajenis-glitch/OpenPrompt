# OpenPrompt

OpenPrompt is an open-source AI prompt testing and evaluation platform for developers.

## Features

- Prompt playground
- AI response generation
- Model abstraction
- Latency measurement
- Token usage measurement
- Evaluation-ready architecture
- TypeScript + Next.js
- Local development
- MIT licensed

## Getting started

Requirements: Node.js 20.9+.

```bash
npm install
```

Copy `.env.example` to `.env.local` and add your API key:

```env
OPENAI_API_KEY=your_key
OPENAI_MODEL=gpt-4o-mini
```

Run:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Roadmap

- Multi-model comparison
- Prompt versioning
- Dataset-based evaluations
- Regression tests
- Cost estimation
- JSON schema validation
- Ollama/local model support
- GitHub Actions integration
- Evaluation history
- Team workspaces

## Security

Never expose API keys in client-side code. Use environment variables and server-side routes.

## License

MIT
