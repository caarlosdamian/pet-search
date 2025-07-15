'use server';
import { connectToDatabase } from '@/lib/mongodb';

export const getUser = async (searchParams: {
  [key: string]: string | string[] | undefined;
}) => {
  try {
    const query: Record<string, unknown> = {};

    if (searchParams.name) {
      query.name = searchParams.name;
    }

    const { db } = await connectToDatabase();
    const user = await db.collection('users').find(query).toArray();

    return {
      ...user[0],
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      users: [],
      totalPages: 0,
    };
  }
};

// export const getUserById = async (searchParams: {
//   [key: string]: string | string[] | undefined;
// }) => {
//   try {
//     const query: Record<string, unknown> = {};

//     if (searchParams.name) {
//       query.name = searchParams.name;
//     }

//     const { db } = await connectToDatabase();
//     const user = await db.collection('users').find(query).toArray();

//     return {
//       ...user[0],
//     };
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     return {
//       users: [],
//       totalPages: 0,
//     };
//   }
// };

export const updateUser = async (searchParams: {
  [key: string]: string | string[] | undefined;
}) => {
  try {
    const query: Record<string, unknown> = {};

    if (searchParams.name) {
      query.name = searchParams.name;
    }

    const { db } = await connectToDatabase();
    const user = await db.collection('users').find(query).toArray();

    return {
      ...user[0],
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      users: [],
      totalPages: 0,
    };
  }
};

// export const createUser = async (body: { name: string; email: string }) => {
//   try {
//     const query: Record<string, unknown> = {};

//     if (searchParams.name) {
//       query.name = searchParams.name;
//     }

//     const { db } = await connectToDatabase();
//     const user = await db.collection('users').find(query).toArray();

//     return {
//       ...user[0],
//     };
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     return {
//       users: [],
//       totalPages: 0,
//     };
//   }
// };

export async function getUsers(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  try {
    const { db } = await connectToDatabase();

    const query: Record<string, unknown> = {};

    if (searchParams.name) {
      query.name = searchParams.name;
    }

    if (searchParams.email) {
      query.email = searchParams.email;
    }

    if (searchParams.role) {
      query.role = searchParams.role;
    }

    // Pagination
    const page = Number(searchParams?.page || 1);
    const limit = 10;
    const skip = (page - 1) * limit;

    // Get pets with pagination
    const users = await db
      .collection('users')
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Get total count for pagination
    const totalUsers = await db.collection('users').countDocuments(query);
    const totalPages = Math.ceil(totalUsers / limit);

    return {
      users,
      totalPages,
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      users: [],
      totalPages: 0,
    };
  }
}
