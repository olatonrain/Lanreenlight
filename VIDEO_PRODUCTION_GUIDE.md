# VIDEO PLAN — OmniRoute on Contabo VPS 6

> **Purpose:** Structured shooting plan (not a script). Use it to know what to do, say, and show at each step while recording.
> **Target length:** ~10–13 minutes (OmniRoute only). n8n is a separate, optional section at the end — or its own video.
> **Strategy:** Counter-programs the local-only OmniRoute competitor video with an always-on VPS angle. VPS is the required unlock, not the pitch.

---

## QUICK REFERENCE

| Element | Value |
|---------|-------|
| **Contabo VPS 6 referral link** | `https://lanreenlight.com/cheapestvps` |
| **OmniRoute repo** | `https://github.com/agentrouter/omnroute` (verify) |
| **Key port** | 20128 (OmniRoute) |
| **Free providers to demo** | Kiro, Qoder, Pollinations, NVIDIA NIM, Cloudflare AI |
| **n8n port (optional part)** | 5678 |

---

## VIDEO FLOW (phases, no fixed timestamps)

| Phase | Topic | On-screen |
|-------|-------|-----------|
| 1 | Hook — live outcome demo | Split: terminal + browser |
| 2 | Why always-on (VPS vs local) | Talking + b-roll |
| 3 | Contabo VPS 6 signup (CTA) | Browser |
| 4 | SSH + basic hardening | Terminal |
| 5 | Docker install | Terminal |
| 6 | **OmniRoute install + config** | Terminal + code |
| 7 | Live test — free providers | Split |
| 8 | Cost reality check + next steps | Talking + summary card |
| 9 | *(Optional) n8n install* | Browser + terminal |

---

## PART A — OMNIROUTE ONLY (core video)

### Phase 1 — Hook: show the outcome first

**Goal:** Viewer sees a working OmniRoute endpoint in the first 30 seconds.

**Do:**
- [ ] Terminal: `curl http://YOUR_VPS_IP:20128/v1/models` → shows a long JSON model list
- [ ] Terminal: send one chat completion to a free provider (Kiro) → gets a reply
- [ ] Say the hook line: *"This runs 24/7 on a ~$5 VPS — your laptop can be off."*

### Phase 2 — Why a VPS (always-on vs local)

**Key points to hit:**
- Local OmniRoute installs die when the laptop sleeps/closes
- A VPS gives: static IP, 24/7 uptime, root access, no port forwarding
- Contabo VPS 6 is plenty: OmniRoute needs only ~1 vCPU / 1–2 GB RAM
- Position: *"the server is the engine — the agent/API is what runs on it"*

**B-roll ideas:**
- Laptop closing → "local install dies"
- `htop` on the VPS showing idle headroom

### Phase 3 — Contabo VPS 6 signup (CTA moment)

**Do (on browser, show URL bar):**
- [ ] Go to `https://lanreenlight.com/cheapestvps`
- [ ] Pick VPS 6 tier (2 vCPU / 8 GB / 400 GB SSD)
- [ ] Choose region nearest your audience
- [ ] OS: Ubuntu 22.04 LTS (or 24.04)
- [ ] Add your SSH public key during signup (if available)
- [ ] Complete order; mention provisioning takes ~2–10 min

**Talking point:** *"This is my referral link — I use this exact tier. You pay nothing extra."*

### Phase 4 — SSH + basic hardening

**Do (terminal):**
```bash
# SSH in as root
ssh root@YOUR_VPS_IP

# Create a normal user
adduser lanre --gecos "" --disabled-password
usermod -aG sudo lanre
mkdir -p /home/lanre/.ssh
cp /root/.ssh/authorized_keys /home/lanre/.ssh/
chown -R lanre:lanre /home/lanre/.ssh
chmod 700 /home/lanre/.ssh && chmod 600 /home/lanre/.ssh/authorized_keys

# Disable root + password login
sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
systemctl reload sshd
```
- [ ] Continue as `lanre` in a fresh terminal: `ssh lanre@YOUR_VPS_IP`

