# 深圳鼎利成生物科技 · 后端接口文档

> **技术栈：** Django 4.2 · Django REST Framework · uWSGI · Nginx · SQLite

---

## 基本信息

| 项目     | 说明                          |
| -------- | ----------------------------- |
| Base URL | `http://{SERVER_HOST}/api`    |
| 数据格式 | JSON / UTF-8                  |
| 鉴权方式 | 无（所有接口只读，无需鉴权）  |
| 时区     | Asia/Shanghai                 |
| 管理后台 | `http://{SERVER_HOST}/admin/` |

---

## 接口总览

| 方法 | 路径                          | 说明                    | 分页 |
| ---- | ----------------------------- | ----------------------- | :--: |
| GET  | `/api/products/`              | 产品列表（搜索 + 筛选） |  ✓   |
| GET  | `/api/products/{id}/`         | 产品详情                |  —   |
| GET  | `/api/products/featured/`     | 推荐产品（最多 12 条）  |  —   |
| GET  | `/api/products/stats/`        | 产品分类统计汇总        |  —   |
| GET  | `/api/products/{id}/related/` | 相关产品（最多 6 条）   |  —   |
| GET  | `/api/categories/`            | 分类树（含子分类）      |  ✓   |
| GET  | `/api/categories/{id}/`       | 分类详情                |  —   |
| GET  | `/api/categories/flat/`       | 扁平分类列表（无分页）  |  —   |
| GET  | `/api/brands/`                | 品牌列表（搜索 + 筛选） |  ✓   |
| GET  | `/api/brands/{id}/`           | 品牌详情                |  —   |
| GET  | `/api/brands/all/`            | 全部品牌（无分页）      |  —   |

---

## 通用规范

### 标准分页

支持分页的接口统一使用以下格式。

**请求参数：**

| 参数        | 类型    | 默认值 | 最大值 | 说明            |
| ----------- | ------- | ------ | ------ | --------------- |
| `page`      | integer | 1      | —      | 页码，从 1 开始 |
| `page_size` | integer | 20     | 100    | 每页条数        |

**响应结构：**

```json
{
  "count":       452,
  "page":        1,
  "page_size":   20,
  "total_pages": 23,
  "next":        "/api/products/?page=2",
  "previous":    null,
  "results":     [...]
}
```

### HTTP 状态码

| 状态码                      | 说明       |
| --------------------------- | ---------- |
| `200 OK`                    | 请求成功   |
| `400 Bad Request`           | 参数错误   |
| `404 Not Found`             | 资源不存在 |
| `500 Internal Server Error` | 服务器错误 |

### 多值参数格式

`brand`、`brand_id`、`category`、`category_slug` 均支持**逗号分隔**传入多个值，多个值之间为 **OR 逻辑**（满足任意一个即返回）。

```
# 单值
?brand=cfdi

# 多值（逗号分隔）
?brand=cfdi,usp,ep
?category=1,3,5
?category_slug=pharma,biochem
?brand_id=1,2,4
```

---

## 产品接口

### GET `/api/products/`

返回分页产品列表，支持全文搜索和多维筛选。默认排序：推荐产品优先，其次按创建时间降序（不支持自定义排序）。

**查询参数：**

| 参数            | 类型    | 必填 | 说明                                                          |
| --------------- | ------- | :--: | ------------------------------------------------------------- |
| `search`        | string  |  否  | 全文搜索，匹配：产品名称、英文名、CAS 号、货号、分子式        |
| `brand`         | string  |  否  | 品牌 slug，支持逗号分隔多值。例：`cfdi` 或 `cfdi,usp,ep`      |
| `brand_id`      | integer |  否  | 品牌 ID，支持逗号分隔多值。例：`1` 或 `1,2,4`                 |
| `category`      | integer |  否  | 分类 ID，支持逗号分隔多值。例：`1` 或 `1,3,5`                 |
| `category_slug` | string  |  否  | 分类 slug，支持逗号分隔多值。例：`pharma` 或 `pharma,biochem` |
| `cas`           | string  |  否  | CAS 号精确匹配（单值）。例：`58-08-2`                         |
| `featured`      | boolean |  否  | 仅返回推荐产品：`true` / `false`                              |
| `page`          | integer |  否  | 页码，默认 1                                                  |
| `page_size`     | integer |  否  | 每页条数，默认 20，最大 100                                   |

