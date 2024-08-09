import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

const controller = (fastify: FastifyInstance, options: any, done: Function) => {
  fastify.get("/", options, (req: FastifyRequest, reply: FastifyReply) => {
    return {
      message: "hello world",
    };
  });
  done();
};

export default controller;
