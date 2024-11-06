import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800">404 - Página não encontrada</h1>
            <p className="mt-4 text-gray-600">Desculpe, esta página não existe...</p>
            <Link href="/">
              <button className="w-52 bg-black text-white font-semibold py-2 rounded-lg hover:bg-slate-50 hover:text-black transition duration-300 mt-6">
                Voltar para Portfólios
              </button>
            </Link>
        </div>
    );
}
