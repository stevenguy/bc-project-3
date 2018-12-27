import axios from "axios";

export default {
  // Gets all transactions
  getTransactions: function() {
    return axios.get("/api/transactions");
  },
  // Gets the transaction with the given id
  getTransaction: function(id) {
    return axios.get("/api/transactions/" + id);
  },
  // // Deletes the transaction with the given id
  deleteTransaction: function(id) {
    return axios.delete("/api/transactions/" + id);
  },
  // // Saves a transaction to the database
  saveTransaction: function(transactionData) {
    return axios.post("/api/transactions", transactionData);
  },
  // sums data from the database (monthly)
  aggrTransactions: function() {
    return axios.get("/api/transactions/aggr");
  },
  // sums data from the database (quarterly)
  quarterly: function() {
    return axios.get("/api/transactions/quarterly");
  },
  // sums data from the database (yearly)
  yearly: function() {
    return axios.get("/api/transactions/yearly");
  },
  // sums data from the database
  year: function() {
    return axios.get("/api/transactions/year");
  },
  // sums data from the database
  accounts: function() {
    return axios.get("/api/transactions/accounts");
  }
};
