import IoRedis, { Redis } from 'ioredis';

import cacheRedis from '@config/cache';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

export default class HandlebarsMailTemplateProvider implements ICacheProvider {
  private client: Redis;

  constructor() {
    this.client = new IoRedis(cacheRedis.config.redis);
  }

  public async save(key: string, value: string): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recovery(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  public async invalidate(key: string): Promise<void> {}
}
