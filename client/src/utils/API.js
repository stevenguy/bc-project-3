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
  // Deletes the transaction with the given id
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
  // Get list of available accounts
  getAccount: function() {
    return axios.get("/api/accounts")
  }

};
