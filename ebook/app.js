const manifest = window.BOOK_MANIFEST || { categories: [], documents: [], stats: {} };
const searchIndex = window.SEARCH_INDEX || [];

const categoryAccentMap = new Map(
  (manifest.categories || []).map((category) => [category.title, category.accent])
);

const PAGE_PRELOAD_RADIUS = 2;
const PAGE_OBSERVER_MARGIN = "1800px 0px";

const state = {
  activeDocId: null,
  activePage: 1,
  activeCategory: "全部",
  query: "",
  renderedDocId: null,
  pageImageObserver: null,
  warmedImageUrls: new Set(),
  scrollSyncTimer: null,
};

const elements = {};

function bindElements() {
  elements.bookSubtitle = document.querySelector("#bookSubtitle");
  elements.libraryMeta = document.querySelector("#libraryMeta");
  elements.toc = document.querySelector("#toc");
  elements.currentCategory = document.querySelector("#currentCategory");
  elements.currentTitle = document.querySelector("#currentTitle");
  elements.pageInput = document.querySelector("#pageInput");
  elements.openPdfButton = document.querySelector("#openPdfButton");
  elements.paperStage = document.querySelector("#paperStage");
  elements.viewerWrap = document.querySelector("#viewerWrap");
  elements.pageStack = document.querySelector("#pageStack");
  elements.prevPageButton = document.querySelector("#prevPageButton");
  elements.nextPageButton = document.querySelector("#nextPageButton");
  elements.searchBox = document.querySelector("#searchBox");
  elements.searchInput = document.querySelector("#searchInput");
  elements.searchPopover = document.querySelector("#searchPopover");
  elements.subjectTabs = document.querySelector("#subjectTabs");
  elements.searchSummary = document.querySelector("#searchSummary");
  elements.searchResults = document.querySelector("#searchResults");
}

function getDocumentById(docId) {
  return (manifest.documents || []).find((documentItem) => documentItem.id === docId) || null;
}

function getFirstDocument() {
  return (manifest.documents || [])[0] || null;
}

function formatDate(value) {
  if (!value) {
    return "";
  }
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function encodePdfPath(webPath, pageNumber) {
  const params = new URLSearchParams({
    page: String(pageNumber),
    zoom: "page-width",
    view: "FitH",
    pagemode: "none",
    navpanes: "0",
  });
  return `${encodeURI(webPath)}#${params.toString()}`;
}

function getPageAssetVersion() {
  const stats = manifest.stats || {};
  return [stats.renderDpi || "dpi", manifest.generatedAt || "local"].join("-");
}

function encodePageImagePath(documentItem, pageNumber) {
  const pageDigits = documentItem.pageCount >= 10 ? String(documentItem.pageCount).length : 1;
  const imagePageNumber = String(pageNumber).padStart(pageDigits, "0");
  const version = new URLSearchParams({ v: getPageAssetVersion() });
  return `${documentItem.pageImageBase}${imagePageNumber}.png?${version.toString()}`;
}

function getPrefetchPageRange(pageCount, centerPage, radius = PAGE_PRELOAD_RADIUS) {
  const safeCenter = Math.min(Math.max(1, centerPage), pageCount);
  const firstPage = Math.max(1, safeCenter - radius);
  const lastPage = Math.min(pageCount, safeCenter + radius);
  return Array.from({ length: lastPage - firstPage + 1 }, (_, index) => firstPage + index);
}

function updateHash() {
  const params = new URLSearchParams();
  if (state.activeDocId) {
    params.set("doc", state.activeDocId);
  }
  params.set("page", String(state.activePage));
  if (state.query) {
    params.set("q", state.query);
  }
  if (state.activeCategory !== "全部") {
    params.set("category", state.activeCategory);
  }
  window.history.replaceState(null, "", `#${params.toString()}`);
}

function restoreStateFromHash() {
  const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const firstDocument = getFirstDocument();
  state.activeDocId = params.get("doc") || firstDocument?.id || null;
  state.activePage = Math.max(1, Number.parseInt(params.get("page") || "1", 10));
  state.query = params.get("q") || "";
  state.activeCategory = params.get("category") || "全部";
  elements.searchInput.value = state.query;
}

function renderMeta() {
  elements.bookSubtitle.textContent = manifest.subtitle || "微积分 · 线性代数 · 概率论";
  const stats = manifest.stats || {};
  const generatedAt = formatDate(manifest.generatedAt);
  elements.libraryMeta.textContent = `${stats.documents || 0} 份 PDF · ${stats.pages || 0} 页 · ${stats.searchEntries || searchIndex.length} 条索引${generatedAt ? ` · ${generatedAt}` : ""}`;
}

function renderToc() {
  elements.toc.innerHTML = "";
  (manifest.categories || []).forEach((category) => {
    const block = document.createElement("section");
    block.className = "category-block";

    const title = document.createElement("div");
    title.className = "category-title";
    const dot = document.createElement("span");
    dot.className = "category-dot";
    dot.style.background = category.accent;
    title.append(dot, document.createTextNode(category.title));
    block.append(title);

    category.documents.forEach((documentItem) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "toc-button";
      button.style.setProperty("--active-accent", category.accent);
      button.dataset.docId = documentItem.id;
      button.innerHTML = `
        <span class="toc-title">${escapeHtml(documentItem.chineseTitle || documentItem.title)}</span>
        <span class="toc-pages">${escapeHtml(documentItem.englishTitle)} · ${documentItem.pageCount} 页</span>
      `;
      button.addEventListener("click", () => openDocument(documentItem.id, 1));
      block.append(button);
    });
    elements.toc.append(block);
  });
}

