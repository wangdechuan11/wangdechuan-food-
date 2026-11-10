/* ============================================================
 * 美食学堂 · 交互逻辑
 * 依赖：js/data.js（MENU / SITE / KEY）
 * 功能：分类浏览 / 搜索 / 菜谱详情 / 收藏（我的菜谱集）
 * ============================================================ */

/* ================= 状态 ================= */
const DISHES = new Map();
MENU.forEach(c => c.items.forEach(d => DISHES.set(d.id, d)));

let fav = (function load() {
  try {
    const arr = JSON.parse(localStorage.getItem(KEY) || '[]');
    return new Set(Array.isArray(arr) ? arr.filter(id => DISHES.has(id)) : []);
  } catch (e) { return new Set(); }
})();
let activeCat = MENU[0].id;
let query = '';
let filterDiff = 0;        // 0=全部，1/2/3=入门/进阶/高手
let filterPrep = '';       // ''=全部，否则为处理方式
let gi = 0;   // 菜品图片底色轮询计数

/* ================= 工具 ================= */
const $ = s => document.querySelector(s);
const appEl = $('#app'), catsEl = $('#cats'), dishesEl = $('#dishes'),
      menuList = $('#menuList'), searchList = $('#searchList'), searchIn = $('#searchIn'),
      favbar = $('#favbar'), badge = $('#badge'), cbTitle = $('#cbTitle'), cbSub = $('#cbSub'),
      mask = $('#mask'), favpop = $('#favpop'), favList = $('#favList'), popCount = $('#popCount'),
      modalMask = $('#modalMask'), modalCard = $('#modalCard'), toastEl = $('#toast'),
      ingMask = $('#ingMask'), ingSheet = $('#ingSheet'), ingBody = $('#ingBody'),
      lightbox = $('#lightbox'), lbImg = $('#lbImg'), lbName = $('#lbName'), lbCount = $('#lbCount'),
      pantryMask = $('#pantryMask'), pantrySheet = $('#pantrySheet'), pantryBody = $('#pantryBody'),
      fDiff = $('#fDiff'), fPrep = $('#fPrep');

const esc = s => String(s).replace(/[&<>"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
const tagCls = t => t === '招牌' ? 'zp' : t === '新品' || t === '入门' || t === '零失败' ? 'xp' : t.includes('辣') ? 'la' : 'zp';
const diffStars = d => '★'.repeat(d) + '☆'.repeat(3 - d);
const diffText = d => ['入门', '进阶', '高手'][d - 1] || '';
const favCount = () => fav.size;
const saveFav = () => localStorage.setItem(KEY, JSON.stringify([...fav]));

let toastT;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => toastEl.classList.remove('show'), 1600);
}

/* ================= 筛选 ================= */
const PREP_ICON = { '免处理': '', '刀工': '🔪', '腌制': '🧂', '精细操作': '🥣' };
const prepOf = d => (typeof PREP !== 'undefined' && PREP[d.id]) || [];

function matchFilter(d) {
  if (filterDiff && d.diff !== filterDiff) return false;
  if (filterPrep && !prepOf(d).includes(filterPrep)) return false;
  return true;
}

function visibleCats() {
  return MENU
    .map(c => ({ c, items: c.items.filter(matchFilter) }))
    .filter(x => x.items.length);
}

function renderFilters() {
  const diffs = [[0, '全部'], [1, '入门'], [2, '进阶'], [3, '高手']];
  fDiff.innerHTML = diffs.map(([v, t]) =>
    `<button class="f-chip${filterDiff === v ? ' on' : ''}" type="button"
       data-action="filter-diff" data-v="${v}">${t}</button>`).join('');
  const preps = [['', '全部'], ...PREP_KEYS.map(k => [k, k])];
  fPrep.innerHTML = preps.map(([v, t]) =>
    `<button class="f-chip${filterPrep === v ? ' on' : ''}" type="button"
       data-action="filter-prep" data-v="${v}">${t}</button>`).join('');
}

