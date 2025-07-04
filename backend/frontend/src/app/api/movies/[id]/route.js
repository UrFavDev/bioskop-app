export async function GET(req, { params }) {
  const { id } = params;

  const res = await fetch(`http://localhost:3001/api/v1/movies/${id}`);

  if (!res.ok) {
    return new Response('Movie not found', { status: 404 });
  }

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: 200 });
}

export async function PUT(req, { params }) {
  const body = await req.json();

  const response = await fetch(`http://localhost:3001/api/v1/movies/${params.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return new Response(JSON.stringify(data), { status: response.status });
}

export async function DELETE(req, context) {
  const { id } = context.params;

  const response = await fetch(`http://localhost:3001/api/v1/movies/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    return new Response('Failed to delete movie', { status: response.status });
  }

  return new Response(null, { status: 204 }); // No Content
}
