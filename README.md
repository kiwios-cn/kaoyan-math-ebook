# 考研数学资料

本目录用于维护考研数学电子书。当前正式内容以 `typst/` 中的 Typst 源文件为唯一维护入口，网页阅读器由这些源文件直接生成高清页面、目录和搜索索引。

## 目录结构

- `typst/`：正式章节源文件和共用样式文件。
- `ebook/`：静态电子书系统，包含可展开目录、章节大点子目录、Typst 直渲并无损压缩的 WebP 高清页面阅读区、关键词搜索和页级跳转索引。
- `微积分/`、`线性代数/`、`概率论/`：历史导出物所在目录；当前网页构建流程不再读取这些目录。

## 电子书入口

- `ebook/index.html`：电子书网页入口，可直接打开，也可通过本地静态服务访问。
- `ebook/book-manifest.json`：电子书目录数据，当前索引 23 个正式章节，并为每个章节生成一级大点子目录。
- `ebook/search-index.json`：全文搜索索引，当前由 Typst 源文本生成。
- `ebook/scripts/build_index.py`：目录、搜索索引与网页页图构建脚本；运行后由 Typst 渲染临时 PNG，再压缩为 WebP 页面图片。
- `ebook/README.md`：电子书模块说明，包含使用命令和文件说明。

## 正式章节

### 微积分

- `typst/Limits and Continuity (函数的极限与连续).typ`
- `typst/Sequence Limits (数列的极限).typ`
- `typst/Differential Calculus Concepts and Computation (一元函数微分学的概念和计算).typ`
- `typst/Applications of Differential Calculus (一元函数微分学的应用).typ`
- `typst/Integral Calculus Concepts Properties and Computation (一元函数积分学的概念性质和计算).typ`
- `typst/Applications of Integral Calculus (一元函数积分学的应用).typ`
- `typst/Multivariable Differential Calculus (多元函数微分学).typ`
- `typst/Double Integral Methods (二重积分计算方法).typ`
- `typst/Multivariable Integral Calculus (多元函数积分学).typ`
- `typst/Ordinary Differential Equations (常微分方程).typ`
- `typst/Infinite Series (无穷级数).typ`

### 线性代数

- `typst/Determinants (行列式).typ`
- `typst/Matrices (矩阵).typ`
- `typst/Vector Groups (向量组).typ`
- `typst/Linear Equations (线性方程组).typ`
- `typst/Eigenvalues and Eigenvectors (特征值与特征向量).typ`
- `typst/Quadratic Forms (二次型).typ`

### 概率论

- `typst/Random Events and Probability (随机事件与概率).typ`
- `typst/One-Dimensional Random Variables and Distributions (一维随机变量及其分布).typ`
- `typst/Multidimensional Random Variables and Distributions (多维随机变量及其分布).typ`
- `typst/Numerical Characteristics of Random Variables (随机变量的数字特征).typ`
- `typst/Laws of Large Numbers and Central Limit Theorem (大数定律和中心极限定理).typ`
- `typst/Mathematical Statistics (数理统计).typ`

## 重新构建

需要安装 Typst 和 WebP 工具：

```bash
typst --version
cwebp -version
```

刷新电子书目录、网页页图和全文搜索索引：

```bash
python3 ebook/scripts/build_index.py
```

打开电子书：

```bash
open ebook/index.html
```

若需要通过本地服务访问：

```bash
python3 -m http.server 8765
```

然后打开：

```text
http://127.0.0.1:8765/ebook/index.html
```

## 使用建议

极限部分先抓左右极限、等价无穷小和连续性；一元微分先抓导数定义、求导法则和中值定理；一元积分先抓换元、分部积分、对称性和变上限积分；多元微分先抓偏导、全微分、梯度和极值。二重积分先抓区域、换序、对称性和估值，三重积分先抓投影、坐标变换和对称平面，微分方程先抓类型和标准形式，无穷级数先抓分类和判别法，多元函数积分学先抓向量几何、场论算子、积分对象、方向和封闭性。做形心质心题时先判断是否均匀；遇到曲线积分或曲面积分时，先判断对象是否闭合，再选择格林公式、高斯公式或斯托克斯公式。

日常新增问题时，优先判断问题所属章节：若主题明确，直接追加到对应 Typst 源文件；若归属暂时不确定，先标记为待归类并尽快归入正式章节。章节 Typst 更新后运行 `python3 ebook/scripts/build_index.py`，即可让网页目录、页面图片和搜索结果同步最新内容。