function applyFilters() {
  const vis = visibleCats();
  if (!vis.some(x => x.c.id === activeCat)) activeCat = vis.length ? vis[0].c.id : MENU[0].id;
  renderFilters();
  renderCats();
  renderMenu();
  if (query) renderSearch();
  dishesEl.scrollTop = 0;
}

/* ================= 渲染 ================= */
function dishCard(d) {
  const cls = ['g0', 'g1', 'g2', 'g3'][gi++ % 4];
  const tag = d.tag ? `<span class="tag ${tagCls(d.tag)}">${esc(d.tag)}</span>` : '';
  const on = fav.has(d.id);
  const prep = prepOf(d);
  const prepIco = prep.filter(p => p !== '免处理').map(p => PREP_ICON[p]).join('');
  return `<div class="dish" data-action="open-detail" data-id="${d.id}">
    <div class="dish-img ${cls}">${d.emoji}</div>
    <div class="dish-info">
      <div class="dish-name"><span class="nm">${esc(d.name)}</span>${tag}<span class="sales">${d.learns}人学过</span></div>
      <div class="dish-desc">${prepIco ? `<span class="desc-prep" title="处理方式：${esc(prep.join('、'))}">${prepIco}</span>` : ''}${esc(d.desc)}</div>
      <div class="dish-bottom">
        <span class="diff" title="${diffText(d.diff)}">${diffStars(d.diff)}</span>
        <span class="time" title="${esc(d.time)}">⏱ ${esc(d.time)}</span>
        <button class="fav-btn${on ? ' on' : ''}" type="button" data-action="toggle-fav"
          data-id="${d.id}" aria-label="收藏">${on ? '♥' : '♡'}</button>
      </div>
    </div>
  </div>`;
}

function renderCats() {
  catsEl.innerHTML = visibleCats().map(({ c }) =>
    `<button class="cat ${c.id === activeCat ? 'active' : ''}" type="button" data-action="cat" data-id="${c.id}">
      <span class="icon">${c.icon}</span>${esc(c.name)}
    </button>`).join('');
}

function renderMenu() {
  gi = 0;
  const vis = visibleCats();
  if (!vis.length) {
    menuList.innerHTML = `<div class="search-empty"><div class="big">🍽️</div>
      <p>没有符合条件的菜谱</p>
      <p style="font-size:12px;opacity:.7">试试放宽难度或处理方式</p></div>`;
    return;
  }
  menuList.innerHTML = vis.map(({ c, items }) =>
    `<section class="sec" data-cat="${c.id}">
       <h3 class="sec-title">${c.icon} ${esc(c.name)}</h3>${items.map(dishCard).join('')}
     </section>`).join('');
}

/* 搜索匹配：菜名 / 简介 / 主料食材名 */
function matchDish(d, q) {
  if (d.name.includes(q) || d.desc.includes(q)) return true;
  return d.main.some(([n]) => n.includes(q));
}

function renderSearch() {
  if (!query) {
    menuList.classList.remove('hide');
    searchList.classList.add('hide');
    return;
  }
  menuList.classList.add('hide');
  searchList.classList.remove('hide');
  gi = 0;
  const hits = [];
  MENU.forEach(c => c.items.forEach(d => { if (matchDish(d, query) && matchFilter(d)) hits.push(d); }));
  searchList.innerHTML = hits.length
    ? `<h3 class="sec-title">找到 ${hits.length} 道“${esc(query)}”相关菜谱</h3>${hits.map(dishCard).join('')}`
    : `<div class="search-empty"><div class="big">🍽️</div>
        <p>没有找到与“${esc(query)}”相关的菜谱</p>
        <p style="font-size:12px;opacity:.7">换个关键词，或放宽上方的难度/处理筛选</p></div>`;
}

/* 更新页面上所有收藏心形按钮状态 */
function updateFavBtns() {
  document.querySelectorAll('.fav-btn').forEach(el => {
    const on = fav.has(el.dataset.id);
    el.classList.toggle('on', on);
    el.textContent = on ? '♥' : '♡';
  });
}

