import axios from "axios";

export default {
    updateUser: function (data) {
        return axios.put("api/user", data)
    },

    authUser: function (data) {
        return axios.post("api/user", data)
    },

    getUser: function (data) {
        return axios.get("api/user", data)
    }
};
