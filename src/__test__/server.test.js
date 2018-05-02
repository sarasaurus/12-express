'use strict';

// Can rename this file to tree-route.test because we are actually testing our endpoints, not so much our server

import faker from 'faker';
import superagent from 'superagent';
import Tree from '../model/tree';
import { startServer, stopServer } from '../lib/server';

const apiURL = `http://localhost:${process.env.PORT}/api/trees`;

const createTreeMock = () => {
  return new Tree({
    type: faker.lorem.words(10),
    genus: faker.lorem.words(25),
    height: faker.finance.amount(1, 10),
  }).save(); // a method for the mongoDB, this is what saves the mock as a new entry
};
// beforeAll(() => {
//   const pCreateManyMockTrees = (5) => {

//     return Promise.all(new Array(5)
//       .fill(0)
//       .map(() => createNoteMock()));
//   };
// });
  // ));
describe('/api/trees', () => {
  beforeAll(startServer); 
  afterAll(stopServer);
  afterEach(() => Tree.remove({}));// empty object tells mongoose/mongo? to remove everything!
  test('POST - It should respond with a 200 status ', () => {
    const treeToPost = {
      type: faker.lorem.words(10),
      genus: faker.lorem.words(50),
      height: faker.finance.amount(1, 10),
    };
    return superagent.post(apiURL)
      .send(treeToPost)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.type).toEqual(treeToPost.type);
        expect(response.body.genus).toEqual(treeToPost.genus);
        expect(response.body.height).toEqual(treeToPost.height);
        expect(response.body._id).toBeTruthy();// ._id means mongoDB succesfully posted my object, and generated a unique ._id for it
      });
  });
  /* NOTES FROM CLASS DEVELOPING A NEW TEST
  test('409 due to duplicate title', ()=>{
    return createTreeMock()
    .then((tree) =>{
      const mockTree = {
// here you are trying to repost the same thing-- basically because these keys are defined in our schema to be unique

      };
      return superagent.post(apiURL)
      .send(mockTree);
    })
    .then(Promise.reject)// we are putting this here because we WANT an error and want to do our logic in the catch block -- so if for whatver reason we get a successful return, we want to reject it and pass it to our catch block-- just saving our selves some time
    .catch((err) => {
      console.log()
      expect(err.status).toEqual(409)

    })
  });

  test ('400 due to lack of title'), () => {
  return superagent.post(apiURL)
  .send({})
  .then 
  .catch((err) =>{
    SIDE NOTE: even in this block you could do something to it
    return it... and could then can now do a .then iff you wanted
  }).then <--- so could chain a .then after it /// but should try to avoid this unless (like in my hacky solution...) you have a good reason, because its  pretty confusing
  }
  test ('400 due to bad JSON', () =>{
    return superagent.post(apiURL)
    .send('{')
  })

  */
  test('POST - It should respond with a 400 status ', () => {
    const treeToPost = {
      genus: faker.lorem.words(50),
    };
    return superagent.post(apiURL)
      .send(treeToPost)
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });
  describe('GET /api/trees', () => {
    test('should respond with 200 if there are no errors', () => {
      let treeToTest = null;
      return createTreeMock()
        .then((tree) => {
          treeToTest = tree;
          return superagent.get(`${apiURL}/${tree._id}`);
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.type).toEqual(treeToTest.type);
          expect(response.body.genus).toEqual(treeToTest.genus);
        });
    });
    test('should respond with 404 if there is no tree to be found', () => {
      return superagent.get(`${apiURL}/NOTVALID`)
        .then(Promise.reject)
        .catch((response) => {
          expect(response.status).toEqual(404);
        });
    });
  });


  describe('PUT /api/trees', () => {
    test('should update a tree and respond with 200 if there are no errors', () => {
      let treeToTest = null;
      return createTreeMock()
        .then((tree) => {
          treeToTest = tree;
          return superagent.put(`${apiURL}/${tree._id}`)
            .send({ genus: 'wow cool test bro' });
          // you could also .then from super agent, becuase it returns a promise, no need jests system?
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.type).toEqual(treeToTest.type);
          expect(response.body.genus).toEqual('wow cool test bro');
          // expect(response.body._id).toEqual(treeToTest.body._id.toString())
        });
    });
    test('should respond with 404 if there is no tree to be found', () => {
      return superagent.get(`${apiURL}/NOTVALID`)
        .then(Promise.reject)
        .catch((response) => {
          expect(response.status).toEqual(404);
        });
    });
  });
  describe('GET ALL /api/trees', () => {
    test('should respond with 200 if there are no errors', () => {
      let treeToTest = null; 
      return createTreeMock() 
        .then((tree) => {
          treeToTest = tree;
          return superagent.get(`${apiURL}`);
        })
        .then((response) => {
          console.log('GET ALL RESPONSE: ', response);
          expect(response.status).toEqual(200);
          expect(response.body.length).toBeTruthy();
        });
    });
  });

  describe('DELETE /api/trees', () => {
    test('should respond with 204 if there are no errors', () => {
      let treeToTest = null; 
      return createTreeMock() 
        .then((tree) => {
          treeToTest = tree;
          return superagent.delete(`${apiURL}/${tree._id}`)
            .then((response) => {
              expect(response.status).toEqual(204);
            });
        });
    });
    test('should respond with 404 if there is no tree to be found', () => {
      return superagent.get(`${apiURL}/NOTVALID`)
        .then(Promise.reject) 
        .catch((response) => {
          expect(response.status).toEqual(404);
        });
    });
    // test('should respond with 404 if there is no id in the query', () => {
    //   return superagent.get(`${apiURL}/`)
    //     .then((response) => {
    //       expect(response.status).toEqual(404);
    //     });
    // }); // Sarah - test is not working, not sure why
  });
});
