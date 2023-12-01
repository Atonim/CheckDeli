export const people = {
  state: () => ({
    people: JSON.parse(localStorage.getItem('people'))
  }),
  getters: {
    getPeople(state) {
      return state.people;
    }
  },
  mutations: {
    setPeople(state, people) {
      state.people = people;
      localStorage.setItem("people", JSON.stringify(people));
    },
    addNewDebt(state, payload) {
      this.currentCustomer = payload.currentCustomer;
      this.currentBillPayer = payload.currentBillPayer;
      this.debtPrice = payload.debtPrice;

      const existedDebt = this.currentCustomer.debts?.find(debt => debt.personId === this.currentBillPayer.id);
      if (existedDebt) {
        console.log('-------dsdsf')
        existedDebt.price = parseFloat((Number(existedDebt.price) + Number(this.debtPrice)).toFixed(2));
        console.log(existedDebt.price)
      } else {
        const newDebt = {
          debtId: Date.now(),
          name: this.currentBillPayer.name,
          personId: this.currentBillPayer.id,
          price: this.debtPrice
        }
        this.currentCustomer.debts.push(newDebt);
      }
    },
    removeAllDebts(state) {
      console.log(state.people)
      state.people = JSON.parse(localStorage.getItem('people'));
      console.log(state.people)
    }
  },
  actions: {
    setDebts({ commit, state }, bill) {
      this.bill = bill;

      for (let i = 0; i < this.bill.length; i++) {
        for (let j = 0; j < state.people.length; j++) {

          const currentBill = this.bill[i];
          const currentBillPayerId = this.bill[i].payer;
          const currentBillPayer = state.people.find(person => person.id === currentBillPayerId);
          const currentCustomer = state.people[j];
          const currentCustomerId = state.people[j].id;

          const mutualPayerDebt = currentBillPayer.debts.find(debt => debt.personId === currentCustomerId);

          console.log('рофл');
          console.log(currentBillPayerId, currentCustomerId, currentBill.customers, currentCustomer);
          //console.log(currentBill.customers.includes(currentCustomer));

          if (currentBillPayerId === currentCustomerId) continue;
          if (!currentBill.customers.includes(currentCustomerId) && !currentBill.customers.some(customer => customer.id === currentCustomerId)) continue

          console.log(currentBill.price);
          let debtPrice = parseFloat((currentBill.price / currentBill.customers.length).toFixed(2));
          console.log(debtPrice);

          console.log('ало');
          if (mutualPayerDebt) {
            console.log('-----------');
            console.log(mutualPayerDebt, currentBillPayer, debtPrice);
            console.log('-----------');
            console.log(debtPrice, mutualPayerDebt.price, debtPrice > mutualPayerDebt.price)
            if (debtPrice > mutualPayerDebt.price) {
              //убираем долг у платителя
              currentBillPayer.debts = currentBillPayer.debts.filter(debt => debt.debtId !== mutualPayerDebt.debtId);
              console.log(debtPrice)
              console.log(mutualPayerDebt.price)
              debtPrice = parseFloat((debtPrice - mutualPayerDebt.price).toFixed(2));
              console.log(debtPrice)
              commit('addNewDebt', {
                currentCustomer,
                currentBillPayer,
                debtPrice
              });

            } else if (debtPrice === mutualPayerDebt.price) {
              currentBillPayer.debts = currentBillPayer.debts.filter(debt => debt.debtId !== mutualPayerDebt.debtId);
            } else {
              mutualPayerDebt.price = parseFloat((mutualPayerDebt.price - debtPrice).toFixed(2));
              console.log(mutualPayerDebt.price)
            }
          }
          else {
            commit('addNewDebt', {
              currentCustomer,
              currentBillPayer,
              debtPrice
            });

          }

        }
      }
    }
  },
  namespaced: true
  //watch: {
  //  people: {
  //    handler(newState) {
  //      localStorage.setItem("people", JSON.stringify(state.people));
  //    },
  //    deep: true
  //  }
  //}
}
