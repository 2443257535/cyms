/* 購物車數量、金額 */
const state = {
	cartNumber: 0, //購物車數量
}

const mutations = {
	cartNumberChange(state,value){
		state.cartNumber = value;
		
	}
}

export default {
	state,
	mutations
}