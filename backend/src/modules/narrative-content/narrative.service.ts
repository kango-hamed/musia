import { prisma } from '../../database/prisma';
import { CreateNarrativeDto, UpdateNarrativeDto } from './dto/narrative.dto';

export class NarrativeService {
  async create(data: CreateNarrativeDto) {
    // Verify artwork exists
    const artwork = await prisma.artwork.findUnique({
      where: { id: data.artworkId }
    });

    if (!artwork) {
      throw new Error('Artwork not found');
    }

    return prisma.narrativeContent.create({
      data
    });
  }

  async findAll(artworkId?: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;
    const where = artworkId ? { artworkId } : {};

    const [narratives, total] = await Promise.all([
      prisma.narrativeContent.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { artwork: { select: { title: true, code: true } } }
      }),
      prisma.narrativeContent.count({ where })
    ]);

    return {
      data: narratives,
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
    const narrative = await prisma.narrativeContent.findUnique({
      where: { id },
      include: { artwork: { select: { title: true, code: true } } }
    });

    if (!narrative) {
      throw new Error('Narrative content not found');
    }

    return narrative;
  }

  async update(id: string, data: UpdateNarrativeDto) {
    // Check if exists
    await this.findOne(id);

    return prisma.narrativeContent.update({
      where: { id },
      data
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Ensure exists
    return prisma.narrativeContent.delete({
      where: { id }
    });
  }

  async uploadAudio(id: string, file: Express.Multer.File) {
    await this.findOne(id);
    const audioUrl = `/uploads/audio/${file.filename}`;

    return prisma.narrativeContent.update({
      where: { id },
      data: { audioUrl }
    });
  }
}