function renderFavBar() {
  const n = favCount();
  favbar.classList.toggle('empty', n === 0);
  badge.textContent = n;
  badge.classList.toggle('show', n > 0);
  cbTitle.textContent = n === 0 ? '我的菜谱集' : `已收藏 ${n} 道菜`;
  cbSub.textContent = n === 0 ? '点击 ♡ 收藏想学的菜，随时翻看' : '点击右侧按钮随时翻看';
}

function renderFavPop() {
  const n = favCount();
  popCount.textContent = n ? `（${n} 道）` : '';
  if (!n) {
    favList.innerHTML = `<div class="cp-empty"><div class="big">📖</div>
      <p>菜谱集还是空的</p><p style="font-size:12px;opacity:.7">点击菜品右下角 ♡ 收藏想学的菜</p></div>`;
    return;
  }
  const st = favList.scrollTop;
  favList.innerHTML = [...fav].map(id => {
    const d = DISHES.get(id);
    return `<div class="fav-item" data-action="open-detail" data-id="${id}">
      <div class="fav-left"><span class="fav-emoji">${d.emoji}</span>
        <span class="fav-name">${esc(d.name)}</span></div>
      <span class="fav-meta">${diffStars(d.diff)} ${esc(d.time)}</span>
      <button class="fav-rm" type="button" data-action="rm-fav" data-id="${id}" aria-label="移除">✕</button>
    </div>`;
  }).join('');
  favList.scrollTop = st;
}

function sync() {
  saveFav();
  updateFavBtns();
  renderFavBar();
  renderFavPop();
}

/* ================= 菜谱详情 ================= */
/* 每条食材/调料都可点开，查看挑选方法、购买渠道与勺量换算 */
function ingRow(n, a) {
  const known = !!ING[n];
  return `<div class="ing-row${known ? ' tap' : ''}"${known ? ` data-action="open-ing" data-ing="${esc(n)}"` : ''}>
      <span class="ing-name">${esc(n)}</span>
      <span class="amt">${esc(a)}</span>
      ${known ? '<span class="ing-arrow">›</span>' : ''}
    </div>`;
}

function detailHTML(d) {
  const heroCls = ['dh0', 'dh1', 'dh2', 'dh3'][hashId(d.id) % 4];
  const tag = d.tag ? `<span class="tag ${tagCls(d.tag)}">${esc(d.tag)}</span>` : '';
  const prep = prepOf(d);
  const mainRows = d.main.map(([n, a]) => ingRow(n, a)).join('');
  const seasRows = d.seas.length
    ? d.seas.map(([n, a]) => ingRow(n, a)).join('')
    : `<div class="ing-row"><span style="color:#9aa0ad">无需调味料</span></div>`;
  const toolChips = d.tools.map(t => `<span class="chip tool">${esc(t)}</span>`).join('');
  const steps = d.steps.map((s, i) =>
    `<div class="step"><span class="no">${i + 1}</span>
       <div class="st">${esc(s.t)}${s.tip ? `<div class="tip">💡 ${esc(s.tip)}</div>` : ''}</div>
     </div>`).join('');
  const on = fav.has(d.id);
  return `<div class="d-hero ${heroCls}">
      <button class="d-close" type="button" data-action="close-modal" aria-label="关闭">✕</button>
      <div class="d-emoji">${d.emoji}</div>
      <div class="d-title">${esc(d.name)}${tag}</div>
      <div class="d-meta"><span class="diff">${diffStars(d.diff)}</span>${diffText(d.diff)} · ⏱ ${esc(d.time)} · ${d.learns} 人学过</div>
      <div class="d-desc">${esc(d.desc)}</div>
      <div class="d-prep">处理：${prep.length ? prep.map(p => `<b>${esc(p)}</b>`).join(' + ') : '无需特殊处理'}</div>
    </div>
    <div class="d-body">
      <div class="d-sec"><h4>🥩 食材清单<span class="sec-hint">点击看怎么挑、去哪买</span></h4><div class="ing-tbl">${mainRows}</div></div>
      <div class="d-sec"><h4>🧂 调味料<span class="sec-hint">点击看勺量换算</span></h4><div class="ing-tbl">${seasRows}</div></div>
      <div class="d-sec"><h4>🍳 所需器材</h4><div class="chips">${toolChips}</div></div>
      <div class="d-sec"><h4>👩‍🍳 烹饪步骤与技巧</h4>${steps}</div>
    </div>
    <div class="d-foot">
      <button class="d-btn${on ? ' on' : ''}" type="button" data-action="toggle-fav" data-id="${d.id}">
        ${on ? '♥ 已在我的菜谱集' : '♡ 收藏这道菜'}
      </button>
    </div>`;
}

