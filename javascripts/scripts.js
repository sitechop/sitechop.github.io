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
  }
}

var ajaxChimp = {
  actionSwapper : function(form) {
    var url = form.getAttribute('action')
    url = url.replace("post?u=", "post-json?u=")
    url += '&c=callback'
    form.setAttribute('action', url)
  },

  sendingState : function(submit) {
    submit.value = 'Sending'
    submit.disabled = true;
  },

  reset : function(submit) {
    submit.value = 'Submit'
    submit.disabled = false;
  },

  submit : function(form) {
    var email = form.querySelectorAll('[type="email"]')[0],
      submit = form.querySelectorAll('[type="submit"]')[0],
      responseEl = form.querySelectorAll('.response')[0]
    

    this.sendingState(submit)

    url = form.getAttribute('action')
    url += '&EMAIL=' + encodeURIComponent(email.value)

    window.callback = function(data) {
      ajaxChimp.mailchimpResponse(data.msg, responseEl)
      general.get('body').removeChild(scriptEl);
      ajaxChimp.reset(submit)
    };

    var scriptEl = document.createElement('script');
    scriptEl.setAttribute('src', url);
    document.body.appendChild(scriptEl);
  },

  mailchimpResponse : function(data, responseEl) {
    var dataSplit = data.split(' - ') 
    if (dataSplit.length == 1) response = data
      else response = dataSplit[1]

    responseEl.innerHTML = response
  },

  init : function(form) {
    this.actionSwapper(form)

    form.addEventListener("submit", function(e) {
      e.preventDefault()
      ajaxChimp.submit(e.target)
    })
  }
}

var sitechop = {
  init : function() {
    var mailingLists = document.querySelectorAll('.mailing-list')
    
    for (var i=0; i<mailingLists.length;i++)
      ajaxChimp.init(mailingLists[i])
  }
}

sitechop.init()


  