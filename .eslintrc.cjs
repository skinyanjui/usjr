module.exports = {
  root: true,
  extends: ["next/core-web-vitals"],
  rules: {
    // Warn when accessing layout/measurable properties that can cause forced synchronous layouts
    "no-restricted-syntax": [
      "warn",
      { selector: "MemberExpression[property.name='offsetWidth']", message: "Avoid forced synchronous layout: batch DOM reads via requestAnimationFrame or ResizeObserver." },
      { selector: "MemberExpression[property.name='offsetHeight']", message: "Avoid forced synchronous layout: batch DOM reads via requestAnimationFrame or ResizeObserver." },
      { selector: "MemberExpression[property.name='offsetTop']", message: "Avoid forced synchronous layout: batch DOM reads via requestAnimationFrame or ResizeObserver." },
      { selector: "MemberExpression[property.name='offsetLeft']", message: "Avoid forced synchronous layout: batch DOM reads via requestAnimationFrame or ResizeObserver." },
      { selector: "MemberExpression[property.name='offsetParent']", message: "Avoid forced synchronous layout: batch DOM reads via requestAnimationFrame or ResizeObserver." },
      { selector: "MemberExpression[property.name='clientWidth']", message: "Avoid forced synchronous layout: batch DOM reads via requestAnimationFrame or ResizeObserver." },
      { selector: "MemberExpression[property.name='clientHeight']", message: "Avoid forced synchronous layout: batch DOM reads via requestAnimationFrame or ResizeObserver." },
      { selector: "MemberExpression[property.name='clientTop']", message: "Avoid forced synchronous layout: batch DOM reads via requestAnimationFrame or ResizeObserver." },
      { selector: "MemberExpression[property.name='clientLeft']", message: "Avoid forced synchronous layout: batch DOM reads via requestAnimationFrame or ResizeObserver." },
      { selector: "MemberExpression[property.name='scrollTop']", message: "Avoid reading layout synchronously: consider debouncing/throttling and batching in requestAnimationFrame." },
      { selector: "MemberExpression[property.name='scrollLeft']", message: "Avoid reading layout synchronously: consider debouncing/throttling and batching in requestAnimationFrame." },
      { selector: "MemberExpression[property.name='scrollWidth']", message: "Avoid reading layout synchronously: consider debouncing/throttling and batching in requestAnimationFrame." },
      { selector: "MemberExpression[property.name='scrollHeight']", message: "Avoid reading layout synchronously: consider debouncing/throttling and batching in requestAnimationFrame." },
      { selector: "CallExpression[callee.property.name='getBoundingClientRect']", message: "Avoid forced synchronous layout: batch reads in requestAnimationFrame or cache measurements." },
      { selector: "CallExpression[callee.property.name='getClientRects']", message: "Avoid forced synchronous layout: batch reads in requestAnimationFrame or cache measurements." },
      { selector: "CallExpression[callee.name='getComputedStyle']", message: "Avoid forced synchronous layout: batch reads in requestAnimationFrame or cache measurements." },
      { selector: "CallExpression[callee.property.name='getComputedStyle']", message: "Avoid forced synchronous layout: batch reads in requestAnimationFrame or cache measurements." },
    ],
  },
}
