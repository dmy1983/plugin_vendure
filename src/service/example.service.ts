import { Inject, Injectable } from "@nestjs/common";
import {
  Ctx,
  DefaultOrderPlacedStrategy,
  ListQueryBuilder,
  PaginatedList,
  RequestContext,
  TransactionalConnection,
  OrderPlacedStrategy,
  Order,
} from "@vendure/core";

import { ExampleEntity } from "../entities/example.entity";
import { PLUGIN_INIT_OPTIONS } from "../constants";
import { PluginInitOptions } from "../types";
import {
  CreateExampleInput,
  ExampleListOptions,
  UpdateExampleInput,
} from "../generated-admin-types";
import { ExampleResolver } from "../api/example.resolver";
import { ExampleAdminResolver } from "../api/example-admin.resolver";

@Injectable()
export class ExampleService {
  constructor(
    private connection: TransactionalConnection,
    @Inject(PLUGIN_INIT_OPTIONS) private options: PluginInitOptions,
    private listQueryBuilder: ListQueryBuilder
  ) {}

  async findAll(
    ctx: RequestContext,
    options?: ExampleListOptions
  ): Promise<PaginatedList<ExampleEntity>> {
    return this.listQueryBuilder
      .build(ExampleEntity, options, { ctx })
      .getManyAndCount()
      .then(([items, totalItems]) => ({
        items,
        totalItems,
      }));
  }

  async findOne(
    ctx: RequestContext,
    id: string
  ): Promise<ExampleEntity | undefined> {
    return this.connection.getRepository(ctx, ExampleEntity).findOne(id);
  }

  async create(
    ctx: RequestContext,
    input: CreateExampleInput
  ): Promise<ExampleEntity> {
    return this.connection
      .getRepository(ctx, ExampleEntity)
      .save(new ExampleEntity(input));
  }

  async update(
    ctx: RequestContext,
    input: UpdateExampleInput
  ): Promise<ExampleEntity> {
    const example = await this.connection.getEntityOrThrow(
      ctx,
      ExampleEntity,
      input.id
    );
    const updated = { ...example, ...input };
    return this.connection.getRepository(ctx, ExampleEntity).save(updated);
  }

  //implement onModuleInit to run the cron job every minute
  async onModuleInit(@Ctx() ctx: RequestContext, Order: Order) {
    console.log("Cron job started");
    this.create(ctx, { name: "TESTING INIT", precio_dolar: 10 });
    setInterval(() => {
      this.create(ctx, { name: "DMY", precio_dolar: 100 });
    }, 100000);
  }
}