**Firewall (open only what we need):**
```bash
sudo ufw allow OpenSSH
sudo ufw allow 20128/tcp   # OmniRoute
sudo ufw enable
```

**Say briefly:** why non-root user + key-only login matter (one sentence each, no lecture).

### Phase 5 — Install Docker

**Do (terminal):**
```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker        # or logout/login
docker run --rm hello-world   # verify
docker compose version
```

**Talking point:** *"Docker keeps OmniRoute isolated, and its restart policy keeps it alive across reboots."*

### Phase 6 — OmniRoute install + config (the core of the video)

**Step 1 — Create the compose file** (`docker-compose.yml`):

```yaml
version: '3.8'

services:
  omnroute:
    image: ghcr.io/agentrouter/omnroute:latest   # verify current tag
    container_name: omnroute
    restart: unless-stopped
    ports:
      - "20128:20128"
    environment:
      - PORT=20128
      - LOG_LEVEL=info
```

**Step 2 — Launch and watch the logs:**
```bash
docker compose up -d
docker compose logs -f omnroute
# wait for: "Server listening on port 20128"
```

**Step 3 — Verify the endpoint:**
```bash
curl http://YOUR_VPS_IP:20128/v1/models | jq
```

**Step 4 — Point a client at it** (show one integration):
- Claude Code: `ANTHROPIC_BASE_URL=http://YOUR_VPS_IP:20128/v1`
- or OpenCode provider config
- or just a raw `curl` chat completion

**Say:** *"One endpoint, one key, many providers — reachable from any device, any time."*

### Phase 7 — Live test: free providers

**Do (split screen):**
```bash
# List available models (should show 20+)
curl -s http://YOUR_VPS_IP:20128/v1/models | jq '.data[].id'

# Test a free provider (repeat for Qoder / Pollinations / NVIDIA NIM / Cloudflare AI)
curl -s http://YOUR_VPS_IP:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"kiro","messages":[{"role":"user","content":"Say hello in 5 words"}]}' | jq '.choices[0].message.content'
```
- [ ] Show at least 2–3 providers responding live
- [ ] Overlay: provider → model-id table (fill from actual `/v1/models` output)

### Phase 8 — Cost reality check + next steps

**Key points to hit (honest, no hype):**
- Monthly: VPS ~$5 + optional domain ~$1. Free providers = $0 tokens
- Limitations: free tiers have rate limits; not for high-volume production
- OmniRoute routes to what you have access to — it doesn't make paid models free
- *"The VPS is infrastructure, not income."*
- Next steps: monitoring (UptimeRobot), backups (cron + rclone), HTTPS via Caddy (optional)

**On-screen summary card:**

| Component | Monthly Cost |
|-----------|--------------|
| Contabo VPS 6 | $4.99 |
| Domain (optional) | ~$1 |
| AI providers (free tier) | $0 |
| **Total** | **~$6** |

**Ending CTAs:**
- Get the VPS: `https://lanreenlight.com/cheapestvps`
- Written guide: `https://lanreenlight.com/guides/omnroute-vps-setup`
- If applicable: "Next video — n8n on the same server, subscribe."

---

## PART B — N8N INSTALLATION (separate / optional)

> Use this as a **separate video** ("How to Host n8n 24/7 on Your OmniRoute VPS") or as a Part 2 within one video. Kept separate on purpose — OmniRoute alone is a complete, focused video.

**Step 1 — Add the n8n service to the same compose file** (or a second one):

```yaml
  n8n:
    image: docker.n8n.io/n8nio/n8n:latest
    container_name: n8n
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      N8N_HOST: 0.0.0.0
      N8N_PORT: 5678
      N8N_PROTOCOL: http
      WEBHOOK_URL: http://YOUR_VPS_IP:5678/
      GENERIC_TIMEZONE: Africa/Lagos   # adjust
    volumes:
      - n8n_data:/home/node/.n8n
```

