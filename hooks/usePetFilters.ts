'use client';
import { useState, useEffect } from "react";
import { getFilters } from "@/lib/actions/pets";

interface PetFilters {
  types: string[];
  ages: number[];
  sizes: string[];
  genders: string[];
  locations: string[];
}

export const usePetFilters = () => {
  const [filters, setFilters] = useState<PetFilters>({
    types: [],
    ages: [],
    sizes: [],
    genders: [],
    locations: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getFilters()
      .then((response) => {
        if (response && typeof response === 'object' && !Array.isArray(response)) {
          setFilters(response as PetFilters);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { filters, setFilters, isLoading };
};