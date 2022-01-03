import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf = new Notyf();

export class Notification {
  constructor(duration) {
    this.duration = duration === undefined ? 3000 : duration;
    this.position = {
      x: "right",
      y: "top",
    };
  }

  success(msg, duration) {
    return notyf.success({
      duration: duration === undefined ? this.duration : duration,
      message: msg === undefined || msg === null ? this.message : msg,
      dismissible: true,
      position: this.position,
    });
  }

  error(msg, duration) {
    return notyf.error({
      duration: duration === undefined ? this.duration : duration,
      message: msg === undefined || msg === null ? this.message : msg,
      dismissible: true,
      position: this.position,
    });
  }

  dismissAll() {
    return notyf.dismissAll();
  }
}

export class Util {
  Error(msg) {
    return new Error(msg);
  }

  validatePhonenumber(phoneNumber) {
    if (!phoneNumber) return false;
    const regexp =
      /^\+{0,2}([\-\. ])?(\(?\d{0,3}\))?([\-\. ])?\(?\d{0,3}\)?([\-\. ])?\d{3}([\-\. ])?\d{4}/;
    return regexp.test(phoneNumber);
  }

  validateEmail(email) {
    const tester =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!email) return false;

    let emailParts = email.split("@");

    if (emailParts.length !== 2) return false;

    let account = emailParts[0];
    let address = emailParts[1];

    if (account.length > 64) return false;
    else if (address.length > 255) return false;

    let domainParts = address.split(".");
    if (
      domainParts.some(function (part) {
        return part.length > 63;
      })
    )
      return false;

    if (!tester.test(email)) return false;

    return true;
  }

  validateMatricNumber(matricNumber) {
    let length = 6;
    if (!matricNumber || matricNumber === undefined || matricNumber === "") {
      return false;
    }
    // the matric number goes like this
    // 18/0032
    let check = matricNumber.trim().split("/").join("");

    if (check.length > length || check.length !== length) {
      return false;
    }
    return true;
  }

  validatePlaneNumber(plateNumber) {
    let length = 6;
    if (!plateNumber || plateNumber === undefined || plateNumber === "") {
      return false;
    }
    // the matric number goes like this
    // 18/0032
    let check =
      plateNumber.trim().split("").includes("-") === true
        ? plateNumber.trim().split("-").join("")
        : plateNumber.trim().split("").join("");

    if (check.length > length || check.length !== length) {
      return false;
    }
    return true;
  }

  randomImages(seeds) {
    return `https://avatars.dicebear.com/api/initials/${seeds}.svg`;
  }

  sendJson(res, payload = { msg: "payload is empty" }, code = 401) {
    if (!res) {
      return this.Error("Rresponse object is required");
    }
    return res.status(code).json(payload);
  }

  redirect(path, time = 1000) {
    if (
      path === undefined ||
      path === "" ||
      time === undefined ||
      time === ""
    ) {
      return (window.location = "/");
    }
    setTimeout(() => {
      return (window.location = path);
    }, time);
  }

  saveLocalstorage(data) {
    localStorage.setItem("babcock-auth", JSON.stringify(data));
  }
}

export class Http {
  async get(url, cb) {
    if (
      url === "" ||
      url === undefined ||
      typeof url === "function" ||
      typeof url === Number
    ) {
      return cb(new Util().Error("Invalid url arguments passed"));
    }
    try {
      const req = await fetch(url);
      const res = await req.json();
      return cb({ req, res });
    } catch (e) {
      return cb(e);
    }
  }

  async post(url, payload, headers, cb) {
    if (
      url === "" ||
      url === undefined ||
      typeof url === "function" ||
      typeof url === Number
    ) {
      return cb(new Util.Error("Invalid url arguments passed"));
    }

    if (payload === "" || payload === undefined) {
      return cb(new Util.Error("missing request body"));
    }

    try {
      const req = await fetch(url, {
        method: "post",
        headers:
          headers === undefined || typeof headers === String
            ? {
                "content-type": "application/json",
              }
            : headers,
        body: typeof payload === "string" ? payload : JSON.stringify(payload),
      });
      const res = await req.json();

      return cb({ req, res });
    } catch (e) {
      return cb(e);
    }
  }
}

class Error {
  constructor(msg) {
    this.msg = msg;
    this.name = "Error";
  }
}
