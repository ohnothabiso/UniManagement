"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    const adminPasswordHash = await bcrypt_1.default.hash('admin1234', 10);
    await prisma.users.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            display_name: 'Administrator',
            role: 'admin',
            password_hash: adminPasswordHash,
            is_active: true,
        },
    });
    await prisma.students.createMany({
        data: [
            {
                student_no: 'S1234567',
                first_name: 'Amahle',
                surname: 'Dlamini',
                room_no: 'A101',
                email: 'amahle@example.com',
            },
            {
                student_no: 'S2345678',
                first_name: 'Thabo',
                surname: 'Mokoena',
                room_no: 'B202',
                email: 'thabo@example.com',
            },
        ],
        skipDuplicates: true,
    });
    const laptop = await prisma.items.upsert({
        where: { id: 'seed-laptop' },
        update: {},
        create: { id: 'seed-laptop', name: 'Laptop', category: 'Electronics', total_units: 10 },
    });
    const projector = await prisma.items.upsert({
        where: { id: 'seed-projector' },
        update: {},
        create: { id: 'seed-projector', name: 'Projector', category: 'Electronics', total_units: 3 },
    });
    await prisma.item_units.createMany({
        data: [
            { item_id: laptop.id, serial_no: 'LAP-001' },
            { item_id: laptop.id, serial_no: 'LAP-002' },
            { item_id: projector.id, serial_no: 'PROJ-001' },
        ],
        skipDuplicates: true,
    });
    console.log('Seed completed.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map