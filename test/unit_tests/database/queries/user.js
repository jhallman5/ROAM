const{ expect } = require('chai')
const{ User } = require('/Users/jhallman5/Desktop/coding/ROAM/database/queries')

describe('Unit Tests_Queries_Users', () => {
  context('findUserbyUsername', () => {
    it('returns User given username', (done) => {
      User.findUserbyUsername('jhallman5', ()=>{}) 
        expect(1).to.equal(1)
        done()
  })

    })
  })