function renderSubjectTabs() {
  elements.subjectTabs.innerHTML = "";
  const categories = ["全部", ...(manifest.categories || []).map((category) => category.title)];
  categories.forEach((categoryName) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "subject-tab";
    button.textContent = categoryName;
    button.style.setProperty("--tab-accent", categoryAccentMap.get(categoryName) || "#202027");
    button.setAttribute("role", "listitem");
    button.addEventListener("click", () => {
      state.activeCategory = categoryName;
      renderSubjectTabs();
      performSearch();
      updateHash();
    });
    if (state.activeCategory === categoryName) {
      button.classList.add("is-active");
    }
    elements.subjectTabs.append(button);
  });
}

function openDocument(docId, pageNumber = 1) {
  const documentItem = getDocumentById(docId);
  if (!documentItem) {
    return;
  }
  const previousDocId = state.activeDocId;
  state.activeDocId = documentItem.id;
  state.activePage = Math.min(Math.max(1, pageNumber), documentItem.pageCount);
  elements.currentCategory.textContent = documentItem.category;
  elements.currentTitle.textContent = documentItem.chineseTitle || documentItem.title;
  elements.pageInput.max = String(documentItem.pageCount);
  elements.pageInput.value = String(state.activePage);
  renderPageStack(documentItem);
  warmNearbyPageImages(documentItem, state.activePage);
  updatePageControls(documentItem);
  requestAnimationFrame(() => {
    scrollToPage(state.activePage, previousDocId === documentItem.id ? "smooth" : "auto");
  });
  document.querySelectorAll(".toc-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.docId === documentItem.id);
  });
  updateHash();
}

function renderPageStack(documentItem) {
  if (state.renderedDocId === documentItem.id) {
    return;
  }
  disconnectPageImageObserver();
  const fragment = document.createDocumentFragment();
  for (let pageNumber = 1; pageNumber <= documentItem.pageCount; pageNumber += 1) {
    const sheet = document.createElement("figure");
    sheet.className = "page-sheet";
    sheet.dataset.page = String(pageNumber);

    const image = document.createElement("img");
    image.className = "page-image";
    image.loading = "lazy";
    image.decoding = "async";
    image.dataset.src = encodePageImagePath(documentItem, pageNumber);
    image.alt = `${documentItem.chineseTitle || documentItem.title} 第 ${pageNumber} 页`;

    sheet.append(image);
    fragment.append(sheet);
  }
  elements.pageStack.replaceChildren(fragment);
  state.renderedDocId = documentItem.id;
  elements.viewerWrap.scrollTop = 0;
  elements.viewerWrap.scrollLeft = 0;
  observePageImages();
}

function disconnectPageImageObserver() {
  if (state.pageImageObserver) {
    state.pageImageObserver.disconnect();
    state.pageImageObserver = null;
  }
}

function observePageImages() {
  const images = [...elements.pageStack.querySelectorAll(".page-image")];
  if (!("IntersectionObserver" in window)) {
    images.forEach((image) => requestPageImageLoad(image));
    return;
  }
  state.pageImageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        requestPageImageLoad(entry.target);
        state.pageImageObserver.unobserve(entry.target);
      });
    },
    {
      root: elements.viewerWrap,
      rootMargin: PAGE_OBSERVER_MARGIN,
      threshold: 0.01,
    }
  );
  images.forEach((image) => state.pageImageObserver.observe(image));
}

