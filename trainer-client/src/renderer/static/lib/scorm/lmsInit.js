var svgSupport = document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1')
var ua = navigator.userAgent
var ie8 = ua.indexOf('MSIE 8.0') != -1

if (!ie8) { // excludes IE CSS conditional in head
  // prevent initing on localhost:8888
  if (window.location.hostname != 'localhost') {
    function scormInit () {
      if ('Scorm'.toLowerCase() == 'scorm') {
        try {
          __onload()
          // forces a completed status upon entering the course.
          ___scorm.apiCall('setValue', 'cmi.core.lesson_status', 'completed')
          ___scorm.apiCall('commit')
        } catch (err) {
          alert('An error occured. Window will be closed.')

          window.setTimeout(function () {
            // get a handle on window and close it
            window.name = 'CGSS'
            var self = window.open('http://www.batraining.com/', '_self', 'CGSS')
            self.close()
          }, 500)
        }
      }
    }

    function scormUnload () {
      if ('Scorm'.toLowerCase() == 'scorm') {
        try {
          ___scorm.apiCall('terminate', '')
        } catch (err) {
          // alert(err);
        }
      }
    }

    window.onload = function () {
      if (!window.testEnv) { // prevent closing window in testEnv - see index.html for IP
        scormInit()
        window.setTimeout(
          function () {
            scormUnload()
          }, 2000)
      }
      // older IE versions have problems with jquery app version or does not like injection
      if (svgSupport && document.addEventListener) {
        var s = document.createElement('script')
        s.src = './web.js'
        document.getElementsByTagName('body')[0].appendChild(s)
      }
    }
  }
}
