/**
 * Get parent of dom element with
 * given class
 *
 * @param  {Object} el        element
 * @param  {String} className className
 * @return {Object}           parent element with given class
 */
export function getParentWithClass( el, className ) {
  let parent = null;
  let p      = el.parentNode;

  while ( p !== null ) {
    var o = p;

    if ( o.classList.contains( className ) ) {
      parent = o;
      break;
    }

    p = o.parentNode;
  }

  return parent;
}