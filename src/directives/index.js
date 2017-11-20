import hljs from 'highlight.js'
export default {
  highlight (el) {
    let blocks = el.querySelectorAll('pre code')
    blocks.forEach(block => {
      hljs.highlightBlock(block)
    })
  }
}