/* 简单哈希：让同一道菜的头部渐变色稳定 */
function hashId(id) {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h;
}

function openDetail(id) {
  const d = DISHES.get(id);
  if (!d) return;
  closeFavPop();
  closePantry();
  closeLightbox();
  modalCard.innerHTML = detailHTML(d);
  modalCard.scrollTop = 0;
  modalMask.classList.add('show');
}

/* 详情弹窗内的收藏按钮随状态即时刷新 */
function refreshDetailBtn(id) {
  const btn = modalCard.querySelector('.d-btn');
  if (!btn || btn.dataset.id !== id) return;
  const on = fav.has(id);
  btn.classList.toggle('on', on);
  btn.textContent = on ? '♥ 已在我的菜谱集' : '♡ 收藏这道菜';
}

/* ================= 食材详情面板 ================= */
const KIND_TEXT = { fresh: '生鲜食材', made: '成品食材', season: '调味料' };

/* 取该食材的全部实拍图（多图优先，回退到单图） */
function picsOf(name) {
  if (typeof PHOTOS !== 'undefined' && PHOTOS[name]) return PHOTOS[name];
  const info = ING[name];
  return info && info.img ? [info.img] : [];
}

function openIngSheet(name) {
  const info = ING[name];
  if (!info) { toast('这道食材暂时没有挑选资料'); return; }
  const pics = picsOf(name);

  const shots = pics.length
    ? `<div class="is-photos">${pics.map((u, i) =>
        `<button class="is-photo-btn" type="button" data-action="zoom" data-ing="${esc(name)}" data-idx="${i}">
           <img src="${u}" alt="${esc(name)} 图${i + 1}" loading="lazy"
             onerror="this.closest('.is-photo-btn').style.display='none'">
         </button>`).join('')}</div>`
    : `<div class="is-photos"><div class="is-photo-empty">${info.emoji || '🍽️'}</div></div>`;

  const brands = info.brands && info.brands.length
    ? `<div class="is-sec"><h4>🏷️ 推荐品牌</h4>
        <div class="chips">${info.brands.map(b => `<span class="chip">${esc(b)}</span>`).join('')}</div>
      </div>`
    : '';

  const spoon = info.spoon
    ? `<div class="is-sec"><h4>🥄 一勺是多少</h4>
        <div class="spoon-nums-card">
          <div class="sn-main">1 ${info.spoon.unit} ≈ ${info.spoon.ml} ml</div>
          <div class="sn-sub">≈ ${info.spoon.g} g</div>
          <div class="sn-ref">实物参照：${esc(info.spoon.ref)}</div>
        </div>
        <p class="is-note">按平口一勺（不堆尖）计算</p>
      </div>`
    : '';

  ingBody.innerHTML = `
    <div class="is-top">
      ${shots}
      <div class="is-head">
        <div class="is-meta">
          <div class="is-name">${esc(name)}</div>
          <div class="is-kind">${KIND_TEXT[info.kind] || '食材'}${pics.length > 1 ? ` · ${pics.length} 张图` : ''}</div>
        </div>
        <button class="is-close" type="button" data-action="close-ing" aria-label="关闭">✕</button>
      </div>
    </div>
    <div class="is-body">
      <div class="is-sec"><h4>✅ 怎么挑</h4><p>${esc(info.pick)}</p></div>
      <div class="is-sec"><h4>🛒 去哪里买</h4><p>${esc(info.buy)}</p></div>
      ${brands}
      ${spoon}
    </div>`;
  ingBody.scrollTop = 0;
  ingMask.classList.add('show');
  ingSheet.classList.add('show');
}

