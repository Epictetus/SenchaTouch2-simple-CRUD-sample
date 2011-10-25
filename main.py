from google.appengine.ext import webapp
from google.appengine.ext.webapp import util
from google.appengine.ext.webapp import template
from django.utils import simplejson

class TopPageHandler(webapp.RequestHandler):
  def get(self):
    self.response.out.write(template.render('index.html',{}))

class TodoListHandler(webapp.RequestHandler):
  def get(self):
    data = {'todo': [{'title': 'hoge'}, {'title': 'fuga'}, {'title': 'piyo'}]}
    self.response.headers['Content-Type'] = 'application/json'
    self.response.out.write(simplejson.dumps(data))

application = webapp.WSGIApplication([
    ('.todolist', TodoListHandler),
    ('.*', TopPageHandler)], debug=True)

def main():
  util.run_wsgi_app(application)

if __name__ == '__main__':
  main()
