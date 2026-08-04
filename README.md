# 考研数学资料

本目录用于整理考研数学专题复习资料，当前包含函数极限、数列极限、一元函数微分学、一元函数积分学、多元函数微分学、多元函数积分学、二重积分、微分方程、无穷级数、线性代数和概率论与数理统计专题总结。

## 目录结构

- 根目录：放置 README 和专题分类目录。
- `8.3疑难解答.pdf`：2026-08-03 对话疑难解答历史归档；其中数学内容已按主题合并到概率论、一元函数积分学和无穷级数章节，电子书中不再单独显示疑难解答章节。
- `微积分/`：放置微积分专题相关 PDF 资料，包括积分、级数和微分方程等内容。
- `线性代数/`：放置线性代数专题相关 PDF 资料。
- `概率论/`：放置概率论与数理统计专题相关 PDF 资料。
- `typst/`：放置对应的 Typst 源文件。
- `ebook/`：本地电子书系统，包含可展开目录、章节大点子目录、Typst 直渲 260 DPI 高清页面阅读区、关键词搜索和页级跳转索引。

## 电子书入口

- `ebook/index.html`：电子书网页入口，可直接打开，也可通过本地静态服务访问。
- `ebook/book-manifest.json`：电子书目录数据，当前索引 23 个正式章节，并为每个章节生成一级大点子目录。
- `ebook/search-index.json`：页级搜索索引，当前索引 257 页内容，随 PDF 更新自动刷新。
- `ebook/scripts/build_index.py`：目录、搜索索引与网页页图构建脚本；优先由 Typst 直接渲染页面图片，章节更新后运行该脚本即可刷新电子书。
- `ebook/README.md`：电子书模块说明，包含使用命令和文件说明。

## 线性代数专题

- `typst/Determinants (行列式).typ`：Determinants (行列式) 专题总结的 Typst 源文件。
- `线性代数/Determinants (行列式).pdf`：Determinants (行列式) 专题 PDF，覆盖定义、逆序数法、几何意义、向量关系、性质、展开推导、常用行列式推导与示例应用、克拉默法则和常见题型。
- `typst/Matrices (矩阵).typ`：Matrices (矩阵) 专题总结的 Typst 源文件。
- `线性代数/Matrices (矩阵).pdf`：Matrices (矩阵) 专题 PDF，覆盖矩阵运算、特殊矩阵、Gram 矩阵、逆矩阵、初等变换、矩阵秩、分块矩阵基本运算、分块乘法、分块三角矩阵和分块消元法则。
- `typst/Vector Groups (向量组).typ`：Vector Groups (向量组) 专题总结的 Typst 源文件。
- `线性代数/Vector Groups (向量组).pdf`：Vector Groups (向量组) 专题 PDF，覆盖线性组合、线性相关无关、向量组秩、极大无关组和向量组等价。
- `typst/Linear Equations (线性方程组).typ`：Linear Equations (线性方程组) 专题总结的 Typst 源文件。
- `线性代数/Linear Equations (线性方程组).pdf`：Linear Equations (线性方程组) 专题 PDF，覆盖齐次方程组、非齐次方程组、秩判定、通解结构和参数讨论。
- `typst/Eigenvalues and Eigenvectors (特征值与特征向量).typ`：Eigenvalues and Eigenvectors (特征值与特征向量) 专题总结的 Typst 源文件。
- `线性代数/Eigenvalues and Eigenvectors (特征值与特征向量).pdf`：Eigenvalues and Eigenvectors (特征值与特征向量) 专题 PDF，覆盖特征方程、相似矩阵、对角化和实对称矩阵。
- `typst/Quadratic Forms (二次型).typ`：Quadratic Forms (二次型) 专题总结的 Typst 源文件。
- `线性代数/Quadratic Forms (二次型).pdf`：Quadratic Forms (二次型) 专题 PDF，覆盖矩阵表示、合同变换、标准形、惯性指数和正定判定。

## 概率论专题

概率论部分已拆分为六个正式章节，替代原来的单一总章 PDF。

