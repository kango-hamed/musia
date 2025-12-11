import { prisma } from '../../database/prisma';
import { CreateArtworkDto, UpdateArtworkDto } from './dto/artwork.dto';

export class ArtworkService {
  async create(data: CreateArtworkDto) {
    const existingArtwork = await prisma.artwork.findUnique({
      where: { code: data.code }
    });

    if (existingArtwork) {
      throw new Error('Artwork with this code already exists');
    }

    return prisma.artwork.create({
      data
    });
  }

  async findAll(page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const [artworks, total] = await Promise.all([
      prisma.artwork.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.artwork.count()
    ]);

    return {
      data: artworks,
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
    const artwork = await prisma.artwork.findUnique({
      where: { id }
    });

    if (!artwork) {
      throw new Error('Artwork not found');
    }

    return artwork;
  }

  async update(id: string, data: UpdateArtworkDto) {
    // Check if artwork exists
    await this.findOne(id);

    // If code is being updated, check for collision
    if (data.code) {
      const existing = await prisma.artwork.findUnique({
        where: { code: data.code }
      });
      if (existing && existing.id !== id) {
        throw new Error('Code already in use');
      }
    }

    return prisma.artwork.update({
      where: { id },
      data
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Ensure exists
    return prisma.artwork.delete({
      where: { id }
    });
  }

  async uploadImage(id: string, file: Express.Multer.File) {
    await this.findOne(id); // Ensure exists
    const imageUrl = `/uploads/images/${file.filename}`;

    return prisma.artwork.update({
      where: { id },
      data: { imageUrl }
    });
  }
}