function closeIngSheet() {
  ingMask.classList.remove('show');
  ingSheet.classList.remove('show');
}

/* ================= 图片放大查看 ================= */
let lbPics = [], lbIdx = 0, lbTitle = '';

function openLightbox(name, idx) {
  lbPics = picsOf(name);
  if (!lbPics.length) return;
  lbTitle = name;
  lbIdx = Math.max(0, Math.min(idx, lbPics.length - 1));
  renderLightbox();
  lightbox.classList.add('show');
}

function renderLightbox() {
  const small = lbPics[lbIdx];
  const big = small.replace('-Small.png', '.png');   // 图库原图 700px，按需加载
  lbImg.onerror = () => { lbImg.onerror = null; lbImg.src = small; };
  lbImg.src = big;
  lbImg.alt = lbTitle + ' 图' + (lbIdx + 1);
  lbName.textContent = lbTitle;
  lbCount.textContent = (lbIdx + 1) + ' / ' + lbPics.length;
  lightbox.classList.toggle('single', lbPics.length < 2);
}

function stepLightbox(delta) {
  if (lbPics.length < 2) return;
  lbIdx = (lbIdx + delta + lbPics.length) % lbPics.length;
  renderLightbox();
}

function closeLightbox() {
  lightbox.classList.remove('show');
  lbImg.removeAttribute('src');
}

/* ================= 我有食材 → 能做什么 ================= */
const PANTRY_KEY = 'h5_pantry_v1';

/* 真正的同义写法（可互相替代），只在这里合并；像「鸡中翅/鸡全腿」「花椒/花椒粉」必须分开 */
const SAME = [
  ['带皮五花肉', '五花肉'],
  ['蛋清', '鸡蛋清'],
  ['纯牛奶', '牛奶', '全脂牛奶'],
  ['土蜂蜜', '蜂蜜'],
  ['大蒜', '蒜', '蒜末', '蒜泥'],
  ['姜', '姜末'],
  ['小葱', '小香葱'],
  ['嫩豆腐', '内酯豆腐'],
  ['淀粉', '玉米淀粉', '水淀粉'],
  ['盐', '食盐'],
  ['豆豉', '永川豆豉'],
  ['红油辣椒', '辣椒油'],
  ['白芝麻', '熟白芝麻'],
  ['油炸花生米', '熟花生碎'],
];

const ING_ALIAS = new Map();      // 任意写法 -> 规范名
const ING_NAMES = new Map();      // 规范名 -> [全部写法]
SAME.forEach(g => {
  ING_NAMES.set(g[0], g);
  g.forEach(n => ING_ALIAS.set(n, g[0]));
});
const ALL_ING = Object.keys(ING).filter(n => (ING_ALIAS.get(n) || n) === n);

const canonOf = n => ING_ALIAS.get(n) || n;
const hasIng = n => pantry.has(canonOf(n));

let pantry = (function () {
  try {
    const arr = JSON.parse(localStorage.getItem(PANTRY_KEY) || '[]');
    return new Set(Array.isArray(arr) ? arr.map(canonOf).filter(n => ING[n]) : []);
  } catch (e) { return new Set(); }
})();
let pantryTab = 'all';
let pantryQuery = '';
let pantryView = 'pick';
let pantryChips = null, pantryFoot = null;

const savePantry = () => localStorage.setItem(PANTRY_KEY, JSON.stringify([...pantry]));
const PANTRY_CATS = ['全部', '肉类', '水产', '蔬菜', '豆制品', '蛋奶', '主食米面', '水果', '干货', '调料', '其他'];
const catOf = n => CAT_OF[canonOf(n)] || CAT_OF[n] || '其他';

