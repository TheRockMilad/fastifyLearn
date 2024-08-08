import Fastify from "fastify";
const fastify = Fastify({
  logger: {
    level : "trace"
  }
});


try {
  fastify.listen({ port: 3002 });
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}
