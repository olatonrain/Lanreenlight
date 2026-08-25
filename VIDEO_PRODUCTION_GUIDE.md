# VIDEO PRODUCTION GUIDE
## "How to Host OmniRoute and n8n 24/7 on Contabo VPS 6"

> **Purpose:** Teleprompter-ready script with timestamps, screen cues, and copy-paste commands for a single-take recording workflow.
> **Target length:** ~14–18 minutes
> **Strategy reference:** MEMORY.md "Next video" entry — counter-programs local-only competitor install with always-on VPS angle
> **Companion page:** Will live at `https://lanreenlight.com/guides/omnroute-vps-setup` (to be built after recording)

---

## QUICK REFERENCE

| Element | Value |
|---------|-------|
| **Contabo VPS 6 referral link** | `https://lanreenlight.com/cheapestvps` |
| **OmniRoute repo** | `https://github.com/agentrouter/omnroute` (verify) |
| **n8n Docker image** | `docker.n8n.io/n8nio/n8n:latest` |
| **Key ports** | 20128 (OmniRoute), 5678 (n8n) |
| **Free providers to demo** | Kiro, Qoder, Pollinations, NVIDIA NIM, Cloudflare AI |
| **Recording date target** | Within 2 weeks of this guide |

---

## CHAPTER TIMESTAMPS (fill in after rough cut)

| Chapter | Approx. Time | Topic |
|---------|--------------|-------|
| 0:00 | Hook + outcome demo |
| 1:30 | Why VPS (always-on vs local) |
| 2:30 | Contabo VPS 6 signup (CTA) |
| 4:00 | SSH + basic hardening |
| 5:30 | Docker + Docker Compose install |
| 7:00 | OmniRoute container (port 20128) |
| 9:00 | n8n container (port 5678) |
| 11:00 | PM2 persistence + auto-start |
| 12:30 | Reverse proxy / domain (optional) |
| 14:00 | Live test: Kiro / Qoder / Pollinations |
| 15:30 | n8n workflow demo (webhook → AI) |
| 17:00 | Cost reality check + next steps |

---

## SCREEN CUE LEGEND

| Cue | Meaning |
|-----|---------|
| `[TERMINAL]` | Full-screen terminal (font size 16+, dark theme) |
| `[BROWSER]` | Browser window (show URL bar) |
| `[SPLIT]` | Terminal left, browser right |
| `[CODE]` | Editor (VS Code / nano) showing file contents |
| `[OVERLAY]` | Text overlay for commands/URLs (add in post) |
| `[TALKING]` | Face-to-camera (B-roll or webcam) |

---

## FULL SCRIPT

### 0:00 — HOOK + OUTCOME DEMO  `[SPLIT] → [TALKING]`

> **Script:**
> "You've seen the local-only OmniRoute install videos. They work — until you close your laptop. Today I'll show you how to run OmniRoute **and** n8n 24/7 on a $5 Contabo VPS 6, so your coding agents never sleep. By the end, you'll have a single VPS serving both: one API key routing to Claude, GPT, DeepSeek, plus full n8n automation — all persistent, all on hardware you control."

**Screen actions:**
1. `[SPLIT]` Terminal shows `curl http://YOUR_VPS_IP:20128/v1/models` → JSON model list
2. `[BROWSER]` Opens `http://YOUR_VPS_IP:5678` → n8n dashboard
3. `[TALKING]` Cut to face: "Total cost: ~$5/month. Zero subscription to any AI provider. Let's build it."

