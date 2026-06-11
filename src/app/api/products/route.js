import { connectDB } from "@/lib/mongodb";
import { getProducts } from "@/lib/products";
import "@/models/Category";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await getProducts();

    return Response.json(products);
  } catch (error) {
    return Response.json(
      { message: "Error al obtener los productos", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    await connectDB();

    const product = await Product.create({
      name: body.name,
      description: body.description,
      price: body.price,
      stock: body.stock,
      image: body.image,
      wheelSizes: body.wheelSizes
      .split(",")
      .map((wheel) => Number(wheel.trim()))
      .filter((wheel) => !Number.isNaN(wheel)),
     frameSizes: body.frameSizes
     .split(",")
      .map((size) => size.trim())
      .filter(Boolean),
      riderLevel: body.riderLevel,
      weight: body.weight,
      categories: body.categories,
    });

    return Response.json(product, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: "Error al crear el producto", error: error.message },
      { status: 400 }
    );
  }
}
