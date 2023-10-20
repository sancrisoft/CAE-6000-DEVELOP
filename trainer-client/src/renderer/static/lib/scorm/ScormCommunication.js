
var ___scorm

/* ScormCommunication class handles SCORM to SCO communcation
 * SCORM 1.2 and 2004
 *
 * 2009/09/30
 * Updated so that the API version check no longer rely on the cmi._version. Now checks
 * the object's name (ie, "API_1484_11" or "API") instead.
 *
 */
function ScormCommunication (debug) {
  // initalize
  this.api = null
  this.api_version = ''
  this.debug = debug

  this.__find_tries = 0

  // API handle
  this.api = this.getAPI()
  if (this.debug) this.log('API found :: ' + String(this.api != null))

  // API version (SCORM version)
  if (this.api != null) {
    if (this.debug) this.log('API version :: ' + String(this.api_version))
    if (this.debug) this.log('API reported version :: ' + String(this.apiCall('getValue', 'cmi._version')))
  }
}

ScormCommunication.prototype.getAPIVersion = function () {
  if (this.debug) this.log('getAPIVersion() called :: ' + this.api_version)
  return this.api_version
}

/**
 * function_call: String - Name of the api function to call
 * dme_name:	String - Name of the data model element
 * dme_value:String - The value to set the element
 **/
ScormCommunication.prototype.apiCall = function (function_call, dme_name, dme_value) {
  var result = 'false'
  if (this.api != null) {
    switch (function_call) {
      case 'initialize':
        result = (
          this.api_version == '2004'
            ? this.api.Initialize('')
            : this.api.LMSInitialize('')
        )
        break
      case 'terminate':
        result = (
          this.api_version == '2004'
            ? this.api.Terminate('')
            : this.api.LMSFinish('')
        )
        break
      case 'getValue':
        result = (
          this.api_version == '2004'
            ? this.api.GetValue(dme_name)
            : this.api.LMSGetValue(dme_name)
        )
        break
      case 'setValue':
        result = (
          this.api_version == '2004'
            ? this.api.SetValue(dme_name, dme_value)
            : this.api.LMSSetValue(dme_name, dme_value)
        )
        break
      case 'commit':
        result = (
          this.api_version == '2004'
            ? this.api.Commit('')
            : this.api.LMSCommit('')
        )
        break
      case 'getLastError':
        result = (
          this.api_version == '2004'
            ? this.api.GetLastError()
            : this.api.LMSGetLastError()
        )
        break
      case 'getErrorString':
        result = (
          this.api_version == '2004'
            ? this.api.GetErrorString(dme_value)
            : this.api.LMSGetErrorString(dme_value)
        )
        break
      case 'getDiagnostic':
        result = (
          this.api_version == '2004'
            ? this.api.GetDiagnostic(dme_value)
            : this.api.LMSGetDiagnostic(dme_value)
        )
        break
    }
  }

  if (this.debug) {
    this.log('API call ::' +
        ' function = ' + function_call +
        ' element = ' + dme_name +
        ' value = ' + dme_value +
        ' result = ' + result)
  }

  return result
}

/**
 * For use with Flash Player and ExternalInterface... proxys the apiCall method and returns the results to the
 * swf across the ExternalInterface...
 */
ScormCommunication.prototype.apiCallWithReturn = function (/* functionCall, [dmeName, dmeValue], callback */) {
  var args_array = []
  for (var i = 0; i < arguments.length; i++) { args_array.push(arguments[i]) }; // arguments object to array
  var callback = args_array.pop()
  var function_call = args_array.shift()
  var dme_name = args_array.shift() || null
  var dme_value = args_array.shift() || null
  result = this.apiCall(function_call, dme_name, dme_value) // execute api call

  // try to get a reference to the active content (swf, aam, dir...)
  var plugins = document.getElementsByTagName('object') // ActiveX
  if (!plugins.length) plugins = document.getElementsByTagName('embed') // Plugin
  var content = plugins[plugins.length - 1]
  if (this.debug) this.log("API Callback  on (object/embed id) :: '" + content.id + "'")
  content[callback](function_call, dme_name, result) // return results to swf
}

/** locates and returns a reference to the SCORM API **/
ScormCommunication.prototype.getAPI = function () {
  var api = this.__findAPI(window)
  if (api == null &&
        window.opener != null &&
        typeof (window.opener) !== 'undefined') {
    api = __findAPI(window.opener)
  }
  return api
}

ScormCommunication.prototype.__findAPI = function (win) {
  while (win.API_1484_11 == null &&
        win.API == null &&
        win.parent != null &&
        win.parent != win) {
    this.__find_tries++

    if (this.__find_tries > 500) return null // oh come on, you'd give up too

    win = win.parent
  }

  // we'll be explict about the API version
  this.api_version = (win.API_1484_11 == null ? '1.2' : '2004')
  return win.API_1484_11 || win.API
}

/** log dumps a string into the html page (for debugging) **/
ScormCommunication.prototype.log = function (log_string) {
  var log_div = document.getElementById('wbtLogger')
  if (!log_div) {	// div doesn't exist... needs to be added to the dom
    var body = document.getElementsByTagName('body')[0]
    var div = document.createElement('div')
    div.setAttribute('id', 'wbtLogger')
    log_div = /* body.insertBefore(div, body.firstChild); */ body.appendChild(div) //
    log_div.innerHTML += '<strong>Scorm Log Output:</strong>'
  }
  log_div.innerHTML += '<br>' + log_string
}

/**  exit closes the sco (does *not* terminate SCORM communication) **/
ScormCommunication.prototype.exit = function () {
  window.location = '../../../../close.htm'
}

function __onload () {
  ___scorm = new ScormCommunication(false)
}
