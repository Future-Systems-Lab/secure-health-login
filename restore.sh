# Rights Reserved, Unlicensed
# restore.sh — quick restore of stable VitaChart + MetaMask connect

set -e

echo "[1/5] Switching to repo root..."
cd "$(dirname "$0")"

echo "[2/5] Resetting master to remote..."
git checkout master
git fetch origin
git reset --hard origin/master

echo "[3/5] Installing dependencies..."
cd web
pnpm install

echo "[4/5] Ensuring recharts is present..."
pnpm add recharts

echo "[5/5] Rebuilding app..."
pnpm run build

echo "✅ Restore complete. Start dev server with:"
echo "pnpm exec next dev -p 3011"
