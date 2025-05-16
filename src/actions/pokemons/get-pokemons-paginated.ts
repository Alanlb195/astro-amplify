import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export interface PokemonApiResponse {
    count: number;
    next: string;
    previous: null;
    results: Result[];
}

export interface Result {
    name: string;
    url: string;
}

export const getPokemonsPaginated = defineAction({
    input: z.object({
        limit: z.number(),
        offset: z.number(),
    }),
    handler: async ({ limit, offset }) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        if (!response.ok) {
            throw new Error('Failed to fetch Pokémon data');
        }
        const data: PokemonApiResponse = await response.json();
        return data;
    }
});
