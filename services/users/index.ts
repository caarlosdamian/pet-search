'use server';
import { connectToDatabase } from '@/lib/mongodb';
import { transporter } from '@/lib/nodemailer';
import { UserFormValues } from '@/lib/shemas';
import { hash } from 'bcryptjs';
import { randomUUID } from 'crypto';
import { ObjectId } from 'mongodb';
import { Noto_Serif_Old_Uyghur } from 'next/font/google';

export const getUser = async (searchParams: {
  [key: string]: string | string[] | undefined;
}) => {
  try {
    const query: Record<string, unknown> = {};
    // if (searchParams.id) {
    //   query.id = searchParams.name;
    // }

    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne(new ObjectId(searchParams.id))

    return {
      ...user,
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
interface updateBody extends UserFormValues {
  _id: string;
}
export const updateUser = async (body: updateBody) => {
  const { _id, ...rest } = body;
  const userId = new ObjectId(_id);
  try {
    const { db } = await connectToDatabase();
    const user = db.collection('users').findOne(userId);
    if (!user) {
      return null;
    }
    const newUser = await db
      .collection('users')
      .updateOne({ _id: userId }, { $set: { ...rest } });
    return newUser.upsertedId
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      users: [],
      totalPages: 0,
    };
  }
};

export const createUser = async (body: UserFormValues) => {
  try {
    const { db } = await connectToDatabase();
    const tempPassword = `PawFinder-${randomUUID()}`;
    const hashedPassword = await hash(tempPassword, 12);

    const user = await db
      .collection('users')
      .insertOne({ ...body, password: hashedPassword });

    const email = 'testing';

    const info = await transporter.sendMail({
      from: '"PawFinder" <no-reply@PawFinder.com>',
      to: process.env.MAIL_TESTIN,
      subject: 'Tu acceso temporal a PawFinder',
      text: `Hola,

  Aquí tienes tus credenciales temporales:

  Usuario: ${body.email}
  Contraseña temporal: ${tempPassword}

  Por favor, inicia sesión y cambia tu contraseña lo antes posible.

  Saludos,
  Equipo de PawFinder`,
      html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #4CAF50;">👋 Bienvenido a PawFinder</h2>
        <p>Hola,</p>
        <p>Tu cuenta ha sido creada y aquí están tus credenciales temporales:</p>
        <ul>
          <li><strong>Usuario:</strong> ${email}</li>
          <li><strong>Contraseña temporal:</strong> <span style="color: #d32f2f;">${tempPassword}</span></li>
        </ul>
        <p>Te recomendamos cambiar tu contraseña en tu primer inicio de sesión.</p>
        <p>Gracias por confiar en nosotros 🐾</p>
        <br>
        <p>Atentamente,<br><strong>Equipo de PawFinder</strong></p>
      </div>
    `,
    });


    return { message: `User Created ${user.insertedId}` };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      users: [],
      totalPages: 0,
    };
  }
};

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
