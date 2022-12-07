import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";
import cuid from "cuid";

const prisma = new PrismaClient();

async function main() {
  // Cleanup existing data
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const users = Array.from({ length: 100 }, () =>
    Prisma.validator<Prisma.UserCreateManyInput>()({
      id: cuid(),
      email: faker.helpers.unique(faker.internet.email),
      name: faker.name.fullName(),
    })
  );

  const posts = users.flatMap((user) =>
    Array.from({ length: 5 }, () =>
      Prisma.validator<Prisma.PostCreateManyInput>()({
        title: faker.hacker.phrase(),
        published: faker.datatype.boolean(),
        authorId: user.id,
      })
    )
  );

  await prisma.user.createMany({ data: users });
  await prisma.post.createMany({ data: posts });

  console.log(`Database has been seeded. 🌱`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
