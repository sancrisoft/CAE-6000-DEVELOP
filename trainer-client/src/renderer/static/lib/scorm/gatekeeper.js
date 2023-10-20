/*
 2009/09/30
 Added proxying of the SCORM 2004 API
 2009/09/16
 changed the XMLHttpRequest calls to synchronous
 2009/07/20
 fixed a problem where the browser was hanging after opening many sco's in quick succession
 2008/09/02
 fixed a problem where the API wasn't being found with a popup window skin in ole
 */

function apiProxy (gk) {
  this.__gk = gk

  this.__api_version = '' // cmi._version is wacked, we'll be more explict about the API version ("2004" or "1.2")
  this.__is_initialized = false
  this.__open_logged = false
  this.__finished = false // true when LMSFinish() called...
  this.__api = this._getOriginalAPI(window)
  this.__init()

  var _this = this
  window.onload = function () {
    _this.__gk.log('')
  }
}

apiProxy.prototype.__init = function () {
  if (!this.__is_initialized) {
    this.__gk.log('Gatekepper :: orig API = ' + this.__api)
    this.__gk.log('Gatekeeper :: orig API version = ' + this.__api_version)
    this.__is_initialized = false
    if (this.__api) {
      // SCORM 1.2
      if (this.__api_version == '1.2') {
        this.__is_initialized = this.__api.LMSInitialize('')
        this.__gk.log('Gatekeeper :: LMSInitialize called :: result = ' + this.__is_initialized)
        if (this.__is_initialized == 'true') { // gather some SCORM data
          this.__gk.setStudentId(this.__api.LMSGetValue('cmi.core.student_id'))
          this.__gk.setStudentName(this.__api.LMSGetValue('cmi.core.student_name'))
          this.__gk.setClientCode(this.__api.LMSGetValue('cmi.launch_data'))
        }
      }
      // SCORM 2004
      if (this.__api_version == '2004') {
        this.__is_initialized = this.__api.Initialize('')
        this.__gk.log('Gatekeeper :: Initialize called :: result = ' + this.__is_initialized)
        if (this.__is_initialized == 'true') { // gather some SCORM data
          this.__gk.setStudentId(this.__api.GetValue('cmi.learner_id'))
          this.__gk.setStudentName(this.__api.GetValue('cmi.learner_name'))
          this.__gk.setClientCode(this.__api.GetValue('cmi.launch_data'))
        }
      }
    }
  }
}

// SCORM 1.2 API methods
apiProxy.prototype.LMSInitialize = function () {
  this.__gk.log('Gatekeeper :: LMSInitialize called :: result = ' + this.__is_initialized)
  return this.__is_initialized
}
apiProxy.prototype.LMSGetValue = function (element_name) {
  var element_value = ''
  var element_value = this.__api.LMSGetValue(element_name)
  this.__gk.log('Gatekeeper :: LMSGetValue called :: element = ' + element_name + ' :: result = ' + element_value)
  if (element_name == 'cmi.launch_data') {
    this.__open_logged = true
    element_value = this.__gk.getLaunchData()
  }
  return element_value
}
apiProxy.prototype.LMSSetValue = function (element_name, element_value) {
  this.__gk.log('Gatekeeper :: LMSSetValue called :: element = ' + element_name + ' :: value = ' + element_value)
  return this.__api.LMSSetValue(element_name, element_value)
}
apiProxy.prototype.LMSGetLastError = function () {
  return this.__api.LMSGetLastError()
}
apiProxy.prototype.LMSGetErrorString = function (error_code) {
  return this.__api.LMSGetErrorString(error_code)
}
apiProxy.prototype.LMSGetDiagnostic = function (error_code) {
  return this.__api.LMSGetDiagnostic(error_code)
}
apiProxy.prototype.LMSCommit = function () {
  return this.__api.LMSCommit('')
}
apiProxy.prototype.LMSFinish = function () {
  if (!this.__finished) this.__gk.logAccessEvent('close') // log the close event
  this.__finished = true
  return this.__api.LMSFinish('')
}

// SCORM 2004 API methods
apiProxy.prototype.Initialize = function () {
  this.__gk.log('Gatekeeper :: Initialize called :: result = ' + this.__is_initialized)
  return this.__is_initialized
}
apiProxy.prototype.GetValue = function (element_name) {
  var element_value = ''
  var element_value = this.__api.GetValue(element_name)
  this.__gk.log('Gatekeeper :: GetValue called :: element = ' + element_name + ' :: result = ' + element_value)
  if (element_name == 'cmi.launch_data') {
    this.__open_logged = true
    element_value = this.__gk.getLaunchData()
  }
  return element_value
}
apiProxy.prototype.SetValue = function (element_name, element_value) {
  this.__gk.log('Gatekeeper :: SetValue called :: element = ' + element_name + ' :: value = ' + element_value)
  return this.__api.SetValue(element_name, element_value)
}

apiProxy.prototype.GetLastError = function () {
  return this.__api.GetLastError()
}
apiProxy.prototype.GetErrorString = function (error_code) {
  return this.__api.GetErrorString(error_code)
}
apiProxy.prototype.GetDiagnostic = function (error_code) {
  return this.__api.GetDiagnostic(error_code)
}
apiProxy.prototype.Commit = function () {
  return this.__api.Commit('')
}
apiProxy.prototype.Terminate = function () {
  if (!this.__finished) this.__gk.logAccessEvent('close') // log the close event
  this.__finished = true
  return this.__api.Terminate('')
}

