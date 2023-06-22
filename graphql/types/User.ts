// /graphql/types/User.ts
import { builder } from "../builder";

builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email', { nullable: true, }),
    role: t.expose('role', { type: Role, }),
    tasks: t.relation('tasks'),
  })
})

const Role = builder.enumType('Role', {
  values: ['USER', 'ADMIN'] as const,
})