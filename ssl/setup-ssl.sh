#!/bin/bash
# ============================================================
# BroodhillsGlobal — SSL Certificate Setup Script
# Uses Let's Encrypt via Certbot (free, auto-renewable)
# Run as root or with sudo on Ubuntu/Debian
# ============================================================

set -euo pipefail

DOMAIN="broodhillsglobal.com"
WWW_DOMAIN="www.broodhillsglobal.com"
EMAIL="admin@broodhillsglobal.com"   # ← Change to your admin email
WEBROOT="/var/www/certbot"

echo "========================================"
echo " BroodhillsGlobal SSL Setup"
echo " Domain: $DOMAIN"
echo "========================================"

# --- 1. Install Certbot ---
echo "[1/5] Installing Certbot..."
apt-get update -qq
apt-get install -y certbot python3-certbot-nginx

# --- 2. Create webroot for ACME challenges ---
echo "[2/5] Creating ACME challenge directory..."
mkdir -p "$WEBROOT"
chown -R www-data:www-data "$WEBROOT"

# --- 3. Obtain certificate ---
echo "[3/5] Obtaining Let's Encrypt certificate..."
certbot certonly \
    --nginx \
    --non-interactive \
    --agree-tos \
    --email "$EMAIL" \
    --domains "$DOMAIN,$WWW_DOMAIN" \
    --rsa-key-size 4096

echo "✓ Certificate obtained for $DOMAIN and $WWW_DOMAIN"

# --- 4. Generate strong Diffie-Hellman parameters ---
echo "[4/5] Generating DH parameters (this may take a moment)..."
if [ ! -f /etc/nginx/dhparam.pem ]; then
    openssl dhparam -out /etc/nginx/dhparam.pem 2048
    echo "✓ DH parameters generated"
else
    echo "✓ DH parameters already exist, skipping"
fi

# --- 5. Set up auto-renewal cron ---
echo "[5/5] Setting up auto-renewal..."

# Certbot installs a systemd timer automatically on Ubuntu 20.04+
# Verify it's active:
systemctl enable certbot.timer  2>/dev/null || true
systemctl start  certbot.timer  2>/dev/null || true

# Fallback cron in case systemd timer is not available
CRON_JOB="0 3 * * * certbot renew --quiet --post-hook 'systemctl reload nginx'"
(crontab -l 2>/dev/null | grep -v "certbot renew"; echo "$CRON_JOB") | crontab -

echo "✓ Auto-renewal configured"

# --- 6. Reload Nginx ---
echo "[6/6] Reloading Nginx..."
nginx -t && systemctl reload nginx

echo ""
echo "========================================"
echo " SSL Setup Complete!"
echo "========================================"
echo ""
echo " Certificate paths:"
echo "   cert:    /etc/letsencrypt/live/$DOMAIN/fullchain.pem"
echo "   key:     /etc/letsencrypt/live/$DOMAIN/privkey.pem"
echo "   chain:   /etc/letsencrypt/live/$DOMAIN/chain.pem"
echo ""
echo " Expiry: 90 days (auto-renews at 30 days)"
echo ""
echo " Next steps:"
echo "   1. Add nginx.conf to /etc/nginx/sites-available/broodhillsglobal"
echo "   2. ln -s /etc/nginx/sites-available/broodhillsglobal /etc/nginx/sites-enabled/"
echo "   3. nginx -t && systemctl reload nginx"
echo "   4. Test SSL: https://www.ssllabs.com/ssltest/analyze.html?d=$DOMAIN"
echo "   5. Submit to HSTS preload list: https://hstspreload.org"
echo ""
echo " Verify renewal:"
echo "   certbot renew --dry-run"
echo "========================================"
