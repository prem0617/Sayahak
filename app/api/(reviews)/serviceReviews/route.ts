// @ts-nocheck
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    const review = await prisma.rating.findFirst({
      where: {
        serviceId: id,
      },
      select: {
        id: true,
        stars: true,
        review: true,
        User: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json({ review });
  } catch (error) {
    console.error("Error fetching review:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
