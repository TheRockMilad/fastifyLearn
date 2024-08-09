import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifySchema,
} from "fastify";

interface Params {
  name: string;
}

const responseSchema: FastifySchema = {
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

//  controller

const controller = (
  fastify: FastifyInstance,
  options: any,
  done: () => void
) => {
  fastify.get(
    "/",
    options,
    async (req: FastifyRequest, reply: FastifyReply) => {
      return {
        message: "hello world",
      };
    }
  );

  fastify.get(
    "/:name",
    { schema: responseSchema },
    (req: FastifyRequest<{ Params: Params }>, reply: FastifyReply) => {
      const { name } = req.params;
      return {
        message: `hello ${name}`,
      };
    }
  );
  done();
};

export default controller;
