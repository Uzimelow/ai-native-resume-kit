const data = window.resumeData;
const pathParts = window.location.pathname.split("/").filter(Boolean);
const scope = pathParts.length >= 2 ? pathParts[pathParts.length - 2] : "default";
const avatarStorageKey = "html-resume-avatar-" + scope;
const themeStorageKey = "html-resume-theme-" + scope;

const text = (value) => document.createTextNode(value);

function createElement(tag, className, content) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (content !== undefined) element.append(text(content));
  return element;
}

function appendHtmlOrText(element, content) {
  if (/<[a-zA-Z][\s\S]*?>[\s\S]*?<\/[a-zA-Z]+\s*>/i.test(content)) {
    const span = document.createElement("span");
    span.innerHTML = content;
    element.append(span);
    return;
  }

  element.append(text(content));
}

function renderSectionTitles() {
  const sections = [
    ["education", "education-title"],
    ["internships", "internships-title"],
    ["projects", "projects-title"],
    ["skills", "skills-title"]
  ];

  sections.forEach(([key, elementId]) => {
    const titleData = data.sectionTitles?.[key];
    const titleElement = document.getElementById(elementId);
    if (!titleData || !titleElement) return;

    titleElement.textContent = "";
    titleElement.append(text(titleData.zh || ""));

    if (titleData.en) {
      titleElement.append(text(" "));
      titleElement.append(createElement("em", "", titleData.en));
    }
  });
}

function renderBasics() {
  document.getElementById("candidate-name").textContent = data.basics.name;
  const target = document.getElementById("candidate-target");
  target.textContent = data.basics.intent || "";
  target.hidden = !data.basics.intent;

  const contact = document.getElementById("candidate-contact");
  const segments = [
    data.basics.location,
    data.basics.phone
  ].filter(Boolean);

  contact.textContent = "";
  segments.forEach((item, index) => {
    if (index > 0) contact.append(text(" | "));
    contact.append(text(item));
  });

  if (data.basics.email) {
    if (segments.length) contact.append(text(" | "));
    const email = createElement("a", "", data.basics.email);
    email.href = `mailto:${data.basics.email}`;
    contact.append(email);
  }

  const links = data.basics.links || [];
  links.forEach((link) => {
    if (!link.url || link.url === "#" || link.url.startsWith("https://example.com") || link.url.startsWith("https://github.com/example")) return;
    contact.append(text(" | "));
    const a = createElement("a", "", link.label);
    a.href = link.url;
    contact.append(a);
  });
}

function renderEducation() {
  const container = document.querySelector('[data-list="education"]');

  data.education.forEach((item) => {
    const article = createElement("article", "education-item");
    article.append(createElement("p", "education-degree", item.degree));
    article.append(createElement("p", "education-school", item.school));
    article.append(createElement("p", "education-college", item.college));
    article.append(createElement("p", "education-major", item.major));
    article.append(createElement("time", "education-period", item.period));

    container.append(article);
  });
}

function setAvatar(source) {
  const avatar = document.getElementById("candidate-avatar");
  const fallback = document.getElementById("avatar-fallback");

  if (!source) {
    avatar.hidden = true;
    avatar.removeAttribute("src");
    fallback.hidden = false;
    return;
  }

  avatar.src = source;
  avatar.hidden = false;
  fallback.hidden = true;
}

function renderAvatar() {
  setAvatar(localStorage.getItem(avatarStorageKey) || data.basics.avatar);
}

function renderInternships() {
  const container = document.querySelector('[data-list="internships"]');

  data.internships.forEach((item) => {
    const article = createElement("article", "entry-item");
    const header = createElement("header", "entry-header");
    header.append(createElement("h4", "entry-company", item.company));
    header.append(createElement("p", "entry-role", item.role));
    header.append(createElement("time", "entry-period", item.period));
    article.append(header);

    if (item.achievements.length) {
      const list = createElement("ul", "achievement-list");
      item.achievements.forEach((achievement) => {
        const listItem = createElement("li");
        listItem.append(createElement("strong", "", `${achievement.label}：`));
        appendHtmlOrText(listItem, achievement.text);
        list.append(listItem);
      });
      article.append(list);
    }

    container.append(article);
  });
}

function renderProjects() {
  const container = document.querySelector('[data-list="projects"]');

  data.projects.forEach((item) => {
    const article = createElement("article", "project-item");
    const header = createElement("header", "project-header");
    header.append(createElement("h4", "project-title", item.title));
    header.append(createElement("p", "project-role", item.role));
    header.append(createElement("time", "project-period", item.period));
    article.append(header);

    if (item.achievements?.length) {
      const list = createElement("ul", "achievement-list");
      item.achievements.forEach((achievement) => {
        const listItem = createElement("li");
        listItem.append(createElement("strong", "", `${achievement.label}：`));
        appendHtmlOrText(listItem, achievement.text);
        list.append(listItem);
      });
      article.append(list);
    }

    container.append(article);
  });
}

