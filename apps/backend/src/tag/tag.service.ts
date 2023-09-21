import { Injectable } from '@nestjs/common';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Tag } from './tag.entity';
import { ITagsRO } from './tag.interface';

@Injectable()
export class TagService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Tag)
    private readonly tagRepository: EntityRepository<Tag>,
  ) {}

  async findAll(): Promise<ITagsRO> {
    const tags = await this.tagRepository.findAll();
    return { tags: tags.map((tag) => tag.tag) };
  }

  async insertNewTags(tags: string[]): Promise<void> {
    for (const tag of tags) {
      const exists = await this.tagRepository.findOne({ tag });
      if (!exists) {
        this.em.persist(new Tag(tag));
      }
    }
    await this.em.flush();
  }
}
