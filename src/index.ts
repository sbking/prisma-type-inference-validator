import { Prisma, PrismaClient, User } from "@prisma/client";
import { assertEqual } from "./typeutils";

const prisma = new PrismaClient();

const includePosts = Prisma.validator<Prisma.UserInclude>()({
  posts: true,
});

const selectContactInfo = Prisma.validator<Prisma.UserSelect>()({
  email: true,
  name: true,
});

type UserWithPosts = Prisma.UserGetPayload<{ include: typeof includePosts }>;
type ContactInfo = Prisma.UserGetPayload<{ select: typeof selectContactInfo }>;

async function main() {
  const userWithPosts = await prisma.user.findFirstOrThrow({
    include: includePosts,
  });

  const contactInfo = await prisma.user.findFirstOrThrow({
    select: selectContactInfo,
  });

  console.info({ userWithPosts, contactInfo });

  assertEqual<typeof userWithPosts, UserWithPosts>(true);
  assertEqual<typeof contactInfo, ContactInfo>(true);
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
