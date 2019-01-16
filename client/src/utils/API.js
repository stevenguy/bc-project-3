import axios from "axios";
import openSocket from 'socket.io-client'

const socket = openSocket()


export default {
  // Socket emitting notification
  notification: function(message) {
    socket.emit('notification', message)
  },
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
  //Create new Journal
  newJournal: function(data) {
    return axios.post("api/journals", data)
  },
  // Save new account
  newAccount: function(data) {
    return axios.post("/api/accounts", data);
  },
  // Get list of available accounts
  getAccount: function() {
    return axios.get("/api/accounts")
  },
  //Get list of journal
  getJournals: function(status) {
    return axios.get('/api/journals/' + status)
  },
  // sums data from the database (month)
  monthly: function() {
    return axios.get("/api/transactions/monthly");
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
  },
  // sums data by account details and month
  compareyear: function() {
    return axios.get("/api/transactions/compareyear");
  },
  // sums data by account details and month
  comparequarter: function() {
    return axios.get("/api/transactions/comparequarter");
  },
  // sums data by account details and month
  comparemonth: function() {
    return axios.get("/api/transactions/comparemonth");
  },
  compareyrsum: function() {
    return axios.get("/api/transactions/compareyrsum");
  },
  // sums data by account details and month
  compareqtrsum: function() {
    return axios.get("/api/transactions/compareqtrsum");
  },
  // sums data by account details and month
  comparemthsum: function() {
    return axios.get("/api/transactions/comparemthsum");
  },
  // handles approving journals
  approveJournal: function (journal) {
    return axios.put('/api/transactions/approve', journal)
  },
  preparerAutofill: function() {
    return axios.get("/api/transactions/preparer");
  },
  approverAutofill: function() {
    return axios.get("/api/transactions/approver");
  },
  transByPreparer: function(name) {
    return axios.get("/api/transactions/preparer/" + name );
  },
  transByApprover: function(name) {
    return axios.get("/api/transactions/approver/" + name );
  },
  journalIdAutofill: function(name) {
    return axios.get("/api/transactions/journal");
  }
}