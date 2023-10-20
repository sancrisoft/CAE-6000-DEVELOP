const SqlUtil = ({

  defaultTo: (value, defaultValue = 'NULL') => {
    return (value ? '\'' + value + '\'' : (defaultValue === 'NULL' ? defaultValue : '\'' + defaultValue + '\''))
  }

})

module.exports = SqlUtil