**请求示例：**

```
# 关键词搜索
GET /api/products/?search=咖啡因

# 单品牌 + 单分类
GET /api/products/?brand=cfdi&category_slug=pharma

# 多品牌筛选（逗号分隔）
GET /api/products/?brand=cfdi,usp,ep

# 多分类筛选（逗号分隔）
GET /api/products/?category_slug=pharma,biochem,impurity

# 组合筛选 + 分页
GET /api/products/?brand=cfdi,usp&category_slug=pharma&page=2&page_size=10

# 精确 CAS 号
GET /api/products/?cas=58-08-2

# 推荐产品
GET /api/products/?featured=true
```

**响应示例（200 OK）：**

```json
{
  "count": 452,
  "page": 1,
  "page_size": 20,
  "total_pages": 23,
  "next": "/api/products/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "咖啡因对照品",
      "name_en": "Caffeine Reference Standard",
      "cas_number": "58-08-2",
      "catalog_no": "DLC-C001",
      "formula": "C₈H₁₀N₄O₂",
      "mol_weight": "194.1900",
      "appearance": "白色结晶粉末",
      "brand_name": "CFDI",
      "brand_slug": "cfdi",
      "category_name": "医药对照品",
      "thumb_url": "http://{SERVER_HOST}/media/products/thumbs/xxx.webp",
      "is_featured": true
    }
  ]
}
```

---

### GET `/api/products/{id}/`

返回单个产品完整详情，包含品牌对象、分类对象、规格列表、CoA/SDS 文件链接。每次请求该接口，`view_count` 自动 +1。

> **注意：** 详情接口不返回 `purity`（纯度）字段，已按设计规范移除。

**路径参数：**

| 参数 | 类型    | 必填 | 说明    |
| ---- | ------- | :--: | ------- |
| `id` | integer |  是  | 产品 ID |

**响应示例（200 OK）：**

```json
{
  "id": 1,
  "name": "咖啡因对照品",
  "name_en": "Caffeine Reference Standard",
  "cas_number": "58-08-2",
  "catalog_no": "DLC-C001",
  "formula": "C₈H₁₀N₄O₂",
  "mol_weight": "194.1900",
  "appearance": "白色结晶粉末",
  "standard": "中国药典2020版",
  "lot_no": "100081-202115",
  "expiry_date": "36个月",
  "storage_temp": "2-8°C",
  "storage_note": "密封避光保存",
  "brand": {
    "id": 1,
    "name": "CFDI",
    "name_cn": "中国食品药品检定研究院",
    "slug": "cfdi",
    "category": "pharmacopeia",
    "logo_url": null,
    "country": "中国",
    "is_authorized": false,
    "is_active": true
  },
  "category": {
    "id": 1,
    "name": "医药对照品",
    "name_en": "Pharmaceutical",
    "slug": "pharma",
    "icon": "💊"
  },
  "specs": [
    { "id": 1, "package": "5mg", "stock": 10, "lead_time": "现货" },
    { "id": 2, "package": "25mg", "stock": 5, "lead_time": "现货" },
    { "id": 3, "package": "100mg", "stock": 2, "lead_time": "5~7工作日" }
  ],
  "thumb_url": "http://{SERVER_HOST}/media/products/thumbs/xxx.webp",
  "image_url": "http://{SERVER_HOST}/media/products/images/xxx.webp",
  "mol_url": null,
  "coa_url": "http://{SERVER_HOST}/media/products/coa/xxx.pdf",
  "sds_url": null,
  "description": "",
  "notes": "",
  "is_featured": true,
  "view_count": 128,
  "created_at": "2024-01-15T08:30:00+08:00",
  "updated_at": "2024-06-20T12:00:00+08:00"
}
```

