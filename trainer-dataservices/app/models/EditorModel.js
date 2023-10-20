const ConstantsModel = require('./ConstantsModel.js')

const EditorModel = ({
  defaults: {
    categories: ['Warning', 'Caution', 'Advisory', 'Info'],
    phases: ['Ground', 'Taxi', 'Takeoff', 'Climb', 'Cruise', 'Descent', 'Approach'],
    occurences: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    fls: ['0', '-1', '-2', '-3', '-4', '-5', '-6', '-7', '-8', '-9', '-10', '-11', '-12']
  }
})

module.exports = EditorModel
