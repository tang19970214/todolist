import sup from './support';
export default {
  login(account, password) {
    return sup.post("signin", {
      account: account,
      password: password
    });
  },
  checkuser() {
    return sup.get("checkuser");
  },
  register(name, account, password) {
    return sup.post("register", {
      name: name,
      account: account,
      password: password
    });
  },
  sendcontext(name, context) {
    return sup.post("context", {
      name: name,
      context: context
    });
  },
  showcontext() {
    return sup.get("showcontext");
  }
}