---

### GET `/api/products/stats/`

返回所有品牌和分类的产品数量统计汇总，用于筛选侧栏的数量角标，**一次请求获取全部统计数据**。

支持与产品列表相同的筛选上下文：传入 `brand` 后，`by_category` 会只统计该品牌下各分类的数量；传入 `category_slug` 后，`by_brand` 会只统计该分类下各品牌的数量。这样可以实现筛选联动效果。

**查询参数：**

| 参数            | 类型    | 必填 | 说明                                             |
| --------------- | ------- | :--: | ------------------------------------------------ |
| `search`        | string  |  否  | 与产品列表 `search` 相同，在搜索结果范围内统计   |
| `brand`         | string  |  否  | 逗号分隔品牌 slug，限定 `by_category` 的统计范围 |
| `brand_id`      | integer |  否  | 逗号分隔品牌 ID，与 `brand` 二选一               |
| `category`      | integer |  否  | 逗号分隔分类 ID，限定 `by_brand` 的统计范围      |
| `category_slug` | string  |  否  | 逗号分隔分类 slug，与 `category` 二选一          |
| `featured`      | boolean |  否  | `true` / `false`，仅统计推荐产品                 |

**请求示例：**

```
# 全量统计（无参数，页面初始化时调用）
GET /api/products/stats/

# 搜索关键词范围内统计
GET /api/products/stats/?search=咖啡因

# 已选中某品牌，获取该品牌下各分类的产品数量
GET /api/products/stats/?brand=cfdi

# 已选中某分类，获取该分类下各品牌的产品数量
GET /api/products/stats/?category_slug=pharma

# 组合：同时限定品牌和分类范围
GET /api/products/stats/?brand=cfdi,usp&category_slug=pharma,biochem
```

**响应示例（200 OK）：**

```json
{
  "total": 452,
  "by_category": [
    { "id": 1, "name": "医药对照品", "name_en": "Pharmaceutical", "slug": "pharma", "icon": "💊", "count": 128 },
    { "id": 2, "name": "生化标准品", "name_en": "Biochemical", "slug": "biochem", "icon": "🧬", "count": 96 },
    { "id": 3, "name": "杂质对照品", "name_en": "Impurity Ref.", "slug": "impurity", "icon": "⚗️", "count": 74 },
    { "id": 4, "name": "无机标准品", "name_en": "Inorganic", "slug": "inorganic", "icon": "🔬", "count": 43 },
    { "id": 5, "name": "工业检测标准", "name_en": "Industrial", "slug": "industrial", "icon": "🏭", "count": 38 },
    { "id": 6, "name": "认证参考物质", "name_en": "CRM", "slug": "crm", "icon": "📋", "count": 31 },
    { "id": 7, "name": "植物提取物", "name_en": "Plant Extract", "slug": "phyto", "icon": "🌿", "count": 25 },
    { "id": 8, "name": "农兽药残留标准", "name_en": "Pesticide Std.", "slug": "pesticide", "icon": "⚡", "count": 17 }
  ],
  "by_brand": [
    {
      "id": 1,
      "name": "CFDI",
      "name_cn": "中国食品药品检定研究院",
      "slug": "cfdi",
      "category": "pharmacopeia",
      "is_authorized": false,
      "count": 89
    },
    {
      "id": 2,
      "name": "USP",
      "name_cn": "USP标准品",
      "slug": "usp",
      "category": "pharmacopeia",
      "is_authorized": false,
      "count": 76
    },
    {
      "id": 11,
      "name": "SIGMA",
      "name_cn": "Sigma-Aldrich",
      "slug": "sigma",
      "category": "commercial",
      "is_authorized": false,
      "count": 54
    },
    {
      "id": 13,
      "name": "Chromogenix",
      "name_cn": "Chromogenix",
      "slug": "chromogenix",
      "category": "international",
      "is_authorized": true,
      "count": 41
    }
  ]
}
```

