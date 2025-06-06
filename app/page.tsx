"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail, Search, Menu, ArrowRight, Smartphone, Brain, Shield, Lightbulb, Users, BookOpen, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Tipos de datos
interface NewsArticle {
  id: number
  title: string
  summary: string
  category: string
  image: string
  timeAgo: string
  featured: boolean
}

interface Category {
  id: string
  name: string
  icon: any
  color: string
}

export default function LandingPage() {
  // Estados
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showAllNews, setShowAllNews] = useState(false)

  // Datos de categorías
  const categories: Category[] = [
    { id: "ia", name: "IA Simple", icon: Brain, color: "bg-blue-600" },
    { id: "smartphones", name: "Smartphones", icon: Smartphone, color: "bg-gray-600" },
    { id: "redes", name: "Redes Sociales", icon: Users, color: "bg-blue-500" },
    { id: "seguridad", name: "Seguridad", icon: Shield, color: "bg-red-600" },
    { id: "innovacion", name: "Innovación", icon: Lightbulb, color: "bg-yellow-600" },
    { id: "tutoriales", name: "Tutoriales", icon: BookOpen, color: "bg-green-600" },
  ]

  // Datos de noticias
  const [allNews] = useState<NewsArticle[]>([
    {
      id: 1,
      title: "¿Qué es ChatGPT y cómo puede ayudarte en tu día a día?",
      summary:
        "Te explicamos de forma sencilla qué es la inteligencia artificial y cómo puedes usar ChatGPT para tareas cotidianas como escribir emails o planificar viajes.",
      category: "ia",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
      timeAgo: "Hace 2 horas",
      featured: true,
    },
    {
      id: 2,
      title: "iPhone 15: Las 5 mejoras que realmente importan",
      summary:
        "Sin tecnicismos complicados, te contamos qué cambió en el nuevo iPhone y si vale la pena actualizar tu teléfono actual.",
      category: "smartphones",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=2187&auto=format&fit=crop",
      timeAgo: "Hace 5 horas",
      featured: true,
    },
    {
      id: 3,
      title: "Cómo proteger tus datos personales en 5 pasos simples",
      summary:
        "Guía práctica para mantener segura tu información en internet, redes sociales y aplicaciones móviles. Sin complicaciones técnicas.",
      category: "seguridad",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
      timeAgo: "Hace 8 horas",
      featured: true,
    },
    {
      id: 4,
      title: "¿Qué es la Realidad Virtual y para qué sirve?",
      summary:
        "Te explicamos de forma sencilla qué es la VR y cómo está cambiando la forma en que jugamos, trabajamos y aprendemos.",
      category: "innovacion",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop",
      timeAgo: "Hace 12 horas",
      featured: false,
    },
    {
      id: 5,
      title: "Bitcoin explicado para principiantes",
      summary:
        "Guía básica sobre qué son las criptomonedas, cómo funcionan y si deberías considerar invertir en ellas.",
      category: "innovacion",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2139&auto=format&fit=crop",
      timeAgo: "Hace 1 día",
      featured: false,
    },
    {
      id: 6,
      title: "Cómo elegir la mejor plataforma de streaming",
      summary: "Comparamos Netflix, Disney+, Amazon Prime y más para ayudarte a decidir cuál se adapta mejor a ti.",
      category: "tutoriales",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
      timeAgo: "Hace 1 día",
      featured: false,
    },
    {
      id: 7,
      title: "Herramientas tech para trabajar desde casa",
      summary:
        "Las mejores aplicaciones y dispositivos para ser productivo trabajando desde casa, explicado paso a paso.",
      category: "tutoriales",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop",
      timeAgo: "Hace 2 días",
      featured: false,
    },
    {
      id: 8,
      title: "WhatsApp vs Telegram: ¿Cuál es más seguro?",
      summary: "Comparamos las funciones de seguridad de las apps de mensajería más populares para ayudarte a elegir.",
      category: "redes",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2074&auto=format&fit=crop",
      timeAgo: "Hace 3 días",
      featured: false,
    },
    {
      id: 9,
      title: "Samsung Galaxy S24: ¿Vale la pena el cambio?",
      summary: "Analizamos las nuevas características del Galaxy S24 y te ayudamos a decidir si es momento de cambiar.",
      category: "smartphones",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=2070&auto=format&fit=crop",
      timeAgo: "Hace 3 días",
      featured: false,
    },
    {
      id: 10,
      title: "Cómo usar la IA para mejorar tus fotos",
      summary:
        "Descubre aplicaciones gratuitas que usan inteligencia artificial para mejorar automáticamente tus fotografías.",
      category: "ia",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2064&auto=format&fit=crop",
      timeAgo: "Hace 4 días",
      featured: false,
    },
  ])

  // Filtrar noticias
  const filteredNews = allNews.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredNews = filteredNews.filter((article) => article.featured)
  const recentNews = filteredNews.filter((article) => !article.featured)
  const displayedRecentNews = showAllNews ? recentNews : recentNews.slice(0, 4)

  // Funciones
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // La búsqueda se actualiza automáticamente con el estado
  }

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setSearchTerm("") // Limpiar búsqueda al cambiar categoría
  }

  const handleSubscription = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && name) {
      setIsSubscribed(true)
      setTimeout(() => {
        setIsSubscribed(false)
        setEmail("")
        setName("")
      }, 3000)
    }
  }

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.name : categoryId
  }

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.color : "bg-gray-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-gray-900 bg-fixed">
      <div className="absolute inset-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=2125&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>

      {/* Header con glassmorphism */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/10 border-b border-white/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Hola, Tecnología</h1>
                <span className="text-sm text-blue-200">News</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex items-center space-x-6">
                <button
                  onClick={() => handleCategoryClick("all")}
                  className={`transition-colors ${selectedCategory === "all" ? "text-blue-300" : "text-white hover:text-blue-300"}`}
                >
                  Inicio
                </button>
                <button
                  onClick={() => handleCategoryClick("ia")}
                  className={`transition-colors ${selectedCategory === "ia" ? "text-blue-300" : "text-white hover:text-blue-300"}`}
                >
                  IA Simple
                </button>
                <button
                  onClick={() => handleCategoryClick("smartphones")}
                  className={`transition-colors ${selectedCategory === "smartphones" ? "text-blue-300" : "text-white hover:text-blue-300"}`}
                >
                  Gadgets
                </button>
                <button
                  onClick={() => handleCategoryClick("tutoriales")}
                  className={`transition-colors ${selectedCategory === "tutoriales" ? "text-blue-300" : "text-white hover:text-blue-300"}`}
                >
                  Tutoriales
                </button>
                <button
                  onClick={() => handleCategoryClick("seguridad")}
                  className={`transition-colors ${selectedCategory === "seguridad" ? "text-blue-300" : "text-white hover:text-blue-300"}`}
                >
                  Seguridad
                </button>
              </nav>
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Buscar en tecnología..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 rounded-full bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:bg-white/20"
                />
              </form>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Menú móvil */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/20">
              <div className="flex flex-col space-y-4 mt-4">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Buscar en tecnología..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full rounded-full bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:bg-white/20"
                  />
                </form>
                <nav className="flex flex-col space-y-2">
                  <button
                    onClick={() => {
                      handleCategoryClick("all")
                      setIsMenuOpen(false)
                    }}
                    className={`text-left transition-colors ${selectedCategory === "all" ? "text-blue-300" : "text-white hover:text-blue-300"}`}
                  >
                    Inicio
                  </button>
                  <button
                    onClick={() => {
                      handleCategoryClick("ia")
                      setIsMenuOpen(false)
                    }}
                    className={`text-left transition-colors ${selectedCategory === "ia" ? "text-blue-300" : "text-white hover:text-blue-300"}`}
                  >
                    IA Simple
                  </button>
                  <button
                    onClick={() => {
                      handleCategoryClick("smartphones")
                      setIsMenuOpen(false)
                    }}
                    className={`text-left transition-colors ${selectedCategory === "smartphones" ? "text-blue-300" : "text-white hover:text-blue-300"}`}
                  >
                    Gadgets
                  </button>
                  <button
                    onClick={() => {
                      handleCategoryClick("tutoriales")
                      setIsMenuOpen(false)
                    }}
                    className={`text-left transition-colors ${selectedCategory === "tutoriales" ? "text-blue-300" : "text-white hover:text-blue-300"}`}
                  >
                    Tutoriales
                  </button>
                  <button
                    onClick={() => {
                      handleCategoryClick("seguridad")
                      setIsMenuOpen(false)
                    }}
                    className={`text-left transition-colors ${selectedCategory === "seguridad" ? "text-blue-300" : "text-white hover:text-blue-300"}`}
                  >
                    Seguridad
                  </button>
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Banner de anuncio superior */}
      <section className="py-4 bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 text-center">
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-200 uppercase tracking-wide">Publicidad</span>
              <button className="text-blue-200 hover:text-white text-xs">✕</button>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold text-white mb-2">Aprende Tecnología Fácil</h3>
              <p className="text-blue-100 text-sm mb-4">
                Cursos online diseñados para principiantes - Sin tecnicismos complicados
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm">Explorar cursos</Button>
            </div>
          </div>
        </div>
      </section>

      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">La tecnología nunca fue tan fácil</h1>
              <p className="text-xl text-gray-200 mb-8">
                Descubre los últimos avances en IA, gadgets y tecnología sin complicaciones. Noticias tech para todos,
                explicadas en español claro y sencillo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => handleCategoryClick("all")} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Últimas Noticias Tech
                </Button>
                <Button
                  onClick={() => handleCategoryClick("tutoriales")}
                  variant="outline"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                >
                  Guías para Principiantes
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Filtros activos */}
        {(selectedCategory !== "all" || searchTerm) && (
          <section className="py-4 bg-white/5 backdrop-blur-sm">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-white">Filtros activos:</span>
                {selectedCategory !== "all" && (
                  <div className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                    <span>{getCategoryName(selectedCategory)}</span>
                    <button onClick={() => handleCategoryClick("all")} className="hover:bg-blue-700 rounded-full p-1">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {searchTerm && (
                  <div className="flex items-center gap-2 bg-gray-600 text-white px-3 py-1 rounded-full text-sm">
                    <span>"{searchTerm}"</span>
                    <button onClick={() => setSearchTerm("")} className="hover:bg-gray-700 rounded-full p-1">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                <span className="text-gray-300 text-sm">
                  {filteredNews.length} artículo{filteredNews.length !== 1 ? "s" : ""} encontrado
                  {filteredNews.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </section>
        )}

        {/* Noticias Destacadas */}
        {featuredNews.length > 0 && (
          <section className="py-16 bg-white/5 backdrop-blur-sm">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-bold text-white">
                  {selectedCategory === "all"
                    ? "Noticias Tech Destacadas"
                    : `${getCategoryName(selectedCategory)} Destacadas`}
                </h2>
                <button
                  onClick={() => setShowAllNews(!showAllNews)}
                  className="flex items-center text-blue-300 hover:text-blue-400"
                >
                  {showAllNews ? "Ver menos" : "Ver todas"} <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredNews.map((article) => (
                  <div
                    key={article.id}
                    className="rounded-xl overflow-hidden backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
                  >
                    <div className="relative h-48">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-4 ${getCategoryColor(article.category)}`}
                      >
                        {getCategoryName(article.category)}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-200 mb-4">{article.summary}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">{article.timeAgo}</span>
                        <button className="text-blue-300 hover:text-blue-400 text-sm font-medium">Leer más</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Categorías */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-10">Explora Tecnología por Temas</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => {
                const IconComponent = category.icon
                const isActive = selectedCategory === category.id
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`rounded-xl backdrop-blur-md border border-white/20 p-6 text-center transition-all duration-300 ${
                      isActive ? "bg-white/30 border-blue-400" : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    <div
                      className={`${category.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-medium">{category.name}</h3>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Artículos Recientes */}
        {recentNews.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-white mb-10">
                {selectedCategory === "all" ? "Artículos Recientes" : `Más de ${getCategoryName(selectedCategory)}`}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayedRecentNews.map((article) => (
                  <div
                    key={article.id}
                    className="flex gap-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <span className={`text-xs px-2 py-1 rounded text-white ${getCategoryColor(article.category)}`}>
                        {getCategoryName(article.category)}
                      </span>
                      <h3 className="text-lg font-medium text-white mb-1 mt-2">{article.title}</h3>
                      <p className="text-gray-300 text-sm mb-2">{article.summary.substring(0, 100)}...</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">{article.timeAgo}</span>
                        <button className="text-blue-300 hover:text-blue-400 text-sm">Leer más</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {recentNews.length > 4 && !showAllNews && (
                <div className="text-center mt-8">
                  <Button onClick={() => setShowAllNews(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                    Ver más artículos
                  </Button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Mensaje cuando no hay resultados */}
        {filteredNews.length === 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-12">
                <h3 className="text-2xl font-bold text-white mb-4">No se encontraron artículos</h3>
                <p className="text-gray-200 mb-6">
                  No hay artículos que coincidan con tu búsqueda. Intenta con otros términos o explora diferentes
                  categorías.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      handleCategoryClick("all")
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Ver todas las noticias
                  </Button>
                  <Button
                    onClick={() => handleCategoryClick("ia")}
                    variant="outline"
                    className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                  >
                    Explorar IA Simple
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Suscripción */}
        <section className="py-16 bg-white/5 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Mantente al Día con la Tecnología</h2>
                <p className="text-gray-200">
                  Recibe las noticias tech más importantes explicadas de forma simple, directamente en tu email. Sin
                  spam, solo contenido útil.
                </p>
              </div>

              {isSubscribed ? (
                <div className="text-center">
                  <div className="bg-green-600 text-white p-4 rounded-lg mb-4">
                    <h3 className="font-bold">¡Gracias por suscribirte!</h3>
                    <p>Pronto recibirás nuestras mejores noticias tech en tu email.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscription} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      type="text"
                      placeholder="Tu nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:bg-white/20"
                    />
                    <Input
                      type="email"
                      placeholder="Tu correo electrónico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:bg-white/20"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      className="rounded border-white/20 bg-white/10 text-blue-600 focus:ring-blue-600"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-200">
                      Acepto recibir noticias tech y consejos útiles de Hola, Tecnología News
                    </label>
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Mail className="mr-2 h-4 w-4" /> Suscribirme al Newsletter Tech
                  </Button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="backdrop-blur-lg bg-white/5 border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-4">
                <div className="bg-blue-600 text-white p-2 rounded-lg">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Hola, Tecnología</h2>
                  <span className="text-sm text-blue-200">News</span>
                </div>
              </Link>
              <p className="text-gray-200 mb-4">
                Noticias de tecnología explicadas de forma simple para todos. Sin tecnicismos, solo información útil y
                fácil de entender.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4">Categorías Tech</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => handleCategoryClick(category.id)}
                      className="text-gray-200 hover:text-blue-300 transition-colors text-left"
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4">Recursos</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleCategoryClick("tutoriales")}
                    className="text-gray-200 hover:text-blue-300 transition-colors"
                  >
                    Guías para Principiantes
                  </button>
                </li>
                <li>
                  <Link href="#" className="text-gray-200 hover:text-blue-300 transition-colors">
                    Glosario Tech
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-200 hover:text-blue-300 transition-colors">
                    Comparativas de Productos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-200 hover:text-blue-300 transition-colors">
                    Preguntas Frecuentes
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4">Contacto</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-200 hover:text-blue-300 transition-colors">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-200 hover:text-blue-300 transition-colors">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-200 hover:text-blue-300 transition-colors">
                    Publicidad
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-200 hover:text-blue-300 transition-colors">
                    Política de Privacidad
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-300">
              © {new Date().getFullYear()} Hola, Tecnología News. Haciendo la tecnología accesible para todos.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
