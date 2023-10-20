const CoreUtil = ({

  defaultTo: (value, defaultValue = '') => {
    return value ? value : defaultValue
  },

  isEquivalentString: (value1, value2) => {
    return '' + value1 === '' + value2
  },

  isEquivalentToTrue: (value) => {
    return ['1', 'true', 'yes', 'on'].indexOf('' + value) !== -1
  },

  isNullOrUndefined: (value) => {
    return !value
  },

  toTitleCase: (input) => {
    return input.toLowerCase().split(' ').map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  }

})

module.exports = CoreUtil
