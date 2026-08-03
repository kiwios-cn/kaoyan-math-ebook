# 考研数学电子书

这是一个本地静态电子书系统，用来统一组织 `考研数学` 目录中的 PDF 资料，并提供目录跳转和关键词搜索。

## 功能

- 自动扫描微积分、线性代数和概率论 PDF；疑难解答类 PDF 作为历史归档，不进入电子书目录。
- 生成按学科分组的目录树。
- 采用两栏布局：左侧目录，右侧 PDF 阅读界面。
- 搜索框放在阅读区顶部中间，搜索结果以下拉浮层显示，点击结果直接跳转到对应 PDF 页码。
- 网页默认显示由 PDF 以 260 DPI 渲染出的高清连续纸张页面流，可上下滚动阅读；原始 PDF 仍可通过“打开 PDF”按钮访问。
- 页面图片采用视口附近加载和当前页前后预加载策略，减少高清图片翻页时的下载与解码卡顿。
- 基于 `pdftotext` 生成页级搜索索引，搜索结果显示章节、页码和片段。
- 使用 `data.js` 内嵌目录与索引数据，支持直接打开 `index.html`。

## 使用方法

在 `考研数学` 目录下重建索引：

```bash
python3 ebook/scripts/build_index.py
```

打开网页：

```bash
open ebook/index.html
```

如果浏览器限制本地 PDF 预览，可以启动本地服务：

```bash
python3 -m http.server 8765
```

然后访问：

```text
http://127.0.0.1:8765/ebook/index.html
```

## 输出文件

- `ebook/book-manifest.json`：电子书目录数据。
- `ebook/search-index.json`：页级全文搜索索引。
- `ebook/data.js`：供静态网页直接读取的数据文件。
- `ebook/index.html`：电子书入口。
- `ebook/rendered-pages/`：由 PDF 自动渲染出的高清页面图片，用于无黑色工具栏的阅读界面。

## 日常更新流程

当某个章节 PDF 更新后，重新执行：

```bash
python3 ebook/scripts/build_index.py
```

网页会读取新的目录和搜索索引。后续可以继续扩展为自动识别问题归属、自动写入对应 Typst 源文件并重新编译 PDF 的工作流。

渲染脚本会把 PDF 修改时间和渲染 DPI 一起写入缓存标记；当章节 PDF 或清晰度参数变化时，页面图片会自动重新生成。
