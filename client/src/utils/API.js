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
  buntest: function (data) {
    return axios.post("/api/buntest",{header: data})
  },
  // Saves a transaction to the database
  saveTransaction: function(transactionData) {
    return axios.post("/api/transactions", transactionData);
  },
  // Save new account
  newAccount: function(data) {
    return axios.post("/api/accounts", data);
  },
  // Get list of available accounts
  getAccount: function() {
    return axios.get("/api/accounts")
  },
  // sums data from the database (quarterly)
  quarterly: function() {
    return axios.get("/api/transactions/quarterly");
  },
  // sums data from the database (yearly)
  yearly: function() {
    return axios.get("/api/transactions/yearly");
  },
  // Pulls all the years from the database
  year: function() {
    return axios.get("/api/transactions/year");
  },
  // Pulls all the accounts from the database
  accounts: function() {
    return axios.get("/api/transactions/accounts");
  },
  // sums data from the database (month)
  reports: function() {
    return axios.get("/api/transactions/reports");
  },
  // Pulls data by type and year
  typeyear: function() {
    return axios.get("/api/transactions/typeyear");
  },
  // Pulls data by type and quarter
  typequarter: function() {
    return axios.get("/api/transactions/typequarter");
  },
  // Pulls data by type and month
  typemonth: function() {
    return axios.get("/api/transactions/typemonth");
  },
  // sums data by account details and year
  acctyear: function() {
    return axios.get("/api/transactions/acctyear");
  },
  // Pulls data by account details and quarter
  acctquarter: function() {
    return axios.get("/api/transactions/acctquarter");
  },
  // sums data by account details and month
  acctmonth: function() {
    return axios.get("/api/transactions/acctmonth");
  }
};
