/* ============================================================
 * 食材实拍图库（每种食材多张）
 * 图片来自 TheMealDB 免费食材图库，均为直链实拍图
 * 由构建脚本生成并人工清洗，链接已逐个校验可用
 * ============================================================ */

const PHOTOS = {
  "三黄鸡": [
    "https://www.themealdb.com/images/ingredients/Chicken-Small.png",
    "https://www.themealdb.com/images/ingredients/Chicken%20Thighs-Small.png",
    "https://www.themealdb.com/images/ingredients/Chicken%20Legs-Small.png"
  ],
  "五花肉": [
    "https://www.themealdb.com/images/ingredients/Pork%20Belly%20slices-Small.png",
    "https://www.themealdb.com/images/ingredients/Pork%20Shoulder-Small.png",
    "https://www.themealdb.com/images/ingredients/Pork-Small.png",
    "https://www.themealdb.com/images/ingredients/Pork%20Chops-Small.png"
  ],
  "低筋面粉": [
    "https://www.themealdb.com/images/ingredients/Plain%20Flour-Small.png",
    "https://www.themealdb.com/images/ingredients/Flour-Small.png",
    "https://www.themealdb.com/images/ingredients/White%20Flour-Small.png"
  ],
  "全脂牛奶": [
    "https://www.themealdb.com/images/ingredients/Whole%20Milk-Small.png",
    "https://www.themealdb.com/images/ingredients/Milk-Small.png"
  ],
  "八角": [
    "https://www.themealdb.com/images/ingredients/Star%20Anise-Small.png",
    "https://www.themealdb.com/images/ingredients/Anise-Small.png"
  ],
  "内酯豆腐": [
    "https://www.themealdb.com/images/ingredients/Silken%20Tofu-Small.png",
    "https://www.themealdb.com/images/ingredients/Tofu-Small.png",
    "https://www.themealdb.com/images/ingredients/Marinated%20Tofu-Small.png"
  ],
  "冬笋": [
    "https://www.themealdb.com/images/ingredients/Bamboo%20Shoot-Small.png"
  ],
  "冰块": [
    "https://www.themealdb.com/images/ingredients/Ice-Small.png"
  ],
  "冰糖": [
    "https://www.themealdb.com/images/ingredients/Sugar-Small.png",
    "https://www.themealdb.com/images/ingredients/Caster%20Sugar-Small.png",
    "https://www.themealdb.com/images/ingredients/Demerara%20Sugar-Small.png"
  ],
  "卤料包（八角/桂皮/香叶/花椒）": [
    "https://www.themealdb.com/images/ingredients/Chinese%20five%20spice%20powder-Small.png",
    "https://www.themealdb.com/images/ingredients/Five%20Spice%20Powder-Small.png"
  ],
  "四季豆": [
    "https://www.themealdb.com/images/ingredients/Green%20Beans-Small.png",
    "https://www.themealdb.com/images/ingredients/Runner%20Beans-Small.png",
    "https://www.themealdb.com/images/ingredients/Sugar%20Snap%20Peas-Small.png"
  ],
  "土蜂蜜": [
    "https://www.themealdb.com/images/ingredients/Honey-Small.png",
    "https://www.themealdb.com/images/ingredients/Clear%20Honey-Small.png"
  ],
  "大米": [
    "https://www.themealdb.com/images/ingredients/Rice-Small.png",
    "https://www.themealdb.com/images/ingredients/Basmati%20Rice-Small.png",
    "https://www.themealdb.com/images/ingredients/Jasmine%20Rice-Small.png"
  ],
  "大芒果": [
    "https://www.themealdb.com/images/ingredients/Mango-Small.png"
  ],
  "大葱": [
    "https://www.themealdb.com/images/ingredients/Spring%20Onions-Small.png",
    "https://www.themealdb.com/images/ingredients/Scallions-Small.png",
    "https://www.themealdb.com/images/ingredients/Leek-Small.png"
  ],
  "大蒜": [
    "https://www.themealdb.com/images/ingredients/Garlic-Small.png",
    "https://www.themealdb.com/images/ingredients/Garlic%20Clove-Small.png",
    "https://www.themealdb.com/images/ingredients/Garlic%20Bulb-Small.png"
  ],
  "姜": [
    "https://www.themealdb.com/images/ingredients/Ginger-Small.png",
    "https://www.themealdb.com/images/ingredients/Ground%20Ginger-Small.png"
  ],
  "姜末": [
    "https://www.themealdb.com/images/ingredients/Ginger-Small.png",
    "https://www.themealdb.com/images/ingredients/Ground%20Ginger-Small.png",
    "https://www.themealdb.com/images/ingredients/Ginger%20Paste-Small.png"
  ],
  "嫩豆腐": [
    "https://www.themealdb.com/images/ingredients/Silken%20Tofu-Small.png",
    "https://www.themealdb.com/images/ingredients/Tofu-Small.png",
    "https://www.themealdb.com/images/ingredients/Marinated%20Tofu-Small.png"
  ],
  "孜然粉": [
    "https://www.themealdb.com/images/ingredients/Cumin-Small.png",
    "https://www.themealdb.com/images/ingredients/Cumin%20Seeds-Small.png",
    "https://www.themealdb.com/images/ingredients/Ground%20Cumin-Small.png"
  ],
  "小米辣": [
    "https://www.themealdb.com/images/ingredients/Birds-eye%20Chillies-Small.png",
    "https://www.themealdb.com/images/ingredients/Red%20Chilli-Small.png",
    "https://www.themealdb.com/images/ingredients/Green%20Chilli-Small.png"
  ],
  "小葱": [
    "https://www.themealdb.com/images/ingredients/Spring%20Onions-Small.png",
    "https://www.themealdb.com/images/ingredients/Scallions-Small.png"
  ],
  "小香葱": [
    "https://www.themealdb.com/images/ingredients/Spring%20Onions-Small.png",
    "https://www.themealdb.com/images/ingredients/Scallions-Small.png"
  ],
  "带皮五花肉": [
    "https://www.themealdb.com/images/ingredients/Pork%20Belly%20slices-Small.png",
    "https://www.themealdb.com/images/ingredients/Pork%20Shoulder-Small.png",
    "https://www.themealdb.com/images/ingredients/Pork-Small.png",
    "https://www.themealdb.com/images/ingredients/Pork%20Chops-Small.png"
  ],
  "干辣椒": [
    "https://www.themealdb.com/images/ingredients/Dried%20Red%20Chillies-Small.png",
    "https://www.themealdb.com/images/ingredients/Dried%20Chillies-Small.png",
    "https://www.themealdb.com/images/ingredients/Red%20Chilli-Small.png"
  ],
  "广式腊肠": [
    "https://www.themealdb.com/images/ingredients/Sausages-Small.png"
  ],
  "料酒": [
    "https://www.themealdb.com/images/ingredients/Cooking%20wine-Small.png",
    "https://www.themealdb.com/images/ingredients/Rice%20wine-Small.png",
    "https://www.themealdb.com/images/ingredients/Shaoxing%20Wine-Small.png"
  ],
  "柠檬": [
    "https://www.themealdb.com/images/ingredients/Lemon-Small.png",
    "https://www.themealdb.com/images/ingredients/Lemons-Small.png"
  ],
  "桂皮": [
    "https://www.themealdb.com/images/ingredients/Cinnamon%20Stick-Small.png",
    "https://www.themealdb.com/images/ingredients/Cinnamon-Small.png"
  ],
  "椰浆": [
    "https://www.themealdb.com/images/ingredients/Coconut%20Milk-Small.png",
    "https://www.themealdb.com/images/ingredients/Coconut%20Cream-Small.png"
  ],
  "水发木耳": [
    "https://www.themealdb.com/images/ingredients/Wood%20Ear%20Mushrooms-Small.png",
    "https://www.themealdb.com/images/ingredients/Shiitake%20Mushrooms-Small.png",
    "https://www.themealdb.com/images/ingredients/Mushrooms-Small.png"
  ],
  "水淀粉": [
    "https://www.themealdb.com/images/ingredients/Cornstarch-Small.png",
    "https://www.themealdb.com/images/ingredients/Corn%20Flour-Small.png"
  ],
  "永川豆豉": [
    "https://www.themealdb.com/images/ingredients/Fermented%20Black%20Beans-Small.png",
    "https://www.themealdb.com/images/ingredients/Black%20Beans-Small.png"
  ],
  "油炸花生米": [
    "https://www.themealdb.com/images/ingredients/Peanuts-Small.png",
    "https://www.themealdb.com/images/ingredients/Roasted%20Peanut-Small.png"
  ],
  "泡红椒末": [
    "https://www.themealdb.com/images/ingredients/Red%20Chilli-Small.png",
    "https://www.themealdb.com/images/ingredients/Red%20Pepper-Small.png",
    "https://www.themealdb.com/images/ingredients/Roasted%20pepper-Small.png"
  ],
  "洋葱": [
    "https://www.themealdb.com/images/ingredients/Onions-Small.png",
    "https://www.themealdb.com/images/ingredients/Red%20Onions-Small.png",
    "https://www.themealdb.com/images/ingredients/Yellow%20Onion-Small.png",
    "https://www.themealdb.com/images/ingredients/Chopped%20Onion-Small.png"
  ],
  "淀粉": [
    "https://www.themealdb.com/images/ingredients/Starch-Small.png",
    "https://www.themealdb.com/images/ingredients/Cornstarch-Small.png",
    "https://www.themealdb.com/images/ingredients/Corn%20Flour-Small.png"
  ],
  "淡奶油": [
    "https://www.themealdb.com/images/ingredients/Heavy%20Cream-Small.png",
    "https://www.themealdb.com/images/ingredients/Double%20Cream-Small.png",
    "https://www.themealdb.com/images/ingredients/Whipping%20Cream-Small.png",
    "https://www.themealdb.com/images/ingredients/Single%20Cream-Small.png"
  ],
  "清水": [
    "https://www.themealdb.com/images/ingredients/Water-Small.png",
    "https://www.themealdb.com/images/ingredients/Cold%20Water-Small.png",
    "https://www.themealdb.com/images/ingredients/Boiling%20Water-Small.png"
  ],
  "火腿": [
    "https://www.themealdb.com/images/ingredients/Ham-Small.png",
    "https://www.themealdb.com/images/ingredients/Parma%20Ham-Small.png",
    "https://www.themealdb.com/images/ingredients/Serrano%20Ham-Small.png"
  ],
  "熟白芝麻": [
    "https://www.themealdb.com/images/ingredients/Sesame%20Seed-Small.png",
    "https://www.themealdb.com/images/ingredients/Sesame%20Seed%20Burger%20Buns-Small.png"
  ],
  "熟花生碎": [
    "https://www.themealdb.com/images/ingredients/Peanuts-Small.png",
    "https://www.themealdb.com/images/ingredients/Roasted%20Peanut-Small.png"
  ],
  "牛奶": [
    "https://www.themealdb.com/images/ingredients/Milk-Small.png",
    "https://www.themealdb.com/images/ingredients/Whole%20Milk-Small.png",
    "https://www.themealdb.com/images/ingredients/Semi-skimmed%20Milk-Small.png"
  ],
  "牛肉末": [
    "https://www.themealdb.com/images/ingredients/Minced%20Beef-Small.png",
    "https://www.themealdb.com/images/ingredients/Ground%20Beef-Small.png",
    "https://www.themealdb.com/images/ingredients/Beef-Small.png"
  ],
  "牛腱子": [
    "https://www.themealdb.com/images/ingredients/Beef%20Brisket-Small.png",
    "https://www.themealdb.com/images/ingredients/Beef%20Shin-Small.png",
    "https://www.themealdb.com/images/ingredients/Beef-Small.png"
  ],
  "牛里脊": [
    "https://www.themealdb.com/images/ingredients/Beef%20Fillet-Small.png",
    "https://www.themealdb.com/images/ingredients/Beef%20Flank%20Steak-Small.png",
    "https://www.themealdb.com/images/ingredients/Sirloin%20steak-Small.png"
  ],
  "猪油": [
    "https://www.themealdb.com/images/ingredients/Lard-Small.png",
    "https://www.themealdb.com/images/ingredients/Goose%20Fat-Small.png"
  ],
  "猪肉末": [
    "https://www.themealdb.com/images/ingredients/Minced%20Pork-Small.png",
    "https://www.themealdb.com/images/ingredients/Ground%20Pork-Small.png",
    "https://www.themealdb.com/images/ingredients/Pork-Small.png"
  ],
  "猪里脊": [
    "https://www.themealdb.com/images/ingredients/Pork%20Tenderloin-Small.png",
    "https://www.themealdb.com/images/ingredients/Pork-Small.png",
    "https://www.themealdb.com/images/ingredients/Pork%20Chops-Small.png"
  ],
  "玉米淀粉": [
    "https://www.themealdb.com/images/ingredients/Cornstarch-Small.png",
    "https://www.themealdb.com/images/ingredients/Corn%20Flour-Small.png",
    "https://www.themealdb.com/images/ingredients/Starch-Small.png"
  ],
  "甜橙": [
    "https://www.themealdb.com/images/ingredients/Orange-Small.png"
  ],
  "生抽": [
    "https://www.themealdb.com/images/ingredients/Soy%20Sauce-Small.png"
  ],
  "番茄酱": [
    "https://www.themealdb.com/images/ingredients/Tomato%20Ketchup-Small.png",
    "https://www.themealdb.com/images/ingredients/Tomato%20Puree-Small.png",
    "https://www.themealdb.com/images/ingredients/Passata-Small.png"
  ],
  "白糖": [
    "https://www.themealdb.com/images/ingredients/Sugar-Small.png",
    "https://www.themealdb.com/images/ingredients/Caster%20Sugar-Small.png",
    "https://www.themealdb.com/images/ingredients/Granulated%20Sugar-Small.png"
  ],
  "白胡椒粉": [
    "https://www.themealdb.com/images/ingredients/Black%20Pepper-Small.png"
  ],
  "白芝麻": [
    "https://www.themealdb.com/images/ingredients/Sesame%20Seed-Small.png"
  ],
  "白醋": [
    "https://www.themealdb.com/images/ingredients/White%20Vinegar-Small.png",
    "https://www.themealdb.com/images/ingredients/Vinegar-Small.png"
  ],
  "盐": [
    "https://www.themealdb.com/images/ingredients/Salt-Small.png",
    "https://www.themealdb.com/images/ingredients/Sea%20Salt-Small.png"
  ],
  "糖粉": [
    "https://www.themealdb.com/images/ingredients/Icing%20Sugar-Small.png",
    "https://www.themealdb.com/images/ingredients/Powdered%20Sugar-Small.png"
  ],
  "红油辣椒": [
    "https://www.themealdb.com/images/ingredients/Chilli%20Sauce-Small.png",
    "https://www.themealdb.com/images/ingredients/sweet%20chilli%20sauce-Small.png",
    "https://www.themealdb.com/images/ingredients/Chilli%20Bean%20Paste-Small.png"
  ],
  "红线椒": [
    "https://www.themealdb.com/images/ingredients/Red%20Chilli-Small.png",
    "https://www.themealdb.com/images/ingredients/Red%20Pepper-Small.png",
    "https://www.themealdb.com/images/ingredients/Mixed%20peppers-Small.png"
  ],
  "纯牛奶": [
    "https://www.themealdb.com/images/ingredients/Milk-Small.png",
    "https://www.themealdb.com/images/ingredients/Whole%20Milk-Small.png",
    "https://www.themealdb.com/images/ingredients/Semi-skimmed%20Milk-Small.png"
  ],
  "细面条": [
    "https://www.themealdb.com/images/ingredients/Noodles-Small.png",
    "https://www.themealdb.com/images/ingredients/Egg%20Noodles-Small.png",
    "https://www.themealdb.com/images/ingredients/Udon%20Noodles-Small.png"
  ],
  "胡萝卜": [
    "https://www.themealdb.com/images/ingredients/Carrots-Small.png"
  ],
  "花椒": [
    "https://www.themealdb.com/images/ingredients/Sichuan%20Pepper-Small.png"
  ],
  "花椒油": [
    "https://www.themealdb.com/images/ingredients/Oil-Small.png"
  ],
  "花椒粉": [
    "https://www.themealdb.com/images/ingredients/Sichuan%20Pepper-Small.png",
    "https://www.themealdb.com/images/ingredients/Szechuan%20Peppercorns-Small.png"
  ],
  "花雕酒": [
    "https://www.themealdb.com/images/ingredients/Shaoxing%20Wine-Small.png",
    "https://www.themealdb.com/images/ingredients/Rice%20wine-Small.png",
    "https://www.themealdb.com/images/ingredients/Sake-Small.png"
  ],
  "芹菜": [
    "https://www.themealdb.com/images/ingredients/Celery-Small.png",
    "https://www.themealdb.com/images/ingredients/Celeriac-Small.png"
  ],
  "草鱼": [
    "https://www.themealdb.com/images/ingredients/White%20Fish-Small.png",
    "https://www.themealdb.com/images/ingredients/White%20Fish%20Fillets-Small.png",
    "https://www.themealdb.com/images/ingredients/Sea%20Bass-Small.png",
    "https://www.themealdb.com/images/ingredients/Sea%20Bass%20Fillets-Small.png"
  ],
  "莴笋": [
    "https://www.themealdb.com/images/ingredients/Lettuce-Small.png",
    "https://www.themealdb.com/images/ingredients/Little%20Gem%20Lettuce-Small.png",
    "https://www.themealdb.com/images/ingredients/Iceberg%20Lettuce-Small.png"
  ],
  "蒜": [
    "https://www.themealdb.com/images/ingredients/Garlic-Small.png",
    "https://www.themealdb.com/images/ingredients/Garlic%20Clove-Small.png",
    "https://www.themealdb.com/images/ingredients/Garlic%20Bulb-Small.png"
  ],
  "蒜末": [
    "https://www.themealdb.com/images/ingredients/Garlic-Small.png",
    "https://www.themealdb.com/images/ingredients/Minced%20Garlic-Small.png",
    "https://www.themealdb.com/images/ingredients/Garlic%20Clove-Small.png"
  ],
  "蒜泥": [
    "https://www.themealdb.com/images/ingredients/Garlic-Small.png",
    "https://www.themealdb.com/images/ingredients/Minced%20Garlic-Small.png",
    "https://www.themealdb.com/images/ingredients/Garlic%20Granules-Small.png"
  ],
  "蒜苗": [
    "https://www.themealdb.com/images/ingredients/Scallions-Small.png",
    "https://www.themealdb.com/images/ingredients/Spring%20Onions-Small.png"
  ],
  "薄荷叶": [
    "https://www.themealdb.com/images/ingredients/Mint-Small.png"
  ],
  "虾仁": [
    "https://www.themealdb.com/images/ingredients/Prawns-Small.png",
    "https://www.themealdb.com/images/ingredients/Raw%20King%20Prawns-Small.png",
    "https://www.themealdb.com/images/ingredients/Tiger%20Prawns-Small.png",
    "https://www.themealdb.com/images/ingredients/Jumbo%20Shrimp-Small.png"
  ],
  "蚝油": [
    "https://www.themealdb.com/images/ingredients/Oyster%20Sauce-Small.png"
  ],
  "蛋清": [
    "https://www.themealdb.com/images/ingredients/Egg%20White-Small.png",
    "https://www.themealdb.com/images/ingredients/Eggs-Small.png"
  ],
  "蜂蜜": [
    "https://www.themealdb.com/images/ingredients/Honey-Small.png",
    "https://www.themealdb.com/images/ingredients/Clear%20Honey-Small.png"
  ],
  "螺丝椒（或青尖椒）": [
    "https://www.themealdb.com/images/ingredients/Green%20Chilli-Small.png",
    "https://www.themealdb.com/images/ingredients/Green%20Pepper-Small.png",
    "https://www.themealdb.com/images/ingredients/Yellow%20Pepper-Small.png"
  ],
  "西柚": [
    "https://www.themealdb.com/images/ingredients/Grapefruit-Small.png"
  ],
  "西红柿": [
    "https://www.themealdb.com/images/ingredients/Tomatoes-Small.png",
    "https://www.themealdb.com/images/ingredients/Tomato-Small.png",
    "https://www.themealdb.com/images/ingredients/Cherry%20Tomatoes-Small.png",
    "https://www.themealdb.com/images/ingredients/Plum%20Tomatoes-Small.png",
    "https://www.themealdb.com/images/ingredients/Beef%20tomatoes-Small.png"
  ],
  "豆干": [
    "https://www.themealdb.com/images/ingredients/Tofu-Small.png",
    "https://www.themealdb.com/images/ingredients/Marinated%20Tofu-Small.png"
  ],
  "豆豉": [
    "https://www.themealdb.com/images/ingredients/Fermented%20Black%20Beans-Small.png",
    "https://www.themealdb.com/images/ingredients/Black%20Beans-Small.png"
  ],
  "辣椒油": [
    "https://www.themealdb.com/images/ingredients/Chilli%20Sauce-Small.png",
    "https://www.themealdb.com/images/ingredients/sweet%20chilli%20sauce-Small.png",
    "https://www.themealdb.com/images/ingredients/Chilli%20Bean%20Paste-Small.png"
  ],
  "辣椒面": [
    "https://www.themealdb.com/images/ingredients/Chilli%20Powder-Small.png",
    "https://www.themealdb.com/images/ingredients/Red%20Chilli%20Powder-Small.png",
    "https://www.themealdb.com/images/ingredients/Hot%20Chilli%20Powder-Small.png"
  ],
  "郫县豆瓣酱": [
    "https://www.themealdb.com/images/ingredients/Doubanjiang-Small.png",
    "https://www.themealdb.com/images/ingredients/Chilli%20Bean%20Paste-Small.png"
  ],
  "隔夜米饭": [
    "https://www.themealdb.com/images/ingredients/Rice-Small.png",
    "https://www.themealdb.com/images/ingredients/Basmati%20Rice-Small.png",
    "https://www.themealdb.com/images/ingredients/Jasmine%20Rice-Small.png",
    "https://www.themealdb.com/images/ingredients/Sushi%20Rice-Small.png"
  ],
  "青豆": [
    "https://www.themealdb.com/images/ingredients/Peas-Small.png",
    "https://www.themealdb.com/images/ingredients/Frozen%20Peas-Small.png",
    "https://www.themealdb.com/images/ingredients/Petit%20Pois-Small.png"
  ],
  "青豆玉米粒": [
    "https://www.themealdb.com/images/ingredients/Peas-Small.png",
    "https://www.themealdb.com/images/ingredients/Sweetcorn-Small.png",
    "https://www.themealdb.com/images/ingredients/Frozen%20Peas-Small.png"
  ],
  "面粉": [
    "https://www.themealdb.com/images/ingredients/Flour-Small.png",
    "https://www.themealdb.com/images/ingredients/Plain%20Flour-Small.png",
    "https://www.themealdb.com/images/ingredients/White%20Flour-Small.png"
  ],
  "韭菜": [
    "https://www.themealdb.com/images/ingredients/Chives-Small.png"
  ],
  "食盐": [
    "https://www.themealdb.com/images/ingredients/Salt-Small.png",
    "https://www.themealdb.com/images/ingredients/Sea%20Salt-Small.png"
  ],
  "饺子皮": [
    "https://www.themealdb.com/images/ingredients/Wonton%20Skin-Small.png",
    "https://www.themealdb.com/images/ingredients/Egg%20Roll%20Wrappers-Small.png"
  ],
  "香水柠檬": [
    "https://www.themealdb.com/images/ingredients/Lemon-Small.png",
    "https://www.themealdb.com/images/ingredients/Lemons-Small.png",
    "https://www.themealdb.com/images/ingredients/Unwaxed%20Lemon-Small.png"
  ],
  "香油": [
    "https://www.themealdb.com/images/ingredients/Sesame%20Seed%20Oil-Small.png",
    "https://www.themealdb.com/images/ingredients/Oil-Small.png"
  ],
  "香醋": [
    "https://www.themealdb.com/images/ingredients/Vinegar-Small.png",
    "https://www.themealdb.com/images/ingredients/Balsamic%20Vinegar-Small.png",
    "https://www.themealdb.com/images/ingredients/Malt%20Vinegar-Small.png"
  ],
  "高汤（或清水）": [
    "https://www.themealdb.com/images/ingredients/Vegetable%20Stock-Small.png",
    "https://www.themealdb.com/images/ingredients/Chicken%20Stock-Small.png",
    "https://www.themealdb.com/images/ingredients/Beef%20Stock-Small.png"
  ],
  "鲜活扇贝": [
    "https://www.themealdb.com/images/ingredients/Clams-Small.png",
    "https://www.themealdb.com/images/ingredients/Mussels-Small.png",
    "https://www.themealdb.com/images/ingredients/Oysters-Small.png"
  ],
  "鸡中翅": [
    "https://www.themealdb.com/images/ingredients/Chicken%20Wings-Small.png",
    "https://www.themealdb.com/images/ingredients/Chicken%20drumsticks-Small.png"
  ],
  "鸡全腿": [
    "https://www.themealdb.com/images/ingredients/Chicken%20Legs-Small.png",
    "https://www.themealdb.com/images/ingredients/Chicken%20drumsticks-Small.png",
    "https://www.themealdb.com/images/ingredients/Chicken%20Thighs-Small.png"
  ],
  "鸡精": [
    "https://www.themealdb.com/images/ingredients/Chicken%20Bouillon%20Powder-Small.png",
    "https://www.themealdb.com/images/ingredients/Chicken%20Stock%20Cube-Small.png"
  ],
  "鸡胸肉": [
    "https://www.themealdb.com/images/ingredients/Chicken%20Breast-Small.png",
    "https://www.themealdb.com/images/ingredients/Chicken%20Breasts-Small.png",
    "https://www.themealdb.com/images/ingredients/Chicken-Small.png"
  ],
  "鸡蛋": [
    "https://www.themealdb.com/images/ingredients/Eggs-Small.png",
    "https://www.themealdb.com/images/ingredients/Egg-Small.png",
    "https://www.themealdb.com/images/ingredients/Egg%20Yolks-Small.png"
  ],
  "鸡蛋清": [
    "https://www.themealdb.com/images/ingredients/Egg%20White-Small.png",
    "https://www.themealdb.com/images/ingredients/Egg%20Yolks-Small.png",
    "https://www.themealdb.com/images/ingredients/Eggs-Small.png"
  ],
  "黄油": [
    "https://www.themealdb.com/images/ingredients/Butter-Small.png",
    "https://www.themealdb.com/images/ingredients/Salted%20Butter-Small.png",
    "https://www.themealdb.com/images/ingredients/Unsalted%20Butter-Small.png"
  ],
  "黄瓜": [
    "https://www.themealdb.com/images/ingredients/Cucumber-Small.png",
    "https://www.themealdb.com/images/ingredients/Persian%20Cucumber-Small.png"
  ],
  "黄豆芽": [
    "https://www.themealdb.com/images/ingredients/Bean%20Sprouts-Small.png",
    "https://www.themealdb.com/images/ingredients/Mung%20Bean%20Sprouts-Small.png"
  ],
  "龙口粉丝": [
    "https://www.themealdb.com/images/ingredients/Rice%20Vermicelli-Small.png",
    "https://www.themealdb.com/images/ingredients/Vermicelli%20Rice%20Noodles-Small.png",
    "https://www.themealdb.com/images/ingredients/Rice%20Noodles-Small.png",
    "https://www.themealdb.com/images/ingredients/Flat%20Rice%20Noodles-Small.png"
  ]
};
