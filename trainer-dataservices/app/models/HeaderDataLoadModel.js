
function HeaderDataLoadModel () {
  const payload = {
    viewBtnLabel: 'Load new<br>Databases',
    viewBtnLabelStates: {
      default: 'Maintenance<br>Data Load',
      alternate: 'Load New<br>Databases'
    },
    viewBackBtnLabel: 'Return To Maint<br>Data Load Menu',
    viewBtnVisible: true,
    viewBackBtnVisible: false
  }

  return payload
}

module.exports = HeaderDataLoadModel