function renderSkills() {
  const container = document.querySelector('[data-list="skills"]');

  data.skills.forEach((item) => {
    const article = createElement("article", "skill-item");
    const list = createElement("ul", "skill-points");
    const listItem = createElement("li");
    listItem.append(createElement("strong", "", `${item.label}：`));
    appendHtmlOrText(listItem, item.text);
    list.append(listItem);
    article.append(list);
    container.append(article);
  });
}

async function captureAndCopyImage(button) {
  const resume = document.getElementById("resume");
  if (!resume) return;

  const original = button.textContent;
  button.textContent = "正在生成…";
  button.disabled = true;

  try {
    // Clip to first A4 page (210mm × 297mm)
    const a4HeightPx = resume.getBoundingClientRect().width * (297 / 210);
    const origOverflow = resume.style.overflow;
    const origMaxHeight = resume.style.maxHeight;
    resume.style.overflow = "hidden";
    resume.style.maxHeight = a4HeightPx + "px";

    const canvas = await html2canvas(resume, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      height: a4HeightPx,
      windowHeight: a4HeightPx
    });

    resume.style.overflow = origOverflow;
    resume.style.maxHeight = origMaxHeight;

    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob((b) => {
        if (b) resolve(b);
        else reject(new Error("Canvas toBlob failed"));
      }, "image/png");
    });

    await navigator.clipboard.write([
      new ClipboardItem({ "image/png": blob })
    ]);

    button.textContent = "已复制";
    setTimeout(() => {
      button.textContent = original;
      button.disabled = false;
    }, 1400);
  } catch (err) {
    console.error("截图复制失败:", err);
    button.textContent = "复制失败,请重试";
    button.disabled = false;
    setTimeout(() => {
      button.textContent = original;
    }, 2000);
  }
}

function updateA4FitIndicator() {
  const page = document.getElementById("resume");
  const indicator = document.getElementById("a4-fit-indicator");
  if (!page || !indicator) return;

  const a4HeightPx = (297 / 210) * page.getBoundingClientRect().width;
  const actualHeight = page.scrollHeight;
  const pages = Math.ceil(actualHeight / a4HeightPx);

  if (pages > 1) {
    indicator.textContent = "当前内容已超出 1 页 A4";
    indicator.className = "a4-fit-indicator fit-overflow";
    return;
  }

  const pageRect = page.getBoundingClientRect();
  const children = page.children;
  let maxBottom = 0;
  for (const child of children) {
    const bottom = child.getBoundingClientRect().bottom - pageRect.top;
    if (bottom > maxBottom) maxBottom = bottom;
  }

  const bottomPx = pageRect.height - maxBottom;
  const ratio = 297 / pageRect.height;
  const mm = bottomPx * ratio;

  if (mm < 8) {
    indicator.textContent = "● 偏满（" + Math.round(mm) + "mm 余白）";
    indicator.className = "a4-fit-indicator fit-tight";
  } else if (mm > 45) {
    indicator.textContent = "○ 偏空（" + Math.round(mm) + "mm 余白）";
    indicator.className = "a4-fit-indicator fit-sparse";
  } else {
    indicator.textContent = "● 适配良好（" + Math.round(mm) + "mm 余白）";
    indicator.className = "a4-fit-indicator fit-good";
  }
}

function bindActions() {
  document.getElementById("avatar-upload").addEventListener("change", (event) => {
    const [file] = event.currentTarget.files;
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      localStorage.setItem(avatarStorageKey, reader.result);
      setAvatar(reader.result);
    });
    reader.readAsDataURL(file);
  });
  document.querySelector('[data-action="clear-avatar"]').addEventListener("click", () => {
    localStorage.removeItem(avatarStorageKey);
    setAvatar(data.basics.avatar);
  });
  document.querySelector('[data-action="print"]').addEventListener("click", () => window.print());
  document.querySelector('[data-action="copy-image"]').addEventListener("click", (event) => {
    captureAndCopyImage(event.currentTarget);
  });
}

const themes = [
  { id: "default",  label: "经典海蓝" },
  { id: "scholar",  label: "简约黑白" }
];

function themeLabel(id) { return (themes.find(t => t.id === id) || themes[0]).label; }

function initTheme() {
  const btn = document.getElementById("theme-switcher");
  if (!btn) return;
  let current = localStorage.getItem(themeStorageKey) || "default";
  if (!themes.find(t => t.id === current)) current = "default";
  btn.textContent = "主题：" + themeLabel(current) + "（点击切换）";
  btn.addEventListener("click", function () {
    const idx = themes.findIndex(t => t.id === current);
    current = themes[(idx + 1) % themes.length].id;
    localStorage.setItem(themeStorageKey, current);
    btn.textContent = "主题：" + themeLabel(current) + "（点击切换）";
    const link = document.getElementById("theme-stylesheet");
    if (link) link.href = "themes/" + current + ".css";
  });
}

renderSectionTitles();
renderBasics();
renderEducation();
renderAvatar();
renderInternships();
renderProjects();
renderSkills();
updateA4FitIndicator();
bindActions();
initTheme();
window.addEventListener("resize", updateA4FitIndicator);
