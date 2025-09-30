import { Model } from "mongoose";

interface ListOptions {
  page?: number;
  limit?: number;
  sortField?: string;
  sortOrder?: 1 | -1;
  search?: string;
  searchFields?: string[];   
  filters?: Record<string, any>;
}

export async function listWithPagination<T>(
  model: Model<T>,
  options: ListOptions
) {
  const {
    page = 1,
    limit = 10,
    sortField = "createdAt",
    sortOrder = -1,
    search,
    searchFields,
    filters = {},
  } = options;

  const query: any = { ...filters };

  if (search) {
    const fieldsToSearch =
      searchFields?.length && searchFields.length > 0
        ? searchFields
        : Object.keys(model.schema.paths).filter((key) => {
            const path = model.schema.paths[key] as any;
            return path.instance === "String";
          });

    if (fieldsToSearch.length > 0) {
      query.$or = fieldsToSearch.map((field) => ({
        [field]: { $regex: search, $options: "i" },
      }));
    }
  }

  const sort: any = {};
  sort[sortField] = sortOrder;

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    model.find(query).sort(sort).skip(skip).limit(limit).lean(),
    model.countDocuments(query),
  ]);

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasNextPage: page * limit < total,
    hasPrevPage: page > 1,
  };
}
