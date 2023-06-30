//sample test
//Para rodar os testes, use: npm test
//PS: Os testes não estão completos e alguns podem comnter erros.

// veja mais infos em:
//https://mochajs.org/
//https://www.chaijs.com/
//https://www.chaijs.com/plugins/chai-json-schema/
//https://developer.mozilla.org/pt-PT/docs/Web/HTTP/Status (http codes)

const app = require('../src/index.js');
const { exec } = require('child_process');

const assert = require('assert');
const chai = require('chai')
const chaiHttp = require('chai-http');
const chaiJson = require('chai-json-schema');

chai.use(chaiHttp);
chai.use(chaiJson);

const expect = chai.expect;

//Define o minimo de campos que o usuário deve ter. Geralmente deve ser colocado em um arquivo separado
const userSchema = {
  title: "Schema do Usuario, define como é o usuario, linha 24 do teste",
  type: "object",
  required: ['name', 'email', 'age', 'userName', 'password'],
  properties: {
    name: {
      type: 'string'
    },
    userName: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    age: {
      type: 'number',
      minimum: 10
    }
  }
}

//Inicio dos testes

//este teste é simplesmente pra enteder a usar o mocha/chai
describe('Um simples conjunto de testes', function () {
  it('deveria retornar -1 quando o valor não esta presente', function () {
    assert.equal([1, 2, 3].indexOf(4), -1);
  });
});

//testes da aplicação
describe('Testes da aplicaçao', () => {
  after(function (done) {
    setTimeout(() => {
      exec('rm -r ./database.test.db', (error, stdout, stderr) => {
        done();
      });
    }, 200)
  });

  before(function (done) {
    setTimeout(() => {
      done();
    }, 200)
  });

  it('o servidor esta online', function (done) {
    chai.request(app)
      .get('/')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('deveria ser uma lista vazia de usuarios', function (done) {
    chai.request(app)
      .get('/users')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.rows).to.eql([]);
        done();
      });
  });

  it('deveria criar o usuario raupp', function (done) {
    chai.request(app)
      .post('/users')
      .send({ name: "raupp", email: "jose.raupp@devoz.com.br", userName: "raupp", password: "123", age: 18 })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
      });
  });

  //...adicionar pelo menos mais 5 usuarios. se adicionar usuario menor de idade, deve dar erro. Ps: não criar o usuario naoExiste

  it('deveria criar o usuario fernando', function (done) {
    chai.request(app)
      .post('/users')
      .send({ name: "fernando", email: "fernando@devoz.com.br", userName: "fernando", password: "1234", age: 55 })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
      });
  });

  it('deveria criar o usuario justino', function (done) {
    chai.request(app)
      .post('/users')
      .send({ name: "justino", email: "justino@devoz.com.br", userName: "justino", password: "1234", age: 55 })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
      });
  });

  it('deveria criar o usuario claudio', function (done) {
    chai.request(app)
      .post('/users')
      .send({ name: "claudio", email: "claudio@devoz.com.br", userName: "claudio", password: "1234", age: 55 })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
      });
  });

  it('deveria criar o usuario moaraes', function (done) {
    chai.request(app)
      .post('/users')
      .send({ name: "moaraes", email: "moaraes@devoz.com.br", userName: "moaraes", password: "1234", age: 55 })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
      });
  });

  it('nao deveria criar usuario com o mesmo username', function (done) {
    chai.request(app)
      .post('/users')
      .send({ name: "raupp", email: "jose.raupp@devoz.com.br", userName: "raupp", password: "123", age: 18 })
      .end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.validationErrors).to.equal('Username or email already exists.');

        done();
      });
  });

  it('nao deveria criar usuario com o mesmo email', function (done) {
    chai.request(app)
      .post('/users')
      .send({ name: "raupp", email: "jose.raupp@devoz.com.br", userName: "raupp", password: "123", age: 18 })
      .end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.validationErrors).to.equal('Username or email already exists.');

        done();
      });
  });

  it('nao deveria criar usuario menor de idade', function (done) {
    chai.request(app)
      .post('/users')
      .send({ name: "pedro", email: "pedro@devoz.com.br", userName: "pedro", password: "123", age: 10 })
      .end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.validationErrors[0]).to.equal('User cannot be less than 18 years old');

        done();
      });
  });

  it('nao deveria criar usuario com o email invalido', function (done) {
    chai.request(app)
      .post('/users')
      .send({ name: "denis", email: "jose.rauppdevoz.com.br", userName: "denis", password: "123", age: 21 })
      .end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.validationErrors[0]).to.equal('Email is invalid');

        done();
      });
  });

  it('nao deveria criar usuario sem username', function (done) {
    chai.request(app)
      .post('/users')
      .send({ name: "carvalho", email: "jose@evoz.com.br", password: "123", age: 21 })
      .end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.validationErrors[0]).to.equal('Username is required');

        done();
      });
  });

  it('nao deveria criar usuario sem password', function (done) {
    chai.request(app)
      .post('/users')
      .send({ name: "carvalhosouza", email: "jose@ez.com.br", userName: "carvalhosouza", age: 21 })
      .end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.validationErrors[0]).to.equal('Password is required');

        done();
      });
  });

  it('nao deveria criar usuario sem idade', function (done) {
    chai.request(app)
      .post('/users')
      .send({ name: "carvalhosouza", email: "jose@ez.com.br", userName: "carvalhosouza", password: 'root' })
      .end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.validationErrors[0]).to.equal('Age is required');

        done();
      });
  });



  it('o usuario naoExiste não existe no sistema', function (done) {
    chai.request(app)
      .get('/users/naoExiste')
      .end(function (err, res) {
        expect(res.body.validationErrors).to.be.equal('User not found'); //possivelmente forma errada de verificar a mensagem de erro
        expect(res).to.have.status(404);
        done();
      });
  });

  it('o usuario raupp existe e é valido', function (done) {
    chai.request(app)
      .get('/users/raupp')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(userSchema);
        done();
      });
  });

  // it('deveria excluir o usuario raupp', function (done) {
  //     chai.request(app)
  //     .delete('/user/raupp')
  //     .end(function (err, res) {
  //         expect(err).to.be.null;
  //         expect(res).to.have.status(200);
  //         expect(res.body).to.be.jsonSchema(userSchema);
  //         done();
  //     });
  // });

  // it('o usuario raupp não deve existir mais no sistema', function (done) {
  //     chai.request(app)
  //     .get('/user/raupp')
  //     .end(function (err, res) {
  //         expect(err).to.be.null;
  //         expect(res).to.have.status(200);
  //         expect(res.body).to.be.jsonSchema(userSchema);
  //         done();
  //     });
  // });

  it('deveria ser uma lista com pelo menos 5 usuarios', function (done) {
    chai.request(app)
      .get('/users')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.rows.length).to.be.at.least(5);
        done();
      });
  });
})