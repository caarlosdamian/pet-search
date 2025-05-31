import { Pet } from "@/lib/types";

export async function getPet(id: string): Promise<Pet | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ''}/api/pets/${id}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch pet');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching pet:', error);
    return null;
  }
}