/* 单道菜的匹配计算：主料权重 1，调料权重 0.35 */
function matchOf(d) {
  const missM = d.main.filter(([n]) => !hasIng(n)).map(([n]) => n);
  const missS = d.seas.filter(([n]) => !hasIng(n)).map(([n]) => n);
  const W = 0.35;
  const total = d.main.length + W * d.seas.length;
  const got = (d.main.length - missM.length) + W * (d.seas.length - missS.length);
  const pct = Math.round((got / total) * 100);
  const hard = missM.reduce((s, n) => s + (RARE[n] || 1), 0);
  const diff = missM.length === 0 ? 0 : hard <= 2 ? 1 : hard <= 5 ? 2 : 3;
  return { pct, missM, missS, diff, ready: missM.length === 0 };
}

const DIFF_TEXT = { 0: '主料已齐', 1: '容易', 2: '一般', 3: '偏难' };

function renderPantryChips() {
  const q = pantryQuery;
  const list = ALL_ING.filter(n => {
    if (pantryTab !== '全部' && catOf(n) !== pantryTab) return false;
    if (q) {
      const names = ING_NAMES.get(n) || [n];
      if (!names.some(a => a.includes(q))) return false;
    }
    return true;
  });
  if (!list.length) {
    pantryChips.innerHTML = `<div class="p-empty">没有匹配的食材</div>`;
    return;
  }
  pantryChips.innerHTML = list.map(n => {
    const on = pantry.has(n);
    return `<button class="p-chip${on ? ' on' : ''}" type="button" data-action="pick-ing" data-ing="${esc(n)}">
      ${esc(n)}${on ? '<span class="p-tick">✓</span>' : ''}
    </button>`;
  }).join('');
}

function renderPantryFoot() {
  pantryFoot.innerHTML = `<button class="p-go" type="button" data-action="show-match">
      看看能做什么${pantry.size ? `（已选 ${pantry.size} 种）` : ''}
    </button>`;
}

function renderPantryPick() {
  pantryView = 'pick';
  pantryBody.innerHTML = `
    <div class="p-head">
      <div class="p-title">我有食材<span class="p-count">${pantry.size ? `已选 ${pantry.size} 种` : '点选你手头有的食材'}</span></div>
      <button class="cp-clear" type="button" data-action="clear-pantry">🗑️ 清空</button>
      <button class="is-close" type="button" data-action="close-pantry" aria-label="关闭">✕</button>
    </div>
    <div class="p-search">
      <span class="s-icon">🔍</span>
      <input id="pantrySearch" type="search" placeholder="搜索食材，如“五花肉”“豆腐”" value="${esc(pantryQuery)}" autocomplete="off" />
    </div>
    <div class="p-tabs">
      ${PANTRY_CATS.map(t =>
        `<button class="p-tab${pantryTab === t ? ' on' : ''}" type="button" data-action="pantry-tab" data-tab="${esc(t)}">${esc(t)}</button>`).join('')}
    </div>
    <div class="p-chips" id="pantryChips"></div>
    <div class="p-foot" id="pantryFoot"></div>`;
  pantryChips = $('#pantryChips');
  pantryFoot = $('#pantryFoot');
  renderPantryChips();
  renderPantryFoot();
  $('#pantrySearch').addEventListener('input', e => {
    pantryQuery = e.target.value.trim();
    renderPantryChips();
  });
  pantryBody.scrollTop = 0;
}

