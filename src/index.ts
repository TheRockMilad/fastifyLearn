import Fastify from "fastify";
const fastify = Fastify({
  logger: {
    level : "trace"
  }
});

fastify.get("/", (req, reply) => {
  return {
    message: "hello world",
  };
});

try {
  fastify.listen({ port: 3002 });
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}
