const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');
const { todos, poulateTodos, users, populateUsers } = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(poulateTodos);

describe('POST / todos', () => {

    it('should create a new todo', (done) => {
        var text = 'Test todo test';
        request(app)
            .post('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((error, res) => {
                if(error) {
                    return done(error);
                }
                Todo
                    .find({text})
                    .then((todos) => {
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(text);
                        done();
                    })
                    .catch((error) => done(error))
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .send({})
            .expect(400)
            .end((error, res) => {
                if(error) {
                    return done(error);
                }
                Todo
                    .find()
                    .then((todos) => {
                        expect(todos.length).toBe(2);
                        done();
                    })
                    .catch((error) => done(error))
            });
    });

});

describe('GET / todos', () => { 

  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
          expect(res.body.todos.length).toBe(1);
      })
      .end(done);
  });

});

describe('GET / todos:id', () => {

    it('should get one todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should not get a todo doc created by another user', (done) => {
      request(app)
          .get(`/todos/${todos[1]._id.toHexString()}`)
          .set('x-auth', users[0].tokens[0].token)
          .expect(404)
          .end(done);
    });

    it('should return a 404 if todo not found', (done) => {

        var id = new ObjectID();
        request(app)
            .get(`/todos/${id.toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it('should return a 404 for non object ids', (done) => {

        var id = '123abc';
        request(app)
            .get(`/todos/${id}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    }); 

});

describe('DELETE / todos:id', () => {

    it('should delete one todo doc', (done) => {

        var hexId = todos[1]._id.toHexString()
        request(app)
          .delete(`/todos/${hexId}`)
          .set('x-auth', users[1].tokens[0].token)
          .expect(200)
          .expect((res) => {
              expect(res.body.todo._id).toBe(hexId);
          })
          .end((error, res) => {
              if(error) {
                  return done(error);
              }
              Todo.findById(hexId)
                .then((todo) => {
                    expect(todo).toNotExist();
                    done();
                })
                .catch((e) => done(e))
          });
    });

    it('should not delete one todo doc if user', (done) => {

      var hexId = todos[1]._id.toHexString()
      request(app)
        .delete(`/todos/${hexId}`)
        .set('x-auth', users[0].tokens[0].token)
        .expect(404)
        .end((error, res) => {
            if(error) {
                return done(error);
            }
            Todo.findById(hexId)
              .then((todo) => {
                  expect(todo).toExist();
                  done();
              })
              .catch((e) => done(e))
        });
  });

    it('should return a 404 if todo not found', (done) => {

        var id = new ObjectID();
        request(app)
            .delete(`/todos/${id.toHexString()}`)
            .set('x-auth', users[1].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it('should return a 404 for non object ids', (done) => {

        var id = '123abc';
        request(app)
            .delete(`/todos/${id}`)
            .set('x-auth', users[1].tokens[0].token)
            .expect(404)
            .end(done);
    }); 

});

describe('PATCH / todos:id', () => {

    it('should update one todo', (done) => {

        var hexId = todos[0]._id.toHexString();
        var text = 'updated text';
        request(app)
            .patch(`/todos/${hexId}`)
            .set('x-auth', users[0].tokens[0].token)
            .send({
                text,
                completed: true
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBeTruthy();
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end((error, res) => {
                if(error) {
                    return done(error);
                }
                Todo
                    .find({text})
                    .then((todos) => {
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(text);
                        done();
                    })
                    .catch((error) => done(error))
            });
    });

    it('should not update one todo if not the correct user', (done) => {

      var hexId = todos[0]._id.toHexString();
      var text = 'updated text';
      request(app)
        .patch(`/todos/${hexId}`)
        .set('x-auth', users[1].tokens[0].token)
        .send({
          text,
          completed: true
        })
        .expect(404)
        .end(done);
    });

    it('should clear completedAt when todo is not completed', (done) => {

        var hexId = todos[1]._id.toHexString();
        var text = 'updated text';
        request(app)
            .patch(`/todos/${hexId}`)
            .set('x-auth', users[1].tokens[0].token)
            .send({
                text,
                completed: false
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBeFalsy();
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done);
    });

});

describe('GET / users/me', () => {

    it('should return user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });

    it('should return 401 if not authenticated', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
            })
            .end(done);
    });

});

describe('POST /users', () => {

    it('should create a user', (done) => {

        var email = 'rufus@example.com';
        var password = 'userThreePassword';

        request(app)
            .post('/users')
            .send({ email, password })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
                expect(res.body._id).toExist();
                expect(res.body.email).toBe(email);
            })
            .end((error) => {
                if(error) {
                    return done(error);
                }
                User.findOne({email}).then((user) => {
                    expect(user).toExist();
                    expect(user.password).toNotBe(password);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return validation errors is request invalid', (done) => {
        request(app)
            .post('/users')
            .send({
                email: '123',
                password: '456'
             })
            .expect(400)
            .end(done);
    });

    it('should not create user if email in use', (done) => {
        
        var password = 'userThreePassword';
        request(app)
            .post('/users')
            .send({ email: users[0].email, password })
            .expect(400)
            .end(done);

    });

});

describe('POST /users/login', () => {

    it('should login user and return auth user', (done) => {

        request(app)
            .post('/users/login')
            .send({ 
                email: users[1].email, 
                password: users[1].password 
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
            })
            .end((error, res) => {
                if(error) {
                    return done(error);
                }
                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens[1]).toInclude({
                        access: 'auth',
                        token: res.headers['x-auth']
                    })
                    done();
                }).catch((e) => done(e));
            });

    });

    it('should reject invalid login', (done) => {

        request(app)
        .post('/users/login')
        .send({ 
            email: users[1].email, 
            password: 'abc' 
        })
        .expect(400)
        .expect((res) => {
            expect(res.headers['x-auth']).toNotExist();
        })
        .end((error, res) => {
            if(error) {
                return done(error);
            }
            User.findById(users[1]._id).then((user) => {
                expect(user.tokens.length).toBe(1);
                done();
            }).catch((e) => done(e));
        });

    });

});

describe('DELETE /users/me/token', () => {

  it('should auth token on log out', (done)=> {

    request(app)
      .delete('/users/me/token')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .end((error) => {
        if(error) {
            return done(error);
        }
        User.findOne({email: users[0].email}).then((user) => {
            expect(user.tokens.length).toBe(0);
            done();
        }).catch((e) => done(e));
    });

  });

});