function renderPantryResult() {
  pantryView = 'result';
  const rows = MENU.flatMap(c => c.items)
    .map(d => ({ d, m: matchOf(d) }))
    .sort((a, b) => b.m.pct - a.m.pct || a.m.missM.length - b.m.missM.length ||
                    a.m.diff - b.m.diff || b.d.learns - a.d.learns);

  const list = rows.map(({ d, m }) => {
    const missTxt = m.missM.length
      ? `<div class="mi-miss">缺 ${m.missM.length} 样：<b>${m.missM.map(esc).join('、')}</b></div>`
      : `<div class="mi-miss ok">主料齐了${m.missS.length ? `，还差调料：${m.missS.slice(0, 3).map(esc).join('、')}${m.missS.length > 3 ? ' 等' : ''}` : '，可以开做'}</div>`;
    const prep = prepOf(d).filter(p => p !== '免处理');
    return `<div class="match-item${m.ready ? ' ready' : ''}" data-action="open-detail" data-id="${d.id}">
      <div class="mi-emoji">${d.emoji}</div>
      <div class="mi-body">
        <div class="mi-top">
          <span class="mi-name">${esc(d.name)}</span>
          <span class="mi-pct${m.ready ? ' ok' : ''}">${m.pct}%</span>
        </div>
        <div class="mi-bar"><i style="width:${m.pct}%"></i></div>
        ${missTxt}
        ${prep.length ? `<div class="mi-prep">需要${prep.map(esc).join(' + ')}</div>` : ''}
        ${m.diff === 0 ? '' :
          `<div class="mi-diff">缺料获取难度：<b class="d${m.diff}">${DIFF_TEXT[m.diff]}</b></div>`}
      </div>
    </div>`;
  }).join('');

  pantryBody.innerHTML = `
    <div class="p-head">
      <button class="p-back" type="button" data-action="pantry-back">‹ 改食材</button>
      <div class="p-title">能做 ${rows.filter(r => r.m.ready).length} 道<span class="p-count">共 ${rows.length} 道菜按匹配度排序</span></div>
      <button class="is-close" type="button" data-action="close-pantry" aria-label="关闭">✕</button>
    </div>
    <div class="p-result-list">${list}</div>`;
  pantryBody.scrollTop = 0;
}

function openPantry() {
  renderPantryPick();
  pantryMask.classList.add('show');
  pantrySheet.classList.add('show');
}
function closePantry() {
  pantryMask.classList.remove('show');
  pantrySheet.classList.remove('show');
}

/* ================= 收藏弹层 ================= */
function openFavPop() {
  if (!favCount()) { toast('菜谱集还是空的，先收藏几道菜吧～'); return; }
  mask.classList.add('show');
  favpop.classList.add('show');
}
function closeFavPop() {
  mask.classList.remove('show');
  favpop.classList.remove('show');
}

function clearSearch() {
  query = '';
  searchIn.value = '';
  renderSearch();
}

