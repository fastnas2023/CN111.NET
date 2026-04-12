# 桌面导航语言下拉 + 多设备间距修复（Aivent 模板）设计说明

## 目标（Final solution）

1. **Desktop（≥ 992px）**：语言切换移动到顶部导航栏 `#mainmenu` 内，做成与 **Pages** 相同形态的下拉（或单独 “Language/中文 ▾” 入口）。移除右侧浮层语言栏。
2. **Mobile（< 992px）**：保留现有“抽屉顶部 Select”语言切换（已符合大品牌常见方案）。
3. 修复你截图中提到的问题：
   - **Screenshot 2**：Hero 按钮出现 “Get 票务 / Wiew schedule” 等不自然/拼写问题（应为中文按钮文案）。
   - **Figure 3**：Hero 底部 “Hurry Up” 倒计时条在某些宽度下**间距不合理、标题挤断行**。
   - 跑马灯（marquee）在部分设备宽度下出现**裁切/叠加**。

## 多设备验收范围

按 4 档宽度做验收与回归（可补充更多，但默认以这四档为准）：
- 1440（桌面）
- 1024（小桌面/横屏平板）
- 768（竖屏平板）
- 390（iPhone 14）

## 实现策略（推荐方案）

### A) 桌面端：在模板 HTML 生成阶段注入语言下拉（推荐）

原因：桌面端页面是从 `/public/aivent/*.html` 读取并 `dangerouslySetInnerHTML` 注入，最稳定的方式是在 `getAiventTemplateBodyHtml()` 中对模板 HTML 做**可控、最小化的字符串注入**。

#### 注入点
- `public/aivent/*.html` 中导航结构稳定存在：`<ul id="mainmenu"> ... </ul>`
- 在 `#mainmenu` 的闭合 `</ul>` 之前插入一个新的 `<li data-cn111="lang-menu"> ... </li>`，使其出现在导航最右侧、下拉样式复用模板现有 dropdown。

#### 防误伤的插入方法
不使用 `replaceAll("</ul>", ...)`（页面有多个 ul），而是：
1) `start = html.indexOf('<ul id="mainmenu">')`
2) 从 start 向后做 “ul depth” 扫描，找到与该 `mainmenu` 对应的正确闭合 `</ul>` 位置
3) 在闭合前注入语言菜单块，并用 `data-cn111="lang-menu"` 标记，避免重复注入

#### 链接规则（保持同页切换）
由于 `getAiventTemplateBodyHtml(opts)` 具备 `pageKey` 与 `locale`，可直接映射当前页的 `rest`：
- home → `""`
- tickets → `"/tickets"`
- news → `"/news"`
- …
并生成：
- `/zh-CN{rest}`, `/en-US{rest}` ……

#### 文案
下拉触发器显示当前语言（如“中文”），下拉项为：中文 / English / Deutsch / ……
（对应现有 i18n key：`lang.zhCN`, `lang.enUS`…）

#### 移除旧入口
删除桌面壳中的 `<LanguageSwitcher variant="desktop" />` 与相关浮层 CSS（或保留 CSS 但不再渲染该组件）。

---

### B) 修复 Screenshot 2：Hero 两个按钮中文化 + 避免 i18n 误替换

现状问题：当前 `applyDesktopI18n()` 使用 `replaceAll("Tickets" -> "票务")` 之类全局替换，导致 “Get Tickets” 误变成 “Get 票务”，并可能引入拼写/大小写问题。

#### 目标文案（中文站）
- `Get Tickets` → **立即购票**
- `View Schedule` → **查看议程**

#### 替换策略调整
对桌面端模板 i18n 做“更精确的替换”：
- 导航项：用带 href 的片段替换（例如替换 `href="#section-tickets"><span>Tickets</span>` 或导航里对应 `a.menu-item` 的稳定片段），避免替换正文中的 “Tickets”
- Hero 按钮：专门替换 `<span>Get Tickets</span>` 与 `<span>View Schedule</span>`（只在 home 页生效）

---

### C) Figure 3：倒计时条间距/断行多设备修复（最小 CSS 覆盖）

目标：
- “Hurry Up!” 不在 992~1200 的宽度段被挤成两行（或断词）
- 三列（标题 / 倒计时 / 地址）在 1440/1024/768/390 下都保持节奏合理

推荐做法：
- 仅对 `#section-hero` 底部这条块做局部覆盖：
  - 缩小 `p-40` 的 padding（在 992~1200 之间）
  - 把 countdown 的内部布局从 float/固定宽度转成 flex 自适应（限定在该条内）
  - 对 amount/period 使用 `clamp()` 或小幅字体调整，避免溢出

---

### D) 跑马灯裁切/叠加（多设备修复，最小 CSS 覆盖）

目标：
- 解决你截图中 marquee 在某些宽度下的裁切/叠加（负 margin + rotate + lh-1 组合导致）

推荐做法：
- 给 `.de-marquee-list-*` 增加 `min-width:0`（修复 flex item 默认不收缩导致裁切）
- 为 span 增加少量 `padding-block` / 更宽松 line-height
- 在 `< 992px` 时取消 `mt-min-20` 的负 margin，以及取消 `rot-*` 旋转（移动端装饰收益小、稳定性更重要）

## 回归与验收

1) Playwright 自动化截图（或断点 smoke）覆盖 4 档宽度：1440 / 1024 / 768 / 390
2) 校验点：
   - 桌面端语言入口在顶栏下拉（不再有右侧浮层）
   - 移动端语言入口仍在抽屉顶部
   - Hero 按钮中文：立即购票 / 查看议程
   - 倒计时条在 1024/768 不出现挤压断行、三列间距合理
   - 跑马灯不裁切、不叠加

