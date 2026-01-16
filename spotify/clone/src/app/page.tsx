import Image from "next/image";
import Link from "next/link";
import { Search, Plus, ChevronRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export default function SpotifyHomePage() {
  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between p-4 bg-black">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/spotify-logo.png"
              alt="Spotify"
              width={132}
              height={40}
              className="w-8 h-8 md:w-[132px] md:h-[40px]"
            />
          </Link>
        </div>

        <div className="hidden md:flex items-center bg-[#242424] rounded-full px-3 py-2 flex-1 max-w-md mx-4">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="O que você quer ouvir?"
            className="bg-transparent border-none outline-none text-sm text-gray-300 w-full"
          />
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="#"
            className="hidden md:block text-gray-300 text-sm hover:text-white"
          >
            Premium
          </Link>
          <Link
            href="#"
            className="hidden md:block text-gray-300 text-sm hover:text-white"
          >
            Suporte
          </Link>
          <Link
            href="#"
            className="hidden md:block text-gray-300 text-sm hover:text-white"
          >
            Baixar
          </Link>
          <div className="hidden md:block h-6 w-[1px] bg-gray-700 mx-2"></div>
          <Link
            href="#"
            className="hidden md:block text-gray-300 text-sm hover:text-white"
          >
            Inscrever-se
          </Link>
          <Button className="bg-white text-black hover:bg-gray-200 rounded-full font-bold">
            Entrar
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 bg-black p-2 hidden md:block">
          <div className="bg-[#121212] rounded-lg p-4 mb-2">
            <div className="flex items-center justify-between mb-6">
              <span className="font-bold">Sua Biblioteca</span>
              <Plus className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>

            <div className="bg-[#242424] rounded-lg p-4 mb-4">
              <h3 className="font-bold mb-1">Crie sua primeira playlist</h3>
              <p className="text-sm text-gray-400 mb-4">
                É fácil, vamos te ajudar.
              </p>
              <Button
                variant="outline"
                className="text-sm rounded-full px-4 py-1 bg-white text-black hover:bg-gray-200 border-none"
              >
                Criar playlist
              </Button>
            </div>

            <div className="bg-[#242424] rounded-lg p-4">
              <h3 className="font-bold mb-1">
                Que tal seguir um podcast novo?
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Avisaremos você sobre novos episódios.
              </p>
              <Button
                variant="outline"
                className="text-sm rounded-full px-4 py-1 bg-white text-black hover:bg-gray-200 border-none"
              >
                Explore podcasts
              </Button>
            </div>
          </div>

          <div className="bg-[#121212] rounded-lg p-4 mt-2 text-xs text-gray-400">
            <div className="grid grid-cols-2 gap-2 mb-4">
              <Link href="#" className="hover:text-white">
                Legal
              </Link>
              <Link href="#" className="hover:text-white">
                Segurança e Centro de privacidade
              </Link>
              <Link href="#" className="hover:text-white">
                Política de privacidade
              </Link>
              <Link href="#" className="hover:text-white">
                Cookies
              </Link>
              <Link href="#" className="hover:text-white">
                Sobre anúncios
              </Link>
              <Link href="#" className="hover:text-white">
                Acessibilidade
              </Link>
              <Link href="#" className="hover:text-white">
                Notice at Collection
              </Link>
              <Link href="#" className="hover:text-white">
                Your Privacy Choices
              </Link>
            </div>

            <Button
              variant="outline"
              className="text-xs rounded-full px-3 py-1 border-[1px] border-gray-700 text-white bg-transparent hover:border-white"
            >
              <Image
                src="/globe.png"
                alt="Globe"
                width={16}
                height={16}
                className="mr-2"
              />
              Português do Brasil
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#121212] to-black p-4">
          {/* Trending Songs Section */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Trending songs</h2>
              <Link
                href="#"
                className="text-sm text-gray-400 hover:text-white flex items-center"
              >
                Mostrar tudo
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
              {trendingSongs.map((song, index) => (
                <div
                  key={index}
                  className="bg-[#181818] p-3 rounded-md hover:bg-[#282828] transition-all cursor-pointer"
                >
                  <div className="relative mb-4 aspect-square">
                    <Image
                      src={song.image || "/placeholder.svg"}
                      alt={song.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <h3 className="font-semibold text-sm truncate">
                    {song.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1 truncate">
                    {song.artist}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Popular Artists Section */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Popular artists</h2>
              <Link
                href="#"
                className="text-sm text-gray-400 hover:text-white flex items-center"
              >
                Mostrar tudo
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
              {popularArtists.map((artist, index) => (
                <div
                  key={index}
                  className="bg-[#181818] p-3 rounded-md hover:bg-[#282828] transition-all cursor-pointer"
                >
                  <div className="relative mb-4 aspect-square">
                    <Image
                      src={artist.image || "/placeholder.svg"}
                      alt={artist.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <h3 className="font-semibold text-sm truncate">
                    {artist.name}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1">Artista</p>
                </div>
              ))}
            </div>
          </section>

          {/* Popular Albums Section */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Popular albums and singles</h2>
              <Link
                href="#"
                className="text-sm text-gray-400 hover:text-white flex items-center"
              >
                Mostrar tudo
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
              {popularAlbums.map((album, index) => (
                <div
                  key={index}
                  className="bg-[#181818] p-3 rounded-md hover:bg-[#282828] transition-all cursor-pointer"
                >
                  <div className="relative mb-4 aspect-square">
                    <Image
                      src={album.image || "/placeholder.svg"}
                      alt={album.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <h3 className="font-semibold text-sm truncate">
                    {album.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1 truncate">
                    {album.artist}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Premium Banner */}
      <div className="bg-gradient-to-r from-purple-700 to-blue-500 p-3 flex justify-between items-center">
        <div>
          <p className="text-xs font-bold">Testar o Premium de graça</p>
          <p className="text-xs">
            Inscreva-se para curtir música ilimitada e podcasts só com alguns
            anúncios. Não precisa de cartão de crédito.
          </p>
        </div>
        <Button className="bg-white text-black hover:bg-gray-200 rounded-full text-sm font-bold whitespace-nowrap">
          Inscreva-se grátis
        </Button>
      </div>
    </div>
  );
}

const trendingSongs = [
  {
    title: "Kiss Me Now",
    artist: "Pierce The Veil",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    title: "Nope your too late i already died",
    artist: "wifiskeleton, i wanna be a jack-o-lantern",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    title: "Gnarly",
    artist: "KATSEYE",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    title: "Pretty Little Baby",
    artist: "Connie Francis",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    title: "Me Prometi",
    artist: "Ivan Cornejo",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    title: "peliculiando",
    artist: "Fuerza Regida",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    title: "Burning Blue",
    artist: "Mariah the Scientist",
    image: "/placeholder.svg?height=200&width=200",
  },
];

const popularArtists = [
  { name: "Kendrick Lamar", image: "/placeholder.svg?height=200&width=200" },
  { name: "Drake", image: "/placeholder.svg?height=200&width=200" },
  { name: "The Weeknd", image: "/placeholder.svg?height=200&width=200" },
  { name: "Lady Gaga", image: "/placeholder.svg?height=200&width=200" },
  { name: "Post Malone", image: "/placeholder.svg?height=200&width=200" },
  { name: "Rihanna", image: "/placeholder.svg?height=200&width=200" },
  { name: "Billie Eilish", image: "/placeholder.svg?height=200&width=200" },
];

const popularAlbums = [
  {
    title: "Album 1",
    artist: "Artist 1",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    title: "Album 2",
    artist: "Artist 2",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    title: "Album 3",
    artist: "Artist 3",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    title: "Album 4",
    artist: "Artist 4",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    title: "Album 5",
    artist: "Artist 5",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    title: "Album 6",
    artist: "Artist 6",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    title: "Album 7",
    artist: "Artist 7",
    image: "/placeholder.svg?height=200&width=200",
  },
];
