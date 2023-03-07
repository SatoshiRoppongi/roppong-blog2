// @/plugins/markdownit.ts
import md from "markdown-it";
import mdAnchor from 'markdown-it-anchor';
import mdToc from 'markdown-it-table-of-contents';

export default defineNuxtPlugin(() => {
  const renderer = md();
  renderer.use(mdAnchor)
  renderer.use(mdToc)

  return {
    provide: {
      mdRenderer: renderer,
    },
  };
});