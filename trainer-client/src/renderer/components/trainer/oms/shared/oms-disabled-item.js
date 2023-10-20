import Vue from 'vue'

const omsDisabledItem = {
  bind: function (el, binding, vnode) {
    if (binding.value.length) {
      el.setAttribute('title', binding.value)
      el.setAttribute('style', 'cursor: default; border-color: transparent')
      el.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        return false
      })
    }
  }
}

Vue.directive('oms-disabled-item', omsDisabledItem)

export default {
  omsDisabledItem: omsDisabledItem
}
