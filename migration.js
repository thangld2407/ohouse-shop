import fetch from "node-fetch";
import DATA from "./data.js";
import CONFIG from "./config.js";
async function fetchData() {
  let count = 0;
  for (let i = 0; i < DATA.length; i++) {
    count++;
    fetch(
      `${CONFIG.MIGRATION_URL}${CONFIG.MIGRATION_PORT}/api/${CONFIG.MIGRATION_VERSION}/user/create`,
      {
        method: "POST",
        body: JSON.stringify(DATA[i]),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((response) => {})
      .catch((e) => {
        console.log(e);
      });
  }
  if (count === DATA.length) {
    const account = {
      name: "Admin",
      email: "admin@gmail.com",
      password: "123456789",
    };
    fetch(
      `${CONFIG.MIGRATION_URL}${CONFIG.MIGRATION_PORT}/api/${CONFIG.MIGRATION_VERSION}/auth/register`,
      {
        method: "POST",
        body: JSON.stringify(account),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        if (response.status_code === 200) {
          return console.log("Data inserted successfully");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

fetchData();
