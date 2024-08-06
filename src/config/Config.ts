
const host  = (import.meta as any).env.VITE_IP_HOST;
// console.log("host: ", host);
// const host = process.env.VITE_IP_HOST;

if (!host) {
  throw new Error("IP_HOST is not defined in the environment variables");
}
console.log("host: ", host);
const wsConfig = {
  host: "ws://" + host,
  port: 8080,
  path: "/",
}

export default wsConfig;