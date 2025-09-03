# DD-Multitool

`dd-multitool` is a multi-service project consisting of a Discord bot, a backend calculation API, and a web frontend. Each service runs in its own Docker container, making it easy to deploy, scale, and update independently.

---

## Services

### 1. Bot

-   **Description:** A Discord bot that interacts with users and triggers calculations via the API.
-   **Technology:** Node.js / Discord.js
-   **Configuration:** Uses environment variables:
    -   `TOKEN` — Discord bot token
    -   `PREFIX` — Command prefix for the bot
    -   `SHARED_ENDPOINT` — URL to the API service (default: `http://api:2000/`)

### 2. API

-   **Description:** Backend API providing calculation services for the bot and web frontend.
-   **Technology:** Node.js / Express
-   **Configuration:**
    -   `PORT` — Port the API listens on (default: `2000`)

### 3. Web

-   **Description:** Frontend interface for interacting with the API, displaying results, and additional features.
-   **Technology:** React / Node.js
-   **Configuration:** Configured to communicate with the API service.

---

## Project Structure

dd-multitool/  
├─ bot/ # Discord bot code  
├─ api/ # Backend calculation API  
├─ web/ # Frontend  
├─ docker-compose.yml  
├─ containers-build.sh  
└─ README.md

---

## Prerequisites

-   [Docker](https://www.docker.com/) >= 20.x
-   [Docker Compose](https://docs.docker.com/compose/) >= 2.x
-   Node.js (for local development if needed)

---

## Setup & Deployment

1. **Clone the repository**

```bash
git clone https://gitea.overflow.fun/koneko/dd-multitool.git
cd dd-multitool
```

2. **Build and deploy containers**

```bash
bash containers-build.sh
docker compose up -d
```

Mainly meant to be used with Git.

3. **Access Services**

-   Bot: Invite to your discord server using your token in ENV var (read the docker-compose.yml)
-   API: http://localhost:2000/
-   Web: http://localhost:8080/

4. **Environtment variables**

```env
# Bot
TOKEN=<your_discord_bot_token>
PREFIX=<prefix you want>

# API
PORT=2000
```

5. **CI/CD Workflow**

On push to the main branch, the workflow:

-   Detects which services changed
-   Rebuilds only the changed containers
-   Restarts only the updated services
-   Commit messages containing "rebuild" will rebuild all services.

6. **Developing new features**

For local development, I recommend using `nodemon` for `bot` and `api` (bot also accepts a config.json instead of env var) and use `npm run dev` for `web`.  
You can try using docker for that, but I have no clue how to.
