// /graphql/types/Link.ts
import { builder } from "../builder";

builder.prismaObject('Task', {
  fields: (t) => ({
    id: t.exposeID('id'),
    title: t.exposeString('title'),
    description: t.exposeString('description'),
    dueDate: t.exposeString("dueDate",),
    priority: t.exposeInt('priority'),
    completed: t.exposeBoolean('completed'),
    authorId: t.exposeInt('authorId'),
    tomato: t.exposeInt('tomato')
  })
})


// 1. 
builder.queryField("tasks", (t) =>
// 2. 
  t.prismaField({
    // 3. 
    type: ['Task'],
    // 4. 
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.task.findMany({ ...query })
  })
)

// graphql/types/Link.ts
// ... code above remains unchanged

builder.mutationField("createTask", (t) =>
  t.prismaField({
    type: 'Task',
    args: {
      title: t.arg.string({ required: true }),
      description: t.arg.string({ required: true }),
      dueDate: t.arg.string({ required: true }),
      priority: t.arg.int({required: true}),
      completed: t.arg.boolean({required: true}),
      tomato : t.arg.int({required:true})
    },
    resolve: async (query, _parent, args, ctx) => {
      const { title, description, dueDate,priority,completed,tomato } = args

      if (!(await ctx).user) {
        console.log("please login");
        throw new Error("You have to be logged in to perform this action")
      }
      
      return prisma.task.create({
        ...query,
        data: {
          title,
          description,
          dueDate,
          priority,
          completed,
          tomato
        }
      })
    }
  })
) 

// 3. Mutation: Update task
builder.mutationField("updateTask", (t) =>
  t.prismaField({
    type: 'Task',
    args: {
      id: t.arg.int({required: true}),
      title: t.arg.string(),
      description: t.arg.string(),
      dueDate: t.arg.string(),
      priority: t.arg.int(),
      completed: t.arg.boolean(),
      tomato: t.arg.int()
    },
    resolve: async (query, _parent, args, ctx) => {
      const { id, title, description, dueDate, priority, completed, tomato } = args;

      if (!(await ctx).user) {
        console.log("Please log in");
        throw new Error("You have to be logged in to perform this action");
      }

      return prisma.task.update({
        ...query,
        where: { id},
        data: {
          title,
          description,
          dueDate,
          priority,
          completed,
          tomato
        }
      });
    }
  })
)


// 4. Mutation: Delete task
builder.mutationField("deleteTask", (t) =>
  t.prismaField({
    type: 'Boolean',
    args: {
      id: t.arg.int({ required: true }),
    },
    resolve: async (query, _parent, args, ctx) => {
      const { id } = args;

      await prisma.task.delete({
        where: { id },
      });

      return true;
    }
  })
)

