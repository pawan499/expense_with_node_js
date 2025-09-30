import { Request } from "express";

export const ALLOWED_SORT_FIELDS = {
  expenses: ["createdAt", "amount", "expense_type"],
  users: ["createdAt", "name", "email"],
  orders: ["createdAt", "status", "totalPrice"],
};

export function parseListQuery(req:Request, resource: keyof typeof ALLOWED_SORT_FIELDS) {
  const q :any= req.query || {};

  const page = Math.max(1, Number(q.page) || 1);
  const limit = Math.min(Number(q.limit) || 10, 100);

  const allowedFields = ALLOWED_SORT_FIELDS[resource];
  const sortField = allowedFields.includes(q.sortField) ? q.sortField : "createdAt";
  const sortOrder = Number(q.sortOrder) === 1 ? 1 : -1;

  const search = q.search || undefined;
  const filters = q.filters || {};

  return { page, limit, sortField, sortOrder, search, filters };
}