> **注意：**
>
> - `by_category` 按 `sort_order` 升序排列；`by_brand` 按产品数量降序排列，数量相同时按 `sort_order` 升序
> - 未关联任何上架产品的分类或品牌**不会出现**在结果中
> - `total` 是 `base_qs` 的总数，不受 `brand` / `category_slug` 参数影响（仅受 `search` 和 `featured` 影响）

---

### GET `/api/products/featured/`

返回推荐产品数组，**最多 12 条**，直接返回数组（非分页对象），用于首页推荐展示。

**请求参数：** 无

**响应示例（200 OK）：**

```json
[
  {
    "id": 1,
    "name": "咖啡因对照品",
    "name_en": "Caffeine Reference Standard",
    "cas_number": "58-08-2",
    "catalog_no": "DLC-C001",
    "formula": "C₈H₁₀N₄O₂",
    "mol_weight": "194.1900",
    "appearance": "白色结晶粉末",
    "brand_name": "CFDI",
    "brand_slug": "cfdi",
    "category_name": "医药对照品",
    "thumb_url": null,
    "is_featured": true
  }
]
```

---

### GET `/api/products/{id}/related/`

返回与指定产品**同品牌或同分类**的其他产品，最多 6 条，直接返回数组。

**路径参数：**

| 参数 | 类型    | 必填 | 说明        |
| ---- | ------- | :--: | ----------- |
| `id` | integer |  是  | 基准产品 ID |

**响应示例（200 OK）：**

```json
[
  {
    "id": 3,
    "name": "维生素C对照品",
    "name_en": "Ascorbic Acid Reference Standard",
    "cas_number": "50-81-7",
    "catalog_no": "DLC-V001",
    "formula": "C₆H₈O₆",
    "mol_weight": "176.1241",
    "appearance": "白色结晶粉末",
    "brand_name": "EP",
    "brand_slug": "ep",
    "category_name": "医药对照品",
    "thumb_url": null,
    "is_featured": false
  }
]
```

---

## 分类接口

### GET `/api/categories/`

返回**一级分类**列表（`parent` 为空的分类），每个分类包含 `children` 数组。支持标准分页。

**查询参数：** `page`、`page_size`

**响应示例（200 OK）：**

```json
{
  "count": 8,
  "page": 1,
  "page_size": 20,
  "total_pages": 1,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "医药对照品",
      "name_en": "Pharmaceutical",
      "slug": "pharma",
      "icon": "💊",
      "sort_order": 1,
      "children": []
    },
    {
      "id": 2,
      "name": "生化标准品",
      "name_en": "Biochemical",
      "slug": "biochem",
      "icon": "🧬",
      "sort_order": 2,
      "children": []
    },
    {
      "id": 3,
      "name": "杂质对照品",
      "name_en": "Impurity Reference",
      "slug": "impurity",
      "icon": "⚗️",
      "sort_order": 3,
      "children": []
    },
    {
      "id": 4,
      "name": "无机标准品",
      "name_en": "Inorganic",
      "slug": "inorganic",
      "icon": "🔬",
      "sort_order": 4,
      "children": []
    },
    {
      "id": 5,
      "name": "工业检测标准",
      "name_en": "Industrial",
      "slug": "industrial",
      "icon": "🏭",
      "sort_order": 5,
      "children": []
    },
    {
      "id": 6,
      "name": "认证参考物质",
      "name_en": "Certified Ref. Material",
      "slug": "crm",
      "icon": "📋",
      "sort_order": 6,
      "children": []
    },
    {
      "id": 7,
      "name": "植物提取物",
      "name_en": "Plant Extract",
      "slug": "phyto",
      "icon": "🌿",
      "sort_order": 7,
      "children": []
    },
    {
      "id": 8,
      "name": "农兽药残留标准",
      "name_en": "Pesticide Standard",
      "slug": "pesticide",
      "icon": "⚡",
      "sort_order": 8,
      "children": []
    }
  ]
}
```

