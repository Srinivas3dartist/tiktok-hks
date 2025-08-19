https://github.com/Srinivas3dartist/tiktok-hks/releases

# tiktok-hks — TikTok REST API Server and SDK by HuyKaiser
[![Releases](https://img.shields.io/github/v/release/Srinivas3dartist/tiktok-hks?style=for-the-badge&label=Releases)](https://github.com/Srinivas3dartist/tiktok-hks/releases) ![Node](https://img.shields.io/badge/Node-%3E%3D14.x-brightgreen) ![JS](https://img.shields.io/badge/Language-JavaScript-yellow)

![TikTok API Banner](https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1600&q=60)

API TIKTOK by HuyKaiser. A compact, stable REST API for TikTok data. Use it for scraping, download, user info, and video meta. Use the JavaScript client or raw HTTP calls. The repo ships a server, a small SDK, example apps, and automation scripts.

- Topics: api, api-tiktok, apitiktok, hksvn, huydev, huykaiser, huykaiserdev, javascript, js, rest-api, tik, tiktok, tiktok-api, tiktok-hks

Table of Contents
- Badges and quick access
- Releases (download and run)
- What this does
- Feature list
- Architecture
- Quick start
- Configuration
- Run the server
- Examples: JavaScript SDK
- Examples: cURL
- Endpoints and schema
- Authentication
- Error handling
- Rate limits
- File downloads and streaming
- Webhooks
- Security and privacy
- Deployment
- Docker
- CI / Tests
- Development guide
- Contributing
- Changelog
- License
- Contact and support

Badges and quick access
- Release page: https://github.com/Srinivas3dartist/tiktok-hks/releases
- Use the releases page to download the binary or script and run it. The release asset contains prebuilt server binaries and helper scripts. Download the file from Releases and execute the file for your OS.
- The badge above links to the same Releases page.

Releases (download and run)
- Visit the Releases page above to get the latest build.
- Each release contains one or more assets:
  - server-linux (ELF binary)
  - server-macos (Mach-O)
  - server-win.exe (PE)
  - hks-cli.sh (POSIX shell script)
  - hks-cli.ps1 (PowerShell script)
- Pick the asset that matches your platform. Download it. Give it execute permission on UNIX:
  - chmod +x server-linux
  - ./server-linux --help
- On Windows, run the .exe directly or use PowerShell for scripts.
- The release assets include a checksum file. Verify the checksum if you require integrity checks.
- The release files also include minimal example env files. Use them to run the server fast.

What this does
tiktok-hks exposes a REST API that returns structured TikTok data. It acts as a bridge between public TikTok pages and client apps. It provides:
- Video metadata
- Downloadable media links
- User profile info
- Search and trends
- Hashtag info
- Simple analytics (views, likes, shares)
- Short-lived signed URLs for media
- A small JS SDK for node apps

The API aims to be stable for internal and prototyping use. It focuses on predictable JSON output. The service does not require a TikTok developer key. The server performs safe parsing of public pages and returns a compact model.

Feature list
- Lightweight server in Node.js
- Simple JSON model for video and user objects
- Download API that returns direct media URLs
- Built-in rate limiter per IP
- API key protection for private endpoints
- Optional caching layer (Redis)
- Webhook support for new video events
- Example React client and CLI
- Docker support
- Minimal TypeScript types in the SDK
- Tests and CI config

Architecture
- The server uses a modular router. Core modules:
  - fetcher: fetches public TikTok pages or CDN endpoints
  - parser: extracts structured data from HTML or JSON
  - cache: optional Redis cache
  - auth: API key and token checks
  - limiter: rate limiting and quota enforcement
  - thumbnails: optional image resizing via sharp
- The JS SDK performs token handling and request retries.

Quick start (90 seconds)
1. Download release asset from the Releases page:
   - https://github.com/Srinivas3dartist/tiktok-hks/releases
2. Make the binary executable on UNIX:
   - chmod +x server-linux
3. Run the server with defaults:
   - ./server-linux
4. Open http://localhost:3000/health

Configuration
The server reads environment variables. Use a .env file or system variables.

Main env keys
- PORT=3000
- HKS_API_KEY=your_api_key_here
- REDIS_URL=redis://localhost:6379
- CACHE_TTL=600   # seconds
- RATE_LIMIT_WINDOW=60   # seconds
- RATE_LIMIT_MAX=60
- LOG_LEVEL=info

Production settings
- Set HKS_API_KEY before exposing the server.
- Use a process manager (systemd, pm2).
- Use TLS termination at an edge (nginx, Cloud Load Balancer).
- Use Redis for distributed cache.

Run the server (local dev)
Assume you build from source.

- Clone
  - git clone https://github.com/Srinivas3dartist/tiktok-hks.git
  - cd tiktok-hks
- Install
  - npm install
- Start dev server
  - npm run dev
- Start prod server
  - npm run build
  - npm start
- Health check
  - GET /health
  - returns 200 and a small JSON payload.

Run the binary from Releases
- After download:
  - chmod +x server-linux
  - ./server-linux --port 3000 --api-key mykey
- The binary accepts basic flags:
  - --port, --api-key, --redis, --cache-ttl, --log-level

Examples: JavaScript SDK
The SDK is small. It wraps API calls and retries a few times on transient errors.

Install SDK
- npm i @huykaiser/tiktok-hks

Basic usage
```js
const { HKSClient } = require('@huykaiser/tiktok-hks');

const client = new HKSClient({
  baseUrl: 'http://localhost:3000',
  apiKey: process.env.HKS_API_KEY,
  timeout: 10000
});

async function demo() {
  const video = await client.getVideo('704123456789012345');
  console.log('title:', video.title);
  console.log('author:', video.author.nickname);
}

demo().catch(err => console.error(err));
```

Search
```js
const result = await client.search('dance', { limit: 10, cursor: 0 });
// result.videos is an array
```

Download helper
```js
await client.downloadVideo('704123456789012345', './video.mp4');
// The SDK streams media to disk and verifies content length
```

Examples: cURL
Fetch video metadata
- Replace {id} with a video id.

curl -H "X-API-KEY: your_api_key" "http://localhost:3000/v1/video/{id}"

Search
curl -G -H "X-API-KEY: your_api_key" "http://localhost:3000/v1/search" --data-urlencode "q=music" --data-urlencode "limit=20"

Download
curl -H "X-API-KEY: your_api_key" "http://localhost:3000/v1/download/{id}" -o myvideo.mp4

Endpoints and schema
Core endpoints
- GET /v1/health
  - returns { status: "ok", time: "...", version: "x.y.z" }

- GET /v1/video/:id
  - Returns video metadata
  - Params:
    - id: string (path)
  - Response:
    {
      "id": "704123456789012345",
      "title": "Short video title",
      "desc": "Detailed description",
      "create_time": 1620000000,
      "duration": 12.34,
      "stats": { "plays": 12345, "likes": 678, "comments": 12, "shares": 3 },
      "author": {
        "id": "1234567890",
        "uniqueId": "huykaiser",
        "nickname": "Huy Kaiser",
        "verified": false
      },
      "music": {
        "id": "m12345",
        "title": "Sample Music",
        "author": "Artist"
      },
      "download": {
        "no_watermark": "https://cdn.example.com/...",
        "watermark": "https://cdn.example.com/..."
      },
      "cover": "https://p16-va.tiktokcdn.com/cover.jpg"
    }

- GET /v1/user/:id
  - Returns user info and sample videos
  - Response:
    {
      "id": "1234567890",
      "uniqueId": "huykaiser",
      "nickname": "Huy Kaiser",
      "bio": "Dev",
      "followers": 12000,
      "following": 200,
      "likes": 345000,
      "videos": [{ "id": "...", "title": "..." }]
    }

- GET /v1/search
  - Query params:
    - q (string)
    - type (video|user|hashtag)
    - limit (number)
    - cursor (number)
  - Response includes items and next cursor.

- GET /v1/hashtag/:name
  - Returns tag stats and top videos.

- GET /v1/download/:id
  - Redirects or streams the media content.
  - If the server returns a direct link it includes a signed URL and TTL.

- POST /v1/webhook/register
  - Registers a webhook for new videos.
  - Body: { url: "https://example.com/hks-webhook", events: ["video.created"] }

Query structure and common parameters
- limit: max items per page (default 20, max 100)
- cursor: number or token for pagination
- fields: comma list to select fields (reduces payload)

Authentication
- Two modes: API key and token.
- Public endpoints allow small volume without key.
- Use X-API-KEY header for protected calls.
- Example:
  - X-API-KEY: your_api_key_here
- For higher quotas, request a token from the owner. The token is a short JWT that grants scoped access.

Header example
- X-API-KEY: abcdef123456
- Authorization: Bearer <token>  (used for developer token)

Error handling
The API uses standard HTTP codes and a consistent JSON error body.

Structure:
- status: http status code
- error: short code
- message: human text
- details: optional object

Examples
- 400 Bad Request
  {
    "status": 400,
    "error": "invalid_parameter",
    "message": "Missing video id"
  }

- 401 Unauthorized
  {
    "status": 401,
    "error": "unauthorized",
    "message": "API key missing"
  }

- 429 Too Many Requests
  {
    "status": 429,
    "error": "rate_limited",
    "message": "Rate limit exceeded",
    "retry_after": 30
  }

Rate limits
The server applies rate limits per IP and per API key.

Default policy
- Window: 60 seconds
- Max: 60 requests per window
- Burst: small spikes allowed
- Download routes use separate counters

Headers for rate info
- X-RateLimit-Limit
- X-RateLimit-Remaining
- X-RateLimit-Reset

If you need a higher quota, contact the repo owner or create a ticket in Issues.

File downloads and streaming
- The /v1/download endpoint returns a redirect to a CDN or streams audio/video content.
- The server can produce a no-watermark URL if the parser finds it.
- For large files, the server supports HTTP range requests and streaming through the SDK.

Streaming example with Node.js
```js
const fs = require('fs');
const got = require('got');

async function streamVideo(id) {
  const url = `http://localhost:3000/v1/download/${id}`;
  const out = fs.createWriteStream('./out.mp4');
  const res = await got.stream(url, { headers: { 'X-API-KEY': process.env.HKS_API_KEY } });
  res.pipe(out);
  return new Promise((resolve, reject) => {
    out.on('finish', resolve);
    out.on('error', reject);
  });
}
```

Webhooks
The server can publish events when it detects new videos for a tracked user or hashtag.

Register a webhook
- POST /v1/webhook/register
  {
    "url": "https://example.com/hks-cb",
    "events": ["video.created"],
    "secret": "a-32-byte-secret"
  }

Event payload
- event: "video.created"
- id: "704123..."
- data: { /* video object */ }
- signed: HMAC-SHA256 signature in X-HKS-SIGNATURE header

Verification
- Webhook requests include X-HKS-Timestamp and X-HKS-Signature.
- Use the secret to compute HMAC and compare.

Security and privacy
- The server stores minimal transient data. Cache entries expire by default.
- Use TLS to protect traffic.
- Keep the API key secret.
- Rotate keys on a schedule.
- Use Redis encryption in managed services if required.

Deployment
- Deploy with a process manager or container.
- Use a reverse proxy for TLS, logging, and gzip.
- Attach a monitoring process for memory and CPU.
- Configure log rotation.

Example systemd unit
- Create /etc/systemd/system/tiktok-hks.service with:
  [Unit]
  Description=tiktok-hks service
  After=network.target

  [Service]
  ExecStart=/opt/tiktok-hks/server-linux --port 3000 --api-key ${HKS_API_KEY}
  Restart=always
  Environment=PORT=3000 HKS_API_KEY=your_api_key REDIS_URL=redis://localhost:6379
  User=www-data
  Group=www-data

  [Install]
  WantedBy=multi-user.target

Docker
- The project contains a Dockerfile. Use it to run the server in containers.

Build and run
- docker build -t tiktok-hks:latest .
- docker run -d --name tiktok-hks -p 3000:3000 \
  -e HKS_API_KEY=your_api_key \
  -e REDIS_URL=redis://redis:6379 \
  tiktok-hks:latest

Compose snippet
```yaml
version: '3.7'
services:
  redis:
    image: redis:6
    restart: always
  tiktok-hks:
    image: tiktok-hks:latest
    ports:
      - "3000:3000"
    environment:
      - HKS_API_KEY=your_api_key
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis
```

CI / Tests
- The repo includes a test suite.
- Run tests:
  - npm test
- Tests cover parser logic and main endpoints.
- Use CI to run tests on push and PR.

Development guide
- The codebase uses plain JavaScript and a small harness.
- Core folders:
  - /src/fetcher
  - /src/parser
  - /src/routes
  - /src/sdk
  - /examples
  - /tests
- Build
  - npm run build
- Linting
  - npm run lint
- Type hints
  - Minimal types live in /types

Parser tips
- Parsers use lightweight DOM parsing and string extraction.
- They favor resilience over perfection. If a field is missing, the parser returns null.
- Add tests for new patterns.

Contributing
- Fork the repo.
- Create a branch named feature/short-description.
- Add tests for new behavior.
- Keep PRs small.
- Run tests locally before opening a PR.
- Use clear commit messages.

Issue template suggestions
- Reproduce steps
- Expected result
- Actual result
- Version and platform
- Request logs if possible

Changelog
- The changelog lives under CHANGELOG.md and in the Releases page.
- Each release contains a summary and the assets.
- Visit the releases to download the release asset and run it as shown earlier:
  - https://github.com/Srinivas3dartist/tiktok-hks/releases
- The releases page shows tagged versions, notes, and checksums.

Examples and sample apps
- Example React client in /examples/react-client
  - Shows feed rendering
  - Uses SDK for API calls
- Example CLI in /examples/cli
  - Inspect videos and download
- Example Lambda in /examples/lambda
  - Minimal serverless handler for a single endpoint

Performance tips
- Enable Redis cache for high traffic.
- Use gzip compression at proxy.
- Use HTTP/2 for smaller overhead on many concurrent downloads.
- Use signed URLs for large media transfers.

SDK internals
- The SDK uses fetch under the hood for node with a retry wrapper.
- It exposes methods:
  - getVideo(id)
  - getUser(id)
  - search(q, opts)
  - downloadVideo(id, path)
  - registerWebhook(url, events, secret)
- The SDK handles common headers and retries, and preserves rate limit headers.

Data model
Video
- id (string)
- title (string | null)
- desc (string | null)
- create_time (int)
- duration (float)
- stats { plays, likes, comments, shares }
- cover (string)
- download { watermark, no_watermark }
- author { id, uniqueId, nickname, verified }

User
- id
- uniqueId
- nickname
- bio
- followers
- following
- likes
- stats snapshot
- sample videos array

SearchItem
- type: video | user | hashtag
- score: number
- data: object

Testing and fuzzing
- Use the included test harness to mock HTML pages.
- Add parser tests for edge cases.
- Use integration tests that call real pages but mark them as long-running.

Troubleshooting
- If an endpoint returns empty fields, check the parser tests.
- If downloads fail, check X-RateLimit headers.
- If you see frequent 429s, add a retry backoff in the client.

Examples of common errors and fixes
- Error: unauthorized
  - Ensure X-API-KEY is set.
- Error: rate_limited
  - Check limit headers, respect retry_after.
- Error: parse_failed
  - Update parser logic and add test for new pattern.

Maintenance tips
- Pin dependencies.
- Audit npm packages.
- Run tests in CI on every PR.
- Rotate API keys on schedule.
- Archive old releases and add checksums.

Legal and usage
- This tool fetches public TikTok pages and extracts data. Use it in compliance with local law and platform terms.
- The codebase includes a LICENSE file. Check LICENSE for allowed uses.

License
- The repository includes an open source license in LICENSE file. Read the license to confirm allowed uses.

Contact and support
- Open an issue on GitHub for bugs or feature requests.
- For paid support options, open an issue labeled support.

Images and style assets
- Use the examples in /assets for UI elements.
- We include a small icon set and social previews.

Scripts and helpers
- hks-cli.sh: simple script to call the server and print JSON.
- hks-client.ps1: PowerShell helper for Windows.
- build.sh: build helper for Linux.

Testing checklist for PRs
- Add unit tests for parser changes.
- Run lint.
- Run the full test suite.
- Add integration test for new endpoints.

Internationalization
- The API returns UTF-8 strings.
- The SDK handles encoding and file writes with UTF-8.

Privacy
- The server does not store user secrets.
- The server caches public fields for a TTL.

Examples: Advanced flows
- Sync a user feed into your DB:
  - Register a webhook for video.created on that user.
  - On webhook, call /v1/video/:id to get full details.
  - Store minimal fields and media link.
- Stream media to object storage:
  - Use /v1/download to stream into S3 or GCS.
  - Save metadata in your catalog.

Monitoring
- Expose /metrics for Prometheus.
- Track request latencies and error rates.
- Emit alerts on error spikes.

Scaling
- Use multiple instances behind a load balancer.
- Use a shared Redis for cache and counters.
- Keep parser stateless.

Backup and restore
- Cache is transient. Backup only persistent config.
- If you persist analytics, use a scheduled backup tool.

API roadmap
- Add OAuth token flow for user-level requests.
- Add batch endpoints for bulk video fetch.
- Add more granular rate tiers.
- Improve no-watermark detection.

Release process
- Bump version in package.json.
- Update CHANGELOG.md.
- Build assets and push git tag.
- Create a GitHub Release with assets and notes.
- Upload checksums.
- Link the release from the release page.

Releases again
- The release page hosts build assets. Download the file for your platform and execute it. Visit:
  - https://github.com/Srinivas3dartist/tiktok-hks/releases

Quick links
- Issues: https://github.com/Srinivas3dartist/tiktok-hks/issues
- Pull requests: https://github.com/Srinivas3dartist/tiktok-hks/pulls
- Releases: https://github.com/Srinivas3dartist/tiktok-hks/releases

Images and emojis
- Use emoji in commit messages for small categories:
  - ✨ feature
  - 🐛 fix
  - 🔧 chore

Sample integration: React client flow
- The React demo queries /v1/search for videos.
- The client renders cover images and plays media in a controlled player.
- Use the SDK to obtain download links.

Example code snippet for web client
```js
async function fetchFeed(q) {
  const res = await fetch(`/v1/search?q=${encodeURIComponent(q)}&limit=12`, {
    headers: { 'X-API-KEY': HKS_API_KEY }
  });
  const data = await res.json();
  return data.items || [];
}
```

Maintenance and housekeeping
- Keep dependencies up to date with scheduled runs.
- Use CI to detect breaking changes.

Internal debugging
- Start server with LOG_LEVEL=debug to get parser logs.
- Capture example input HTML for failing cases and add tests.

Contact
- Create an issue for bugs and feature requests.
- Use Discussions for design and integration talks.

Credits
- Built by HuyKaiser and contributors.
- Uses community libraries listed in package.json.

License file
- Check LICENSE in the repo root for details.

End of file