// @/plugins/markdownit.ts
import md from "markdown-it";
import mdAnchor from 'markdown-it-anchor';
import mdToc from 'markdown-it-table-of-contents';
import mdVideo from 'markdown-it-video';
import mdPodcast from 'markdown-it-podcast';
import mdSanitizer from 'markdown-it-sanitizer';
import mdFootnote from 'markdown-it-footnote';
import mdTocDoneRight from 'markdown-it-toc-done-right';

export default defineNuxtPlugin(() => {
  const renderer = md({
    breaks: true,
    html: true,
    linkify: true,
    typographer: true,
    xhtmlOut: true,
    langPrefix: 'language-'
  });
  renderer.use(mdToc)
  renderer.use(mdVideo)
  renderer.use(mdSanitizer)
  renderer.use(mdFootnote)
  renderer.use(mdPodcast, {
    url: '',
    height: 200,
    auto_play: false,
    hide_related: false,
    show_comments: false,
    show_user: true,
    show_reports: false,
    visual: true,
  })
  renderer.use(mdAnchor, {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '§',
  }).use(mdTocDoneRight)

  return {
    provide: {
      mdRenderer: renderer,
    },
  };
});