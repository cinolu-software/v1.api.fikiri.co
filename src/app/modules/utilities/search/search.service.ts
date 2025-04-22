import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnqueuedTask, MeiliSearch, SearchParams, SearchResponse } from 'meilisearch';

@Injectable()
export class SearchService {
  private readonly client: MeiliSearch;
  constructor(private readonly configService: ConfigService) {
    this.client = new MeiliSearch({
      host: this.configService.get('MEILISEARCH_HOST'),
      apiKey: this.configService.get('MEILISEARCH_MASTER_KEY')
    });
  }

  async addDocument<T>(index: string, document: T[]): Promise<EnqueuedTask> {
    return await this.client.index(index).addDocuments(document);
  }

  async updateFilterableAttributes(index: string, attributes: string[]): Promise<EnqueuedTask> {
    return await this.client.index(index).updateFilterableAttributes(attributes);
  }

  async search(
    index: string,
    query: string,
    searchParams: SearchParams
  ): Promise<{ data: SearchResponse<Record<string, any>, SearchParams> }> {
    const data = await this.client.index(index).search(query, searchParams);
    return { data };
  }
}
