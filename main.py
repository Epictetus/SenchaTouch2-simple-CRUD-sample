# coding=UTF-8

import sys
import logging

from google.appengine.ext import webapp
from google.appengine.ext.webapp import util
from google.appengine.ext.webapp import template
from google.appengine.ext import db

from django.utils import simplejson

class Todo(db.Model):
  title = db.StringProperty()
  detail = db.TextProperty()

class TopPageHandler(webapp.RequestHandler):
  def get(self):
    self.response.out.write(template.render('index.html',{}))

class TodoListHandler(webapp.RequestHandler):
  def get(self):
    list = []
    query = Todo.all()
    results = query.fetch(50)

    for result in results:
      obj = {'id': result.key().id(),
             'title': result.title,
             'detail': result.detail}
      list.append(obj)
    data = {'todo': list}

    self.response.headers['Content-Type'] = 'application/json'
    self.response.out.write(simplejson.dumps(data))

class TodoHandler(webapp.RequestHandler):
  def post(self):
    data = {"result": False}
    try:
      id = self.request.get('id')
      if id:
        todo = Todo.get_by_id(int(id))
        if self.request.get('is_delete'):
          # Delete entity.
          todo.delete()
        else:
          # Update entity.
          todo.title = self.request.get('title')
          todo.detail = self.request.get('detail')
          todo.put()
      else:
        # Create entity.
        todo = Todo(title=self.request.get('title'),
                    detail=self.request.get('detail'))
        todo.put()

      data = {"result": True}

    except:
      logging.error(sys.exc_info())

    finally:
      self.response.headers['Content-Type'] = 'application/json'
      self.response.out.write(simplejson.dumps(data))

class TestPageHandler(webapp.RequestHandler):
  def get(self):
    self.response.out.write(template.render('test.html',{}))

application = webapp.WSGIApplication([
    ('.todolist', TodoListHandler),
    ('.todo', TodoHandler),
    ('.test', TestPageHandler),
    ('.*', TopPageHandler)], debug=True)

def main():
  util.run_wsgi_app(application)

if __name__ == '__main__':
  main()

