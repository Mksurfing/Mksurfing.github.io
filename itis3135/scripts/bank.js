"use strict";

/* ---------------------------
   KINGFISHER FISHING BANK 🐟
----------------------------*/

class BankAccount {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  deposit(amount) {
    if (amount <= 0) {
      return "Invalid fishing credit amount.";
    }

    this.transactions.push({ type: "deposit", amount: amount });
    this.balance += amount;

    return "Deposited " + amount + ". Balance: " + this.balance;
  }

  withdraw(amount) {
    if (amount <= 0 || amount > this.balance) {
      return "Insufficient balance or invalid amount.";
    }

    this.transactions.push({ type: "withdraw", amount: amount });
    this.balance -= amount;

    return "Withdrew " + amount + ". Balance: " + this.balance;
  }

  checkBalance() {
    return "Balance: " + this.balance;
  }

  listAllDeposits() {
    var deposits = this.transactions
      .filter(function (t) {
        return t.type === "deposit";
      })
      .map(function (t) {
        return t.amount;
      });

    return "Deposits: " + deposits.join(",");
  }

  listAllWithdrawals() {
    var withdrawals = this.transactions
      .filter(function (t) {
        return t.type === "withdraw";
      })
      .map(function (t) {
        return t.amount;
      });

    return "Withdrawals: " + withdrawals.join(",");
  }
}

/* ---------------------------
   INSTANCE
----------------------------*/
var myAccount = new BankAccount();

/* ---------------------------
   ELEMENTS
----------------------------*/
var output = document.getElementById("output");

/* ---------------------------
   EVENTS
----------------------------*/
document.getElementById("deposit-btn").onclick = function () {
  var amt = Number(document.getElementById("amount").value);
  output.textContent = myAccount.deposit(amt);
};

document.getElementById("withdraw-btn").onclick = function () {
  var amt = Number(document.getElementById("amount").value);
  output.textContent = myAccount.withdraw(amt);
};

document.getElementById("balance-btn").onclick = function () {
  output.textContent = myAccount.checkBalance();
};

document.getElementById("deposits-btn").onclick = function () {
  output.textContent = myAccount.listAllDeposits();
};

document.getElementById("withdrawals-btn").onclick = function () {
  output.textContent = myAccount.listAllWithdrawals();
};

/* ---------------------------
   REQUIRED TEST DATA
----------------------------*/
myAccount.deposit(200);
myAccount.deposit(150);
myAccount.withdraw(50);
myAccount.withdraw(30);
myAccount.deposit(100);