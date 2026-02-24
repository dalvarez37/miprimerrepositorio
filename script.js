const STORAGE_KEY = "editable-content";

const initialContent = {
  title: "Título del artículo",
  body: "Este texto simula el contenido principal de la página. Puedes editarlo desde el panel y guardarlo en el navegador.",
};

const articleTitle = document.getElementById("article-title");
const articleBody = document.getElementById("article-body");
const form = document.getElementById("content-form");
const titleInput = document.getElementById("title-input");
const bodyInput = document.getElementById("body-input");
const resetBtn = document.getElementById("reset-btn");
const status = document.getElementById("status");

function getStoredContent() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return initialContent;

  try {
    const parsed = JSON.parse(raw);
    if (!parsed.title || !parsed.body) return initialContent;
    return parsed;
  } catch {
    return initialContent;
  }
}

function render(content) {
  articleTitle.textContent = content.title;
  articleBody.textContent = content.body;
  titleInput.value = content.title;
  bodyInput.value = content.body;
}

function saveContent(content) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  status.textContent = "Cambios guardados correctamente.";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const content = {
    title: titleInput.value.trim(),
    body: bodyInput.value.trim(),
  };

  render(content);
  saveContent(content);
});

resetBtn.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  render(initialContent);
  status.textContent = "Contenido restablecido a valores iniciales.";
});

render(getStoredContent());