---

### GET `/api/categories/{id}/`

返回单个分类详情（结构同上列表项）。

**路径参数：** `id`（integer，必填）

---

### GET `/api/categories/flat/`

返回**所有分类**的扁平数组（无分页、无 `children` 字段），用于筛选侧栏和下拉选项。

**请求参数：** 无

**响应示例（200 OK）：**

```json
[
  { "id": 1, "name": "医药对照品", "name_en": "Pharmaceutical", "slug": "pharma", "icon": "💊" },
  { "id": 2, "name": "生化标准品", "name_en": "Biochemical", "slug": "biochem", "icon": "🧬" },
  { "id": 3, "name": "杂质对照品", "name_en": "Impurity Reference", "slug": "impurity", "icon": "⚗️" },
  { "id": 4, "name": "无机标准品", "name_en": "Inorganic", "slug": "inorganic", "icon": "🔬" },
  { "id": 5, "name": "工业检测标准", "name_en": "Industrial", "slug": "industrial", "icon": "🏭" },
  { "id": 6, "name": "认证参考物质", "name_en": "Certified Ref. Material", "slug": "crm", "icon": "📋" },
  { "id": 7, "name": "植物提取物", "name_en": "Plant Extract", "slug": "phyto", "icon": "🌿" },
  { "id": 8, "name": "农兽药残留标准", "name_en": "Pesticide Standard", "slug": "pesticide", "icon": "⚡" }
]
```

---

## 品牌接口

### GET `/api/brands/`

返回分页品牌列表，支持分类筛选、关键词搜索和排序。

**查询参数：**

| 参数        | 类型    | 必填 | 说明                                                                      |
| ----------- | ------- | :--: | ------------------------------------------------------------------------- |
| `category`  | string  |  否  | 品牌分类枚举，见下方说明                                                  |
| `search`    | string  |  否  | 关键词搜索，匹配品牌英文名、中文名                                        |
| `ordering`  | string  |  否  | 排序字段：`sort_order`、`name`（加 `-` 前缀降序），默认 `sort_order,name` |
| `page`      | integer |  否  | 页码，默认 1                                                              |
| `page_size` | integer |  否  | 每页条数，默认 20                                                         |

**brand.category 枚举值：**

| 值              | 含义       | 代表品牌                                                             |
| --------------- | ---------- | -------------------------------------------------------------------- |
| `pharmacopeia`  | 药典标准品 | CFDI、USP、EP、BP                                                    |
| `international` | 国际机构   | NIST、LGC、ERM、NIBSC、AccuStandard、Chromogenix                     |
| `commercial`    | 商业标准品 | SIGMA、TRC、TLC PharmaChem、CDN Isotopes、CHIRON、ACOS、Chem Service |
| `domestic`      | 国内品牌   | 麦克林试剂、阿拉丁试剂、罗恩试剂                                     |
| `custom`        | 定制合成   | —                                                                    |

**响应示例（200 OK）：**

```json
{
  "count": 20,
  "page": 1,
  "page_size": 20,
  "total_pages": 1,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "CFDI",
      "name_cn": "中国食品药品检定研究院",
      "slug": "cfdi",
      "category": "pharmacopeia",
      "logo_url": null,
      "country": "中国",
      "is_authorized": false,
      "is_active": true
    }
  ]
}
```

---

### GET `/api/brands/{id}/`

返回单个品牌详情，比列表额外包含 `description`、`website`、`sort_order`。

**路径参数：** `id`（integer，必填）

**响应示例（200 OK）：**

```json
{
  "id": 13,
  "name": "Chromogenix",
  "name_cn": "Chromogenix",
  "slug": "chromogenix",
  "category": "international",
  "logo_url": null,
  "country": "意大利",
  "is_authorized": true,
  "is_active": true,
  "description": "意大利血栓与止血领域专业品牌",
  "website": "https://www.chromogenix.com",
  "sort_order": 13
}
```

