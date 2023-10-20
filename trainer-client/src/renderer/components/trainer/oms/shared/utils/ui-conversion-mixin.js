let w = window
let d = window.document
let e = d.documentElement
let g = d.getElementsByTagName('body')[0]
// let x = w.innerWidth || e.clientWidth || g.clientWidth
let y = w.innerHeight || e.clientHeight || g.clientHeight

/* vwTOpx: function (value) {
    var result = (x * value) / 100
    return result
  },
  vhTOpx: function (value) {
    var result = (y * value) / 100
    return result
  },
  pxTOvw: function (value) {
    var result = (100 * value) / x
    return result
  }, */

function pxTOvh (value) {
  var result = (100 * value) / y
  return result
}

export default {
  pxTOvh: pxTOvh
}