function requestPageImageLoad(image, priority = "auto") {
  if (!image || image.src) {
    return;
  }
  if (priority === "high") {
    image.loading = "eager";
    if ("fetchPriority" in image) {
      image.fetchPriority = "high";
    }
  }
  image.addEventListener("load", () => image.classList.add("is-loaded"), { once: true });
  image.src = image.dataset.src;
}

function warmNearbyPageImages(documentItem, centerPage) {
  getPrefetchPageRange(documentItem.pageCount, centerPage).forEach((pageNumber) => {
    const image = elements.pageStack.querySelector(`[data-page="${pageNumber}"] .page-image`);
    if (!image) {
      return;
    }
    requestPageImageLoad(image, "high");
    decodePageImage(image);
  });
}

function decodePageImage(image) {
  const imageUrl = image.currentSrc || image.src || image.dataset.src;
  if (!imageUrl || state.warmedImageUrls.has(imageUrl) || typeof image.decode !== "function") {
    return;
  }
  state.warmedImageUrls.add(imageUrl);
  image.decode().catch(() => {
    state.warmedImageUrls.delete(imageUrl);
  });
}

function scrollToPage(pageNumber, behavior = "auto") {
  const targetPage = elements.pageStack.querySelector(`[data-page="${pageNumber}"]`);
  if (!targetPage) {
    return;
  }
  elements.viewerWrap.scrollTo({
    top: Math.max(0, targetPage.offsetTop - 24),
    left: 0,
    behavior,
  });
}

function updatePageControls(documentItem = getDocumentById(state.activeDocId)) {
  if (!documentItem) {
    return;
  }
  elements.pageInput.max = String(documentItem.pageCount);
  elements.pageInput.value = String(state.activePage);
  elements.prevPageButton.disabled = state.activePage <= 1;
  elements.nextPageButton.disabled = state.activePage >= documentItem.pageCount;
}

function syncPageFromScroll() {
  const documentItem = getDocumentById(state.activeDocId);
  if (!documentItem || !elements.pageStack.children.length) {
    return;
  }
  const marker = elements.viewerWrap.scrollTop + elements.viewerWrap.clientHeight * 0.35;
  let currentPage = 1;
  for (const sheet of elements.pageStack.children) {
    if (sheet.offsetTop <= marker) {
      currentPage = Number.parseInt(sheet.dataset.page || "1", 10);
    } else {
      break;
    }
  }
  if (currentPage !== state.activePage) {
    state.activePage = currentPage;
    warmNearbyPageImages(documentItem, currentPage);
    updatePageControls(documentItem);
    updateHash();
  }
}

function scheduleScrollSync() {
  window.clearTimeout(state.scrollSyncTimer);
  state.scrollSyncTimer = window.setTimeout(syncPageFromScroll, 80);
}

function normalizeQuery(value) {
  return value.trim().replace(/\s+/g, " ");
}

function tokenizeQuery(query) {
  return normalizeQuery(query)
    .toLowerCase()
    .split(" ")
    .filter(Boolean);
}

function entryMatches(entry, terms) {
  if (state.activeCategory !== "全部" && entry.category !== state.activeCategory) {
    return false;
  }
  if (!terms.length) {
    return false;
  }
  const haystack = (entry.text || "").toLowerCase();
  return terms.every((term) => haystack.includes(term));
}

function scoreEntry(entry, terms) {
  const text = (entry.text || "").toLowerCase();
  return terms.reduce((score, term) => {
    const firstIndex = text.indexOf(term);
    if (firstIndex < 0) {
      return score;
    }
    const titleHit = entry.title.toLowerCase().includes(term) ? 20 : 0;
    const headingHit = entry.heading.toLowerCase().includes(term) ? 14 : 0;
    return score + titleHit + headingHit + Math.max(1, 8 - Math.floor(firstIndex / 80));
  }, 0);
}

function makeResultSnippet(entry, terms) {
  const text = entry.text || entry.snippet || "";
  if (!terms.length) {
    return entry.snippet || "";
  }
  const lowerText = text.toLowerCase();
  const firstTerm = terms.find((term) => lowerText.includes(term)) || terms[0];
  const index = lowerText.indexOf(firstTerm);
  if (index < 0) {
    return entry.snippet || text.slice(0, 150);
  }
  const start = Math.max(0, index - 46);
  const end = Math.min(text.length, index + 150);
  const prefix = start > 0 ? "..." : "";
  const suffix = end < text.length ? "..." : "";
  return `${prefix}${text.slice(start, end)}${suffix}`;
}

