#!/usr/bin/env bash
# 一键发布到 ZCode Sites（主入口）
# 用法：bash publish.sh
set -euo pipefail
cd "$(dirname "$0")"

# 1. 找到 zcode-site CLI（插件更新后版本号会变，这里自动取最新）
ZS="${ZCODE_SITE_CLI:-}"
if [ -z "$ZS" ]; then
  ZS=$(ls -1 "$HOME/.zcode/cli/plugins/cache/zcode-plugins-official/zcode-site"/*/scripts/zcode-site.mjs 2>/dev/null \
       | sort -V | tail -1 || true)
fi
if [ -z "$ZS" ] || [ ! -f "$ZS" ]; then
  echo "❌ 找不到 zcode-site CLI。可手动指定："
  echo "   ZCODE_SITE_CLI=/path/to/zcode-site.mjs bash publish.sh"
  exit 1
fi

# 2. 重建打包目录（只放运行必需的文件）
echo "▶ 重建打包目录 .zcode-site/stage ..."
rm -rf .zcode-site/stage
mkdir -p .zcode-site/stage
cp -r index.html css js serve.js .zcode-site/stage/

# 3. 生成 start.sh（必须 LF 换行，云端用 bash 执行）
cat > .zcode-site/stage/start.sh <<'START'
#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"
export PORT="${PORT:-3000}"
exec node serve.js "$PORT"
START

echo "  文件清单："
find .zcode-site/stage -type f | sed 's|.zcode-site/stage/|    |' | sort

# 4. 本地预检：起服务并确认 / 返回 200
echo "▶ 本地预检 ..."
node "$ZS" check .zcode-site/stage

# 5. 发布（沿用已有站点，域名不变）
echo "▶ 上传发布 ..."
node "$ZS" deploy .zcode-site/stage

echo
echo "✅ 完成。主入口域名不变：https://food-academy-kk6v.zai-ai.site"
echo "   同步到 GitHub（备份入口）："
echo "   git add . && git commit -m 'update' && git push github master:main"