/* ================= 事件 ================= */
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const act = btn.dataset.action, id = btn.dataset.id;
  // 遮罩类关闭动作：仅当点击的就是遮罩本身时生效，避免误触内部元素
  if ((act === 'close-fav' || act === 'close-modal' || act === 'close-ing' || act === 'close-pantry')
      && e.target !== btn) return;

  switch (act) {
    case 'open-detail':
      openDetail(id);
      break;
    case 'open-ing':
      openIngSheet(btn.dataset.ing);
      break;
    case 'close-ing':
      closeIngSheet();
      break;
    case 'zoom':
      openLightbox(btn.dataset.ing, Number(btn.dataset.idx) || 0);
      break;
    case 'lb-prev':
      stepLightbox(-1);
      break;
    case 'lb-next':
      stepLightbox(1);
      break;
    case 'close-lb':
      closeLightbox();
      break;
    case 'open-pantry':
      openPantry();
      break;
    case 'close-pantry':
      closePantry();
      break;
    case 'pick-ing': {
      const n = btn.dataset.ing;
      pantry.has(n) ? pantry.delete(n) : pantry.add(n);
      savePantry();
      btn.classList.toggle('on', pantry.has(n));
      btn.innerHTML = esc(n) + (pantry.has(n) ? '<span class="p-tick">✓</span>' : '');
      renderPantryFoot();
      pantryBody.querySelector('.p-count').textContent =
        pantry.size ? `已选 ${pantry.size} 种` : '点选你手头有的食材';
      break;
    }
    case 'pantry-tab':
      pantryTab = btn.dataset.tab;
      pantryBody.querySelectorAll('.p-tab').forEach(b => b.classList.toggle('on', b.dataset.tab === pantryTab));
      renderPantryChips();
      break;
    case 'show-match':
      renderPantryResult();
      break;
    case 'pantry-back':
      renderPantryPick();
      break;
    case 'clear-pantry':
      pantry.clear();
      savePantry();
      if (pantryView === 'result') renderPantryResult();
      else { renderPantryChips(); renderPantryFoot(); pantryBody.querySelector('.p-count').textContent = '点选你手头有的食材'; }
      toast('已清空食材');
      break;
    case 'toggle-fav': {
      const had = fav.has(id);
      had ? fav.delete(id) : fav.add(id);
      sync();
      refreshDetailBtn(id);
      if (!had) {
        badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump');
        toast('❤️ 已加入我的菜谱集');
      } else {
        toast('已从菜谱集移除');
      }
      break;
    }
    case 'rm-fav':
      fav.delete(id);
      sync();
      if (!favCount()) closeFavPop();
      break;
    case 'filter-diff':
      filterDiff = Number(btn.dataset.v) || 0;
      applyFilters();
      break;
    case 'filter-prep':
      filterPrep = btn.dataset.v || '';
      applyFilters();
      break;
    case 'cat':
      if (query) clearSearch();
      activeCat = id;
      renderCats();
      {
        const sec = menuList.querySelector(`.sec[data-cat="${id}"]`);
        if (sec) dishesEl.scrollTo({ top: sec.offsetTop - 4, behavior: 'smooth' });
      }
      break;
    case 'toggle-favpop':
      favpop.classList.contains('show') ? closeFavPop() : openFavPop();
      break;
    case 'close-fav':
      closeFavPop();
      break;
    case 'clear-fav':
      fav.clear();
      sync();
      closeFavPop();
      toast('已清空菜谱集');
      break;
    case 'close-modal':
      closeIngSheet();
      modalMask.classList.remove('show');
      break;
  }
});

searchIn.addEventListener('input', () => {
  query = searchIn.value.trim();
  renderSearch();
  updateFavBtns();
});

/* .app 虽是 overflow:hidden 容器，但 focus / scrollIntoView 仍可能把它滚动，
   导致头部被顶出、底部留白，这里强制复位 */
appEl.addEventListener('scroll', () => {
  if (appEl.scrollTop || appEl.scrollLeft) { appEl.scrollTop = 0; appEl.scrollLeft = 0; }
}, { passive: true });

/* 滚动联动：右侧滚动时高亮左侧分类 */
let spyRaf = 0;
dishesEl.addEventListener('scroll', () => {
  if (query) return;
  if (dishesEl.scrollLeft) dishesEl.scrollLeft = 0;   // 兜底：杜绝横向偏移
  cancelAnimationFrame(spyRaf);
  spyRaf = requestAnimationFrame(() => {
    let cur = MENU[0].id;
    for (const s of menuList.querySelectorAll('.sec')) {
      if (s.offsetTop <= dishesEl.scrollTop + 14) cur = s.dataset.cat;
    }
    // 兜底：滚到底部时最后一屏内容往往到不了顶部，直接高亮最后一个分类
    if (dishesEl.scrollTop + dishesEl.clientHeight >= dishesEl.scrollHeight - 4) {
      cur = MENU[MENU.length - 1].id;
    }
    if (cur !== activeCat) { activeCat = cur; renderCats(); }
  });
});

/* ================= 初始化 ================= */
$('#shopName').textContent = SITE.name;
$('#tableChip').textContent = SITE.chip;
$('#noticeText').textContent = SITE.notice;
searchIn.placeholder = SITE.placeholder;
renderFilters();
renderCats();
renderMenu();
renderSearch();
sync();
