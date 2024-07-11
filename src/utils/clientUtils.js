import Cookies from "js-cookie";
import { handlerRefreshToken } from "@/services/auth.service";

export const client = {
  serverApi: import.meta.env.VITE_SERVER_API,
  token: Cookies.get("accessToken"),
  setUrl: function (url) {
    this.serverApi = url;
  },
  setToken: function (token) {
    this.token = token;
  },
  send: async function (url, method = "GET", body = null) {
    // url = SERVER_API + url;
    url = `${this.serverApi}${url}`;
    const headers = {
      "Content-Type": "application/json",
    };
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }
    const options = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    if (this.token && response.status === 401) {
      const payload = {
        refreshToken: Cookies.get("refreshToken"),
      };
      try {
        const res = await handlerRefreshToken(payload);
        console.log(res);
        if (res?.data?.status === 200) {
          this.token = res?.data?.token?.accessToken;
          Cookies.set("accessToken", res?.data?.token?.accessToken, {
            expires: 60 * 60 * 24 * 7,
          });
          Cookies.set("refreshToken", res?.data?.token?.refreshToken, {
            expires: 60 * 60 * 24 * 30,
          });
          return this.send("/user/profile", method, body);
        }
        else {
          Cookies.remove("accessToken")
          Cookies.remove("refreshToken")
          window.location.href = "/signin"
          return false
        }
      } catch (error) {
        console.log(error);
      }
    }
    const data = await response.json();

    return { response, data };
  },

  get: function (url) {
    return this.send(url);
  },

  post: function (url, body) {
    return this.send(url, "POST", body);
  },

  put: function (url, body) {
    return this.send(url, "PUT", body);
  },

  patch: function (url, body) {
    return this.send(url, "PATCH", body);
  },

  delete: function (url) {
    return this.send(url, "DELETE");
  },
};
