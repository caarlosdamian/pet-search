import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const { db } = await connectToDatabase();

    const pet = await db.collection('pets').findOne({
      _id: new ObjectId(id),
    });

    if (!pet) {
      return NextResponse.json({ error: 'Pet not found' }, { status: 404 });
    }

    return NextResponse.json(pet);
  } catch (error) {
    console.error('Error fetching pet:', error);
    return NextResponse.json({ error: 'Failed to fetch pet' }, { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string; path: string }> }
) {
  try {
    const { id } = await context.params;

    const { db } = await connectToDatabase();

    await db.collection('pets').findOneAndDelete({
      _id: new ObjectId(id),
    });
    return NextResponse.json({ message: 'Deleted successfullly' });
  } catch (error) {
    console.error('Error fetching pet:', error);
    return NextResponse.json({ error: 'Failed to fetch pet' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { db } = await connectToDatabase();

    const pet = await db.collection('pets').findOne({
      _id: new ObjectId(id),
    });

    if (!pet) {
      return NextResponse.json({ error: 'Pet not found' }, { status: 404 });
    }

    const newPet = await db
      .collection('pets')
      .updateOne({ _id: new ObjectId(id) }, { $set: body });
    return NextResponse.json(newPet);
  } catch (error) {
    console.error('Error fetching pet:', error);
    return NextResponse.json({ error: 'Failed to fetch pet' }, { status: 500 });
  }
}
