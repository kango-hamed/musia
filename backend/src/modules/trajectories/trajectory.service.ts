import { prisma } from '../../database/prisma';
import { CreateTrajectoryDto, UpdateTrajectoryDto } from './dto/trajectory.dto';

export class TrajectoryService {
  async create(data: CreateTrajectoryDto) {
    const { steps, ...trajectoryData } = data;

    // Use transaction to create trajectory and steps
    return prisma.$transaction(async (tx) => {
      const trajectory = await tx.trajectory.create({
        data: {
          ...trajectoryData,
          isActive: true
        }
      });

      if (steps && steps.length > 0) {
        await tx.trajectoryStep.createMany({
          data: steps.map((step) => ({
            ...step,
            trajectoryId: trajectory.id
          }))
        });
      }

      return trajectory;
    });
  }

  async findAll(page: number = 1, limit: number = 20, activeOnly: boolean = false) {
    const skip = (page - 1) * limit;
    const where = activeOnly ? { isActive: true } : {};

    const [trajectories, total] = await Promise.all([
      prisma.trajectory.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: { select: { steps: true } }
        }
      }),
      prisma.trajectory.count({ where })
    ]);

    return {
      data: trajectories,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    };
  }

  async findOne(id: string) {
    const trajectory = await prisma.trajectory.findUnique({
      where: { id },
      include: {
        steps: {
          orderBy: { stepOrder: 'asc' },
          include: {
            artwork: { select: { id: true, title: true, code: true, imageUrl: true } },
            narrativeContent: {
              select: { id: true, version: true, language: true, duration: true, audioUrl: true }
            }
          }
        }
      }
    });

    if (!trajectory) {
      throw new Error('Trajectory not found');
    }

    return trajectory;
  }

  async update(id: string, data: UpdateTrajectoryDto) {
    const { steps, ...trajectoryData } = data;
    await this.findOne(id); // Ensure exists

    // If steps are provided, we currently don't support partial step updates here for simplicity
    // User would likely delete/re-create steps or we use a separate endpoint for steps.
    // For now, let's update basic info.

    return prisma.trajectory.update({
      where: { id },
      data: trajectoryData
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return prisma.trajectory.delete({
      where: { id }
    });
  }
}