- `typst/Random Events and Probability (随机事件与概率).typ`：随机事件与概率章节源文件。
- `概率论/Random Events and Probability (随机事件与概率).pdf`：随机事件与概率专题 PDF，覆盖事件关系、概率公理、条件概率、全概率公式、Bayes 公式和概率计算题处理策略。
- `typst/One-Dimensional Random Variables and Distributions (一维随机变量及其分布).typ`：一维随机变量及其分布章节源文件。
- `概率论/One-Dimensional Random Variables and Distributions (一维随机变量及其分布).pdf`：一维随机变量及其分布专题 PDF，覆盖分布函数、离散分布、连续分布、概率为 0 的事件、高斯积分和一维分布题处理策略。
- `typst/Multidimensional Random Variables and Distributions (多维随机变量及其分布).typ`：多维随机变量及其分布章节源文件。
- `概率论/Multidimensional Random Variables and Distributions (多维随机变量及其分布).pdf`：多维随机变量及其分布专题 PDF，覆盖联合分布、边缘分布、独立性、组合随机变量密度和多维分布题处理策略。
- `typst/Numerical Characteristics of Random Variables (随机变量的数字特征).typ`：随机变量的数字特征章节源文件。
- `概率论/Numerical Characteristics of Random Variables (随机变量的数字特征).pdf`：随机变量的数字特征专题 PDF，覆盖期望、方差、协方差、相关系数和数字特征题处理策略。
- `typst/Laws of Large Numbers and Central Limit Theorem (大数定律和中心极限定理).typ`：大数定律和中心极限定理章节源文件。
- `概率论/Laws of Large Numbers and Central Limit Theorem (大数定律和中心极限定理).pdf`：大数定律和中心极限定理专题 PDF，覆盖样本均值稳定性、标准化、正态近似和连续性校正。
- `typst/Mathematical Statistics (数理统计).typ`：数理统计章节源文件。
- `概率论/Mathematical Statistics (数理统计).pdf`：数理统计专题 PDF，覆盖样本统计量、抽样分布、参数估计、假设检验、方差分析、回归和统计推断题处理策略。

## 微积分专题

- `typst/calculus_common.typ`：新增微积分专题共用的 Typst 样式模板。
- Typst 正式章节已统一设置一级大点自动另起一页；前一大点末页即使留有空白，也不会继续接写下一大点。
- Typst 正式章节已统一放大表格单元格内边距，提升表格阅读留白和视觉舒展度。
- Typst 正式章节首页已统一加入“首页速览”，用于承载本章最关键公式、定理和解题抓手，减少首页空白。
- `typst/8.3疑难解答.typ`：8.3 疑难解答历史源文件；内容已拆分合并到对应正式章节，后续不再作为电子书独立章节维护。
- `8.3疑难解答.pdf`：8.3 疑难解答历史 PDF，仅作为归档保留。
- `typst/Limits and Continuity (函数的极限与连续).typ`：函数极限与连续专题源文件，覆盖函数极限、左右极限、等价无穷小、等价替换原理、常见错误类型、极限计算方法、洛必达法则适用条件、变限积分型极限、变限积分中 x 出现位置的分类处理、连续性、第一类间断点与第二类间断点分类。
- `微积分/Limits and Continuity (函数的极限与连续).pdf`：函数的极限与连续专题 PDF，覆盖函数极限、等价无穷小替换原理、常见错误类型、极限计算方法、洛必达法则适用条件、变限积分型极限、变限积分中 x 出现位置的分类处理、连续性、第一类间断点与第二类间断点分类。
- `typst/Sequence Limits (数列的极限).typ`：数列极限专题源文件，覆盖收敛定义、极限性质、常用数列极限、夹逼、单调有界、$n$ 次根最大项、相邻幂差、有界求和夹逼、压缩不等式和递推数列。
- `微积分/Sequence Limits (数列的极限).pdf`：数列的极限专题 PDF，覆盖收敛定义、极限性质、常用数列极限、夹逼、单调有界、函数极限转化、递推数列和典型例题。
- `typst/Differential Calculus Concepts and Computation (一元函数微分学的概念和计算).typ`：一元函数微分学概念和计算专题源文件，覆盖导数定义、微分、基本求导公式、复合函数、隐函数、参数方程和高阶导数。
- `微积分/Differential Calculus Concepts and Computation (一元函数微分学的概念和计算).pdf`：一元函数微分学的概念和计算专题 PDF。
- `typst/Applications of Differential Calculus (一元函数微分学的应用).typ`：一元函数微分学应用专题源文件，覆盖切线法线、单调极值、凹凸拐点、中值定理、等式不等式证明和物理应用。
- `微积分/Applications of Differential Calculus (一元函数微分学的应用).pdf`：一元函数微分学的应用专题 PDF。
- `typst/Integral Calculus Concepts Properties and Computation (一元函数积分学的概念性质和计算).typ`：一元函数积分学概念性质和计算专题源文件，覆盖不定积分、定积分、牛顿-莱布尼茨公式、变上限积分、积分性质、换元和分部积分。
- `微积分/Integral Calculus Concepts Properties and Computation (一元函数积分学的概念性质和计算).pdf`：一元函数积分学的概念性质和计算专题 PDF。
- `typst/Applications of Integral Calculus (一元函数积分学的应用).typ`：一元函数积分学应用专题源文件，覆盖面积、体积、弧长、旋转曲面、积分等式不等式证明、变力做功、位移路程和质心。
- `微积分/Applications of Integral Calculus (一元函数积分学的应用).pdf`：一元函数积分学的应用专题 PDF。
- `typst/Multivariable Differential Calculus (多元函数微分学).typ`：多元函数微分学专题源文件，覆盖多元极限连续、偏导数、全微分、复合函数、隐函数、方向导数、梯度、切平面、极值和拉格朗日乘数法。
- `微积分/Multivariable Differential Calculus (多元函数微分学).pdf`：多元函数微分学专题 PDF。