function highlightTerms(text, terms) {
  let escaped = escapeHtml(text);
  terms
    .filter((term) => term.length > 0)
    .sort((first, second) => second.length - first.length)
    .forEach((term) => {
      const pattern = new RegExp(escapeRegExp(escapeHtml(term)), "gi");
      escaped = escaped.replace(pattern, (match) => `<mark>${match}</mark>`);
    });
  return escaped;
}

function performSearch() {
  const query = normalizeQuery(elements.searchInput.value);
  state.query = query;
  const terms = tokenizeQuery(query);
  const results = searchIndex
    .filter((entry) => entryMatches(entry, terms))
    .map((entry) => ({ entry, score: scoreEntry(entry, terms) }))
    .sort((first, second) => second.score - first.score || first.entry.page - second.entry.page)
    .slice(0, 80)
    .map((item) => item.entry);

  renderSearchResults(results, terms);
  updateHash();
}

function renderSearchResults(results, terms) {
  elements.searchResults.innerHTML = "";
  if (!terms.length) {
    elements.searchSummary.textContent = "输入关键词后显示命中位置";
    elements.searchResults.innerHTML = `<div class="empty-state">输入后会像地址栏建议一样显示章节、页码和命中片段。</div>`;
    updateSearchPopover();
    return;
  }

  elements.searchSummary.textContent = `找到 ${results.length} 处`;
  if (!results.length) {
    elements.searchResults.innerHTML = `<div class="empty-state">没有找到匹配内容。</div>`;
    updateSearchPopover(true);
    return;
  }

  const fragment = document.createDocumentFragment();
  results.forEach((entry) => {
    const documentItem = getDocumentById(entry.docId);
    const accent = categoryAccentMap.get(entry.category) || "#2563eb";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "result-item";
    button.style.setProperty("--result-accent", accent);
    button.innerHTML = `
      <span class="result-title">${escapeHtml(documentItem?.chineseTitle || entry.title)}</span>
      <span class="result-meta">${escapeHtml(entry.category)} · 第 ${entry.page} 页 · ${escapeHtml(entry.heading)}</span>
      <span class="result-snippet">${highlightTerms(makeResultSnippet(entry, terms), terms)}</span>
    `;
    button.addEventListener("pointerdown", (event) => selectSearchResult(event, entry));
    button.addEventListener("click", (event) => selectSearchResult(event, entry));
    fragment.append(button);
  });
  elements.searchResults.append(fragment);
  updateSearchPopover(true);
}

function selectSearchResult(event, entry) {
  event.preventDefault();
  event.stopPropagation();
  closeSearchPopover({ clearQuery: true });
  openDocument(entry.docId, entry.page);
}

function closeSearchPopover(options = {}) {
  const { clearQuery = false } = options;
  if (clearQuery) {
    state.query = "";
    elements.searchInput.value = "";
    elements.searchResults.innerHTML = "";
    elements.searchSummary.textContent = "输入关键词后显示命中位置";
  }
  elements.searchBox.classList.remove("is-open");
  elements.searchInput.blur();
}

function updateSearchPopover(forceOpen = false) {
  const hasQuery = normalizeQuery(elements.searchInput.value).length > 0;
  const isFocused = document.activeElement === elements.searchInput;
  elements.searchBox.classList.toggle("is-open", forceOpen || hasQuery || isFocused);
}

function bindEvents() {
  elements.searchInput.addEventListener("input", () => performSearch());
  elements.searchInput.addEventListener("focus", () => updateSearchPopover());
  document.addEventListener("click", (event) => {
    if (!elements.searchBox.contains(event.target)) {
      closeSearchPopover();
    }
  });
  elements.searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSearchPopover();
    }
  });
  elements.pageInput.addEventListener("change", () => {
    const pageNumber = Number.parseInt(elements.pageInput.value || "1", 10);
    openDocument(state.activeDocId, pageNumber);
  });
  elements.viewerWrap.addEventListener("scroll", scheduleScrollSync, { passive: true });
  elements.prevPageButton.addEventListener("click", () => {
    openDocument(state.activeDocId, state.activePage - 1);
  });
  elements.nextPageButton.addEventListener("click", () => {
    openDocument(state.activeDocId, state.activePage + 1);
  });
  elements.openPdfButton.addEventListener("click", () => {
    const documentItem = getDocumentById(state.activeDocId);
    if (documentItem) {
      window.open(encodePdfPath(documentItem.webPath, state.activePage), "_blank", "noopener");
    }
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function init() {
  bindElements();
  restoreStateFromHash();
  renderMeta();
  renderToc();
  renderSubjectTabs();
  bindEvents();
  openDocument(state.activeDocId, state.activePage);
  performSearch();
}

document.addEventListener("DOMContentLoaded", init);
