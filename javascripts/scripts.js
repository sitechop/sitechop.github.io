var general = {
  get : function(query) {
    var results = document.querySelectorAll(query);
    if (results.length === 1) return results[0]
      else return results
  },
  loadCss : function(href) {
    var el = document.createElement('link')
    el.setAttribute('rel', 'stylesheet')
    el.setAttribute('type', 'text/css')
    el.setAttribute('href', href)
    this.get('head').appendChild(el)
  },
  init : function() {
    this.loadCss('https://cloud.typography.com/7205494/6536952/css/fonts.css')
  }
}

var ajaxChimp = {
  get : function(query) {
    var results = document.querySelectorAll(query);
    if (results.length === 1) return results[0]
      else return results
  },

  actionSwapper : function(form) {
    var url = form.getAttribute('action')
    url = url.replace("post?u=", "post-json?u=")
    url += '&c=callback'
    this.get('#mailing-list').setAttribute('action', url)
  },

  submit : function(form) {
    var email = this.get('#mailing-list-email').value
    var submit = this.get('#mailing-list-submit')
    
    submit.value = 'Sending'

    url = form.getAttribute('action')
    data = '&EMAIL=' + encodeURIComponent(email)
    
    window.callback = function(data) {
      ajaxChimp.mailchimpResponse(data.msg)
      ajaxChimp.get('body').removeChild(scriptEl);
      submit.value = 'Submit'
    };

    var scriptEl = document.createElement('script');
    scriptEl.setAttribute('src', url + data);
    document.body.appendChild(scriptEl);
  },

  mailchimpResponse : function(data) {
    var responseEl = this.get('#mailing-list-response')
    var dataSplit = data.split(' - ') 

    if (dataSplit.length == 1) response = data
      else response = dataSplit[1]

    responseEl.innerHTML = response
  },

  init : function() {
    mailchimpForm = this.get('#mailing-list') 
    this.actionSwapper(mailchimpForm)
    mailchimpForm.addEventListener("submit", function(e) {
      e.preventDefault()
      ajaxChimp.submit(e.target)
    })
  }
}

general.init()
ajaxChimp.init()