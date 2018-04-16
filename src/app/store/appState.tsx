import { observable, computed, action } from 'mobx';

class AppState {
    constructor({ count, amount } = { count: 0, amount: 1 }) {
        this.count = count;
        this.amount = amount;
    }
    @observable count: number;
    @observable amount: number;

    // @computed get total() {
    //     return this.count * this.amount;
    // }

    @computed get msg() {
        return `${this.count} 数字为:${this.amount}`;
        // return this.count * this.amount;
    }

    @action add() {
        this.count += 1;
        console.log(this.count);
    }
    toJson() {
        return {
            count: this.count,
            amount: this.amount,
        };
    }
}

// const appState = new AppState();

// autorun(() => {
// console.log(appState.msg);
// });

// setInterval(() => {
//     appState.add();
//     console.log(appState.total, appState.msg);
// }, 1000);

export default AppState;