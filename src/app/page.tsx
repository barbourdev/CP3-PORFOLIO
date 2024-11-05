import Link from 'next/link'

export default function Home() {
    return (
      <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('/background.jpg')" }}>
        {/* Container de Overlay */}
        <div className="absolute inset-0 bg-black opacity-70"></div>

        {/* Conteúdo Centralizado */}
        <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Bem-vindo ao Nosso Portfólio</h1>
            <p className="text-lg md:text-xl mb-6 text-gray-300">Explore nossos projetos e conquistas acadêmicas.</p>
            <Link href="/portfolios" className="px-6 py-3 bg-white hover:bg-slate-900 hover:text-white text-black rounded-lg font-semibold transition   duration-300">
                Ver Portfólios
            </Link>
        </div>
      </div>
    );
  }
