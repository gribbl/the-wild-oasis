import type { LucidRow, ModelPaginatorContract } from '@adonisjs/lucid/types/model'
import type { DtoPaginator } from './types.js'

export default abstract class BaseDto {
  /**
   * Transforms a single model instance into a DTO.
   * @param model The model to transform.
   * @returns The created DTO.
   */
  static fromModel<Model, Dto extends BaseDto>(this: new (model: Model) => Dto, model: Model) {
    return new this(model)
  }

  /**
   * Transforms an array of model instances into an array of DTOs.
   * @param models The array of models to transform.
   * @returns The array of created DTOs.
   */
  static fromModels<Model, Dto extends BaseDto>(this: new (model: Model) => Dto, models: Model[]) {
    return models.map((model) => new this(model))
  }

  /**
   * Transforms a paginator instance into a paginated DTOs.
   * @param paginator The paginator instance.
   * @returns An object containing pagination metadata and data as DTOs.
   */
  static fromPaginator<Model extends LucidRow, Dto extends BaseDto>(
    this: new (model: Model) => Dto,
    paginator: ModelPaginatorContract<Model>
  ): DtoPaginator<Dto> {
    return {
      data: paginator.all().map((model) => new this(model)),
      pagination: {
        total: paginator.total,
        perPage: paginator.perPage,
        currentPage: paginator.currentPage,
        lastPage: paginator.lastPage,
        firstPage: paginator.firstPage,
        firstPageUrl: paginator.getUrl(1),
        lastPageUrl: paginator.getUrl(paginator.lastPage),
        nextPageUrl: paginator.getNextPageUrl(),
        previousPageUrl: paginator.getPreviousPageUrl(),
      },
    }
  }
}
