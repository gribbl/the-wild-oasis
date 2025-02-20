/**
 * Converts a relation into DTO instance(s).
 * @param relation - The relation to transform.
 * @param DtoClass - The DTO class constructor.
 * @returns The transformed DTO instance(s) or null if no relation is provided.
 */
function relation<Relation, Dto>(
  related: Relation | undefined,
  DtoClass: new (model: Relation) => Dto
): Dto | null
function relation<Relation, Dto>(
  related: Relation[] | undefined,
  DtoClass: new (model: Relation) => Dto
): Dto[] | null
function relation<Relation, Dto>(
  related: Relation[] | Relation | undefined,
  DtoClass: new (model: Relation) => Dto
): Dto[] | Dto | null {
  if (!related) return null
  if (Array.isArray(related)) return related.map((model) => new DtoClass(model))
  return new DtoClass(related)
}

export { relation }
