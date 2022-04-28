
{
  const theme = localStorage.getItem("theme");
  if(theme === "light" || theme === "dark") {
    toggleTheme(theme);
  } else {
    localStorage.removeItem("theme");
  }
}

/** @type {(theme?: 'light' | 'dark') => void} */
function toggleTheme(theme) {
  if(!theme) theme = localStorage.getItem("theme") === "light" ? "dark" : "light";
  localStorage.setItem("theme", theme);
  document.documentElement.style.colorScheme = theme;
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(theme);

  // Force reload of possible themes by re-appending meta tag
  let meta = document.documentElement.querySelector("meta[name='color-scheme']");
  if(!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "color-scheme");
    document.documentElement.append(meta);
  }
  meta.setAttribute("content", theme);

}