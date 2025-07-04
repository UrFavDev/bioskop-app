// src/app/api/movies/route.js
import { NextResponse } from 'next/server';

const BASE_URL = 'http://localhost:3001/api/v1/movies';

export async function GET() {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET /api/movies:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("POST body from frontend:", body);

    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movie: body }) // Rails expects this format!
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Failed to POST movie:', res.status, errorText);
      return new NextResponse(errorText, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/movies:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
