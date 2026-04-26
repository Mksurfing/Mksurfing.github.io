function convertMarkdown() {
  const input = document.getElementById("markdown-input").value;

  const lines = input.split("\n");

  const parsed = lines.map((line) => {
    let html = line;

    // Headings
    if (/^\s*###\s+/.test(html)) {
      html = html.replace(/^\s*###\s+(.*)/, "<h3>$1</h3>");
    } else if (/^\s*##\s+/.test(html)) {
      html = html.replace(/^\s*##\s+(.*)/, "<h2>$1</h2>");
    } else if (/^\s*#\s+/.test(html)) {
      html = html.replace(/^\s*#\s+(.*)/, "<h1>$1</h1>");
    }

    // Blockquote
    else if (/^\s*>\s+/.test(html)) {
      html = html.replace(/^\s*>\s+(.*)/, "<blockquote>$1</blockquote>");
    }

    // Images FIRST
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2">');

    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/__(.*?)__/g, "<strong>$1</strong>");

    // Italic (safe version)
    html = html.replace(/\*(?!\*)(.*?)\*(?!\*)/g, "<em>$1</em>");
    html = html.replace(/_(?!_)(.*?)_(?!_)/g, "<em>$1</em>");

    return html;
  });

  return parsed.join("");
}

// EVENT LISTENER
document.getElementById("markdown-input").addEventListener("input", () => {
  const html = convertMarkdown();

  const output = document.getElementById("html-output");
  const preview = document.getElementById("preview");

  // Raw HTML display
  output.textContent = html;

  // ✅ FIX: build real DOM nodes
  preview.innerHTML = ""; // clear first

  const temp = document.createElement("div");
  temp.innerHTML = html;

  while (temp.firstChild) {
    preview.appendChild(temp.firstChild);
  }
});