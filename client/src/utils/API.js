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
  // Saves a transaction to the database
  saveTransaction: function(transactionData) {
    return axios.post("/api/transactions", transactionData);
  },

  updateUser: function(data){
    return axios.put("/user", data)
  },

  createUser: function(data){
    return axios.post("/user", data)
  },

  getUser: function(data){
    return axios.get("/user", data)
  }


};