apiProxy.prototype._getOriginalAPI = function () {
  var api = null
  api = this.__findOrigAPI(window)
  if ((window.parent != null) && (window.parent != window)) {
    api = this.__findOrigAPI(window.parent)
  }
  if ((!api) && (window.top.opener != null)) {
    api = this.__findOrigAPI(window.top.opener)
  }
  return api
}

apiProxy.prototype.__findOrigAPI = function (win) {
  var find_tries = 0
  while (/* win.API_1484_11 == null && */ /* hard wired to the 1.2 API */
    (win.API == null || win.API instanceof apiProxy) &&
        win.parent != null &&
        win.parent != win) {
    find_tries++
    if (find_tries > 500) return null // oh come on, you'd give up too
    win = win.parent
  }

  /*
     Hard wired to find only the SCORM 1.2 API
     v4.2.5 of Greenlight LMS presents both 1.2 & 2004 APIs but
     SCORM 2004 RTE is broken */
  /*
     this.__api_version = (win.API_1484_11 == null ? "1.2" : "2004");
     return win.API_1484_11 || win.API;
     */

  this.__api_version = '1.2'
  return win.API
}

apiProxy.prototype.__onbeforeunload = function () {
}

function batcGateKeeper (debug) {
  this.WBT_LOGGER_API = '../../../../../../wbtlogger/wbtlProxy.asp'

  this._debug = debug
  this._debug_string = ''

  // wbtl data
  this._studentID 	= ''
  this._studentName 	= ''
  this._code			= ''
  this._courseConfig	= ''
  this._contentFile	= ''

  var d = new Date()
  this._date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
}
batcGateKeeper.prototype.setStudentId = function (id) {
  this._studentID = id
  this.log('Gatekeeper :: student_id = ' + this._studentID)
}
batcGateKeeper.prototype.setStudentName = function (student) {
  this._studentName = student
  this.log('Gatekeeper :: student_name = ' + this._studentName)
}
batcGateKeeper.prototype.setClientCode = function (code) {
  this._code = code

  // content identifier
  this._contentFile = this._getContentFile()
  this.log('Gatekeeper :: contentFile = ' + this._contentFile)

  // we have the code...
  var _this = this
  var request = window.XMLHttpRequest
    ? new XMLHttpRequest() /* not IE */
    : new ActiveXObject('Microsoft.XMLHTTP') /* IE */
    // request.onreadystatechange = function(){_this._launchDataResults( request )};
  request.open('POST', this.WBT_LOGGER_API, false)
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  this.log('Gatekeeper :: method=getLaunchDataForCode&code=' + this._code + '&courseware_id=' + this._contentFile.split(/[-.]+/)[0] + '&date=' + this._date)
  request.send('method=getLaunchDataForCode&code=' + this._code + '&courseware_id=' + this._contentFile.split(/[-.]+/)[0] + '&date=' + this._date)
  this._launchDataResults(request) // onreadystatechange doesn't get called in FF when using synchronous calls
}
batcGateKeeper.prototype._getContentFile = function () {
  var file = ''
  var url_array = window.location.href.split('/')
  file = url_array[url_array.length - 1]
  return file
}
batcGateKeeper.prototype.getLaunchData = function () {
  this.log('Gatekeeper :: getLaunchData = ' + this._courseConfig)
  // return the course_config
  return this._courseConfig
}
batcGateKeeper.prototype.logAccessEvent = function (event_type) {
  this.log('Gatekeeper :: accessEvent : ' + event_type)

  // wbtl the event
  var request = window.XMLHttpRequest
    ? new XMLHttpRequest() /* not IE */
    : new ActiveXObject('Microsoft.XMLHTTP') /* IE */
    // request.onreadystatechange = function(){_this._accessEventResults( request )};
  request.open('POST', this.WBT_LOGGER_API, false)
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  request.send('method=logAccessEvent' +
        '&student_id=' + this._studentID +
        '&student_name=' + this._studentName +
        '&filename=' + this._contentFile +
        '&code=' + this._code +
        '&course_config=' + this._courseConfig.split('\n').join('\\n') +
        '&event_type=' + event_type)
}
batcGateKeeper.prototype._launchDataResults = function (request) {
  if (request.readyState == 4) {
    this.log('Gatekeeper :: XMLHttpRequest status = ' + request.status)
    if (request.status == 200) {
      this.log('Gatekeeper :: course_config = ' + request.responseText)
      this._courseConfig = request.responseText
      this.logAccessEvent('open') // log an open event
    }
  }
}
batcGateKeeper.prototype.log = function (str) {
  this._debug_string += '<br>' + str

  if (this._debug) {
    try {
      var log_div = document.getElementById('gkLog')
      if (!log_div) {	// div doesn't exist... needs to be added to the dom
        var body = document.getElementsByTagName('body')[0]
        var div = document.createElement('div')
        div.setAttribute('id', 'gkLog')
        log_div = body.appendChild(div) // body.insertBefore(div, body.firstChild);
        log_div.innerHTML += '<strong>Gatekeeper Log Output:</strong>'
      }
      log_div.innerHTML = this._debug_string
    } catch (e) {}
  }
}

var __apiProxy = new apiProxy(new batcGateKeeper(false))
if (__apiProxy.__api_version == '1.2') var API = __apiProxy
if (__apiProxy.__api_version == '2004') var API_1484_11 = __apiProxy