- `typst/Double Integral Methods (二重积分计算方法).typ`：二重积分总结讲解的 Typst 源文件，覆盖定义、积分区域、换序、极坐标、变量替换、对称性、应用题型和典型例题。
- `微积分/Double Integral Methods (二重积分计算方法).pdf`：编译后的 PDF，覆盖二重积分核心概念与常见考研题型。
- `typst/Ordinary Differential Equations (常微分方程).typ`：微分方程求解总结讲解的 Typst 源文件，覆盖常微分方程、一阶方程、线性方程、齐次与非齐次、特解与通解、常系数方程和典型例题。
- `微积分/Ordinary Differential Equations (常微分方程).pdf`：编译后的 PDF，覆盖微分方程核心方法与考研常见题型。
- `typst/Infinite Series (无穷级数).typ`：无穷级数专项总结的 Typst 源文件，覆盖数项级数、判别法、幂级数、泰勒展开、$sec x$、$csc x$、$cot x$ 展开式、傅里叶级数和典型例题。
- `微积分/Infinite Series (无穷级数).pdf`：编译后的 PDF，覆盖无穷级数核心方法与考研常见题型。
- `typst/Multivariable Integral Calculus (多元函数积分学).typ`：多元函数积分学总结的 Typst 源文件，已合并原独立三重积分章节，覆盖向量与空间解析几何、空间直线、平面方程、平面束方程、方向导数、梯度、散度、旋度、二重积分、三重积分、投影与截面设限、曲线积分、曲面积分、形心与质心、积分对称性、中值定理、估值定理、格林公式、高斯公式、斯托克斯公式和典型综合题。
- `微积分/Multivariable Integral Calculus (多元函数积分学).pdf`：编译后的 PDF，覆盖多元函数积分学、空间解析几何、平面束方程、场论基础、积分性质、三重积分设限模板、形心质心计算和考研常见综合考点。

## 重新编译

需要安装 Typst：

```bash
typst --version
```

编译 PDF：