**Overlay:** `https://lanreenlight.com/cheapestvps` (affiliate — show briefly, don't linger)

---

### 1:30 — WHY VPS? (always-on vs local)  `[TALKING] + B-ROLL`

> **Script:**
> "Local installs are fine for testing. But if you're building agents that trigger on GitHub webhooks, run scheduled n8n workflows, or serve API endpoints for clients — you need uptime. A $5 VPS gives you: static IP, 99.9% uptime SLA, root access, and zero port-forwarding headaches. Contabo VPS 6 specifically: 2 vCPU, 8 GB RAM, 400 GB SSD — more than enough for OmniRoute (~200 MB RAM) + n8n (~500 MB) + Docker overhead."

**B-roll suggestions:**
- Screen recording of laptop closing → "local dies"
- UptimeRobot / status page showing 99.9%
- `htop` on VPS showing idle resources

---

### 2:30 — CONTABO VPS 6 SIGNUP (CTA)  `[BROWSER]`

> **Script:**
> "I use Contabo because the price-performance ratio at the VPS 6 tier is unmatched. Let me walk through the exact signup flow so there's zero ambiguity."

**Screen actions:**
1. Go to `https://lanreenlight.com/cheapestvps` (show URL bar)
2. Select **VPS 6** (2 vCPU, 8 GB, 400 GB SSD)
3. Region: choose closest to you (EU/US/Asia)
4. OS: **Ubuntu 22.04 LTS** (or 24.04)
5. SSH key: **add your public key now** (show `ssh-keygen -t ed25519` if needed)
6. No extra storage, no backups (we'll handle persistence ourselves)
7. Complete order → wait for provisioning email (2–10 min)

**Overlay:** "Full written guide: `https://lanreenlight.com/guides/omnroute-vps-setup`"

---

### 4:00 — SSH + BASIC HARDENING  `[TERMINAL]`

> **Script:**
> "VPS is up. First SSH, then lock it down."

**Commands (copy-paste ready):**

```bash
# 1. SSH in (replace with your VPS IP)
ssh root@YOUR_VPS_IP

# 2. Create non-root user (replace 'lanre')
adduser lanre --gecos "" --disabled-password
usermod -aG sudo lanre
mkdir -p /home/lanre/.ssh
cp /root/.ssh/authorized_keys /home/lanre/.ssh/
chown -R lanre:lanre /home/lanre/.ssh
chmod 700 /home/lanre/.ssh && chmod 600 /home/lanre/.ssh/authorized_keys

# 3. Harden SSH (as root)
sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
systemctl reload sshd

# 4. Switch to new user (new terminal tab)
ssh lanre@YOUR_VPS_IP

# 5. Basic firewall
sudo ufw allow OpenSSH
sudo ufw allow 20128/tcp   # OmniRoute
sudo ufw allow 5678/tcp    # n8n
sudo ufw enable
```

**Overlay each command block as it runs.**

---

### 5:30 — DOCKER + DOCKER COMPOSE  `[TERMINAL]`

> **Script:**
> "Docker is the cleanest way to isolate OmniRoute and n8n. One-line install."

**Commands:**

```bash
# Docker official convenience script
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker   # or logout/login

# Verify
docker run --rm hello-world
docker compose version
```

---

### 7:00 — OMNIROUTE CONTAINER (port 20128)  `[TERMINAL] + [CODE]`

> **Script:**
> "OmniRoute is open source. We'll run it via Docker Compose so it restarts automatically."

**Create `docker-compose.yml`:**

```yaml
version: '3.8'

services:
  omnroute:
    image: ghcr.io/agentrouter/omnroute:latest   # verify latest tag
    container_name: omnroute
    restart: unless-stopped
    ports:
      - "20128:20128"
    environment:
      - PORT=20128
      - LOG_LEVEL=info
    # Optional: persist config if OmniRoute adds file-based config later
    # volumes:
    #   - ./omnroute-data:/app/data

  n8n:
    image: docker.n8n.io/n8nio/n8n:latest
    container_name: n8n
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - N8N_HOST=0.0.0.0
      - N8N_PORT=5678
      - N8N_PROTOCOL=http
      - WEBHOOK_URL=http://YOUR_VPS_IP:5678/
      - GENERIC_TIMEZONE=Africa/Lagos   # adjust to your TZ
    volumes:
      - n8n_data:/home/node/.n8n

volumes:
  n8n_data:
```

**Screen actions:**
1. `[CODE]` Show file in editor
2. `[TERMINAL]` `docker compose up -d`
3. `[TERMINAL]` `docker compose logs -f omnroute` → wait for "Server listening on port 20128"
4. `[BROWSER]` `http://YOUR_VPS_IP:20128/v1/models` → show JSON response

---

### 9:00 — N8N CONTAINER (port 5678)  `[BROWSER] + [TERMINAL]`

> **Script:**
> "n8n is up on port 5678. First visit = owner setup."

**Screen actions:**
1. `[BROWSER]` Open `http://YOUR_VPS_IP:5678`
2. Create owner account (email + password)
3. Show dashboard — "This is your automation canvas. Every workflow runs 24/7 now."

---

### 11:00 — PM2 PERSISTENCE + AUTO-START  `[TERMINAL]`

> **Script:**
> "Docker's `restart: unless-stopped` handles container restarts. But if you ever run custom Node scripts outside Docker — or want process-level monitoring — PM2 is the standard. Let's add it for completeness."

**Commands:**

```bash
# Install PM2 globally
sudo npm install -g pm2

# Example: if you had a custom bridge script (not needed for this setup)
# pm2 start bridge.js --name omnroute-bridge
# pm2 save
# pm2 startup systemd -u $USER --hp /home/$USER
# sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp /home/$USER

# Verify
pm2 list
pm2 status
```

**Note:** Mention that for pure Docker workloads, PM2 is optional — but useful if they later add a custom reverse proxy or metrics exporter.

---

### 12:30 — REVERSE PROXY / DOMAIN (OPTIONAL)  `[CODE] + [TERMINAL]`

> **Script:**
> "If you own a domain, Caddy gives you HTTPS in 3 lines. Skip if you're fine with IP:port."

**Caddyfile example:**

```caddyfile
omnroute.yourdomain.com {
    reverse_proxy localhost:20128
}

n8n.yourdomain.com {
    reverse_proxy localhost:5678
}
```

**Commands:**

```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update && sudo apt install caddy
sudo systemctl enable --now caddy
```

---

### 14:00 — LIVE TEST: FREE PROVIDERS  `[SPLIT]`

> **Script:**
> "The whole point: one key, many models. Let's test the free providers I mentioned."

**Test matrix (run in terminal, show results):**

```bash
# 1. List available models (should show 20+)
curl -s http://YOUR_VPS_IP:20128/v1/models | jq '.data[].id'

# 2. Test Kiro (free Claude-compatible)
curl -s http://YOUR_VPS_IP:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"kiro","messages":[{"role":"user","content":"Say hello in 5 words"}]}' | jq '.choices[0].message.content'

# 3. Test Qoder
curl -s ... '{"model":"qoder",...}'

# 4. Test Pollinations
curl -s ... '{"model":"pollinations",...}'

# 5. Test NVIDIA NIM (if available)
# 6. Test Cloudflare AI
```

**Overlay:** Table of providers → model IDs (update from actual `/v1/models` output)

---

### 15:30 — N8N WORKFLOW DEMO  `[BROWSER]`

> **Script:**
> "Now n8n. I'll build a 30-second workflow: webhook → OmniRoute → response."

**Steps (narrate while clicking):**
1. New workflow → Add **Webhook** node (path: `/test`)
2. Add **HTTP Request** node → `http://localhost:20128/v1/chat/completions`
   - Method: POST
   - Headers: `Content-Type: application/json`
   - Body (JSON):
     ```json
     {
       "model": "kiro",
       "messages": [{ "role": "user", "content": "={{ $json.body.prompt }}" }]
     }
     ```
3. Add **Respond to Webhook** node → return `{{ $json.choices[0].message.content }}`
4. Save → Execute Workflow → Test URL in browser:
   `http://YOUR_VPS_IP:5678/webhook/test?prompt=Write%20a%20haiku%20about%20servers`

---

### 17:00 — COST REALITY CHECK + NEXT STEPS  `[TALKING]`

> **Script:**
> "Let's be honest about what this costs and what it doesn't do.
>
> **Monthly:** Contabo VPS 6 = ~$5. Domain = ~$1. That's it. No per-token AI fees for the free providers.
>
> **Limitations:** Free providers have rate limits. They're not production-grade for high-volume apps. OmniRoute doesn't magically make paid models free — it routes to whatever *you* have access to. The VPS is infrastructure, not income.
>
> **What's next:** Add monitoring (UptimeRobot), backups (cron + rclone to R2), maybe a load balancer if you scale. I'll link the full written guide in the description with every command, the Docker Compose file, and troubleshooting tips."

**On-screen summary card:**

| Component | Monthly Cost |
|-----------|--------------|
| Contabo VPS 6 | $4.99 |
| Domain (optional) | ~$1 |
| AI providers (free tier) | $0 |
| **Total** | **~$6** |

**Final CTA overlay:**
- "Get the VPS: `https://lanreenlight.com/cheapestvps`"
- "Written guide: `https://lanreenlight.com/guides/omnroute-vps-setup`"
- "n8n workflows repo: (link if you have one)"
- "Subscribe for the n8n deep-dive coming next"

---

## COPY-PASTE COMMAND BLOCK (for video description)

````markdown
## 📋 Complete Command Reference

### 1. VPS Signup
Get Contabo VPS 6 (2 vCPU, 8 GB, 400 GB SSD):  
👉 https://lanreenlight.com/cheapestvps

### 2. SSH + Hardening
```bash
ssh root@YOUR_VPS_IP
adduser lanre --gecos "" --disabled-password
usermod -aG sudo lanre
mkdir -p /home/lanre/.ssh && cp /root/.ssh/authorized_keys /home/lanre/.ssh/
chown -R lanre:lanre /home/lanre/.ssh && chmod 700 /home/lanre/.ssh && chmod 600 /home/lanre/.ssh/authorized_keys
sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
systemctl reload sshd
```
Then: `ssh lanre@YOUR_VPS_IP`

### 3. Firewall
```bash
sudo ufw allow OpenSSH && sudo ufw allow 20128/tcp && sudo ufw allow 5678/tcp && sudo ufw enable
```

### 4. Docker
```bash
curl -fsSL https://get.docker.com | sh && sudo usermod -aG docker $USER && newgrp docker
```

### 5. Docker Compose (save as `docker-compose.yml`)
```yaml
version: '3.8'
services:
  omnroute:
    image: ghcr.io/agentrouter/omnroute:latest
    container_name: omnroute
    restart: unless-stopped
    ports: ["20128:20128"]
    environment: {PORT: 20128, LOG_LEVEL: info}
  n8n:
    image: docker.n8n.io/n8nio/n8n:latest
    container_name: n8n
    restart: unless-stopped
    ports: ["5678:5678"]
    environment:
      N8N_HOST: 0.0.0.0
      N8N_PORT: 5678
      N8N_PROTOCOL: http
      WEBHOOK_URL: http://YOUR_VPS_IP:5678/
      GENERIC_TIMEZONE: Africa/Lagos
    volumes: [n8n_data:/home/node/.n8n]
volumes: {n8n_data:}
```

### 6. Launch
```bash
docker compose up -d && docker compose logs -f omnroute
```

### 7. Test
```bash
curl http://YOUR_VPS_IP:20128/v1/models | jq
curl -X POST http://YOUR_VPS_IP:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"kiro","messages":[{"role":"user","content":"Hello"}]}' | jq
```

### 8. n8n Setup
Open `http://YOUR_VPS_IP:5678` → create owner account

---

## 🔗 Links
- Written guide: https://lanreenlight.com/guides/omnroute-vps-setup
- VPS referral: https://lanreenlight.com/cheapestvps
- AgentRouter referral: https://agentrouter.org/register?aff=2CTV
- OmniRoute repo: https://github.com/agentrouter/omnroute
````

---

## RECORDING CHECKLIST (pre-flight)

- [ ] VPS provisioned and accessible
- [ ] Domain DNS pointed (if using Caddy)
- [ ] Terminal font: 16+ pt, high contrast theme
- [ ] Browser zoom: 110–125%
- [ ] OBS scenes configured: Terminal / Browser / Split / Talking
- [ ] Microphone test: -12 dB peaks, no room echo
- [ ] Backup recording (phone) running
- [ ] All command blocks pre-typed in a scratchpad for quick paste
- [ ] `jq` installed on VPS (`sudo apt install -y jq`) for pretty JSON

---

## POST-PRODUCTION NOTES

| Task | Tool | Notes |
|------|------|-------|
| Trim silence | DaVinci/CapCut | Target <2 sec gaps |
| Add chapter markers | YouTube Studio | Use timestamps above |
| Overlay commands | DaVinci/CapCut | Semi-transparent black bg, monospace font |
| Zoom on terminal output | Keyframes | When JSON responses appear |
| End screen | YouTube Studio | Link to AgentRouter video + VPS guide |
| Pinned comment | YouTube Studio | Paste command reference + links |
| Description | YouTube Studio | Use "Copy-paste command block" section above |

---

## COMPANION PAGE CONTENT (for site guide)

When the video is live, I'll build `/guides/omnroute-vps-setup` with:
- Full written walkthrough (this script, cleaned up)
- Embedded video
- Copy-paste command blocks (exact same as description)
- Docker Compose file download
- Troubleshooting FAQ (port conflicts, Docker permission denied, OmniRoute model list empty)
- Email capture: "Get the `docker-compose.yml` + n8n workflow JSON → enter email"
- Related guides sidebar: AgentRouter Setup, n8n Automation, VPS Hosting Guide

---

*Generated from MEMORY.md strategy + AgentRouter guide patterns. Update timestamps after rough cut.*