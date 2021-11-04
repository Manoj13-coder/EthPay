const ETHBank = artifacts.require("ETHBank");
require("chai").use(require("chai-as-promised")).should()

contract('ETHBank',(accounts) =>{
	let eTHBank
	before(async()=>{
		eTHBank = await ETHBank.deployed()
	})

	describe('Deployment of Contract',async()=>{
		it('deploys successfully', async () => {
	      const address = await eTHBank.address
	      assert.notEqual(address, 0x0)
	      assert.notEqual(address, '')
	      assert.notEqual(address, null)
	      assert.notEqual(address, undefined)
	    })
	    it('has a count',async()=>{
	    	const count = await eTHBank.count()
	    	assert.equal(count.toNumber(),0,'count is correct')
	    })
	})
	describe('ethereum exchange',async()=>{
		let count,result,initial
		before(async()=>{
			initial = await eTHBank.transfer("22-03-2021",accounts[1],{from : accounts[0] , value: web3.utils.fromWei('1000000000000000000', 'ether')})
			count = await eTHBank.count()
			result = await eTHBank.generate("22-03-2021",accounts[1],web3.utils.fromWei('1000000000000000000', 'ether'),"Receipt Hash",{from : accounts[0]})
		})
		it('transfer amount',async()=>{
			const event = result.logs[0].args
			assert.equal(count.toNumber(),1,'count is correct')
			assert.equal(event._date,"22-03-2021","Date is correct")
			assert.equal(event._from,accounts[0],"Sender is authorized")
			assert.equal(event._to,accounts[1],"Reciever is authorized")
			assert.equal(event._ethers,1,"Amount is correct")
			assert.equal(event._receipt,"Receipt Hash","Receipt is verified");
		})
		it('History of transaction',async()=>{
			const event = result.logs[0].args
			assert.equal(count.toNumber(),1,'count is correct')
			assert.equal(event._date,"22-03-2021","Date is correct")
			assert.equal(event._from,accounts[0],"Sender is authorized")
			assert.equal(event._to,accounts[1],"Reciever is authorized")
			assert.equal(event._ethers,1,"Amount is correct")
			assert.equal(event._receipt,"Receipt Hash","Receipt is verified");
		})
		it('generates receipt',async()=>{
			const event = result.logs[0].args
			assert.equal(count.toNumber(),1,'count is correct')
			assert.equal(event._date,"22-03-2021","Date is correct")
			assert.equal(event._from,accounts[0],"Sender is authorized")
			assert.equal(event._to,accounts[1],"Reciever is authorized")
			assert.equal(event._ethers,1,"Amount is correct")
			assert.equal(event._receipt,"Receipt Hash","Receipt is verified");
		})
	})
})