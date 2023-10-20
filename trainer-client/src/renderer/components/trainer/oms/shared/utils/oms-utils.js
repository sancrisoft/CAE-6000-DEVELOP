import uiConversionMixin from '@/components/trainer/oms/shared/utils/ui-conversion-mixin'

function chunk (items, chunkSize) {
  var that = items
  return Array(Math.ceil(that.length / chunkSize)).fill().map(function (_, i) {
    return that.slice(i * chunkSize, i * chunkSize + chunkSize)
  })
}

function getRandomId (id) {
  return id + Math.random().toString(36).substr(2, 10)
}

export default {
  chunk: chunk,
  getRandomId: getRandomId,
  pxTOvh: uiConversionMixin.pxTOvh
}
