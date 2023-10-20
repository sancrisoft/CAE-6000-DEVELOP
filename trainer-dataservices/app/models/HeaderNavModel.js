const HeaderNavModel = ({

  defaultHeader: function () {
    return this.defaultMenuHeader()
  },

  defaultMenuHeader: function () {
    return {
      viewBtnVisible: false,
      viewBackBtnVisible: false
    }
  },

  maintMenuHeader: function () {
    return {
      viewBtnVisible: false,
      viewBackBtnVisible: false,
      maintMenuSectionsVisibility: true
    }
  },

  utilMenuHeader: function () {
    return {
      maintMenuSectionsVisibility: true,
      viewBackBtnLabel: 'Return To<br> Util Menu',
      viewBtnVisible: false,
      viewBackBtnVisible: true
    }
  },

  dataLoaderHeader: function () {
    return {
      viewBtnLabel: 'Maintenance<br>Data Load',
      viewBtnLabelStates: {
        default: 'Maintenance<br>Data Load',
        alternate: 'Load New<br>Databases'
      },
      maintMenuSectionsVisibility: false,
      viewBackBtnLabel: 'Return To <br>Data Load Menu',
      viewBtnVisible: true,
      viewBackBtnVisible: false
    }
  },

  dataLoaderNoBtnHeader: function () {
    return {
      viewBtnLabel: 'Maintenance<br>Data Load',
      viewBtnLabelStates: {
        default: 'Maintenance<br>Data Load',
        alternate: 'Load New<br>Databases'
      },
      maintMenuSectionsVisibility: false,
      viewBackBtnLabel: 'Return To Main<br>Data Load Menu',
      viewBtnVisible: false,
      viewBackBtnVisible: false
    }
  },

  dataLoaderSubpagesHeader: function () {
    return {
      viewBtnLabel: 'Maintenance<br>Data Load',
      viewBtnLabelStates: {
        default: 'Maintenance<br>Data Load',
        alternate: 'Load New<br>Databases'
      },
      maintMenuSectionsVisibility: false,
      viewBackBtnLabel: 'Return To Maint<br>Data Load Menu',
      viewBtnVisible: true,
      viewBackBtnVisible: true
    }
  },

})

module.exports = HeaderNavModel
