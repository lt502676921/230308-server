const router = require('koa-router')();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.prefix('/project');

router.get('/', async ctx => {
  try {
    const res = await prisma.project.findMany();
    ctx.body = res;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
});

router.post('/', async ctx => {
  console.log(ctx.request.body);
  try {
    const res = await prisma.project.findMany({
      where: {
        address: {
          contains: ctx.request.body.searchContent,
        },
        start_time: {
          gte: ctx.request.body.searchDate[0],
        },
        end_time: {
          lte: ctx.request.body.searchDate[1],
        },
      },
    });
    console.log(res);
    ctx.body = res;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
});

module.exports = router;
