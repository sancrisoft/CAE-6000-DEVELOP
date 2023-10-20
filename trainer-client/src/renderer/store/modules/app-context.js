import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import appContextService from '../../api/app-context-service'
const jwt = require('jsonwebtoken')
const _config = appContextService.get()

export default {
  namespaced: true,
  state: {
    eicasMessages: [
      { label: 'APU EGT SENSORS', color: 'yellow', blink: false },
      { label: 'HYD PUMP 3A FAIL', color: 'cyan', blink: false },
      { label: 'SVS FAIL', color: 'cyan', blink: false },
      { label: 'APU 1 FAIL', color: 'cyan', blink: false }
    ],
    scenarios: [],
    disclaimerAccepted: false,
    selectedTab: 0,
    viewBackBtnOverride: null,
    contextMenusLists: [],
    selectedKnob: null,
    tailNumber: '1234',
    cachedData: null,
    deletedMaintenanceData: [],
    utilityfunctionsConfig: [
      { label: 'Disable Automatically Initiated Datalink Reports', selected: false },
      { label: 'Disable Fault Logging While On Ground', selected: false }
    ],
    utilityFunctionsValidPassword: false,
    utilityFunctionsAuthenticatedUserType: '',
    usbList: [
      { label: 'USB-1: SOFTWARE', name: 'USB-1', id: 0, selected: 0, data: {} },
      { label: 'USB-2: DB/DOCS/TABLES', name: 'USB-2', id: 1, selected: 0, data: {} },
      { label: 'USB-3: BLANK', name: 'USB-3', id: 2, selected: 1, data: {} }
    ],
    selectedUSB: 'USB-3',
    uploadChannel: 'off'
  },
  modules: {
    omsViewPort: {
      eicasMessages: [],
      namespaced: true,
      viewName: '',
      state: {
        header: {
          viewBtnLabel: ''
        },
        selectedDetails: [],
        sortedData: [],
        data: {}
      },
      actions: {
        updateFieldServiceDataLoadComboSelection (context, combo) {
          context.commit('RESET_FIELD_SERVICE_DATA_LOAD_COMBO_SELECTION', combo)
          context.commit('UPDATE_FIELD_SERVICE_DATA_LOAD_COMBO_SELECTION', combo)
        },
        setCheckboxItem (context, obj) {
          context.commit('SET_CHECKBOX_ITEM', obj)
        },
        changeAcftLifecyleData (context, item) {
          context.commit('CHANGE_ACFT_LIFECYCLE_DATA', item)
        },
        changeSystemParametersData (context, item) {
          context.commit('CHANGE_SYSTEM_PARAMETERS_DATA', item)
        },
        maintMenuFilterDataList (context) {
          context.commit('MAINT_MENU_FILTER_DATA_LIST')
        },
        updateATAcomboSelection (context, selectedId) {
          context.commit('UPDATE_COMBO_SELECTION', { comboName: 'ataCombo', selectedId: selectedId })
          context.commit('UPDATE_COMBO_SELECTION', { comboName: 'lruCombo', selectedId: 0 })
          context.commit('LRU_SYS_FILTER_ATA_DATA_LIST', selectedId)
          context.commit('LRU_SYS_FILTER_LRU_DATA_LIST', 0)
          context.commit('LRU_SYS_SORT_DATA')
        },
        updateLRUcomboSelection (context, selectedId) {
          context.commit('UPDATE_COMBO_SELECTION', { comboName: 'lruCombo', selectedId: selectedId })
          context.commit('LRU_SYS_FILTER_LRU_DATA_LIST', selectedId)
          context.commit('LRU_SYS_SORT_DATA')
        },
        updateComboSelection (context, combo) {
          context.commit('UPDATE_COMBO_SELECTION', combo)
          context.commit('MAINT_MENU_FILTER_DATA_LIST')
        },
        setInfoMgmtfileTransferMessage (context, selectedIndex) {
          context.commit('SET_INFOMGMT_FILE_TRANSFER_SELECTED_MESSAGE', selectedIndex)
        },
        removeInfoMgmtFileTransferSelectedFiles (context) {
          context.commit('REMOVE_INFOMGMT_FILE_TRANSFER_SELECTED_FILES')
        },
        setInfoMgmtFileTransferSelectedFiles (context, transferDirection) {
          context.commit('SET_INFOMGMT_FILE_TRANSFER_SELECTED_FILES', transferDirection)
        },
        setInfoMgmtViewFilesToTransfer (context, files) {
          context.commit('SET_INFOMGMT_VIEW_FILES_TO_TRANSFER', files)
        },
        resetInfoMgmtViewFilesToTransfer (context) {
          context.commit('RESET_INFOMGMT_VIEW_FILES_TO_TRANSFER')
        },
        toggleInfoMgmtViewSelectedFileToTransfer (context, index) {
          context.commit('TOGGLE_INFOMGMT_VIEW_SELECTED_FILE_TO_TRANSFER', index)
        },
        resetViewSelectedItems (context) {
          context.commit('RESET_VIEW_SELECTED_ITEM')
        },
        toggleViewSelectedItem (context, index) {
          context.commit('SET_VIEW_SELECTED_ITEM', index)
        },
        setViewSelectSelectedItem (context, index) {
          context.commit('SET_VIEW_SELECT_SELECTED_ITEM', index)
        },
        setHeaderLabel (context, h) {
          context.commit('SET_HEADER_LABEL', h)
        }
      },
      mutations: {
        CHANGE_ACFT_LIFECYCLE_DATA (state, newItem) {
          state.data.parameters[newItem.id].value = newItem.value
        },
        CHANGE_SYSTEM_PARAMETERS_DATA (state, newItem) {
          state.data.parameters[newItem.id].value = newItem.value
          state.data.parameters[newItem.id].uom = newItem.uom
        },
        MAINT_MENU_FILTER_DATA_LIST (state) {
          let sorted = []
          function dateSort () {
            return sorted.sort((a, b) => {
              let x = new Date(a['date']).getTime()
              let y = new Date(b['date']).getTime()
              return x > y ? 1 : -1
            })
          }

          function flightPhaseSort (dateDesc) {
            if (dateDesc) {
              sorted = dateSort().reverse()
            } else {
              sorted = dateSort()
            }

            let flightphase = []
            flightphase.concat(sorted.filter(item => item.flightPhase === 'Ground'))
            flightphase.concat(sorted.filter(item => item.flightPhase === 'Taxi'))
            flightphase.concat(sorted.filter(item => item.flightPhase === 'Takeoff'))
            flightphase.concat(sorted.filter(item => item.flightPhase === 'Climb'))
            flightphase.concat(sorted.filter(item => item.flightPhase === 'Cruise'))
            flightphase.concat(sorted.filter(item => item.flightPhase === 'Descent'))
            flightphase.concat(sorted.filter(item => item.flightPhase === 'Approach'))
            return flightphase
          }

          if (state.data.items) {
            let selectedView = state['viewCombo'] && state['viewCombo'].filter(item => item.selected)[0].key
            switch (selectedView) {
              case 'active':
                sorted = state.data.items.filter((item) => {
                  return item.active
                })
                break
              case 'historical':
                // TODO: what historical
                sorted = state.data.items.filter((item) => {
                  return item.historical
                })
                break
              case 'diagnostic':
                sorted = state.data.items.filter((item) => {
                  return item.type === '0'
                })
                break
              case 'test/rigging':
                sorted = state.data.items.filter((item) => {
                  return item.type === '1'
                })
                break
              case 'acms':
                sorted = state.data.items.filter((item) => {
                  return item.type === '2'
                })
                break
              case 'apmConfiguration':
                sorted = state.data.items.filter((item) => {
                  return item.type === '0'
                })
                break
              case 'apmThirdParty':
                sorted = state.data.items.filter((item) => {
                  return item.type === '1'
                })
                break
              case 'softPartNumber':
                sorted = state.data.items.filter((item) => {
                  return item.type === '2'
                })
                break
              default:
                if (state.data.items) {
                  sorted = [].concat(state.data.items)
                }
                break
            }

            let sortComboKey = state['sortCombo'] && state['sortCombo'].filter(item => item.selected)[0].key
            switch (sortComboKey) {
              case 'dateDesc':
                sorted = dateSort().reverse()
                break
              case 'dateAsc':
                sorted = dateSort()
                break
              case 'flightPhase-dateDesc':
                sorted = flightPhaseSort(true)
                break
              case 'flightPhase-dateAsc':
                sorted = flightPhaseSort(false)
                break
              case 'alpha-reverse':
                sorted = sorted.sort((a, b) => {
                  if (a[sortComboKey] > b[sortComboKey]) return -1
                  else if (a[sortComboKey] < b[sortComboKey]) return 1
                  return 0
                })
                break
              case 'systemId':
                let sort = []
                sort.concat(sorted.sort(function (a, b) {
                  return Number(a['apmswpn']['label']) - Number(b['apmswpn']['label'])
                }))
                sort = sorted.sort(function (a, b) {
                  return Number(a['systemId']) - Number(b['systemId'])
                })
                sorted = [].concat(sort)
                break
              case 'status':
                let statuses = []
                statuses = statuses.concat(sorted.filter(item => item.status === 'Miscompare'))
                statuses = statuses.concat(sorted.filter(item => item.status === 'Unknown'))
                statuses = statuses.concat(sorted.filter(item => item.status === 'Correct'))
                sorted = [].concat(statuses)
                break
              default: // category, cas, filename, alphabetically
                sorted = sorted.sort((a, b) => {
                  if (a[sortComboKey] < b[sortComboKey]) return -1
                  else if (a[sortComboKey] > b[sortComboKey]) return 1
                  return 0
                })
            }
          }

          let parameterGroupComboId = state['parameterGroupCombo'] && state['parameterGroupCombo'].filter(item => item.selected)[0].id
          if (parameterGroupComboId) {
            if (state.data.parameters) {
              sorted = state.data.parameters.filter((item) => {
                return item.type === parameterGroupComboId
              })
            }
          }

          Vue.set(state, 'sortedData', sorted)
        },
        LRU_SYS_FILTER_LRU_DATA_LIST (state, selectedId) {
          let comboSelectedId = selectedId || 0

          let selectedViewKey = state.viewCombo.filter(item => item.selected)[0] && state.viewCombo.filter(item => item.selected)[0].key
          let selectedATAKey = state.ataCombo.filter(item => item.selected)[0] && state.ataCombo.filter(item => item.selected)[0].key
          selectedATAKey = selectedATAKey || state.ataCombo[0].key
          state.lruCombo = Object.assign([], state.originalCombos.lruCombo)

          state.lruCombo = state.lruCombo.filter((item) => {
            return item.type === selectedATAKey && (selectedViewKey !== 'allATAs' ? item[selectedViewKey] : true)
          })

          // filter out disabled items
          state.lruCombo = state.lruCombo.filter(item => {
            return item.enabled
          })

          state.lruCombo.map((item, index) => {
            item.id = index
            item.selected = 0
            if (item.id === comboSelectedId) item.selected = 1
          })
        },
        LRU_SYS_FILTER_ATA_DATA_LIST (state, selectedId) {
          let comboSelectedId = selectedId || 0

          state.ataCombo = Object.assign([], state.originalCombos.ataCombo)
          let selectedViewKey = state.viewCombo.filter(item => item.selected)[0] && state.viewCombo.filter(item => item.selected)[0].key
          selectedViewKey = selectedViewKey || state.viewCombo[0].type

          if (selectedViewKey.indexOf('all') < 0) {
            state.ataCombo = state.ataCombo.filter(item => {
              return item[selectedViewKey]
            })
          }
          // filter out disabled items
          state.ataCombo = state.ataCombo.filter(item => {
            return item.enabled
          })

          state.ataCombo.map((item, index) => {
            item.id = index
            item.selected = 0
            if (item.id === comboSelectedId) item.selected = 1
          })
        },
        LRU_SYS_SORT_DATA (state) {
          let sorted = []
          let selectedLruType = state['lruCombo'] && state['lruCombo'].filter(item => item.selected)
          let selectedLruKey = selectedLruType.length && selectedLruType[0].key

          if (selectedLruKey.toString().length) {
            if (state.data.items) {
              sorted = state.data.items.lrus.filter((item) => {
                return item.key === selectedLruKey
              })
            }
          }

          Vue.set(state, 'sortedData', sorted)
        },
        RESET_FIELD_SERVICE_DATA_LOAD_COMBO_SELECTION (state, combo) {
          state[combo.comboName].map(item => {
            item.data.map(lru => { lru.selected = false })
          })

          state[combo.comboName][combo.selectedParentId].data.map(item => {
            item.lrus.map(lru => { lru.selected = false })
          })
        },
        UPDATE_FIELD_SERVICE_DATA_LOAD_COMBO_SELECTION (state, combo) {
          let data = state[combo.comboName][combo.selectedParentId].data
          data.map((item) => {
            item.selected = false
            if (item.id === combo.selectedTargetLruId) {
              item.selected = true
            }
          })

          if (combo.selectionOrder === 1) {
            data.map(item => {
              item.lrus.map(item => {
                item.selected = false
                if (item.id === combo.selectedDataId) {
                  item.selected = true
                }
              })
            })
          } else if (combo.selectedDataId) {
            data.filter(item => item.key === combo.selectedTargetLruKey)[0].lrus.map((item) => {
              item.selected = false
              if (item.id === combo.selectedDataId) {
                item.selected = true
              }
            })
          }
        },
        UPDATE_COMBO_SELECTION (state, combo) {
          state[combo.comboName].map((item) => {
            item.selected = false
            if (item.id === combo.selectedId) {
              item.selected = true
            }
          })
        },
        SET_INFOMGMT_FILE_TRANSFER_SELECTED_MESSAGE (state, index) {
          state.fileTransferMessage = state.fileTransferMessagesList[index]
        },
        REMOVE_INFOMGMT_FILE_TRANSFER_SELECTED_FILES (state) {
          if (state.filesToTransferList) {
            state.filesToTransferList = state.filesToTransferList.filter(item => item.selected !== true)
          }
        },
        SET_INFOMGMT_FILE_TRANSFER_SELECTED_FILES (state, transferDirection) {
          let selectorValue = transferDirection ? 'fromusb' : 'tousb'
          state.filesToTransferList = [].concat(state.data.filesToTransfer[selectorValue])
        },
        SET_INFOMGMT_VIEW_FILES_TO_TRANSFER (state, files) {
          state.filesToTransferList = [].concat(files)
        },
        RESET_INFOMGMT_VIEW_FILES_TO_TRANSFER (state) {
          state.filesToTransferList = [].concat(state.data.filesToTransfer['tousb'])
        },
        TOGGLE_INFOMGMT_VIEW_SELECTED_FILE_TO_TRANSFER (state, index) {
          state.filesToTransferList[index].selected = !state.filesToTransferList[index].selected
        },
        RESET_VIEW_SELECTED_ITEM (state) {
          if (state.data.items) {
            state.data.items.map((item) => {
              item.selected = false
            })
          }

          Vue.set(state, 'selectedDetails', [])
        },
        SET_CHECKBOX_ITEM (state, obj) {
          state.data.items[obj.id].selected = obj.checked
        },
        SET_VIEW_SELECTED_ITEM (state, index) {
          let items = state.data.items
          items[index].selected = !items[index].selected
          let selected = items.filter(item => item.selected)
          Vue.set(state, 'selectedDetails', selected)
        },
        SET_VIEW_SELECT_SELECTED_ITEM (state, index) {
          let items = state.data.items
          items.map((item) => {
            item.selected = false
          })

          items[index].selected = !items[index].selected
          state.selectedDetails = items.filter((item) => {
            return item.selected
          })[0].data
        },
        SET_HEADER_LABEL (state, h) {
          state.header[h.label] = h.value
        }
      },
      getters: {
        getViewComboSelectedState: (state, getters) => (comboName) => {
          if (state[comboName]) {
            return state[comboName].filter(item => item.selected)[0]
          } else {
            return false
          }
        }
      }
    }
  },
  actions: {
    setSelectedUSB (context, index) {
      context.commit('SET_SELECTED_USB', index)
    },
    setUploadChannel (context, index) {
      context.commit('SET_UPLOAD_CHANNEL', index)
    },
    setSelectedScenario (context, index) {
      context.commit('SET_SELECTED_SCENARIO', index)
    },
    setSelectedTab  (context, tab) {
      context.commit('SET_SELECTED_TAB', tab)
    },
    setViewBackBtnOverride (context, target) {
      context.commit('SET_VIEW_BACKBTN_OVERRIDE', target)
    },
    resetViewBackBtnOverride (context) {
      context.commit('RESET_VIEW_BACKBTN_OVERRIDE')
    },
    lruSysCacheItem  (context, obj) {
      context.commit('LRU_SYS_CACHE_ITEM', obj)
    },
    deleteMaintenanceData (context, key) {
      context.commit('DELETE_MAINTENANCE_DATA', key)
    },
    changeTailNumber (context, newNo) {
      context.commit('CHANGE_TAIL_NUMBER', newNo)
    },
    toggleUtilityfunctionsConfig (context, index) {
      context.commit('TOGGLE_UTILITY_FUNCTIONS_CONFIG', index)
    },
    setUtilityFunctionsValidPassword (context, validPassword) {
      context.commit('SET_UTILITY_FUCTIONS_VALID_PASSWORD', validPassword)
    },
    setUtilityFunctionsAuthenticatedUserType (context, userType) {
      context.commit('SET_UTILITY_FUCTIONS_AUTHENTICATED_USER_TYPE', userType)
    },
    registerCurrentSelectedKnob (context, selectedKnob) {
      context.commit('SET_CURRENT_SELECTED_KNOB', selectedKnob)
    },
    resetContextMenus (context) {
      context.commit('RESET_COMPONENT_LIST_ITEM_SELECTION', 'maintMenu')
    },
    setContextMenuSelectedItem (context, obj) {
      // if (obj.component.toLowerCase() === 'maintmenu') {
      context.commit('SET_COMPONENT_LIST_ITEM_SELECTION', obj)
      // }
    },
    setContextMenuSelectedChildItem (context, obj) {
      context.commit('SET_COMPONENT_LIST_ITEM_CHILD_SELECTION', obj)
    },
    resetContextMenuSelectedChildItem (context, obj) {
      context.commit('RESET_COMPONENT_LIST_ITEM_CHILD_SELECTION', obj)
    },
    getAppContext (context) {
      context.commit('SET_CONTEXTMENUS', _config.viewSwitchers)
      context.commit('SET_APPCONFIG', _config.appConfig)
    },
    postIMSContent: ({dispatch}, obj) => {
      return dispatch('restIMSContent', Object.assign({}, obj, { method: 'post' })).then((response) => {
        return response
      })
    },
    restIMSContent: ({state}, obj) => {
      let userType = obj.userType || 'user'

      const jwtObj = _config.appConfig.jwt

      const signParams = {
        userType: userType, // filter lists upon user type
        scenario: state.currentScenario,
        target: (obj.name || '').replace(/-/g, '').toLowerCase(),
        action: obj.action
      }
      const params = Object.assign({}, signParams, { data: obj.data })

      // Sign all parameters into the token except data, as data may be large and cause header issues.
      const token = jwt.sign({...signParams}, jwtObj.secret, {expiresIn: jwtObj.expiresIn})

      // Add JWT headers.
      let options = {
        headers: {
          [jwtObj.headers.token]: token,
          [jwtObj.headers.consumer]: jwtObj.consumer
        }
      }

      // Build parameters for axios promised based on method.
      let axiosParameters = [_config.appConfig.apiURL]

      switch (obj.method) {
        case 'get':
          options.params = params

          axiosParameters = [...axiosParameters, options]
          break
        case 'post':
          options.headers['content-type'] = 'application/x-www-form-urlencoded'

          axiosParameters = [...axiosParameters, ...[qs.stringify(params), options]]
          break
        default:
          return {}
      }

      // Call axios method with parameters.
      return axios[obj.method](...axiosParameters).then(response => {
        return response
      })
        .catch((error) => {
          return error
        })
    },
    setContent (context, data) {
      context.commit('SET_CONTENT', data)
    },
    setSBContent (context, data) {
      context.commit('SET_SB_CONTENT', data)

      if (data.data.scenarios) {
        context.commit('SET_SCENARIOS', data.data.scenarios)
      }
    },
    getSBContent: ({dispatch}, obj) => {
      return dispatch('restSBContent', Object.assign({}, obj, { method: 'get' })).then((response) => {
        return response
      })
    },
    postSBContent: ({dispatch}, obj) => {
      return dispatch('restSBContent', Object.assign({}, obj, { method: 'post' })).then((response) => {
        return response
      })
    },
    restSBContent: ({state}, obj) => {
      let userType = obj.userType || 'user'

      const jwtObj = _config.appConfig.jwt

      const signParams = {
        userType: userType, // filter lists upon user type
        scenario: state.currentScenario,
        target: (obj.name || '').replace(/-/g, '').toLowerCase(),
        action: obj.action
      }
      const params = Object.assign({}, signParams, { data: obj.data })

      // Sign all parameters into the token except data, as data may be large and cause header issues.
      const token = jwt.sign({...signParams}, jwtObj.secret, {expiresIn: jwtObj.expiresIn})

      // Add JWT headers.
      let options = {
        headers: {
          [jwtObj.headers.token]: token,
          [jwtObj.headers.consumer]: jwtObj.consumer
        }
      }

      // Build parameters for axios promised based on method.
      let axiosParameters = [_config.appConfig.apiURL]

      switch (obj.method) {
        case 'get':
          options.params = params

          axiosParameters = [...axiosParameters, options]
          break
        case 'post':
          options.headers['content-type'] = 'application/x-www-form-urlencoded'

          axiosParameters = [...axiosParameters, ...[qs.stringify(params), options]]
          break
        default:
          return {}
      }

      // Call axios method with parameters.
      return axios[obj.method](...axiosParameters).then(response => {
        return response
      })
        .catch((error) => {
          return error
        })
    },
    getContent (context, obj) {
      let userType = obj.userType || 'user'
      let originating = obj.originating || 'same'

      console.log(obj)

      const jwtObj = _config.appConfig.jwt

      const params = {
        // TODO: remove parame when not necessary
        userType: userType, // filter lists upon user type
        scenario: context.state.currentScenario,
        deletedMaintenanceData: context.state.deletedMaintenanceData,
        tailNumber: context.state.tailNumber,
        disableDatalinkReports: context.state.utilityfunctionsConfig[0].selected,
        disableFaultLogging: context.state.utilityfunctionsConfig[1].selected,
        target: obj.view.replace(/-/g, '').toLowerCase(),
        index: obj.index,
        id: obj.id,
        originating: originating,
        usb: context.state.selectedUSB
      }

      // Sign all parameters into the token.
      const token = jwt.sign({...params}, jwtObj.secret, {expiresIn: jwtObj.expiresIn})

      // Add JWT headers.
      const options = {
        params,
        headers: {
          [jwtObj.headers.token]: token,
          [jwtObj.headers.consumer]: jwtObj.consumer
        }
      }

      return axios.get(_config.appConfig.apiURL, options).then(response => {
        return response
      })
        .catch((error) => {
          return error
        })
    },
    setSelectedView: (context, obj) => {
      context.commit('RESET_COMPONENT_LIST_ITEM_SELECTION', obj.component)
      context.commit('SET_SELECTEDVIEW', obj)
    },
    resetComponentListItemSelection: (context, component) => {
      context.commit('RESET_COMPONENT_LIST_ITEM_SELECTION', component)
    },
    setEditMode (context, mode) {
      context.commit('SET_EDIT_MODE', mode)
    }
  },
  mutations: {
    ACCEPT_DISCLAIMER (state) {
      state.disclaimerAccepted = true
    },
    SET_SELECTED_USB (state, index) {
      state.usbList.map((item) => {
        item.selected = false
        if (item.id === index) {
          item.selected = true
          state.selectedUSB = item.name
        }
      })
    },
    SET_UPLOAD_CHANNEL (state, index) {
      state.uploadChannel = index
    },
    SET_SELECTED_SCENARIO (state, index) {
      state.scenarios.map((item) => {
        item.selected = false
        if (item.id === index) {
          item.selected = true
        }
      })
      state.currentScenario = index
    },
    SET_SELECTED_TAB  (state, tab) {
      state.selectedTab = tab
    },
    SET_VIEW_BACKBTN_OVERRIDE (state, target) {
      state.viewBackBtnOverride = target
    },
    RESET_VIEW_BACKBTN_OVERRIDE (state, newItem) {
      state.viewBackBtnOverride = null
    },
    LRU_SYS_CACHE_ITEM (state, item) {
      state.cachedData = item
    },
    DELETE_MAINTENANCE_DATA (state, key) {
      return [...state.deletedMaintenanceData, key]
    },
    CHANGE_TAIL_NUMBER (state, newNo) {
      Vue.set(state, 'tailNumber', newNo)
    },
    TOGGLE_UTILITY_FUNCTIONS_CONFIG (state, index) {
      state.utilityfunctionsConfig[index].selected = !state.utilityfunctionsConfig[index].selected
    },
    SET_UTILITY_FUCTIONS_VALID_PASSWORD (state, validPassword) {
      state.utilityFunctionsValidPassword = validPassword
    },
    SET_UTILITY_FUCTIONS_AUTHENTICATED_USER_TYPE (state, userType) {
      state.utilityFunctionsAuthenticatedUserType = userType
    },
    SET_CURRENT_SELECTED_KNOB  (state, selectedKnob) {
      Vue.set(state, 'selectedKnob', selectedKnob)
    },
    SET_CONTENT (state, data) {
      if (data.data) {
        state.selectedKnob = null
        state.omsViewPort = Object.assign({}, data)
        state.viewName = Object.freeze(data.componentName)
        let originalCombos = {}

        if (data.viewCombo) {
          originalCombos.viewCombo = Object.assign({}, data.viewCombo)
        }
        if (data.ataCombo) {
          originalCombos.ataCombo = Object.assign({}, data.ataCombo)
        }
        if (data.lruCombo) {
          originalCombos.lruCombo = Object.assign({}, data.lruCombo)
        }

        state.omsViewPort.originalCombos = Object.freeze(originalCombos)
      }
    },
    SET_SB_CONTENT (state, data) {
      if (data.data.scenarios) {
        state.scenarios = Object.assign([], data.data.scenarios)
      }
    },
    RESET_COMPONENT_LIST_ITEM_SELECTION (state, component) {
      state.contextMenusLists[component].map(function (item) {
        item.selected = false
      })
    },
    SET_COMPONENT_LIST_ITEM_SELECTION (state, obj) {
      obj.target = obj.target.toLowerCase()
      let targetIsMaintMenu = state.contextMenusLists['maintMenuSections'].filter((item) => {
        return obj.target === item.target.toLowerCase() || (item.child && obj.target === item.child.target.toLowerCase())
      })[0]
      if (obj.component === 'maintMenu' && (targetIsMaintMenu && targetIsMaintMenu.target)) {
        obj.target = 'maintmenu'
      }
      state.contextMenusLists[obj.component].map(item => {
        item.selected = false
        if (item.target.toLowerCase() === obj.target) {
          item.selected = true
        }
      })
    },
    SET_COMPONENT_LIST_ITEM_CHILD_SELECTION (state, obj) {
      state.contextMenusLists[obj.component].map(item => {
        if (item.child && (item.child.target === obj.target)) {
          item.child.selected = true
        }
      })
    },
    RESET_COMPONENT_LIST_ITEM_CHILD_SELECTION (state, obj) {
      if (obj.id) {
        state.contextMenusLists[obj.component][obj.id].child.selected = false
      } else {
        state.contextMenusLists[obj.component].map((item) => {
          if (item.child) {
            item.child.selected = false
          }
        })
      }
    },
    SET_APPCONFIG (state, config) {
      state.appConfig = { ...config }
    },
    SET_SCENARIOS (state, scenarios) {
      state.scenarios = [...scenarios]
    },
    SET_CONTEXTMENUS (state, list) {
      state.contextMenusLists = { ...list }
    },
    SET_SELECTEDVIEW (state, obj) {
      state.contextMenusLists[obj.component].map(function (item) {
        if (item.target.toLowerCase() === obj.view.toLowerCase()) {
          item.selected = true
        }
      })
    },
    SET_EDIT_MODE (state, mode) {
      state.appConfig.editMode = mode
    }
  },
  getters: {
    getSelectedKnob: (state, getters) => {
      return state.selectedKnob
    },
    getOriginalCombo: (state, getters) => (combo) => {
      return state.originalCombos[combo]
    },
    getContextMenuListSelectedState: (state, getters) => (listName) => {
      let selected = state.contextMenusLists[listName].filter(item => {
        return item.selected || (item.child && item.child.selected)
      })[0]

      if (selected) {
        return selected
      } else {
        return state.contextMenusLists[listName].filter(item => {
          return item.default
        })[0]
      }
    }
  }
}
