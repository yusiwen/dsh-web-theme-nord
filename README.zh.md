# dsh-web-theme-nord

DSH Web GUI 的 [Nord](https://www.nordtheme.com/) 配色主题。两套内置配色都会被重绘：浅色使用
**Snow Storm**，深色使用 **Polar Night**，并以 **Frost** 作为强调色、**Aurora** 作为状态色与语法高亮色。

设置里的「浅色 / 深色 / 跟随系统」开关保持原样——本包不新增第四个外观选项，只改变这两套配色的观感。

## 安装

```sh
dsh plugin --profile web add dsh-web-theme-nord
```

Web profile 默认启用 `dsh-hmr`，已打开的页面会通过模块图自动加载；否则重启 `dsh web` 并刷新页面。
主题对该 profile 下的所有会话生效。

卸载：

```sh
dsh plugin --profile web remove dsh-web-theme-nord
```

## 原理

`lib/client.js` 是一个普通的 DSH 客户端 bundle。激活时通过
`ctx.theme.overrideTokens('dsh-web-theme-nord', …)` 注册一层 token 覆盖。DSH 的主题呈现器把这一层以内联
变量写到 `<body>` 上，并按当前配色方案选择每个 token 的 `light` 或 `dark` 值，因此切换浅色/深色会立即
重绘，插件卸载时整层覆盖也会被干净地移除。

覆盖 128 个 token：

- 完整的 `--dsw-static-*` 色阶，所有语义 `--dsw-alias-*` token 都引用它——悬停底色、菜单、代码块与
  滚动条随之改变；
- 带字面颜色的语义 token：边框、半透明菜单与遮罩、链接、工具栏填充、文件 diff 背景、思考渐变；
- Shiki 语法高亮 token；
- 引导页表面与欢迎页渐变。

静态色阶按模式分别映射：浅色模式下低序号是 Snow Storm 表面、高序号是 Polar Night 墨色；深色模式下
同一序号翻转成 Snow Storm 墨色与 Polar Night 表面。这样无需重写全部别名 token，原有别名选择在两套
模式下仍然成立。

| 角色 | 浅色 | 深色 |
|---|---|---|
| 画布 / 层级 | `#FCFDFE` → `#E5E9F0` | `#2E3440` → `#434C5E` |
| 主文字 | `#232831` | `#ECEFF4` |
| 次级文字 | `#55637A` | `#C5CEDD` |
| 链接 / 焦点 | `#4C6F96` / `#5E81AC` | `#88C0D0` |
| 成功 / 错误 / 警告 | `#A3BE8C` / `#B45A63` / `#D08770` | `#A3BE8C` / `#CF858C` / `#D08770` |
| 语法高亮 | Frost / Aurora，浅色下加深 | Nord 官方 Aurora 色板 |

## 兼容性

- DSH `>=0.2.1-rc.2 <0.3.0-0`（见 `engines.dsh`）。
- 依赖 `@deepseek-ai/dsh-client-ui-theme` 提供的 `theme` 客户端服务；`dsh.client.inject` 已声明模块依赖。
- 不需要宿主侧服务，不注册设置项，不访问网络。

## 许可证

MIT
