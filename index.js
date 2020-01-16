// code away!
const server = require("./server");

const port = process.env.PORT || 4040;

server.listen(port, () => {
  console.log(`\nServer Running on Port ${port}`);
});
