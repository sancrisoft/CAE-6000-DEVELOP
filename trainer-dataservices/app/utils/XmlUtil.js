const xml2jsonConverter = require('xml-js')

const XmlUtil = ({

  xml2json: (xmlString) => {
    let self = module.exports

    let jsonString = '{}'

    try {
      jsonString = xml2jsonConverter.xml2json(xmlString, { compact: true, trim: true, ignoreDeclaration: true, ignoreAttributes: true, textFn: self._xml2jsonRemoveTextAttribute })
    } catch (e) {
      throw e
    }

    return JSON.parse(jsonString)
  },

  _xml2jsonRemoveTextAttribute: (value, parentElement) => {
    try {
      let keyNo = Object.keys(parentElement._parent).length
      let keyName = Object.keys(parentElement._parent)[keyNo - 1]
      parentElement._parent[keyName] = value
    } catch (e) {
      throw e
    }
  }

})

module.exports = XmlUtil
