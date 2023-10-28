export const people = {
  state: () => ({
    people: []
  }),
  getters: {
    allPeople(state) {
      return state.people;
    }
  },
  mutations: {
    setPeople(state, people) {
      state.people = people;
    },
    setDebts(state, bill) {
      this.bill = bill;

      const addNewDebt = (currentPerson, currentBillPayer, debtPrice) => {
        const existedDebt = currentPerson.debts.find(debt => debt.personId === currentBillPayer.id);
        if (existedDebt) {
          existedDebt.price += debtPrice;
        } else {
          const newDebt = {
            debtId: Date.now(),
            name: currentBillPayer.name,
            personId: currentBillPayer.id,
            price: debtPrice
          }
          currentPerson.debts.push(newDebt);
        }
      }

      for (let i = 0; i < this.bill.length; i++) {
        for (let j = 0; j < state.people.length; j++) {

          const currentBill = this.bill[i];
          const currentBillPayerId = this.bill[i].payer;
          const currentBillPayer = state.people.find(person => person.id === currentBillPayerId);
          const currentPerson = state.people[j];
          const currentPersonId = state.people[j].id;

          if ((currentBillPayerId !== currentPersonId) && (currentBill.customers.includes(currentPerson))) {

            let debtPrice = (currentBill.price / currentBill.customers.length).toFixed(2);
            const mutualDebt = currentBillPayer.debts.find(debt => debt.personId === currentPersonId);

            if (mutualDebt) {

              if (debtPrice > mutualDebt.price) {

                currentBillPayer.debts = currentBillPayer.debts.filter(debt => debt.debtId !== mutualDebt.debtId);
                debtPrice -= mutualDebt.price;

                addNewDebt(currentPerson, currentBillPayer, debtPrice);

              } else if (debtPrice === mutualDebt.price) {
                person.debts = person.debts.filter(debt => debt.debtId !== mutualDebt.debtId);
              } else {
                mutualDebt.price -= debtPrice;
              }
            }
            else {
              addNewDebt(currentPerson, currentBillPayer, debtPrice);
            }
          }
        }
      }
    },
  },
  actions: {

  },
  namespaced: true
}