---

### GET `/api/brands/all/`

返回所有启用品牌的直接数组（**无分页包装**），用于下拉菜单和筛选侧栏。支持 `category` 和 `search` 参数。

**请求参数：** `category`、`search`（同 `/api/brands/`）

**响应示例（200 OK）：**

```json
[
  {
    "id": 1,
    "name": "CFDI",
    "name_cn": "中国食品药品检定研究院",
    "slug": "cfdi",
    "category": "pharmacopeia",
    "logo_url": null,
    "country": "中国",
    "is_authorized": false,
    "is_active": true
  },
  {
    "id": 2,
    "name": "USP",
    "name_cn": "USP标准品",
    "slug": "usp",
    "category": "pharmacopeia",
    "logo_url": null,
    "country": "美国",
    "is_authorized": false,
    "is_active": true
  }
]
```

---

## 数据模型

### ProductList — 产品列表项

列表接口（`/api/products/`、`featured`、`related`）返回此结构。

| 字段            | 类型           | 说明                        |
| --------------- | -------------- | --------------------------- |
| `id`            | integer        | 产品 ID                     |
| `name`          | string         | 中文名称                    |
| `name_en`       | string         | 英文名称                    |
| `cas_number`    | string         | CAS 注册号                  |
| `catalog_no`    | string         | 货号                        |
| `formula`       | string         | 分子式                      |
| `mol_weight`    | string         | 分子量（decimal 字符串）    |
| `appearance`    | string         | 外观描述                    |
| `brand_name`    | string         | 品牌名称                    |
| `brand_slug`    | string         | 品牌 slug                   |
| `category_name` | string         | 分类名称                    |
| `thumb_url`     | string \| null | 缩略图绝对 URL（无则 null） |
| `is_featured`   | boolean        | 是否推荐                    |

---

### ProductDetail — 产品详情

包含 ProductList 全部字段，额外增加：

| 字段           | 类型           | 说明                                                |
| -------------- | -------------- | --------------------------------------------------- |
| `standard`     | string         | 标准依据                                            |
| `lot_no`       | string         | 批号                                                |
| `expiry_date`  | string         | 有效期描述                                          |
| `storage_temp` | string         | 储存温度                                            |
| `storage_note` | string         | 储存说明                                            |
| `brand`        | Brand 对象     | 完整品牌信息（见 Brand 模型）                       |
| `category`     | Category 对象  | 分类信息                                            |
| `specs`        | array          | 规格列表，元素：`{ id, package, stock, lead_time }` |
| `image_url`    | string \| null | 产品原图 URL                                        |
| `mol_url`      | string \| null | 分子结构式图片 URL                                  |
| `coa_url`      | string \| null | CoA 证书下载 URL（PDF）                             |
| `sds_url`      | string \| null | SDS 安全数据表 URL（PDF）                           |
| `description`  | string         | 产品说明                                            |
| `notes`        | string         | 备注                                                |
| `view_count`   | integer        | 浏览次数（每次访问详情自动 +1）                     |
| `created_at`   | datetime       | 创建时间（ISO 8601，含时区）                        |
| `updated_at`   | datetime       | 更新时间（ISO 8601，含时区）                        |

---

### ProductSpec — 产品规格

包含在 ProductDetail 的 `specs` 数组中。

| 字段        | 类型    | 说明                                 |
| ----------- | ------- | ------------------------------------ |
| `id`        | integer | 规格 ID                              |
| `package`   | string  | 包装规格，例：`5mg`、`25mg`、`100mg` |
| `stock`     | integer | 库存数量（0 表示无现货）             |
| `lead_time` | string  | 货期，例：`现货`、`5~7工作日`        |

---

### Category — 分类

