import assert from 'assert';
import request from 'request';
import { expect } from 'chai';


describe('Главная страница', () => {
    it('Работает', () => {
        request('http://localhost:8090', (error, response, body) => {
            expect(response.statusCode).to.equal(200);
        }); 
    })
});