```bash
typst compile "typst/Limits and Continuity (函数的极限与连续).typ" "微积分/Limits and Continuity (函数的极限与连续).pdf"
typst compile "typst/Sequence Limits (数列的极限).typ" "微积分/Sequence Limits (数列的极限).pdf"
typst compile "typst/Differential Calculus Concepts and Computation (一元函数微分学的概念和计算).typ" "微积分/Differential Calculus Concepts and Computation (一元函数微分学的概念和计算).pdf"
typst compile "typst/Applications of Differential Calculus (一元函数微分学的应用).typ" "微积分/Applications of Differential Calculus (一元函数微分学的应用).pdf"
typst compile "typst/Integral Calculus Concepts Properties and Computation (一元函数积分学的概念性质和计算).typ" "微积分/Integral Calculus Concepts Properties and Computation (一元函数积分学的概念性质和计算).pdf"
typst compile "typst/Applications of Integral Calculus (一元函数积分学的应用).typ" "微积分/Applications of Integral Calculus (一元函数积分学的应用).pdf"
typst compile "typst/Multivariable Differential Calculus (多元函数微分学).typ" "微积分/Multivariable Differential Calculus (多元函数微分学).pdf"
typst compile "typst/Double Integral Methods (二重积分计算方法).typ" "微积分/Double Integral Methods (二重积分计算方法).pdf"
typst compile "typst/Ordinary Differential Equations (常微分方程).typ" "微积分/Ordinary Differential Equations (常微分方程).pdf"
typst compile "typst/Infinite Series (无穷级数).typ" "微积分/Infinite Series (无穷级数).pdf"
typst compile "typst/Multivariable Integral Calculus (多元函数积分学).typ" "微积分/Multivariable Integral Calculus (多元函数积分学).pdf"
typst compile "typst/Determinants (行列式).typ" "线性代数/Determinants (行列式).pdf"
typst compile "typst/Matrices (矩阵).typ" "线性代数/Matrices (矩阵).pdf"
typst compile "typst/Vector Groups (向量组).typ" "线性代数/Vector Groups (向量组).pdf"
typst compile "typst/Linear Equations (线性方程组).typ" "线性代数/Linear Equations (线性方程组).pdf"
typst compile "typst/Eigenvalues and Eigenvectors (特征值与特征向量).typ" "线性代数/Eigenvalues and Eigenvectors (特征值与特征向量).pdf"
typst compile "typst/Quadratic Forms (二次型).typ" "线性代数/Quadratic Forms (二次型).pdf"
typst compile "typst/Random Events and Probability (随机事件与概率).typ" "概率论/Random Events and Probability (随机事件与概率).pdf"
typst compile "typst/One-Dimensional Random Variables and Distributions (一维随机变量及其分布).typ" "概率论/One-Dimensional Random Variables and Distributions (一维随机变量及其分布).pdf"
typst compile "typst/Multidimensional Random Variables and Distributions (多维随机变量及其分布).typ" "概率论/Multidimensional Random Variables and Distributions (多维随机变量及其分布).pdf"
typst compile "typst/Numerical Characteristics of Random Variables (随机变量的数字特征).typ" "概率论/Numerical Characteristics of Random Variables (随机变量的数字特征).pdf"
typst compile "typst/Laws of Large Numbers and Central Limit Theorem (大数定律和中心极限定理).typ" "概率论/Laws of Large Numbers and Central Limit Theorem (大数定律和中心极限定理).pdf"
typst compile "typst/Mathematical Statistics (数理统计).typ" "概率论/Mathematical Statistics (数理统计).pdf"
```

刷新电子书目录、网页页图和全文搜索索引：

```bash
python3 ebook/scripts/build_index.py
```

打开电子书：

```bash
open ebook/index.html
```

若浏览器限制本地 PDF 预览，可在 `考研数学` 目录下启动本地服务后访问 `http://127.0.0.1:8765/ebook/index.html`：

```bash
python3 -m http.server 8765
```

## 使用建议

极限部分先抓左右极限、等价无穷小和连续性；一元微分先抓导数定义、求导法则和中值定理；一元积分先抓换元、分部积分、对称性和变上限积分；多元微分先抓偏导、全微分、梯度和极值。二重积分先抓区域、换序、对称性和估值，三重积分先抓投影、坐标变换和对称平面，微分方程先抓类型和标准形式，无穷级数先抓分类和判别法，多元函数积分学先抓向量几何、场论算子、积分对象、方向和封闭性。做形心质心题时先判断是否均匀；遇到曲线积分或曲面积分时，先判断对象是否闭合，再选择格林公式、高斯公式或斯托克斯公式。


日常新增问题时，优先判断问题所属章节：若主题明确，直接追加到对应 Typst 源文件；若归属暂时不确定，先标记为待归类并尽快归入正式章节，不再长期保留独立疑难解答章节。章节 Typst/PDF 更新后运行 `python3 ebook/scripts/build_index.py`，即可让网页目录、页面图片和搜索结果同步最新内容。
