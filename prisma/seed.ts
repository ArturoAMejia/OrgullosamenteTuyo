import { roles, users } from "./data/users";
import { management } from "./data/managment";
import { teamAsign, teamDetail, teams } from "./data/teams";
import { PrismaClient } from "@prisma/client";
import { stations } from "./data/stations";

const prisma = new PrismaClient();

const main = async (): Promise<void> => {
  await prisma.$connect();
  await prisma.management.createMany({
    data: management,
  });
  await prisma.role.createMany({
    data: roles
  });
  await prisma.user.createMany({
    data: users,
  });

  const newUsers = await prisma.user.findMany();

  await prisma.team.createMany({
    data: teams,
  });

  await prisma.teamDetail.createMany({
    data: teamAsign.map((team, index) => {
      return {
        teamId: team,
        userId: newUsers[index].id,
      };
    }),
  });

  await prisma.station.createMany({
    data: stations
  })


  await prisma.$disconnect();
  try {
  } catch (error) {
    console.error(error);
  }
};

main();
