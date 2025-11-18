import { faker } from "@faker-js/faker";
import type { Menu, PrismaClient } from "@prisma/client";
import { getRandomInteger } from "src/utils/misc";

export const createMenuEntries = async (prisma: PrismaClient) => {
	let menu: Menu | null;
	menu = await prisma.menu.findFirst({});

	if (!menu) {
		menu = await prisma.menu.create({});
	}

	return Array.from({ length: 50 }).map(() => {
		const shouldCreateLabel = () => Math.random() > 0.5;
		const _shouldCreateCategory = () => Math.random() > 0.5;

		return prisma.menuEntry.create({
			data: {
				menuId: menu.id,
				name: faker.science.chemicalElement().name,
				description: faker.lorem.words(8),
				variants: {
					createMany: {
						data: Array.from({ length: getRandomInteger(1, 4) }).map((_, idx) => ({
							name: `Variant no ${idx}`,
							description: faker.lorem.words(5),
							price: +(Math.random() * 250).toFixed(2),
						})),
					},
				},
				...(shouldCreateLabel() && {
					labels: {
						createMany: {
							data: Array.from({ length: getRandomInteger(1, 3) }).map(() => ({
								name: faker.commerce.productName(),
								color: faker.color.rgb(),
							})),
						},
					},
				}),
				// ...(shouldCreateCategory() && {
				//   category: {
				//     createMany: {
				//       data: Array.from({ length: getRandomInteger(1, 3) }).map(() => ({
				//         name: faker.commerce.productName()
				//       }))
				//     }
				//   }
				// })
			},
		});
	});
};
