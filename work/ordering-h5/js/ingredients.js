/* ============================================================
 * 食材知识库
 * kind   : fresh 生鲜 / made 成品 / season 调料
 * pick   : 怎么挑
 * buy    : 从哪里买
 * brands : 成品、调料的推荐品牌
 * spoon  : 调料勺量换算（1 大勺 = 15ml，1 小勺 = 5ml）
 * img    : 免费图库实拍图（TheMealDB 食材图库）
 * emoji  : 图库无对应图时的兜底图标
 * ============================================================ */

const IMG = en =>
  'https://www.themealdb.com/images/ingredients/' + encodeURIComponent(en) + '-Small.png';

/* 常见勺量的实际份量参照 */
const SPOON = {
  liquid: { unit: '大勺', ml: 15, g: 15, ref: '约 3 个矿泉水瓶盖' },
  oil:    { unit: '大勺', ml: 15, g: 14, ref: '约 3 个矿泉水瓶盖' },
  sugar:  { unit: '大勺', ml: 15, g: 12, ref: '约 1 个乒乓球大小' },
  salt:   { unit: '小勺', ml: 5,  g: 6,  ref: '约 1 个啤酒瓶盖' },
  starch: { unit: '大勺', ml: 15, g: 9,  ref: '约 2 个矿泉水瓶盖' },
  honey:  { unit: '大勺', ml: 15, g: 21, ref: '约 3 个矿泉水瓶盖' },
  powder: { unit: '小勺', ml: 5,  g: 3,  ref: '约 1 个啤酒瓶盖' },
  paste:  { unit: '大勺', ml: 15, g: 15, ref: '约 1 个乒乓球大小' },
};