| 字段         | 类型    | 说明                                |
| ------------ | ------- | ----------------------------------- |
| `id`         | integer | 分类 ID                             |
| `name`       | string  | 中文名称                            |
| `name_en`    | string  | 英文名称                            |
| `slug`       | string  | 唯一标识，用于 `category_slug` 参数 |
| `icon`       | string  | Emoji 图标                          |
| `sort_order` | integer | 排序权重（越小越靠前）              |
| `children`   | array   | 子分类数组（当前版本均为 `[]`）     |

---

### Brand — 品牌

| 字段            | 类型           | 接口       | 说明                        |
| --------------- | -------------- | ---------- | --------------------------- |
| `id`            | integer        | 列表/详情  | 品牌 ID                     |
| `name`          | string         | 列表/详情  | 英文名称                    |
| `name_cn`       | string         | 列表/详情  | 中文名称                    |
| `slug`          | string         | 列表/详情  | 唯一标识，用于 `brand` 参数 |
| `category`      | string         | 列表/详情  | 分类枚举值                  |
| `logo_url`      | string \| null | 列表/详情  | Logo 图片绝对 URL           |
| `country`       | string         | 列表/详情  | 国家/地区                   |
| `is_authorized` | boolean        | 列表/详情  | 是否授权代理                |
| `is_active`     | boolean        | 列表/详情  | 是否启用                    |
| `description`   | string         | **仅详情** | 品牌简介                    |
| `website`       | string         | **仅详情** | 官方网站                    |
| `sort_order`    | integer        | **仅详情** | 排序权重                    |

---

## 附录

### 分类 slug 对照表

| slug         | 中文名称       | 英文名称                     |
| ------------ | -------------- | ---------------------------- |
| `pharma`     | 医药对照品     | Pharmaceutical               |
| `biochem`    | 生化标准品     | Biochemical                  |
| `impurity`   | 杂质对照品     | Impurity Reference           |
| `inorganic`  | 无机标准品     | Inorganic                    |
| `industrial` | 工业检测标准   | Industrial                   |
| `crm`        | 认证参考物质   | Certified Reference Material |
| `phyto`      | 植物提取物     | Plant Extract                |
| `pesticide`  | 农兽药残留标准 | Pesticide Standard           |

### 品牌 slug 对照表

| slug           | 品牌名称                       | 分类          | 授权代理 |
| -------------- | ------------------------------ | ------------- | :------: |
| `cfdi`         | CFDI 中国食品药品检定研究院    | pharmacopeia  |    —     |
| `usp`          | USP                            | pharmacopeia  |    —     |
| `ep`           | EP 欧洲药典                    | pharmacopeia  |    —     |
| `bp`           | BP 英国药典                    | pharmacopeia  |    —     |
| `nist`         | NIST                           | international |    —     |
| `lgc`          | LGC                            | international |    —     |
| `erm`          | ERM 欧洲参考物质               | international |    —     |
| `nibsc`        | NIBSC                          | international |    —     |
| `accustandard` | AccuStandard                   | international |    ✓     |
| `chromogenix`  | Chromogenix                    | international |    ✓     |
| `sigma`        | SIGMA Sigma-Aldrich            | commercial    |    —     |
| `trc`          | TRC Toronto Research Chemicals | commercial    |    —     |
| `tlc`          | TLC PharmaChem                 | commercial    |    ✓     |
| `cdn`          | CDN Isotopes                   | commercial    |    ✓     |
| `chiron`       | CHIRON Chiron AS               | commercial    |    —     |
| `acos`         | ACOS                           | commercial    |    —     |
| `chemservice`  | Chem Service                   | commercial    |    —     |
| `macklin`      | 麦克林试剂                     | domestic      |    ✓     |
| `aladdin`      | 阿拉丁试剂                     | domestic      |    ✓     |
| `rhawn`        | 罗恩试剂                       | domestic      |    ✓     |

---

_深圳鼎利成生物科技有限公司 · API 接口文档 · 2024_
