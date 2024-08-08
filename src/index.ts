import Fastify from "fastify";
const fastify = Fastify({
  logger: {
    level: "",
  },
});

fastify.get("/", (req, reply) => {
  return {
    message: "hello world",
  };
});

//امکانات بیشتر میده
fastify.route({
  method: "GET", // نوع  درخواست
  url: "/hello/:name", // مسیر روت ، "نام" یک پارامتر است
  // اسکیما یا قالب برای اعتبارسنجی ورودی‌ها و خروجی‌های این روت
  schema: {
    querystring: {
      type: "object",
      properties: {
        lastName: { type: "string" },
      },
      required: ["lastName"],
    },
    // قالب پارامترهای ورودی (در اینجا فقط یک پارامتر بنام "نام" است
    params: {
      type: "object", // تعیین می‌کند که پارامترها باید یک آبجکت باشند.
      //ویژگی‌های آبجکت پارامتر
      properties: {
        //  پارامتری از نوع (رشته) است
        name: {
          type: "string",
          pattern: "^[A-Za-z]+$", // فقط حروف الفبایی
        },
      },
      required: ["name"], //: مشخص می‌کند که پارامتر نام الزامی است.
    },
    // قالب خروجی برای پاسخ
    response: {
      //  قالب برای زمانی که پاسخ اچ تی ام ال با کد وضعیت 200 ارسال می‌شود
      200: {
        type: "object", //  پاسخ باید یک آبجکت باشد.
        //  ویژگی‌های این آبجکت پاسخ.
        properties: {
          message: { type: "string" }, //این ویژگی باید از نوع رشته باشد
        },
        required: ["message"], // درخواست : ["پیام"]: مشخص می‌کند که ویژگی پیام باید حتماً در پاسخ وجود داشته باشد
      },
    },
  },
  handler: (req, reply) => {
    //   const name = (req.params as { name: string }).name;
    return {
      //@ts-ignore
      message: `Hello ${req.params.name} ${req.query.lastName}`,
    };
  },
});

try {
  fastify.listen({ port: 3002 });
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}