const ING = {};
(function build() {
  const put = (names, data) => names.forEach(n => { ING[n] = data; });

  /* ---------- 猪肉 ---------- */
  put(['带皮五花肉', '五花肉'], {
    kind: 'fresh', img: IMG('Pork Belly slices'), emoji: '🥓',
    pick: '选肥瘦相间、能分出三层的三层五花，皮色白亮、按下去有弹性、闻着无腥臭。全瘦或肥膘过厚的都不行。',
    buy: '菜市场肉摊现切最准，可以让摊主去皮去毛；超市冷鲜柜次之。当天用不完切块冷冻。',
  });
  put(['猪里脊'], {
    kind: 'fresh', img: IMG('Pork Tenderloin'), emoji: '🥩',
    pick: '要整条通脊，颜色淡粉、表面干爽有光泽；发白发水、按下去渗水的是注水肉。',
    buy: '菜市场肉摊或超市冷鲜柜。',
  });
  put(['猪肉末'], {
    kind: 'fresh', img: IMG('Minced Pork'), emoji: '🥩',
    pick: '让摊主用前腿肉现绞，肥瘦比例 3:7 最香；已经绞好的看不出部位，颜色发暗、发黏的别买。',
    buy: '菜市场现绞，别买敞开摆放的预绞肉馅。',
  });

  /* ---------- 牛肉 ---------- */
  put(['牛里脊'], {
    kind: 'fresh', img: IMG('Beef Fillet'), emoji: '🥩',
    pick: '选黄瓜条部位，纹理细、颜色深红有光泽，切面微干不渗水，按下去能回弹。',
    buy: '菜市场牛肉摊或超市；水煮牛肉建议当天买当天做。',
  });
  put(['牛腱子'], {
    kind: 'fresh', img: IMG('Beef Brisket'), emoji: '🥩',
    pick: '金钱腱最好——切开能看到透明筋膜花纹，卤出来才弹牙；纯瘦的腱子卤完会柴。',
    buy: '菜市场牛肉摊，提前跟摊主说要金钱腱。',
  });
  put(['牛肉末'], {
    kind: 'fresh', img: IMG('Minced Beef'), emoji: '🥩',
    pick: '选牛前腿或牛腩现绞，肥瘦 2:8；颜色鲜红、颗粒分明、不发黏。',
    buy: '菜市场现绞。',
  });
  put(['金钱肚'], {
    kind: 'fresh', emoji: '🥩',
    pick: '颜色自然浅褐、厚实有弹性、闻着只有淡淡脏器味；惨白且刺鼻的多半漂白过。',
    buy: '菜市场牛杂摊或生鲜超市，买回要用盐和面粉反复搓洗。',
  });

  put(['火腿'], {
    kind: 'made', img: IMG('Ham'), emoji: '🍖',
    pick: '整块金华火腿或宣威火腿，看切面瘦肉红润、脂肪洁白、有火腿香；火腿肠不算火腿。',
    buy: '超市干货区、年货市场，可买切片小包装。',
    brands: ['金华火腿', '宣威火腿'],
  });
  put(['广式腊肠'], {
    kind: 'made', img: IMG('Sausages'), emoji: '🌭',
    pick: '肠衣干爽、肠体硬挺、肥瘦分明（瘦肉暗红、肥肉透明），有酒香和腊香；发黏、有酸味的是坏了。',
    buy: '超市腊味区或菜市场腊味摊，真空包装更耐放。',
    brands: ['皇上皇', '广州酒家'],
  });

  /* ---------- 禽类 ---------- */
  put(['三黄鸡'], {
    kind: 'fresh', img: IMG('Chicken'), emoji: '🐔',
    pick: '嘴黄、脚黄、毛黄，1.2–1.5kg 最嫩；鸡冠鲜红、眼睛清亮的才新鲜。',
    buy: '菜市场活禽现杀最鲜，超市冰鲜整鸡也可以。',
  });
  put(['鸡全腿', '鸡中翅'], {
    kind: 'fresh', img: IMG('Chicken Legs'), emoji: '🍗',
    pick: '鸡腿要饱满、皮色白净无血点；鸡翅选翅中，肉质厚、骨头细。发黏有异味的不新鲜。',
    buy: '超市冷鲜柜或菜市场禽肉摊，冷冻的选无冰霜、包装无破损的。',
  });
  put(['鸡胸肉'], {
    kind: 'fresh', img: IMG('Chicken Breast'), emoji: '🍗',
    pick: '颜色淡粉、有弹性、切面不出水；惨白发硬的是反复冻融过的。',
    buy: '超市冷鲜柜，认准当日或前一日生产。',
  });

  /* ---------- 水产 ---------- */
  put(['草鱼'], {
    kind: 'fresh', img: IMG('White Fish'), emoji: '🐟',
    pick: '选 1kg 左右的活鱼，鱼眼清亮凸起、鳃鲜红、按鱼肉能立刻回弹、鳞片完整。',
    buy: '菜市场水产摊现杀，让摊主从背部剖开（做烤鱼要用）。',
  });
  put(['鲜活扇贝'], {
    kind: 'fresh', img: IMG('Clams'), emoji: '🦪',
    pick: '壳闭合紧、敲一下会收缩的是活的；张着口不闭的已经死了，别买。',
    buy: '菜市场水产摊，买回用刷子刷净外壳。',
  });
  put(['虾仁'], {
    kind: 'fresh', img: IMG('Prawns'), emoji: '🦐',
    pick: '虾体完整、呈自然青灰或淡粉色，摸起来有弹性不黏手；惨白透明的多半泡过药水。',
    buy: '菜市场鲜虾自己剥最放心，超市冷冻虾仁选无冰衣的。',
  });
  put(['虾皮'], {
    kind: 'made', img: IMG('Dried Shrimp'), emoji: '🦐',
    pick: '选淡干虾皮，颜色浅黄半透明、闻着是海味而不是氨味；特别白亮的可能硫熏过。',
    buy: '超市干货区或海产干货店。',
    brands: ['买散装淡干虾皮，看配料表只有虾'],
  });
  put(['蟹柳'], {
    kind: 'made', emoji: '🦀',
    pick: '看鱼糜含量，含量越高越好吃；淀粉多的下锅就散、口感发糊。',
    buy: '超市冷冻区。',
    brands: ['海霸王', '安井', '海欣'],
  });

  /* ---------- 蛋奶 ---------- */
  put(['鸡蛋'], {
    kind: 'fresh', img: IMG('Eggs'), emoji: '🥚',
    pick: '蛋壳粗糙有白霜、摇起来没有晃动感的新鲜；做溏心蛋或生食要买可生食蛋。',
    buy: '超市冷藏柜，认准生产日期；散装蛋看壳面是否干净无粪污。',
    brands: ['圣迪乐村', '德青源', '正大'],
  });
  put(['蛋清', '鸡蛋清'], {
    kind: 'fresh', img: IMG('Egg White'), emoji: '🥚',
    pick: '分离蛋清时不能混入一点蛋黄，否则打不发；打发用的盆必须无油无水。',
    buy: '直接用新鲜鸡蛋分离，不建议买瓶装蛋清。',
  });
  put(['纯牛奶', '牛奶', '全脂牛奶'], {
    kind: 'fresh', img: IMG('Milk'), emoji: '🥛',
    pick: '配料表只有"生牛乳"。做双皮奶必须用全脂奶（脂肪 ≥3.5g/100ml），低脂奶结不出奶皮。',
    buy: '超市冷藏柜，选保质期 7 天左右的巴氏奶风味最好。',
    brands: ['光明', '伊利', '蒙牛'],
  });
  put(['淡奶油'], {
    kind: 'made', img: IMG('Heavy Cream'), emoji: '🥛',
    pick: '看乳脂含量，35% 以上才打得起来硬性发泡；植物奶油（含氢化油）别买。',
    buy: '超市冷藏区或烘焙店，买小包装一次用完。',
    brands: ['安佳', '总统', '铁塔'],
  });
  put(['黄油'], {
    kind: 'made', img: IMG('Butter'), emoji: '🧈',
    pick: '选动物黄油（配料含稀奶油），别买植物黄油/麦淇淋；无盐黄油更适合烘焙。',
    buy: '超市冷藏区或烘焙店。',
    brands: ['安佳', '总统'],
  });
  put(['椰浆'], {
    kind: 'made', img: IMG('Coconut Milk'), emoji: '🥥',
    pick: '选浓椰浆（脂肪 17% 以上），不是清汤寡水的椰汁饮料；摇匀后质地浓稠。',
    buy: '超市进口区或东南亚调味品货架。',
    brands: ['佳乐', '丽尔泰'],
  });
  put(['土蜂蜜', '蜂蜜'], {
    kind: 'made', img: IMG('Honey'), emoji: '🍯',
    pick: '看是否成熟蜜：拉丝不断、气泡少、闻着有花香味；太稀、甜得发齁的多半兑了糖浆。',
    buy: '正规品牌或产地直供，别买路边无标签散装蜜。',
    brands: ['冠生园', '百花'],
  });

  /* ---------- 蔬菜 ---------- */
  put(['西红柿'], {
    kind: 'fresh', img: IMG('Tomatoes'), emoji: '🍅',
    pick: '要沙瓤的：掂着沉、蒂部有青草香、轻按微软；硬邦邦、切开没汁的多半是催熟。',
    buy: '菜市场挑散装（可以捏），超市盒装的看有没有压伤。',
  });
  put(['黄瓜'], {
    kind: 'fresh', img: IMG('Cucumber'), emoji: '🥒',
    pick: '顶花带刺、粗细均匀、捏着硬挺；发软、空心、表皮发黄的已经不新鲜。',
    buy: '菜市场或超市生鲜区。',
  });
  put(['胡萝卜'], {
    kind: 'fresh', img: IMG('Carrots'), emoji: '🥕',
    pick: '表皮光滑、颜色橙红均匀、掂着沉；发软、长须根的是放久了。',
    buy: '菜市场或超市生鲜区，一次买两三根即可。',
  });
  put(['洋葱'], {
    kind: 'fresh', img: IMG('Onions'), emoji: '🧅',
    pick: '表皮干燥光亮、捏着硬实、颈部收紧；已经发芽或发软的会变苦。',
    buy: '菜市场或超市，常温阴凉处能放一个月。',
  });
  put(['大蒜', '蒜', '蒜末', '蒜泥'], {
    kind: 'fresh', img: IMG('Garlic'), emoji: '🧄',
    pick: '蒜瓣饱满、底部硬实、外皮干爽不发霉；紫皮蒜辣味和香气都更足。',
    buy: '菜市场按头买，别买剥好的蒜米（易变质）。',
  });
  put(['姜', '姜末'], {
    kind: 'fresh', img: IMG('Ginger'), emoji: '🫚',
    pick: '表皮干爽、肉色淡黄、掰开纤维细、有辛辣香；发软、泡过水或长芽的不要。',
    buy: '菜市场或超市，买回来晾干常温存放。',
  });
  put(['大葱', '小葱', '小香葱'], {
    kind: 'fresh', img: IMG('Spring Onions'), emoji: '🧅',
    pick: '葱白紧实、叶片挺立不发黄；小葱选细杆的，香味比粗杆的冲得多。',
    buy: '菜市场按把买，回家用湿厨房纸包住根部冷藏。',
  });
  put(['蒜苗'], {
    kind: 'fresh', img: IMG('Scallions'), emoji: '🌱',
    pick: '蒜苗要茎白粗、叶翠绿、掐一下有汁；发黄的纤维粗、香味淡。',
    buy: '菜市场，买回当天用。',
  });
  put(['韭菜'], {
    kind: 'fresh', img: IMG('Chives'), emoji: '🌿',
    pick: '选窄叶韭菜，香味浓；叶片宽厚的是大棚货，味淡。根部切口要白嫩不发黑。',
    buy: '菜市场，买回摊开晾干水汽再用。',
  });
  put(['芹菜'], {
    kind: 'fresh', img: IMG('Celery'), emoji: '🥬',
    pick: '茎脆、断面多汁、叶子翠绿；发黄发蔫的纤维粗，只能拿来熬汤。',
    buy: '菜市场或超市，香芹比西芹更适合凉拌。',
  });
  put(['莴笋'], {
    kind: 'fresh', img: IMG('Lettuce'), emoji: '🥬',
    pick: '茎粗皮薄、叶子新鲜，掂一下有分量；捏着发空的是糠心，切开中间会空心。',
    buy: '菜市场，买回尽快吃，放久会糠。',
  });
  put(['莲藕'], {
    kind: 'fresh', emoji: '🪷',
    pick: '七孔藕（红花藕）粉糯适合炖汤，九孔藕（白花藕）脆甜适合炒和凉拌；表皮光洁、断面拉丝多。',
    buy: '菜市场，切开的要选断面色白、没黑斑的。',
  });
  put(['冬笋'], {
    kind: 'fresh', img: IMG('Bamboo Shoot'), emoji: '🎍',
    pick: '笋壳紧包、根部切口白嫩、掂着沉；发黑出水、有酸味的是老笋或放坏了。',
    buy: '菜市场冬春季才有，买回焯水去涩。',
  });
  put(['螺丝椒（或青尖椒）'], {
    kind: 'fresh', img: IMG('Green Chilli'), emoji: '🌶️',
    pick: '螺丝椒选表皮起皱、捏着硬、蒂青绿的，皮薄肉厚辣度适中；普通尖椒要直挺不软。',
    buy: '菜市场或超市生鲜区，湖南菜用螺丝椒最正。',
  });
  put(['红线椒'], {
    kind: 'fresh', img: IMG('Red Chilli'), emoji: '🌶️',
    pick: '颜色鲜红、表皮发亮、捏着硬实；蒂部发黑、表皮打蔫的不新鲜。',
    buy: '菜市场或超市生鲜区，主要用来提色。',
  });
  put(['四季豆'], {
    kind: 'fresh', img: IMG('Green Beans'), emoji: '🫛',
    pick: '掰一下"啪"地脆断、豆粒不鼓的最嫩；豆粒鼓起的偏老，炒完发柴。',
    buy: '菜市场或超市，选细长均匀的。',
  });
  put(['黄豆芽'], {
    kind: 'fresh', img: IMG('Bean Sprouts'), emoji: '🌱',
    pick: '根短芽粗、豆瓣微黄、闻着有豆香；通体雪白且无根的可能是激素发的。',
    buy: '菜市场或超市，买回当天用，容易坏。',
  });
  put(['青豆', '青豆玉米粒'], {
    kind: 'fresh', img: IMG('Peas'), emoji: '🫛',
    pick: '鲜青豆要豆荚饱满、颜色翠绿；买速冻的更省事，选颗粒分明无冰块的。',
    buy: '超市冷冻区（速冻青豆玉米粒）。',
  });
  put(['水发木耳'], {
    kind: 'fresh', img: IMG('Wood Ear Mushrooms'), emoji: '🍄',
    pick: '建议买干木耳自己泡，泡发后肉厚、背面灰白；泡好的如果发黏、有酸味已经坏了。',
    buy: '超市干货区买干木耳，冷水泡 2 小时。',
  });
  put(['薄荷叶'], {
    kind: 'fresh', img: IMG('Mint'), emoji: '🌿',
    pick: '叶片翠绿完整、有清凉香气；发黑或蔫软的不要。',
    buy: '超市香草区或菜市场，也可自己盆栽。',
  });

  /* ---------- 豆制品 ---------- */
  put(['嫩豆腐', '内酯豆腐'], {
    kind: 'fresh', img: IMG('Silken Tofu'), emoji: '⬜',
    pick: '看生产日期，越新越嫩；包装胀袋、内有气泡的已经变质。内酯豆腐比嫩豆腐更细腻。',
    buy: '超市冷藏柜，认准冷藏保存的盒装豆腐。',
    brands: ['白玉', '祖名'],
  });
  put(['豆干'], {
    kind: 'made', img: IMG('Tofu'), emoji: '🟫',
    pick: '压得紧实、切面光滑、有豆香；发酸、发黏、表面出水的是变质了。',
    buy: '超市冷藏柜或菜市场豆制品摊。',
    brands: ['白玉', '南溪'],
  });
  put(['橄榄菜'], {
    kind: 'made', emoji: '🫒',
    pick: '看配料表里橄榄和芥菜的含量，油润乌黑、有橄榄香的才好；太咸的少放。',
    buy: '超市酱菜货架。',
    brands: ['蓬盛', '珠江桥'],
  });

  /* ---------- 主食 / 米面 ---------- */
  put(['大米'], {
    kind: 'fresh', img: IMG('Rice'), emoji: '🍚',
    pick: '选短粒米（五常稻花香、越光），米粒饱满半透明、腹白少；抓一把有米香无霉味。',
    buy: '超市或粮油店，买小包装吃完再买。',
    brands: ['五常稻花香', '金龙鱼'],
  });
  put(['隔夜米饭'], {
    kind: 'fresh', img: IMG('Rice'), emoji: '🍚',
    pick: '用前一天煮好冷藏的饭，水分少、粒粒分明；新饭要摊开吹凉散掉水汽再炒。',
    buy: '自己煮，米水比 1:1 煮硬一点，摊凉后冷藏。',
  });
  put(['饺子皮'], {
    kind: 'made', img: IMG('Wonton Skin'), emoji: '🥟',
    pick: '薄而透、边缘不干裂、闻着有面香；买回要盖湿布，否则一会儿就发干包不住。',
    buy: '超市冷藏区或菜市场面食摊。',
    brands: ['买当日现压的，或超市冷藏装'],
  });
  put(['细面条'], {
    kind: 'made', img: IMG('Noodles'), emoji: '🍜',
    pick: '葱油拌面用细圆面（龙须面）或碱水面，表面积大更容易挂汁；看配料只有面粉、水、盐。',
    buy: '超市挂面区或菜市场现压面条。',
  });
  put(['龙口粉丝'], {
    kind: 'made', img: IMG('Rice Vermicelli'), emoji: '🍜',
    pick: '粗细均匀、半透明、无白芯，一折就断的是好粉丝；折不断的掺了胶。',
    buy: '超市干货区，认准"龙口粉丝"地理标志。',
    brands: ['双塔', '六六顺'],
  });
  put(['面粉'], {
    kind: 'made', img: IMG('Flour'), emoji: '🌾',
    pick: '中式面点用中筋粉；看蛋白质含量 9%–11%，粉质细腻无结块。',
    buy: '超市粮油区。',
    brands: ['五得利', '金龙鱼'],
  });
  put(['低筋面粉'], {
    kind: 'made', img: IMG('Plain Flour'), emoji: '🌾',
    pick: '做班戟必须低筋（蛋白质 8.5% 以下），用中筋会起筋、饼皮发韧。',
    buy: '超市烘焙区或烘焙店。',
    brands: ['美玫', '王后'],
  });
  put(['淀粉', '玉米淀粉', '水淀粉'], {
    kind: 'season', img: IMG('Cornstarch'), emoji: '🥣',
    pick: '玉米淀粉适合上浆挂糊，土豆淀粉更透亮，红薯淀粉最黏适合勾厚芡。',
    buy: '超市调味区。',
    brands: ['风车'],
    spoon: SPOON.starch,
  });
  put(['清水'], {
    kind: 'fresh', img: IMG('Water'), emoji: '💧',
    pick: '自来水烧开晾凉即可；调肉馅用葱姜水（葱姜泡的水）更香。',
    buy: '家里现成。',
  });
  put(['冰块'], {
    kind: 'fresh', img: IMG('Ice'), emoji: '🧊',
    pick: '用凉白开或纯净水冻，冰体透明无白芯；冰箱串味的冰别直接入口。',
    buy: '自己用冰格冻，或超市买食用冰。',
  });
  put(['西米'], {
    kind: 'made', emoji: '⚪',
    pick: '选大小均匀、颜色纯白无杂质；煮前不用泡，水开直接下锅。',
    buy: '超市烘焙区或杂粮区。',
    brands: ['水妈妈', '展艺'],
  });
  put(['蜜红豆'], {
    kind: 'made', emoji: '🫘',
    pick: '豆粒完整不烂、甜度适中；配料表只有红豆、糖、水的更好。',
    buy: '超市烘焙区或甜品原料店。',
    brands: ['展艺', '舒可曼'],
  });

  /* ---------- 水果 ---------- */
  put(['甜橙'], {
    kind: 'fresh', img: IMG('Orange'), emoji: '🍊',
    pick: '赣南脐橙、爱媛 38 都适合榨汁；掂着沉、皮薄有弹性、蒂部青绿。',
    buy: '水果店或生鲜电商，按季节买。',
  });
  put(['柠檬', '香水柠檬'], {
    kind: 'fresh', img: IMG('Lemon'), emoji: '🍋',
    pick: '香水柠檬皮薄无籽、香气浓；普通黄柠檬更酸。表皮油亮、捏着微软的出汁多。',
    buy: '水果店或超市，安岳柠檬最常见。',
  });
  put(['大芒果'], {
    kind: 'fresh', img: IMG('Mango'), emoji: '🥭',
    pick: '台农、金煌、贵妃都可以：闻着有果香、轻按微软、蒂部饱满；硬邦邦的是没熟。',
    buy: '水果店，做杨枝甘露选熟透的。',
  });
  put(['西柚'], {
    kind: 'fresh', img: IMG('Grapefruit'), emoji: '🍊',
    pick: '红心西柚更甜，掂着沉、皮紧贴果肉；皮厚发轻的是放久了。',
    buy: '水果店或超市进口水果区。',
  });

  /* ---------- 调料 ---------- */
  put(['生抽'], {
    kind: 'season', img: IMG('Soy Sauce'), emoji: '🧴',
    pick: '认准"酿造酱油"，看氨基酸态氮 ≥0.8g/100ml，数值越高越鲜；配料表越短越好。',
    buy: '超市调味区。',
    brands: ['海天', '李锦记', '千禾'],
    spoon: SPOON.liquid,
  });
  put(['老抽'], {
    kind: 'season', img: IMG('Dark Soy Sauce'), emoji: '🧴',
    pick: '老抽是上色用的，选酱色浓稠、能挂壁的；咸度比生抽低，别拿它当生抽用。',
    buy: '超市调味区。',
    brands: ['海天', '李锦记'],
    spoon: SPOON.liquid,
  });
  put(['料酒'], {
    kind: 'season', img: IMG('Cooking wine'), emoji: '🍶',
    pick: '选以黄酒为基底的烹饪料酒（配料有黄酒/糯米），别买食用酒精加香精的。',
    buy: '超市调味区。',
    brands: ['王致和', '老恒和'],
    spoon: SPOON.liquid,
  });
  put(['花雕酒'], {
    kind: 'season', img: IMG('Shaoxing Wine'), emoji: '🍶',
    pick: '看年份和酒精度（15% 以上），三年陈起步；醉鸡用五年陈更香。',
    buy: '超市酒类区或黄酒专卖。',
    brands: ['古越龙山', '会稽山', '塔牌'],
    spoon: SPOON.liquid,
  });
  put(['香醋'], {
    kind: 'season', img: IMG('Vinegar'), emoji: '🧴',
    pick: '镇江香醋看"恒顺"，山西老陈醋看"东湖"；配料是糯米/高粱酿造的，不是冰醋酸勾兑。',
    buy: '超市调味区。',
    brands: ['恒顺', '东湖'],
    spoon: SPOON.liquid,
  });
  put(['白醋'], {
    kind: 'season', img: IMG('White Vinegar'), emoji: '🧴',
    pick: '糖醋菜用白醋颜色更清亮；选酿造白醋，别买"醋精"。',
    buy: '超市调味区。',
    brands: ['恒顺'],
    spoon: SPOON.liquid,
  });
  put(['盐', '食盐'], {
    kind: 'season', img: IMG('Salt'), emoji: '🧂',
    pick: '炒菜用细盐、腌肉用粗盐；控盐人群可选低钠盐。结块受潮的别用。',
    buy: '超市调味区。',
    brands: ['中盐', '雪天'],
    spoon: SPOON.salt,
  });
  put(['白糖'], {
    kind: 'season', img: IMG('Sugar'), emoji: '🍬',
    pick: '细砂糖最易融化，适合炒菜调味；粗砂糖适合烘焙撒面。',
    buy: '超市调味区。',
    brands: ['太古', '甘汁园'],
    spoon: SPOON.sugar,
  });
  put(['冰糖'], {
    kind: 'season', img: IMG('Sugar'), emoji: '🍬',
    pick: '单晶冰糖（小块）更好化，黄冰糖风味更足；炒糖色用单晶不容易糊。',
    buy: '超市调味区。',
    brands: ['太古', '甘汁园'],
    spoon: SPOON.sugar,
  });
  put(['糖粉'], {
    kind: 'season', img: IMG('Icing Sugar'), emoji: '🍬',
    pick: '糖粉比白糖细得多，含少量玉米淀粉防结块；打奶油必须用糖粉。',
    buy: '超市烘焙区。',
    brands: ['太古'],
    spoon: SPOON.sugar,
  });
  put(['蚝油'], {
    kind: 'season', img: IMG('Oyster Sauce'), emoji: '🧴',
    pick: '看配料表，第一位是"蚝汁"的更好；开瓶后要冷藏，常温放久会发苦。',
    buy: '超市调味区。',
    brands: ['李锦记', '海天'],
    spoon: SPOON.paste,
  });
  put(['番茄酱'], {
    kind: 'season', img: IMG('Tomato Ketchup'), emoji: '🍅',
    pick: '看番茄含量和糖分，番茄酱偏酸、番茄沙司偏甜；糖醋里脊用番茄酱颜色更红亮。',
    buy: '超市调味区。',
    brands: ['亨氏', '李锦记'],
    spoon: SPOON.paste,
  });
  put(['郫县豆瓣酱'], {
    kind: 'season', img: IMG('Doubanjiang'), emoji: '🌶️',
    pick: '认准"郫县豆瓣"地理标志，颜色红亮、有酱香和辣香、咸度适中；死咸发黑的是劣质品。',
    buy: '超市调味区，袋装或瓶装都行。',
    brands: ['鹃城牌', '丹丹'],
    spoon: SPOON.paste,
  });
  put(['豆豉', '永川豆豉'], {
    kind: 'season', img: IMG('Fermented Black Beans'), emoji: '🫘',
    pick: '豆粒乌黑油润、闻着有发酵酱香；发白长毛的是坏了。永川豆豉偏香，阳江豆豉偏咸。',
    buy: '超市调味区。',
    brands: ['外祖母（永川）', '阳江豆豉'],
    spoon: SPOON.paste,
  });
  put(['辣椒面'], {
    kind: 'season', img: IMG('Chilli Powder'), emoji: '🌶️',
    pick: '颜色自然红、有辣椒香；特别红亮的可能加了色素，闻着呛但不香的可能是陈货。',
    buy: '超市调味区或菜市场干货摊。',
    brands: ['翠宏', '味好美'],
    spoon: SPOON.powder,
  });
  put(['花椒', '花椒粉'], {
    kind: 'season', img: IMG('Sichuan Pepper'), emoji: '🟤',
    pick: '汉源花椒（大红袍）最好，颗粒饱满、开口大、闻着麻香冲；一捏就碎的是陈花椒。',
    buy: '超市调味区或菜市场干货摊。',
    brands: ['汉源', '大红袍'],
    spoon: SPOON.powder,
  });
  put(['花椒油'], {
    kind: 'season', img: IMG('Oil'), emoji: '🧴',
    pick: '看配料是不是藤椒/花椒浸提，滴一滴在手心搓开麻香明显的才好。',
    buy: '超市调味区。',
    brands: ['幺麻子', '五丰黎红'],
    spoon: SPOON.oil,
  });
  put(['干辣椒'], {
    kind: 'season', img: IMG('Dried Red Chillies'), emoji: '🌶️',
    pick: '二荆条香而不太辣，子弹头辣度高，灯笼椒偏甜香；表皮暗红油亮、捏着干爽不发霉。',
    buy: '超市调味区或菜市场干货摊。',
    brands: ['二荆条', '子弹头'],
    spoon: SPOON.powder,
  });
  put(['小米辣'], {
    kind: 'season', img: IMG('Birds-eye Chillies'), emoji: '🌶️',
    pick: '细小尖长、颜色鲜红、捏着硬实的最辣；发软打蔫的只剩辣没有香。',
    buy: '菜市场或超市生鲜区，也可买冷冻小米辣常备。',
    spoon: SPOON.powder,
  });
  put(['泡红椒末'], {
    kind: 'season', img: IMG('Red Chilli'), emoji: '🌶️',
    pick: '泡椒要选坛泡的，酸香带辣、颜色红亮；用之前剁碎，酸味才出得来。',
    buy: '超市调味区（袋装泡椒）。',
    brands: ['郫筒', '丹丹'],
    spoon: SPOON.paste,
  });
  put(['红油辣椒', '辣椒油'], {
    kind: 'season', img: IMG('Chilli Sauce'), emoji: '🌶️',
    pick: '看配料表第一位是不是菜籽油和辣椒；油色红亮、有辣椒香和芝麻香，不是死辣。',
    buy: '超市调味区。',
    brands: ['老干妈', '六婆', '川南'],
    spoon: SPOON.oil,
  });
  put(['孜然粉'], {
    kind: 'season', img: IMG('Cumin'), emoji: '🟤',
    pick: '闻着有浓烈孜然香、颜色黄褐；发灰没味道的是放久了。',
    buy: '超市调味区。',
    brands: ['王守义', '味好美'],
    spoon: SPOON.powder,
  });
  put(['白胡椒粉'], {
    kind: 'season', img: IMG('Black Pepper'), emoji: '🫙',
    pick: '白胡椒比黑胡椒更温和，适合汤和馅；闻着辛香冲鼻、粉末细腻不结块。',
    buy: '超市调味区。',
    brands: ['王守义', '味好美'],
    spoon: SPOON.powder,
  });
  put(['鸡精'], {
    kind: 'season', img: IMG('Chicken Bouillon Powder'), emoji: '🥣',
    pick: '看谷氨酸钠和鸡肉粉含量；颗粒松散、有鸡香。出锅前放，久煮会失鲜。',
    buy: '超市调味区。',
    brands: ['太太乐', '家乐'],
    spoon: SPOON.powder,
  });
  put(['香油'], {
    kind: 'season', img: IMG('Sesame Seed Oil'), emoji: '🧴',
    pick: '选小磨香油，配料只有芝麻，闻着有浓郁芝麻香；颜色深褐透亮。',
    buy: '超市调味区。',
    brands: ['崔字牌', '金龙鱼'],
    spoon: SPOON.oil,
  });
  put(['猪油'], {
    kind: 'season', img: IMG('Lard'), emoji: '🥣',
    pick: '自己用猪板油熬最香（加两片姜去腥）；买成品看配料只有猪脂肪，雪白无杂质。',
    buy: '菜市场买板油自己熬，或超市买现成猪油。',
    spoon: SPOON.oil,
  });
  put(['八角'], {
    kind: 'season', img: IMG('Star Anise'), emoji: '⭐',
    pick: '八个角完整、角尖钝圆、香味冲；碎末多、颜色发灰的掺了梗或放久了。',
    buy: '超市调味区或菜市场干货摊。',
    spoon: SPOON.powder,
  });
  put(['桂皮'], {
    kind: 'season', img: IMG('Cinnamon Stick'), emoji: '🟫',
    pick: '选肉桂（厚、油性大、断面红棕有油光），比薄薄的阴香香气足。',
    buy: '超市调味区或菜市场干货摊。',
    spoon: SPOON.powder,
  });
  put(['卤料包（八角/桂皮/香叶/花椒）'], {
    kind: 'season', img: IMG('Chinese five spice powder'), emoji: '🫙',
    pick: '直接买配好的卤料包最省事；看生产日期，香料放久了只剩颜色没有香。',
    buy: '超市调味区。',
    brands: ['王守义', '十三香'],
    spoon: SPOON.powder,
  });
  put(['高汤（或清水）'], {
    kind: 'season', img: IMG('Vegetable Stock'), emoji: '🥣',
    pick: '家里有鸡汤、骨汤最好；没有就用清水加一小勺鸡精替代，别用浓汤宝（偏咸）。',
    buy: '自己做，或超市买无盐高汤。',
    spoon: SPOON.liquid,
  });

  /* ---------- 坚果 / 干货 ---------- */
  put(['油炸花生米', '熟花生碎'], {
    kind: 'made', img: IMG('Peanuts'), emoji: '🥜',
    pick: '买现成的选颜色浅黄、颗粒饱满、闻着是花生香没有哈喇味的；自己做更放心：冷油下花生小火炸到微黄就捞，余温会继续上色。',
    buy: '超市零食区、菜市场炒货摊；熟花生碎买小包装，开封后密封防潮。',
  });
  put(['白芝麻', '熟白芝麻'], {
    kind: 'season', img: IMG('Sesame Seed'), emoji: '⚪',
    pick: '选颜色洁白、颗粒饱满、无杂质的；熟芝麻已经炒过可直接撒，生芝麻要自己小火炒到微微跳动才香。',
    buy: '超市调味区或杂粮区。',
    brands: ['买袋装熟芝麻，看配料只有白芝麻'],
    spoon: { unit: '小勺', ml: 5, g: 4, ref: '约 1 个啤酒瓶盖' },
  });

  /* ---------- 图库无图的干货 ---------- */
  put(['皮蛋'], {
    kind: 'made', emoji: '🥚',
    pick: '选无铅工艺、蛋壳完整无裂纹；摇一摇没有晃动感、剥开蛋白呈半透明琥珀色。',
    buy: '超市蛋品区或菜市场。',
    brands: ['神丹'],
  });
  put(['乌梅', '山楂干', '陈皮', '甘草', '洛神花', '干桂花'], {
    kind: 'made', emoji: '🌿',
    pick: '看颜色自然、闻着是本身的气味不带霉味；乌梅要选烟熏乌梅，酸梅汤才有那股焦香。',
    buy: '中药房、超市干货区或茶饮原料店。',
    brands: ['同仁堂（药材）', '艺福堂（花草茶）'],
  });
  put(['可乐'], {
    kind: 'made', emoji: '🥤',
    pick: '冰镇后气泡更足；买易拉罐装比大瓶装气感好，开罐即饮。',
    buy: '便利店或超市。',
    brands: ['可口可乐', '百事可乐'],
  });
})();

