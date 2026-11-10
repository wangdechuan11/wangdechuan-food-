# 部署手册

本项目是**纯静态站点**：无构建步骤、无 npm 依赖、无后端。
6 个文件即可运行：

```
index.html
css/style.css
js/data.js
js/ingredients.js
js/photos.js
js/app.js
```

食材图片来自 TheMealDB 外链，不占用你自己的带宽/存储。

---

## 当前线上地址

| 平台 | 地址 | 状态 |
|---|---|---|
| ZCode Sites（主） | https://food-academy-kk6v.zai-ai.site | ✅ 在线 |
| GitHub Pages（备） | 见下方 A 方案，按步骤开通 | ⏳ 待开通 |

---

## A. GitHub Pages（推荐做备份）

仓库根已经放好了自动化配置：`.github/workflows/deploy-pages.yml`
它只发布 `ordering-h5/` 这个子目录，仓库里的其他内容不会上线。

### 一次性开通

**方式一：沿用现在这个仓库**（推荐，已有配置）

1. 在 GitHub 上新建一个空仓库（不要勾选 README）
2. 本机加一个远程地址并推送：

```bash
cd D:/MyWork/gitWork

# 换成你自己的仓库地址
git remote add github git@github.com:<你的用户名>/<仓库名>.git
git push github master
```

3. 打开仓库 → **Settings → Pages → Build and deployment → Source** 选 **GitHub Actions**
4. 等 Actions 跑完（约 1 分钟），地址是：

```
https://<你的用户名>.github.io/<仓库名>/
```

> 这个仓库目前 `ordering-h5/` 还是未提交状态，推送前要先 `git add` 并 commit。

**方式二：新建独立仓库只放本站点**（最省事）

把 6 个文件直接放在仓库根目录，然后 **Settings → Pages → Source** 选
**Deploy from a branch** → 分支 `main`、目录 `/ (root)`，保存即可。
这种方式不需要 Actions，也不需要 `.github/workflows/`。

### 以后更新

```bash
git add ordering-h5 && git commit -m "update recipes"
git push github master
```

推送后自动重新部署，**地址不变**。

> 只改了 `ordering-h5/` 以外的文件不会触发部署（workflow 里限定了 paths）。

### 注意

- 国内访问 GitHub Pages 偶有波动，这也是保留 ZCode Sites 作为主入口的原因
- 仓库里有 `.github/workflows/deploy-pages.yml`，Gitee 不会执行它，不影响现有流程

---

## B. Gitee Pages（你已有 Gitee 仓库）

你现在的 origin 是 `gitee.com/wangdechuanhh/wdc001`，理论上可以直接用，但有几个限制要先知道：

| 限制 | 说明 |
|---|---|
| 实名认证 | 开通 Gitee Pages 必须完成实名认证 |
| 部署目录 | 只能选**仓库根目录**或 `docs/`，**不能指定 `ordering-h5/` 子目录** |
| 服务可用性 | Gitee Pages 免费版长期处于"维护/暂停新开通"状态，未必能开 |

如果确实要用，做法是把文件同步一份到 `docs/`（或在仓库根建独立分支），再在仓库页 **服务 → Gitee Pages** 开通。这会引入"源码两份"的维护成本，**一般不建议**。

---

## C. 任意静态托管（最快，不依赖 git）

已经打好包，直接拖拽上传即可：

```
ordering-h5/.zcode-site/publish/food-academy-static.zip   (42 KB)
```

解压后是标准的静态站点结构，可直接用于：

- **Cloudflare Pages**（免费、无限流量、全球 CDN）
- **Netlify**（拖拽 app.netlify.com/drop）
- **Vercel**
- 自己的服务器 / 对象存储（OSS、COS、S3）

这些都只需要上传文件，**不需要构建命令**；若平台询问 Build command 留空，Publish/Output directory 填 `.` 或 `/`。

---

## 重新生成上传包

改了代码后重新打包：

```bash
cd D:/MyWork/gitWork/work/ordering-h5
rm -rf .zcode-site/publish && mkdir -p .zcode-site/publish/dist
cp index.html .zcode-site/publish/dist/
cp -r css js .zcode-site/publish/dist/
cd .zcode-site/publish
powershell -NoProfile -Command "Compress-Archive -Path 'dist\*' -DestinationPath 'food-academy-static.zip' -Force"
```

---

## 发布到 ZCode Sites（主入口）

```bash
cd D:/MyWork/gitWork/work/ordering-h5

# 1. 重建打包目录（只放运行需要的文件）
rm -rf .zcode-site/stage && mkdir -p .zcode-site/stage
cp -r index.html css js .zcode-site/stage/
cp "<zcode-site 模板目录>/static-server.mjs" .zcode-site/stage/
# start.sh 见上一次部署的版本，需保持 LF 换行

# 2. 预检 + 发布
node "<zcode-site.mjs>" check .zcode-site/stage
node "<zcode-site.mjs>" deploy .zcode-site/stage
```

⚠️ **不要删 `.zcode-site.json`**，它记录站点 ID，删了再用 `--new` 会生成新域名。

---

## 本地预览

```bash
cd D:/MyWork/gitWork/work/ordering-h5
node serve.js 8123          # 监听 0.0.0.0，手机同 Wi-Fi 可访问
node serve.js 8123 local    # 仅本机 127.0.0.1
```