**Step 2 — Open firewall for n8n:**
```bash
sudo ufw allow 5678/tcp
```

**Step 3 — Launch + first login:**
```bash
docker compose up -d
```
- Open `http://YOUR_VPS_IP:5678` → create owner account

**Step 4 — (Demo) Webhook → OmniRoute workflow:**
- Workflow: **Webhook** node (`/test`) → **HTTP Request** node to `http://localhost:20128/v1/chat/completions` (body includes `{{ $json.body.prompt }}`) → **Respond to Webhook** returning the reply
- Test: `http://YOUR_VPS_IP:5678/webhook/test?prompt=Write%20a%20haiku%20about%20servers`

**Why n8n belongs with OmniRoute:** same server, same Docker network, workflows trigger AI calls around the clock.

---

## RECORDING PLAN

| Step | Action |
|------|--------|
| Scenes | OBS: Terminal / Browser / Split / Talking — switch per phase table |
| Terminal | Font 16+, dark theme, no window chrome |
| Browser | Show URL bar, zoom 110–125% |
| Commands | Keep a scratchpad file with every command pre-typed (paste, don't type live) |
| `jq` | `sudo apt install -y jq` on the VPS before recording |
| Mic | Peaks at -12 dB, no room echo |
| Backup | Phone recording running as safety |
| Pre-record | Provision VPS, install Docker, have OmniRoute running before camera starts |

## POST-PRODUCTION NOTES

| Task | Tool | Notes |
|------|------|-------|
| Trim dead air | DaVinci/CapCut | <2 sec gaps |
| Chapter markers | YouTube Studio | One per phase (phases double as chapters) |
| Command overlays | DaVinci/CapCut | Monospace, semi-transparent black bg |
| Zoom on JSON output | Keyframes | When `/v1/models` responds |
| End screen | YouTube Studio | Link to AgentRouter video + VPS guide |
| Pinned comment | YouTube Studio | Paste command reference + both links |
| Description | YouTube Studio | Use the block below |

---

## COPY-PASTE COMMAND BLOCK (for the video description)

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
sudo ufw allow OpenSSH && sudo ufw allow 20128/tcp && sudo ufw enable
```

### 4. Docker
```bash
curl -fsSL https://get.docker.com | sh && sudo usermod -aG docker $USER && newgrp docker
```

### 5. OmniRoute (docker-compose.yml)
```yaml
version: '3.8'
services:
  omnroute:
    image: ghcr.io/agentrouter/omnroute:latest
    container_name: omnroute
    restart: unless-stopped
    ports: ["20128:20128"]
    environment: {PORT: 20128, LOG_LEVEL: info}
```

### 6. Launch + Test
```bash
docker compose up -d
docker compose logs -f omnroute
curl http://YOUR_VPS_IP:20128/v1/models | jq
curl -X POST http://YOUR_VPS_IP:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"kiro","messages":[{"role":"user","content":"Hello"}]}' | jq
```

---

## 🔗 Links
- Written guide: https://lanreenlight.com/guides/omnroute-vps-setup
- VPS referral: https://lanreenlight.com/cheapestvps
- AgentRouter referral: https://agentrouter.org/register?aff=2CTV
- OmniRoute repo: https://github.com/agentrouter/omnroute
````

---

## COMPANION PAGE SPEC (`/guides/omnroute-vps-setup`)

Built after the video is recorded:
- Full written walkthrough (this plan, cleaned up)
- Embedded video
- Same copy-paste command blocks as the description
- Docker Compose file download
- Troubleshooting FAQ (port conflicts, Docker permission denied, empty model list)
- Email capture: "Get the `docker-compose.yml` → enter email" (lead magnet)
- Related guides sidebar: AgentRouter Setup, n8n Automation, VPS Hosting Guide

---

*OmniRoute is the complete core video (~10–13 min). n8n is a separate follow-up — two focused videos beat one bloated one.*