/* 获取难度：1 超市就有 / 2 要去特定店或网购 / 3 不好买、看季节 */
const RARE = {
  '金钱肚': 3, '冬笋': 3,
  '鲜活扇贝': 2, '花雕酒': 2, '乌梅': 2, '山楂干': 2, '陈皮': 2, '甘草': 2, '洛神花': 2,
  '干桂花': 2, '西柚': 2, '香水柠檬': 2, '椰浆': 2, '淡奶油': 2, '低筋面粉': 2, '黄油': 2,
  '糖粉': 2, '土蜂蜜': 2, '西米': 2, '蜜红豆': 2, '橄榄菜': 2, '火腿': 2, '牛腱子': 2,
  '薄荷叶': 2, '蟹柳': 1,
};

/* 食材分类（购物/选料时按类挑选） */
const CAT_OF = (function () {
  const groups = {
    '肉类': ['带皮五花肉', '五花肉', '猪里脊', '猪肉末', '牛里脊', '牛腱子', '牛肉末', '金钱肚',
             '三黄鸡', '鸡全腿', '鸡中翅', '鸡胸肉', '火腿', '广式腊肠'],
    '水产': ['草鱼', '鲜活扇贝', '虾仁', '虾皮', '蟹柳'],
    '蔬菜': ['西红柿', '黄瓜', '胡萝卜', '洋葱', '大蒜', '蒜', '蒜末', '蒜泥', '姜', '姜末',
             '大葱', '小葱', '小香葱', '蒜苗', '韭菜', '芹菜', '莴笋', '莲藕', '冬笋', '四季豆',
             '黄豆芽', '青豆', '青豆玉米粒', '水发木耳', '薄荷叶', '螺丝椒（或青尖椒）', '红线椒'],
    '豆制品': ['嫩豆腐', '内酯豆腐', '豆干', '橄榄菜'],
    '蛋奶': ['鸡蛋', '蛋清', '鸡蛋清', '纯牛奶', '牛奶', '全脂牛奶', '淡奶油', '黄油', '椰浆',
             '土蜂蜜', '蜂蜜', '皮蛋'],
    '主食米面': ['大米', '隔夜米饭', '饺子皮', '细面条', '龙口粉丝', '面粉', '低筋面粉',
                 '淀粉', '玉米淀粉', '水淀粉', '西米', '蜜红豆'],
    '水果': ['甜橙', '柠檬', '香水柠檬', '大芒果', '西柚'],
    '干货': ['乌梅', '山楂干', '陈皮', '甘草', '洛神花', '干桂花', '白芝麻', '熟白芝麻',
             '油炸花生米', '熟花生碎'],
    '调料': ['生抽', '老抽', '料酒', '花雕酒', '香醋', '白醋', '盐', '食盐', '白糖', '冰糖',
             '糖粉', '蚝油', '番茄酱', '郫县豆瓣酱', '豆豉', '永川豆豉', '辣椒面', '花椒',
             '花椒粉', '花椒油', '干辣椒', '小米辣', '泡红椒末', '红油辣椒', '辣椒油', '孜然粉',
             '白胡椒粉', '鸡精', '香油', '猪油', '八角', '桂皮', '卤料包（八角/桂皮/香叶/花椒）',
             '高汤（或清水）'],
    '其他': ['清水', '冰块', '可乐'],
  };
  const map = {};
  Object.keys(groups).forEach(cat => groups[cat].forEach(n => { map[n] = cat; }));
  return map;
})();
