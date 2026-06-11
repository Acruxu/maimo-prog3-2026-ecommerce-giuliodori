import { getProductById } from "@/lib/products";

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return <h1>Producto no encontrado</h1>;
  }

  return (
    <main className="max-w-6xl mx-auto p-8">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <img
            src={`/images/products/${product.image}`}
            alt={product.name}
            className="w-full rounded-lg"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold">{product.name}</h1>

          <p className="mt-4 text-slate-600">
            {product.description}
          </p>

          <p className="text-3xl font-bold mt-6">
            ${product.price}
          </p>

          <p className="mt-2">
            Stock disponible: {product.stock}
          </p>

          <div className="mt-6">
            <h3 className="font-semibold">Categorías</h3>

            <div className="flex gap-2 flex-wrap mt-2">
              {product.categories.map((category) => (
                <span
                  key={category._id}
                  className="px-3 py-1 rounded-full bg-slate-200"
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold">Características</h3>

            <ul className="mt-2 space-y-1">
              <li>
                Talles: {product.frameSizes?.join(", ")}
              </li>

              <li>
                Rodados: {product.wheelSizes?.join(", ")}
              </li>

              <li>
                Peso: {product.weight} kg
              </li>

              <li>
                Nivel: {product.riderLevel}
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <label>Cantidad</label>

            <input
              type="number"
              min="1"
              max={product.stock}
              defaultValue="1"
              className="block border rounded px-3 py-2 mt-2"
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button className="bg-black text-white px-6 py-3 rounded">
              Agregar al carrito
            </button>

            {/*<button className="border px-6 py-3 rounded">
              ❤️ Favorito
            </button>*/}
          </div>
        </div>
      </div>
    </main>
  );
}