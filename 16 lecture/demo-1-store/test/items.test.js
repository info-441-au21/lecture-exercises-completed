import chai from 'chai';
let assert = chai.assert;
import request from 'supertest';

//I want to test app.js, so I import it
import app from '../app.js'

describe('Items integration test', function(){
    it("should get items from the db for GET items", async function(){
        const res = await request(app).get('/items');

        assert.equal(res.statusCode, 200);
        assert.equal(res.type, "application/json");

        //check body
        assert.isArray(res.body)
        assert.include(res.body[0], {
            name: "Orange",
            price: 1.5
        })
    })

    
})