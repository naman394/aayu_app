import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        contact: true,
        availability: true,
        awards: true,
      },
    });
    return NextResponse.json(doctors);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
