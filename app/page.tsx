"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Mail,
  Search,
  Menu,
  ArrowRight,
  Smartphone,
  Brain,
  Shield,
  Lightbulb,
  Users,
  BookOpen,
  X,
  ArrowLeft,
  Clock,
  Share2,
  Heart,
  MessageCircle,
} from "lucide-react"
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
  content: string
  author: string
  readTime: string
  tags: string[]
}

interface Category {
  id: string
  name: string
  icon: any
  color: string
}

interface GoogleUser {
  name: string
  email: string
  picture?: string
}

// Declarar tipos globales para Google Identity Services
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void
          renderButton: (element: HTMLElement, config: any) => void
          prompt: () => void
        }
      }
    }
  }
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
  const [googleUser, setGoogleUser] = useState<GoogleUser | null>(null)
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false)
  const [currentView, setCurrentView] = useState<"home" | "article">("home")
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)

  // Datos de categorías
  const categories: Category[] = [
    { id: "ia", name: "IA Simple", icon: Brain, color: "bg-blue-600" },
    { id: "smartphones", name: "Smartphones", icon: Smartphone, color: "bg-gray-600" },
    { id: "redes", name: "Redes Sociales", icon: Users, color: "bg-blue-500" },
    { id: "seguridad", name: "Seguridad", icon: Shield, color: "bg-red-600" },
    { id: "innovacion", name: "Innovación", icon: Lightbulb, color: "bg-yellow-600" },
    { id: "tutoriales", name: "Tutoriales", icon: BookOpen, color: "bg-green-600" },
  ]

  // Datos de noticias con contenido completo
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
      author: "María González",
      readTime: "5 min",
      tags: ["IA", "ChatGPT", "Productividad", "Principiantes"],
      content: `
        <h2>¿Qué es ChatGPT exactamente?</h2>
        <p>ChatGPT es como tener un asistente muy inteligente que puede ayudarte con casi cualquier tarea que requiera escribir o pensar. Imagínalo como un amigo muy culto que siempre está disponible para ayudarte.</p>
        
        <h3>¿Cómo funciona de manera simple?</h3>
        <p>Sin entrar en tecnicismos complicados, ChatGPT "lee" millones de textos y aprende patrones de cómo las personas escriben y se comunican. Es como si hubiera leído toda una biblioteca y ahora puede ayudarte basándose en todo ese conocimiento.</p>
        
        <h3>Usos prácticos en tu día a día:</h3>
        
        <h4>1. Escribir emails profesionales</h4>
        <p>¿Te cuesta redactar emails de trabajo? Dile a ChatGPT: "Ayúdame a escribir un email para solicitar vacaciones" y te dará una versión profesional y cortés.</p>
        
        <h4>2. Planificar viajes</h4>
        <p>Puedes pedirle: "Crea un itinerario de 3 días para visitar Barcelona con un presupuesto de 500 euros" y te dará sugerencias detalladas.</p>
        
        <h4>3. Resolver dudas cotidianas</h4>
        <p>Desde "¿Cómo quito una mancha de vino?" hasta "¿Qué regalo le compro a mi hermana de 25 años?", ChatGPT puede darte ideas útiles.</p>
        
        <h4>4. Aprender cosas nuevas</h4>
        <p>Puedes pedirle que te explique cualquier tema de forma simple. Por ejemplo: "Explícame qué son las criptomonedas como si tuviera 10 años".</p>
        
        <h3>Consejos para usarlo mejor:</h3>
        <ul>
          <li><strong>Sé específico:</strong> En lugar de "ayúdame con mi CV", di "ayúdame a escribir la sección de experiencia laboral para un puesto de marketing"</li>
          <li><strong>Pide ejemplos:</strong> Siempre puedes decir "dame un ejemplo" para entender mejor</li>
          <li><strong>No tengas miedo de preguntar:</strong> ChatGPT no se cansa ni se molesta, puedes hacer todas las preguntas que quieras</li>
        </ul>
        
        <h3>¿Es gratis?</h3>
        <p>Sí, puedes usar ChatGPT gratis en chat.openai.com. Solo necesitas crear una cuenta con tu email. También hay una versión de pago con funciones extra, pero la gratuita es perfecta para empezar.</p>
        
        <h3>¿Es seguro?</h3>
        <p>En general sí, pero recuerda no compartir información personal sensible como contraseñas, números de tarjeta de crédito o datos muy privados.</p>
        
        <p><strong>Conclusión:</strong> ChatGPT es una herramienta increíblemente útil que puede ahorrarte tiempo y ayudarte a ser más productivo. Lo mejor es que no necesitas ser un experto en tecnología para usarlo. ¡Solo empieza a conversar con él como lo harías con un amigo muy inteligente!</p>
      `,
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
      author: "Carlos Ruiz",
      readTime: "4 min",
      tags: ["iPhone", "Apple", "Smartphones", "Tecnología"],
      content: `
        <h2>¿Vale la pena cambiar al iPhone 15?</h2>
        <p>Si tienes un iPhone y te preguntas si deberías actualizar al iPhone 15, aquí te explicamos las 5 mejoras más importantes de forma simple y clara.</p>
        
        <h3>1. Puerto USB-C (¡Por fin!)</h3>
        <p><strong>¿Qué significa esto para ti?</strong> Ya no necesitarás el cable Lightning exclusivo de Apple. Podrás usar el mismo cable que usas para cargar tu laptop, tablet o audífonos. Esto significa menos cables en tu bolsa y más compatibilidad.</p>
        <p><strong>¿Es importante?</strong> Sí, especialmente si viajas mucho o tienes otros dispositivos con USB-C.</p>
        
        <h3>2. Cámara mejorada (48 megapíxeles)</h3>
        <p><strong>¿Qué significa esto para ti?</strong> Fotos más nítidas y con más detalle, especialmente cuando haces zoom o cuando hay poca luz. También puedes tomar fotos "profesionales" sin saber de fotografía.</p>
        <p><strong>¿Es importante?</strong> Si tomas muchas fotos de tus hijos, mascotas, viajes o para redes sociales, notarás la diferencia.</p>
        
        <h3>3. Chip A17 Pro (Más velocidad)</h3>
        <p><strong>¿Qué significa esto para ti?</strong> Tu teléfono será más rápido abriendo aplicaciones, editando videos, jugando y haciendo varias cosas a la vez. También gastará menos batería.</p>
        <p><strong>¿Es importante?</strong> Si usas aplicaciones pesadas, editas videos o juegas, sí. Si solo usas WhatsApp y navegas, no notarás mucha diferencia.</p>
        
        <h3>4. Botón de Acción personalizable</h3>
        <p><strong>¿Qué significa esto para ti?</strong> Puedes programar un botón para que haga lo que tú quieras: abrir la cámara, prender la linterna, grabar una nota de voz, etc.</p>
        <p><strong>¿Es importante?</strong> Es cómodo, pero no es una razón suficiente para cambiar de teléfono.</p>
        
        <h3>5. Mejor duración de batería</h3>
        <p><strong>¿Qué significa esto para ti?</strong> Tu teléfono durará más horas sin necesidad de cargarlo. Aproximadamente 2-3 horas más que el iPhone 14.</p>
        <p><strong>¿Es importante?</strong> Si tu teléfono actual se queda sin batería antes de que termine el día, esta mejora te será muy útil.</p>
        
        <h3>¿Deberías comprarlo?</h3>
        
        <h4>SÍ, si tienes:</h4>
        <ul>
          <li>iPhone 12 o anterior</li>
          <li>Un teléfono que ya no te dura la batería</li>
          <li>Problemas con la cámara de tu teléfono actual</li>
          <li>Muchos dispositivos USB-C y quieres simplificar tus cables</li>
        </ul>
        
        <h4>NO, si tienes:</h4>
        <ul>
          <li>iPhone 14 o 13 (la diferencia no justifica el gasto)</li>
          <li>Un presupuesto ajustado</li>
          <li>Tu teléfono actual funciona perfectamente para lo que necesitas</li>
        </ul>
        
        <h3>¿Cuánto cuesta?</h3>
        <p>El iPhone 15 básico cuesta desde $799 USD (aproximadamente $14,000 MXN). Los modelos Pro son más caros pero incluyen funciones adicionales que la mayoría de personas no necesitan.</p>
        
        <p><strong>Consejo final:</strong> Si tu teléfono actual funciona bien para tus necesidades diarias, no hay prisa por cambiar. La tecnología siempre mejora, pero eso no significa que necesites lo último. Evalúa si las mejoras realmente solucionan problemas que tienes actualmente.</p>
      `,
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
      author: "Ana Martínez",
      readTime: "6 min",
      tags: ["Seguridad", "Privacidad", "Datos", "Internet"],
      content: `
        <h2>Protege tus datos personales sin complicarte</h2>
        <p>En el mundo digital actual, proteger tu información personal es tan importante como cerrar la puerta de tu casa. Aquí te enseñamos cómo hacerlo de forma simple.</p>
        
        <h3>Paso 1: Usa contraseñas fuertes y únicas</h3>
        <h4>¿Qué hacer?</h4>
        <ul>
          <li>Crea una contraseña diferente para cada cuenta importante</li>
          <li>Usa al menos 12 caracteres</li>
          <li>Combina letras, números y símbolos</li>
          <li>Evita información personal (tu nombre, fecha de nacimiento, etc.)</li>
        </ul>
        
        <h4>Truco fácil:</h4>
        <p>Piensa en una frase que recuerdes fácilmente, como "Me gusta comer pizza los viernes por la noche". Toma las primeras letras: "Mgcplvpln" y agrégale números y símbolos: "Mgcplvpln2024!"</p>
        
        <h4>¿Cómo recordar tantas contraseñas?</h4>
        <p>Usa un administrador de contraseñas como:</p>
        <ul>
          <li><strong>1Password</strong> (de pago, muy seguro)</li>
          <li><strong>Bitwarden</strong> (gratis y confiable)</li>
          <li><strong>El que viene en tu teléfono</strong> (iPhone o Android)</li>
        </ul>
        
        <h3>Paso 2: Activa la verificación en dos pasos</h3>
        <h4>¿Qué es esto?</h4>
        <p>Es como tener dos cerraduras en tu puerta. Además de tu contraseña, necesitas un código que llega a tu teléfono.</p>
        
        <h4>¿Dónde activarla?</h4>
        <ul>
          <li>Gmail/Google</li>
          <li>Facebook e Instagram</li>
          <li>WhatsApp</li>
          <li>Tu banco</li>
          <li>Apple ID o cuenta de Microsoft</li>
        </ul>
        
        <h4>¿Cómo activarla?</h4>
        <p>Ve a la configuración de seguridad de cada aplicación y busca "verificación en dos pasos" o "autenticación de dos factores". Sigue las instrucciones (son muy simples).</p>
        
        <h3>Paso 3: Revisa la privacidad en redes sociales</h3>
        <h4>Facebook e Instagram:</h4>
        <ul>
          <li>Ve a Configuración → Privacidad</li>
          <li>Cambia "¿Quién puede ver tus publicaciones?" a "Solo amigos"</li>
          <li>Limita quién puede buscarte por teléfono o email</li>
          <li>Revisa qué aplicaciones tienen acceso a tu cuenta</li>
        </ul>
        
        <h4>WhatsApp:</h4>
        <ul>
          <li>Ve a Configuración → Cuenta → Privacidad</li>
          <li>Configura quién puede ver tu "última vez", foto de perfil e info</li>
          <li>Activa la verificación en dos pasos</li>
        </ul>
        
        <h3>Paso 4: Ten cuidado con las aplicaciones que instalas</h3>
        <h4>Antes de instalar cualquier app:</h4>
        <ul>
          <li>Lee los comentarios de otros usuarios</li>
          <li>Verifica que sea del desarrollador oficial</li>
          <li>Revisa qué permisos pide (¿realmente necesita acceso a tu cámara?)</li>
          <li>Descarga solo de tiendas oficiales (App Store, Google Play)</li>
        </ul>
        
        <h4>Limpia regularmente:</h4>
        <ul>
          <li>Borra aplicaciones que ya no uses</li>
          <li>Revisa qué aplicaciones tienen acceso a tu ubicación, fotos, contactos</li>
          <li>Ve a Configuración → Privacidad en tu teléfono</li>
        </ul>
        
        <h3>Paso 5: Mantén todo actualizado</h3>
        <h4>¿Por qué es importante?</h4>
        <p>Las actualizaciones no solo traen funciones nuevas, también arreglan problemas de seguridad.</p>
        
        <h4>¿Qué actualizar?</h4>
        <ul>
          <li>Tu teléfono (iOS o Android)</li>
          <li>Aplicaciones importantes</li>
          <li>Tu computadora</li>
          <li>Tu navegador web</li>
        </ul>
        
        <h4>Truco:</h4>
        <p>Activa las actualizaciones automáticas para que se hagan solas mientras duermes.</p>
        
        <h3>Señales de alerta: ¿Cuándo preocuparse?</h3>
        <ul>
          <li>Recibes emails de "actividad sospechosa" en tus cuentas</li>
          <li>Tus amigos te dicen que recibieron mensajes extraños de ti</li>
          <li>Aparecen aplicaciones en tu teléfono que no recuerdas haber instalado</li>
          <li>Tu teléfono o computadora va muy lento de repente</li>
          <li>Recibes facturas de servicios que no contrataste</li>
        </ul>
        
        <h3>¿Qué hacer si crees que te hackearon?</h3>
        <ol>
          <li>Cambia inmediatamente las contraseñas de tus cuentas importantes</li>
          <li>Revisa tus estados de cuenta bancarios</li>
          <li>Notifica a tu banco si ves movimientos extraños</li>
          <li>Escanea tu computadora con un antivirus</li>
          <li>Considera congelar temporalmente tu reporte de crédito</li>
        </ol>
        
        <p><strong>Recuerda:</strong> La seguridad digital no es perfecta, pero estos pasos simples te protegerán del 95% de los problemas comunes. No necesitas ser un experto, solo ser consistente con estos hábitos básicos.</p>
      `,
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
      author: "Diego López",
      readTime: "5 min",
      tags: ["Realidad Virtual", "VR", "Tecnología", "Innovación"],
      content: `
        <h2>Realidad Virtual: Más que solo videojuegos</h2>
        <p>La Realidad Virtual (VR) ya no es ciencia ficción. Te explicamos qué es, cómo funciona y por qué podría cambiar tu forma de trabajar, aprender y entretenerte.</p>
        
        <h3>¿Qué es la Realidad Virtual exactamente?</h3>
        <p>Imagina ponerte unos lentes especiales y de repente estar en la cima del Everest, en el fondo del océano, o en una reunión de trabajo con personas de todo el mundo, todo sin salir de tu casa. Eso es la Realidad Virtual.</p>
        
        <p>Es una tecnología que crea un mundo digital tan realista que tu cerebro cree que realmente estás ahí. Usas unos lentes especiales (llamados "headset" o visor VR) que te muestran imágenes en 360 grados y a menudo incluyen sonido envolvente.</p>
        
        <h3>¿Cómo funciona de manera simple?</h3>
        <p>Sin entrar en detalles técnicos complicados:</p>
        <ul>
          <li><strong>Pantallas muy cerca de tus ojos:</strong> Te muestran imágenes diferentes para cada ojo, creando profundidad</li>
          <li><strong>Sensores de movimiento:</strong> Detectan cuando mueves tu cabeza y ajustan la imagen en tiempo real</li>
          <li><strong>Audio espacial:</strong> El sonido viene de diferentes direcciones, como en la vida real</li>
          <li><strong>Controles de mano:</strong> Te permiten interactuar con objetos virtuales</li>
        </ul>
        
        <h3>Usos prácticos más allá de los videojuegos</h3>
        
        <h4>1. Educación y entrenamiento</h4>
        <ul>
          <li><strong>Medicina:</strong> Los estudiantes pueden "operar" pacientes virtuales sin riesgo</li>
          <li><strong>Historia:</strong> Caminar por la antigua Roma o presenciar eventos históricos</li>
          <li><strong>Ciencias:</strong> Explorar el interior de una célula o viajar por el sistema solar</li>
          <li><strong>Entrenamiento laboral:</strong> Practicar situaciones peligrosas de forma segura</li>
        </ul>
        
        <h4>2. Trabajo remoto y reuniones</h4>
        <ul>
          <li>Reuniones donde sientes que realmente estás con tus colegas</li>
          <li>Presentaciones más inmersivas</li>
          <li>Colaboración en proyectos 3D</li>
          <li>Reducción de la fatiga de las videollamadas tradicionales</li>
        </ul>
        
        <h4>3. Terapia y salud mental</h4>
        <ul>
          <li><strong>Fobias:</strong> Exposición gradual a miedos en un ambiente controlado</li>
          <li><strong>PTSD:</strong> Terapia de exposición para veteranos de guerra</li>
          <li><strong>Ansiedad social:</strong> Practicar interacciones sociales</li>
          <li><strong>Relajación:</strong> Meditación en entornos virtuales tranquilos</li>
        </ul>
        
        <h4>4. Fitness y ejercicio</h4>
        <ul>
          <li>Hacer ejercicio mientras "escalas" montañas virtuales</li>
          <li>Clases de yoga en playas paradisíacas</li>
          <li>Deportes virtuales que te hacen moverte físicamente</li>
          <li>Entrenamiento personal con instructores virtuales</li>
        </ul>
        
        <h4>5. Turismo virtual</h4>
        <ul>
          <li>Visitar museos famosos desde casa</li>
          <li>Explorar destinos antes de viajar</li>
          <li>Experiencias para personas con movilidad limitada</li>
          <li>Viajes en el tiempo a civilizaciones antiguas</li>
        </ul>
        
        <h3>¿Qué necesitas para empezar?</h3>
        
        <h4>Opciones económicas (menos de $50 USD):</h4>
        <ul>
          <li><strong>Google Cardboard:</strong> Usa tu smartphone</li>
          <li><strong>Samsung Gear VR:</strong> Para teléfonos Samsung</li>
        </ul>
        
        <h4>Opciones intermedias ($200-400 USD):</h4>
        <ul>
          <li><strong>Meta Quest 2:</strong> No necesita computadora, fácil de usar</li>
          <li><strong>PlayStation VR:</strong> Si tienes PlayStation 4 o 5</li>
        </ul>
        
        <h4>Opciones avanzadas ($500+ USD):</h4>
        <ul>
          <li><strong>Meta Quest Pro:</strong> Para trabajo y entretenimiento</li>
          <li><strong>HTC Vive:</strong> Requiere computadora potente</li>
        </ul>
        
        <h3>¿Cuáles son las limitaciones actuales?</h3>
        
        <h4>Problemas técnicos:</h4>
        <ul>
          <li><strong>Mareo:</strong> Algunas personas se marean al principio</li>
          <li><strong>Peso:</strong> Los visores pueden ser pesados para uso prolongado</li>
          <li><strong>Resolución:</strong> Aunque mejora constantemente, aún no es perfecta</li>
          <li><strong>Cables:</strong> Algunos modelos requieren muchos cables</li>
        </ul>
        
        <h4>Limitaciones sociales:</h4>
        <ul>
          <li>Te aísla físicamente de las personas a tu alrededor</li>
          <li>Puede ser antisocial si se usa en exceso</li>
          <li>Curva de aprendizaje para personas mayores</li>
        </ul>
        
        <h3>¿Vale la pena invertir ahora?</h3>
        
        <h4>SÍ, si:</h4>
        <ul>
          <li>Te gusta probar tecnología nueva</li>
          <li>Trabajas en educación, entrenamiento o diseño</li>
          <li>Quieres una forma nueva de hacer ejercicio</li>
          <li>Tienes limitaciones para viajar</li>
        </ul>
        
        <h4>ESPERA, si:</h4>
        <ul>
          <li>Tu presupuesto es muy ajustado</li>
          <li>Te mareas fácilmente</li>
          <li>Prefieres actividades sociales presenciales</li>
          <li>No tienes mucho espacio en casa</li>
        </ul>
        
        <h3>El futuro de la VR</h3>
        <p>En los próximos 5 años veremos:</p>
        <ul>
          <li>Visores más ligeros y cómodos</li>
          <li>Mejor resolución (casi indistinguible de la realidad)</li>
          <li>Integración con inteligencia artificial</li>
          <li>Más aplicaciones para trabajo y educación</li>
          <li>Precios más accesibles</li>
        </ul>
        
        <p><strong>Conclusión:</strong> La Realidad Virtual ya no es solo para gamers. Es una herramienta poderosa que está transformando la educación, el trabajo, la salud y el entretenimiento. Aunque aún tiene limitaciones, la tecnología mejora rápidamente y cada vez es más accesible para el usuario promedio.</p>
      `,
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
      author: "Roberto Silva",
      readTime: "7 min",
      tags: ["Bitcoin", "Criptomonedas", "Inversión", "Finanzas"],
      content: `
        <h2>Bitcoin: La moneda digital que todos mencionan</h2>
        <p>Si has escuchado hablar de Bitcoin pero no entiendes qué es exactamente, esta guía te lo explicará de forma simple y sin tecnicismos complicados.</p>
        
        <h3>¿Qué es Bitcoin exactamente?</h3>
        <p>Bitcoin es dinero digital. Imagina que en lugar de tener billetes físicos en tu cartera, tienes "monedas digitales" en tu teléfono o computadora. Pero a diferencia del dinero tradicional, Bitcoin no está controlado por ningún banco o gobierno.</p>
        
        <h4>Analogía simple:</h4>
        <p>Piensa en Bitcoin como el oro digital. Así como el oro es valioso porque es escaso y la gente confía en él, Bitcoin es valioso porque:</p>
        <ul>
          <li>Solo existirán 21 millones de bitcoins (escasez)</li>
          <li>Es muy difícil de falsificar</li>
          <li>Cada vez más personas lo aceptan como forma de pago</li>
        </ul>
        
        <h3>¿Cómo funciona de manera simple?</h3>
        
        <h4>1. La blockchain (cadena de bloques)</h4>
        <p>Imagina un libro de contabilidad gigante que registra todas las transacciones de Bitcoin. Este libro está copiado en miles de computadoras alrededor del mundo. Cuando alguien envía Bitcoin, todas estas computadoras verifican que la transacción sea válida.</p>
        
        <h4>2. Las carteras digitales</h4>
        <p>Para tener Bitcoin necesitas una "cartera digital" (wallet). Es como una aplicación en tu teléfono que guarda tus bitcoins de forma segura. Cada cartera tiene una dirección única (como un número de cuenta bancaria).</p>
        
        <h4>3. Las transacciones</h4>
        <p>Enviar Bitcoin es como enviar un email, pero en lugar de texto, envías dinero. La transacción se registra en la blockchain y es irreversible.</p>
        
        <h3>¿Para qué se usa Bitcoin?</h3>
        
        <h4>1. Como inversión</h4>
        <ul>
          <li>Muchas personas compran Bitcoin esperando que su valor aumente</li>
          <li>Lo ven como una protección contra la inflación</li>
          <li>Diversificación de portafolio de inversiones</li>
        </ul>
        
        <h4>2. Para pagos internacionales</h4>
        <ul>
          <li>Enviar dinero a otros países sin bancos intermediarios</li>
          <li>Transacciones más rápidas que las transferencias bancarias tradicionales</li>
          <li>Menores comisiones para envíos internacionales</li>
        </ul>
        
        <h4>3. Como reserva de valor</h4>
        <ul>
          <li>En países con alta inflación, como alternativa a la moneda local</li>
          <li>Para personas sin acceso a servicios bancarios tradicionales</li>
        </ul>
        
        <h3>¿Cómo comprar Bitcoin?</h3>
        
        <h4>Plataformas populares y confiables:</h4>
        <ul>
          <li><strong>Coinbase:</strong> Muy fácil para principiantes</li>
          <li><strong>Binance:</strong> Más opciones, pero más compleja</li>
          <li><strong>Kraken:</strong> Buena reputación de seguridad</li>
          <li><strong>Bitso:</strong> Popular en México y Latinoamérica</li>
        </ul>
        
        <h4>Pasos básicos:</h4>
        <ol>
          <li>Crea una cuenta en una plataforma confiable</li>
          <li>Verifica tu identidad (como abrir una cuenta bancaria)</li>
          <li>Conecta tu tarjeta de débito o cuenta bancaria</li>
          <li>Compra la cantidad de Bitcoin que desees</li>
          <li>Transfiere el Bitcoin a tu cartera personal (recomendado para cantidades grandes)</li>
        </ol>
        
        <h3>Riesgos importantes que debes conocer</h3>
        
        <h4>1. Volatilidad extrema</h4>
        <ul>
          <li>El precio puede subir o bajar 20% en un día</li>
          <li>Puedes perder mucho dinero rápidamente</li>
          <li>También puedes ganar mucho, pero es impredecible</li>
        </ul>
        
        <h4>2. Riesgos de seguridad</h4>
        <ul>
          <li>Si pierdes tu contraseña, pierdes tu Bitcoin para siempre</li>
          <li>Los hackers pueden robar Bitcoin de plataformas</li>
          <li>Las transacciones son irreversibles</li>
        </ul>
        
        <h4>3. Regulación incierta</h4>
        <ul>
          <li>Los gobiernos pueden prohibir o regular Bitcoin</li>
          <li>Cambios en las leyes pueden afectar el precio</li>
        </ul>
        
        <h4>4. Aspectos técnicos</h4>
        <ul>
          <li>Puede ser confuso para personas no técnicas</li>
          <li>Errores en direcciones pueden resultar en pérdida total</li>
        </ul>
        
        <h3>¿Deberías invertir en Bitcoin?</h3>
        
        <h4>Considera Bitcoin SI:</h4>
        <ul>
          <li>Tienes dinero que puedes permitirte perder completamente</li>
          <li>Entiendes que es una inversión de alto riesgo</li>
          <li>Tienes un portafolio de inversiones diversificado</li>
          <li>Estás dispuesto a aprender sobre tecnología</li>
          <li>Puedes manejar la volatilidad emocional</li>
        </ul>
        
        <h4>NO inviertas en Bitcoin SI:</h4>
        <ul>
          <li>Necesitas ese dinero para gastos básicos</li>
          <li>No puedes permitirte perder la inversión</li>
          <li>Buscas ganancias garantizadas</li>
          <li>No entiendes cómo funciona</li>
          <li>Te estresa ver fluctuaciones en el precio</li>
        </ul>
        
        <h3>Consejos para principiantes</h3>
        
        <h4>1. Empieza pequeño</h4>
        <p>Invierte solo una cantidad pequeña al principio (como $50-100 USD) para aprender cómo funciona.</p>
        
        <h4>2. Edúcate primero</h4>
        <p>Lee, ve videos, entiende los riesgos antes de invertir cantidades significativas.</p>
        
        <h4>3. No inviertas por FOMO</h4>
        <p>FOMO (Fear of Missing Out) es cuando inviertes porque ves que otros están ganando dinero. Esto suele terminar mal.</p>
        
        <h4>4. Usa plataformas reguladas</h4>
        <p>Evita plataformas desconocidas o que prometen ganancias garantizadas.</p>
        
        <h4>5. Considera el costo promedio</h4>
        <p>En lugar de invertir todo de una vez, compra pequeñas cantidades regularmente para promediar el precio.</p>
        
        <h3>Alternativas a considerar</h3>
        <p>Si Bitcoin te parece muy riesgoso, considera:</p>
        <ul>
          <li><strong>ETFs de Bitcoin:</strong> Fondos que invierten en Bitcoin pero se compran como acciones</li>
          <li><strong>Acciones de empresas relacionadas:</strong> Empresas que tienen Bitcoin o tecnología blockchain</li>
          <li><strong>Stablecoins:</strong> Criptomonedas que mantienen un valor estable</li>
        </ul>
        
        <h3>Mitos comunes sobre Bitcoin</h3>
        
        <h4>Mito: "Bitcoin es solo para criminales"</h4>
        <p><strong>Realidad:</strong> La mayoría de transacciones de Bitcoin son legales. Los bancos tradicionales procesan más dinero ilegal que Bitcoin.</p>
        
        <h4>Mito: "Bitcoin no tiene valor real"</h4>
        <p><strong>Realidad:</strong> Su valor viene de la utilidad, escasez y adopción, como cualquier moneda o commodity.</p>
        
        <h4>Mito: "Es demasiado tarde para invertir"</h4>
        <p><strong>Realidad:</strong> Nadie puede predecir el futuro. Algunos expertos creen que aún está en etapas tempranas.</p>
        
        <p><strong>Conclusión:</strong> Bitcoin es una tecnología fascinante con potencial, pero también con riesgos significativos. Si decides invertir, hazlo de forma responsable, con dinero que puedes permitirte perder, y siempre como parte de una estrategia de inversión diversificada. La clave está en educarse primero y nunca invertir más de lo que puedes permitirte perder.</p>
      `,
    },
    {
      id: 6,
      title: "Cómo elegir la mejor plataforma de streaming",
      summary: "Comparamos Netflix, Disney+, Amazon Prime y más para ayudarte a decidir cuál se adapta mejor a ti.",
      category: "tutoriales",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
      timeAgo: "Hace 1 día",
      featured: false,
      author: "Laura Fernández",
      readTime: "6 min",
      tags: ["Streaming", "Netflix", "Disney+", "Entretenimiento"],
      content: `
        <h2>Guía completa para elegir tu plataforma de streaming ideal</h2>
        <p>Con tantas opciones disponibles, elegir la plataforma de streaming correcta puede ser confuso. Te ayudamos a decidir cuál se adapta mejor a tus gustos y presupuesto.</p>
        
        <h3>Las principales plataformas comparadas</h3>
        
        <h4>Netflix</h4>
        <p><strong>Precio:</strong> $99-299 MXN/mes (varía por país)</p>
        <p><strong>Lo mejor:</strong></p>
        <ul>
          <li>Catálogo más grande y variado</li>
          <li>Contenido original de alta calidad (Stranger Things, The Crown, etc.)</li>
          <li>Algoritmo excelente para recomendaciones</li>
          <li>Disponible en casi todos los dispositivos</li>
          <li>Perfiles separados para cada miembro de la familia</li>
        </ul>
        <p><strong>Lo no tan bueno:</strong></p>
        <ul>
          <li>Precio más alto que la competencia</li>
          <li>Contenido cambia constantemente (series/películas se van)</li>
          <li>Menos películas de estreno recientes</li>
        </ul>
        <p><strong>Ideal para:</strong> Familias que ven mucho contenido variado y valoran las series originales.</p>
        
        <h4>Disney+</h4>
        <p><strong>Precio:</strong> $159 MXN/mes</p>
        <p><strong>Lo mejor:</strong></p>
        <ul>
          <li>Todo el catálogo de Disney, Pixar, Marvel, Star Wars</li>
          <li>Contenido familiar seguro</li>
          <li>Calidad 4K incluida</li>
          <li>Precio competitivo</li>
          <li>Estrenos de Marvel y Star Wars</li>
        </ul>
        <p><strong>Lo no tan bueno:</strong></p>
        <ul>
          <li>Catálogo limitado para adultos sin hijos</li>
          <li>Menos contenido original comparado con Netflix</li>
          <li>Interfaz menos intuitiva</li>
        </ul>
        <p><strong>Ideal para:</strong> Familias con niños y fanáticos de Marvel/Star Wars.</p>
        
        <h4>Amazon Prime Video</h4>
        <p><strong>Precio:</strong> $99 MXN/mes (incluye beneficios de Amazon Prime)</p>
        <p><strong>Lo mejor:</strong></p>
        <ul>
          <li>Incluye envíos gratis de Amazon</li>
          <li>Contenido original de calidad (The Boys, The Marvelous Mrs. Maisel)</li>
          <li>Películas de estreno disponibles para rentar</li>
          <li>Buen catálogo de películas clásicas</li>
        </ul>
        <p><strong>Lo no tan bueno:</strong></p>
        <ul>
          <li>Interfaz confusa (mezcla contenido gratis con de pago)</li>
          <li>Menos contenido que Netflix</li>
          <li>Calidad de streaming variable</li>
        </ul>
        <p><strong>Ideal para:</strong> Personas que ya usan Amazon para compras online.</p>
        
        <h4>HBO Max</h4>
        <p><strong>Precio:</strong> $149 MXN/mes</p>
        <p><strong>Lo mejor:</strong></p>
        <ul>
          <li>Contenido de HBO (Game of Thrones, Succession)</li>
          <li>Películas de Warner Bros el mismo día que en cines</li>
          <li>Calidad de producción muy alta</li>
          <li>Catálogo de películas clásicas excelente</li>
        </ul>
        <p><strong>Lo no tan bueno:</strong></p>
        <ul>
          <li>Catálogo más pequeño</li>
          <li>Menos contenido familiar</li>
          <li>Aplicación con algunos bugs</li>
        </ul>
        <p><strong>Ideal para:</strong> Adultos que prefieren calidad sobre cantidad.</p>
        
        <h4>Apple TV+</h4>
        <p><strong>Precio:</strong> $69 MXN/mes</p>
        <p><strong>Lo mejor:</strong></p>
        <ul>
          <li>Precio muy competitivo</li>
          <li>Contenido original de alta calidad</li>
          <li>Sin anuncios</li>
          <li>Integración perfecta con dispositivos Apple</li>
        </ul>
        <p><strong>Lo no tan bueno:</strong></p>
        <ul>
          <li>Catálogo muy limitado</li>
          <li>Solo contenido original (no hay clásicos)</li>
          <li>Menos opciones para familias</li>
        </ul>
        <p><strong>Ideal para:</strong> Usuarios de Apple que quieren contenido premium a bajo precio.</p>
        
        <h3>Plataformas especializadas</h3>
        
        <h4>Crunchyroll (Anime)</h4>
        <p><strong>Precio:</strong> $79 MXN/mes</p>
        <p><strong>Para:</strong> Fanáticos del anime y manga</p>
        
        <h4>Paramount+ (Deportes y entretenimiento)</h4>
        <p><strong>Precio:</strong> $99 MXN/mes</p>
        <p><strong>Para:</strong> Fanáticos de deportes y contenido de CBS/Paramount</p>
        
        <h4>Discovery+ (Documentales)</h4>
        <p><strong>Precio:</strong> $89 MXN/mes</p>
        <p><strong>Para:</strong> Amantes de documentales y reality shows</p>
        
        <h3>¿Cómo elegir la mejor para ti?</h3>
        
        <h4>Paso 1: Define tu presupuesto</h4>
        <ul>
          <li><strong>Económico ($50-100/mes):</strong> Apple TV+, Amazon Prime</li>
          <li><strong>Medio ($100-150/mes):</strong> Disney+, HBO Max</li>
          <li><strong>Premium ($150+/mes):</strong> Netflix</li>
        </ul>
        
        <h4>Paso 2: Identifica tus gustos</h4>
        <ul>
          <li><strong>Series originales:</strong> Netflix, HBO Max</li>
          <li><strong>Contenido familiar:</strong> Disney+</li>
          <li><strong>Películas de estreno:</strong> HBO Max, Amazon Prime</li>
          <li><strong>Documentales:</strong> Netflix, Discovery+</li>
          <li><strong>Anime:</strong> Crunchyroll</li>
          <li><strong>Deportes:</strong> Paramount+</li>
        </ul>
        
        <h4>Paso 3: Considera tu situación</h4>
        <ul>
          <li><strong>Familia con niños:</strong> Disney+ + Netflix</li>
          <li><strong>Estudiante con presupuesto limitado:</strong> Apple TV+ o Amazon Prime</li>
          <li><strong>Cinéfilo:</strong> HBO Max + Netflix</li>
          <li><strong>Usuario casual:</strong> Netflix básico</li>
        </ul>
        
        <h3>Estrategias para ahorrar dinero</h3>
        
        <h4>1. Rota las suscripciones</h4>
        <p>Suscríbete a una plataforma por 2-3 meses, ve todo lo que te interesa, cancela y cambia a otra.</p>
        
        <h4>2. Comparte cuentas familiares</h4>
        <p>La mayoría permite múltiples perfiles. Comparte con familia o amigos cercanos (respetando los términos de servicio).</p>
        
        <h4>3. Aprovecha ofertas y bundles</h4>
        <ul>
          <li>Disney+ a menudo tiene ofertas anuales</li>
          <li>Amazon Prime incluye múltiples servicios</li>
          <li>Algunos operadores de telefonía incluyen streaming gratis</li>
        </ul>
        
        <h4>4. Usa períodos de prueba</h4>
        <p>Casi todas ofrecen 7-30 días gratis. Úsalos para probar antes de comprometerte.</p>
        
        <h3>Recomendaciones por perfil</h3>
        
        <h4>Familia con niños pequeños</h4>
        <p><strong>Recomendación:</strong> Disney+ + Netflix básico</p>
        <p><strong>Por qué:</strong> Disney+ para contenido infantil seguro, Netflix para variedad cuando los niños duermen.</p>
        
        <h4>Pareja joven sin hijos</h4>
        <p><strong>Recomendación:</strong> Netflix + HBO Max (rotando)</p>
        <p><strong>Por qué:</strong> Mejor contenido original y variedad para adultos.</p>
        
        <h4>Estudiante universitario</h4>
        <p><strong>Recomendación:</strong> Amazon Prime + Apple TV+</p>
        <p><strong>Por qué:</strong> Beneficios adicionales de Amazon + contenido de calidad a precio bajo.</p>
        
        <h4>Adulto mayor</h4>
        <p><strong>Recomendación:</strong> Netflix básico</p>
        <p><strong>Por qué:</strong> Interfaz simple, mucho contenido clásico, fácil de usar.</p>
        
        <h4>Fanático del cine</h4>
        <p><strong>Recomendación:</strong> HBO Max + Amazon Prime</p>
        <p><strong>Por qué:</strong> Mejor catálogo de películas y estrenos.</p>
        
        <h3>Errores comunes a evitar</h3>
        
        <h4>1. Suscribirse a todo</h4>
        <p>Es fácil gastar $500+ MXN/mes en múltiples plataformas. Sé selectivo.</p>
        
        <h4>2. No cancelar pruebas gratuitas</h4>
        <p>Pon recordatorios para cancelar antes de que te cobren.</p>
        
        <h4>3. Pagar por calidad que no usas</h4>
        <p>Si ves en tu teléfono, no necesitas pagar extra por 4K.</p>
        
        <h4>4. No revisar el catálogo de tu país</h4>
        <p>El contenido varía por región. Verifica qué está disponible en tu ubicación.</p>
        
        <h3>El futuro del streaming</h3>
        <p>Tendencias a considerar:</p>
        <ul>
          <li><strong>Más fragmentación:</strong> Cada estudio quiere su propia plataforma</li>
          <li><strong>Precios en aumento:</strong> Los costos seguirán subiendo</li>
          <li><strong>Contenido con anuncios:</strong> Opciones más baratas con publicidad</li>
          <li><strong>Bundles:</strong> Paquetes que combinan múltiples servicios</li>
        </ul>
        
        <p><strong>Consejo final:</strong> No hay una respuesta única. La mejor plataforma depende de tus gustos, presupuesto y situación familiar. Empieza con una, úsala por unos meses, y ajusta según tus necesidades. Recuerda que siempre puedes cambiar: no es un compromiso de por vida.</p>
      `,
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
      author: "Miguel Torres",
      readTime: "8 min",
      tags: ["Trabajo remoto", "Productividad", "Herramientas", "Home office"],
      content: `
        <h2>Tu guía completa para un home office productivo</h2>
        <p>Trabajar desde casa puede ser un desafío. Te compartimos las mejores herramientas tecnológicas para mantenerte productivo, organizado y conectado con tu equipo.</p>
        
        <h3>Herramientas esenciales de comunicación</h3>
        
        <h4>Zoom</h4>
        <p><strong>Para qué sirve:</strong> Videollamadas y reuniones virtuales</p>
        <p><strong>Precio:</strong> Gratis hasta 40 min, planes desde $149 MXN/mes</p>
        <p><strong>Por qué es útil:</strong></p>
        <ul>
          <li>Calidad de video y audio excelente</li>
          <li>Funciona bien incluso con internet lento</li>
          <li>Permite grabar reuniones</li>
          <li>Salas de espera para controlar quién entra</li>
          <li>Compartir pantalla fácilmente</li>
        </ul>
        <p><strong>Consejo:</strong> Usa fondos virtuales para mantener privacidad en tu hogar.</p>
        
        <h4>Slack</h4>
        <p><strong>Para qué sirve:</strong> Mensajería instantánea para equipos</p>
        <p><strong>Precio:</strong> Gratis para equipos pequeños, planes desde $6.67 USD/mes</p>
        <p><strong>Por qué es útil:</strong></p>
        <ul>
          <li>Organiza conversaciones por canales temáticos</li>
          <li>Integra con otras herramientas de trabajo</li>
          <li>Búsqueda potente de mensajes antiguos</li>
          <li>Llamadas de voz y video integradas</li>
          <li>Notificaciones personalizables</li>
        </ul>
        <p><strong>Alternativas:</strong> Microsoft Teams, Discord (para equipos más casuales)</p>
        
        <h4>WhatsApp Business</h4>
        <p><strong>Para qué sirve:</strong> Comunicación con clientes y equipos pequeños</p>
        <p><strong>Precio:</strong> Gratis</p>
        <p><strong>Por qué es útil:</strong></p>
        <ul>
          <li>Todos ya saben usarlo</li>
          <li>Mensajes automáticos de bienvenida</li>
          <li>Catálogo de productos integrado</li>
          <li>Estadísticas de mensajes</li>
        </ul>
        
        <h3>Herramientas de productividad y organización</h3>
        
        <h4>Notion</h4>
        <p><strong>Para qué sirve:</strong> Organización personal y de proyectos</p>
        <p><strong>Precio:</strong> Gratis para uso personal, planes desde $8 USD/mes</p>
        <p><strong>Por qué es útil:</strong></p>
        <ul>
          <li>Combina notas, tareas, calendarios y bases de datos</li>
          <li>Plantillas para casi cualquier necesidad</li>
          <li>Colaboración en tiempo real</li>
          <li>Muy personalizable</li>
        </ul>
        <p><strong>Ideal para:</strong> Freelancers, equipos creativos, gestión de proyectos complejos</p>
        <p><strong>Alternativas:</strong> Trello (más simple), Asana (enfocado en tareas)</p>
        
        <h4>Google Workspace</h4>
        <p><strong>Para qué sirve:</strong> Suite completa de oficina en la nube</p>
        <p><strong>Precio:</strong> Desde $6 USD/mes por usuario</p>
        <p><strong>Incluye:</strong></p>
        <ul>
          <li>Gmail profesional con tu dominio</li>
          <li>Google Drive con 30GB+ de almacenamiento</li>
          <li>Google Docs, Sheets, Slides</li>
          <li>Google Meet para videollamadas</li>
          <li>Google Calendar compartido</li>
        </ul>
        <p><strong>Por qué es útil:</strong> Todo integrado, colaboración en tiempo real, acceso desde cualquier dispositivo</p>
        
        <h4>Todoist</h4>
        <p><strong>Para qué sirve:</strong> Gestión de tareas personales</p>
        <p><strong>Precio:</strong> Gratis con funciones básicas, Pro desde $4 USD/mes</p>
        <p><strong>Por qué es útil:</strong></p>
        <ul>
          <li>Organización por proyectos y etiquetas</li>
          <li>Recordatorios inteligentes</li>
          <li>Integración con email y calendario</li>
          <li>Estadísticas de productividad</li>
          <li>Funciona offline</li>
        </ul>
        
        <h3>Herramientas para manejo de tiempo</h3>
        
        <h4>RescueTime</h4>
        <p><strong>Para qué sirve:</strong> Monitorear cómo usas tu tiempo en la computadora</p>
        <p><strong>Precio:</strong> Gratis con funciones básicas, Premium $12 USD/mes</p>
        <p><strong>Por qué es útil:</strong></p>
        <ul>
          <li>Tracking automático de aplicaciones y sitios web</li>
          <li>Reportes detallados de productividad</li>
          <li>Bloqueo de sitios distractores</li>
          <li>Metas de tiempo productivo</li>
        </ul>
        
        <h4>Pomodoro Timer</h4>
        <p><strong>Para qué sirve:</strong> Técnica de productividad con intervalos de trabajo</p>
        <p><strong>Precio:</strong> Muchas apps gratuitas disponibles</p>
        <p><strong>Cómo funciona:</strong></p>
        <ol>
          <li>Trabaja 25 minutos concentrado</li>
          <li>Descansa 5 minutos</li>
          <li>Repite 4 veces</li>
          <li>Toma un descanso largo de 15-30 minutos</li>
        </ol>
        <p><strong>Apps recomendadas:</strong> Forest, Be Focused, PomoDone</p>
        
        <h3>Herramientas de almacenamiento y respaldo</h3>
        
        <h4>Google Drive</h4>
        <p><strong>Almacenamiento:</strong> 15GB gratis, planes desde $1.99 USD/mes por 100GB</p>
        <p><strong>Ventajas:</strong></p>
        <ul>
          <li>Integración perfecta con Google Workspace</li>
          <li>Colaboración en tiempo real</li>
          <li>Acceso desde cualquier dispositivo</li>
          <li>Historial de versiones</li>
        </ul>
        
        <h4>Dropbox</h4>
        <p><strong>Almacenamiento:</strong> 2GB gratis, plans desde $9.99 USD/mes</p>
        <p><strong>Ventajas:</strong></p>
        <ul>
          <li>Sincronización muy rápida</li>
          <li>Excelente para compartir archivos grandes</li>
          <li>Integración con muchas aplicaciones</li>
          <li>Funciones avanzadas de colaboración</li>
        </ul>
        
        <h4>OneDrive</h4>
        <p><strong>Almacenamiento:</strong> 5GB gratis, incluido con Microsoft 365</p>
        <p><strong>Ventajas:</strong></p>
        <ul>
          <li>Integración perfecta con Windows y Office</li>
          <li>Buena relación calidad-precio</li>
          <li>Funciones de seguridad avanzadas</li>
        </ul>
        
        <h3>Hardware esencial para home office</h3>
        
        <h4>Webcam de calidad</h4>
        <p><strong>Recomendaciones:</strong></p>
        <ul>
          <li><strong>Económica:</strong> Logitech C270 ($500-800 MXN)</li>
          <li><strong>Intermedia:</strong> Logitech C920 ($1,500-2,000 MXN)</li>
          <li><strong>Premium:</strong> Logitech Brio 4K ($3,000-4,000 MXN)</li>
        </ul>
        <p><strong>Por qué es importante:</strong> La cámara de tu laptop suele ser de baja calidad. Una webcam dedicada mejora mucho tu imagen profesional.</p>
        
        <h4>Micrófono</h4>
        <p><strong>Recomendaciones:</strong></p>
        <ul>
          <li><strong>Económico:</strong> Micrófono de diadema con cancelación de ruido ($300-600 MXN)</li>
          <li><strong>Intermedio:</strong> Blue Yeti Nano ($1,500-2,500 MXN)</li>
          <li><strong>Premium:</strong> Audio-Technica ATR2100x-USB ($3,000-5,000 MXN)</li>
        </ul>
        <p><strong>Consejo:</strong> Un buen micrófono es más importante que una buena cámara para videollamadas profesionales.</p>
        
        <h4>Monitor adicional</h4>
        <p><strong>Tamaños recomendados:</strong> 24-27 pulgadas</p>
        <p><strong>Precio:</strong> $2,500-8,000 MXN dependiendo de calidad</p>
        <p><strong>Beneficios:</strong></p>
        <ul>
          <li>Aumenta productividad hasta 42%</li>
          <li>Menos cambio entre ventanas</li>
          <li>Mejor para videollamadas (una pantalla para la llamada, otra para trabajar)</li>
          <li>Reduce fatiga visual</li>
        </ul>
        
        <h4>Silla ergonómica</h4>
        <p><strong>Rango de precio:</strong> $2,000-15,000 MXN</p>
        <p><strong>Características importantes:</strong></p>
        <ul>
          <li>Soporte lumbar ajustable</li>
          <li>Altura ajustable</li>
          <li>Reposabrazos ajustables</li>
          <li>Material transpirable</li>
        </ul>
        <p><strong>Marcas recomendadas:</strong> Herman Miller (premium), Steelcase (intermedio), IKEA Markus (económico)</p>
        
        <h3>Herramientas de seguridad</h3>
        
        <h4>VPN (Red Privada Virtual)</h4>
        <p><strong>Para qué sirve:</strong> Proteger tu conexión cuando trabajas desde cafés o redes públicas</p>
        <p><strong>Recomendaciones:</strong></p>
        <ul>
          <li><strong>NordVPN:</strong> $3-5 USD/mes, muy seguro</li>
          <li><strong>ExpressVPN:</strong> $6-12 USD/mes, el más rápido</li>
          <li><strong>Surfshark:</strong> $2-4 USD/mes, mejor precio</li>
        </ul>
        
        <h4>Administrador de contraseñas</h4>
        <p><strong>Opciones:</strong></p>
        <ul>
          <li><strong>1Password:</strong> $3 USD/mes, muy fácil de usar</li>
          <li><strong>Bitwarden:</strong> Gratis con funciones básicas, $3 USD/mes premium</li>
          <li><strong>LastPass:</strong> Gratis limitado, $3 USD/mes premium</li>
        </ul>
        
        <h4>Antivirus</h4>
        <p><strong>Para Windows:</strong></p>
        <ul>
          <li><strong>Windows Defender:</strong> Gratis, incluido en Windows 10/11</li>
          <li><strong>Bitdefender:</strong> $30-60 USD/año, excelente protección</li>
          <li><strong>Kaspersky:</strong> $30-50 USD/año, muy completo</li>
        </ul>
        <p><strong>Para Mac:</strong> Generalmente no necesitas antivirus adicional, pero Malwarebytes es buena opción gratuita.</p>
        
        <h3>Configuración de tu espacio de trabajo</h3>
        
        <h4>Iluminación</h4>
        <ul>
          <li><strong>Luz natural:</strong> Coloca tu escritorio perpendicular a la ventana</li>
          <li><strong>Luz artificial:</strong> Lámpara de escritorio LED con temperatura de color ajustable</li>
          <li><strong>Para videollamadas:</strong> Ring light o lámpara frente a ti, no detrás</li>
        </ul>
        
        <h4>Ergonomía</h4>
        <ul>
          <li><strong>Monitor:</strong> La parte superior a la altura de tus ojos</li>
          <li><strong>Teclado:</strong> Codos a 90 grados</li>
          <li><strong>Pies:</strong> Planos en el suelo o en reposapiés</li>
          <li><strong>Espalda:</strong> Recta, con soporte lumbar</li>
        </ul>
        
        <h3>Rutinas y hábitos para ser más productivo</h3>
        
        <h4>Horarios definidos</h4>
        <ul>
          <li>Establece hora de inicio y fin de trabajo</li>
          <li>Comunica tu horario a familia/roommates</li>
          <li>Usa ropa "de trabajo" vs ropa de casa</li>
          <li>Crea rituales de inicio y fin de jornada</li>
        </ul>
        
        <h4>Manejo de distracciones</h4>
        <ul>
          <li><strong>Teléfono:</strong> Ponlo en modo "No molestar" o en otra habitación</li>
          <li><strong>Redes sociales:</strong> Usa bloqueadores como Cold Turkey o Freedom</li>
          <li><strong>Ruido:</strong> Audífonos con cancelación de ruido o música instrumental</li>
          <li><strong>Interrupciones:</strong> Señal visual para familia (puerta cerrada, letrero, etc.)</li>
        </ul>
        
        <h4>Descansos regulares</h4>
        <ul>
          <li>Regla 20-20-20: Cada 20 minutos, mira algo a 20 pies de distancia por 20 segundos</li>
          <li>Levántate y camina cada hora</li>
          <li>Almuerza lejos de tu escritorio</li>
          <li>Haz ejercicio ligero durante descansos</li>
        </ul>
        
        <h3>Presupuesto sugerido para home office</h3>
        
        <h4>Básico ($5,000-10,000 MXN)</h4>
        <ul>
          <li>Webcam básica: $800</li>
          <li>Audífonos con micrófono: $600</li>
          <li>Lámpara de escritorio: $500</li>
          <li>Organizador de escritorio: $300</li>
          <li>Software básico: $2,000/año</li>
          <li>Mejoras ergonómicas: $2,000</li>
        </ul>
        
        <h4>Intermedio ($15,000-25,000 MXN)</h4>
        <ul>
          <li>Monitor adicional 24": $4,000</li>
          <li>Webcam HD: $2,000</li>
          <li>Micrófono USB: $2,500</li>
          <li>Silla ergonómica: $8,000</li>
          <li>Software premium: $4,000/año</li>
          <li>Accesorios varios: $3,000</li>
        </ul>
        
        <h4>Premium ($30,000+ MXN)</h4>
        <ul>
          <li>Monitor 4K 27": $8,000</li>
          <li>Silla Herman Miller: $15,000</li>
          <li>Escritorio ajustable: $8,000</li>
          <li>Setup de audio/video profesional: $10,000</li>
          <li>Software y servicios premium: $6,000/año</li>
        </ul>
        
        <h3>Errores comunes a evitar</h3>
        
        <h4>1. Trabajar desde la cama o sofá</h4>
        <p>Aunque es tentador, afecta tu postura, productividad y calidad del sueño.</p>
        
        <h4>2. No establecer límites</h4>
        <p>El trabajo remoto puede llevar a trabajar más horas, no menos. Define límites claros.</p>
        
        <h4>3. Aislarse completamente</h4>
        <p>Programa interacciones sociales regulares con colegas y amigos.</p>
        
        <h4>4. No invertir en herramientas</h4>
        <p>Las herramientas correctas pagan por sí mismas en productividad y salud.</p>
        
        <h4>5. Multitasking excesivo</h4>
        <p>Enfócate en una tarea a la vez para mejor calidad y eficiencia.</p>
        
        <p><strong>Conclusión:</strong> Trabajar desde casa exitosamente requiere las herramientas correctas, un espacio bien configurado y buenos hábitos. No necesitas comprar todo de una vez; empieza con lo básico y ve mejorando gradualmente. La inversión en tu home office es una inversión en tu productividad, salud y bienestar a largo plazo.</p>
      `,
    },
    {
      id: 8,
      title: "WhatsApp vs Telegram: ¿Cuál es más seguro?",
      summary: "Comparamos las funciones de seguridad de las apps de mensajería más populares para ayudarte a elegir.",
      category: "redes",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2074&auto=format&fit=crop",
      timeAgo: "Hace 3 días",
      featured: false,
      author: "Patricia Morales",
      readTime: "5 min",
      tags: ["WhatsApp", "Telegram", "Seguridad", "Mensajería"],
      content: `
        <h2>La batalla de la mensajería segura: WhatsApp vs Telegram</h2>
        <p>Ambas aplicaciones prometen seguridad, pero ¿cuál protege mejor tu privacidad? Te explicamos las diferencias de forma simple.</p>
        
        <h3>WhatsApp: Seguridad por defecto</h3>
        
        <h4>Cifrado de extremo a extremo</h4>
        <p><strong>¿Qué significa?</strong> Tus mensajes se "codifican" de tal manera que solo tú y la persona que recibe el mensaje pueden leerlos. Ni WhatsApp, ni Facebook, ni hackers pueden ver el contenido.</p>
        <p><strong>¿Cuándo funciona?</strong> En TODOS los chats individuales y grupales, automáticamente.</p>
        
        <h4>Verificación de seguridad</h4>
        <p>Puedes verificar que realmente estás hablando con quien crees. Ve a Configuración → Cuenta → Seguridad → Mostrar código de seguridad.</p>
        
        <h4>Autenticación de dos factores</h4>
        <p>Puedes activar un PIN de 6 dígitos que se requiere para verificar tu número de teléfono.</p>
        <p><strong>Cómo activarlo:</strong> Configuración → Cuenta → Verificación en dos pasos</p>
        
        <h4>Lo bueno de WhatsApp:</h4>
        <ul>
          <li>Cifrado activado por defecto en todos los chats</li>
          <li>No guarda mensajes en sus servidores</li>
          <li>Verificación de identidad disponible</li>
          <li>Respaldos locales cifrados</li>
          <li>Función de mensajes que desaparecen</li>
        </ul>
        
        <h4>Lo preocupante de WhatsApp:</h4>
        <ul>
          <li>Propiedad de Meta (Facebook)</li>
          <li>Comparte metadatos con Facebook</li>
          <li>Respaldos en Google Drive/iCloud no están cifrados</li>
          <li>Requiere número de teléfono real</li>
          <li>Puede compartir datos con autoridades</li>
        </ul>
        
        <h3>Telegram: Flexibilidad con opciones</h3>
        
        <h4>Chats secretos vs chats normales</h4>
        <p><strong>Chats normales:</strong> Cifrados en tránsito pero Telegram puede acceder a ellos</p>
        <p><strong>Chats secretos:</strong> Cifrado de extremo a extremo, solo disponible en dispositivos móviles</p>
        
        <h4>Funciones de privacidad avanzadas</h4>
        <ul>
          <li>Mensajes que se autodestruyen (en chats secretos)</li>
          <li>Nombres de usuario (no necesitas compartir tu número)</li>
          <li>Múltiples números de teléfono en una cuenta</li>
          <li>Proxies integrados para evitar censura</li>
        </ul>
        
        <h4>Lo bueno de Telegram:</h4>
        <ul>
          <li>Chats secretos con cifrado de extremo a extremo</li>
          <li>No requiere compartir tu número de teléfono</li>
          <li>Código abierto (parcialmente)</li>
          <li>Servidores distribuidos globalmente</li>
          <li>Funciones anti-censura</li>
          <li>Bots y canales con funciones avanzadas</li>
        </ul>
        
        <h4>Lo preocupante de Telegram:</h4>
        <ul>
          <li>Chats normales NO tienen cifrado de extremo a extremo</li>
          <li>Telegram puede leer tus chats normales</li>
          <li>Historial almacenado en servidores de Telegram</li>
          <li>Chats secretos solo en móviles (no en computadora)</li>
          <li>Menos transparencia sobre políticas de datos</li>
        </ul>
        
        <h3>Comparación directa</h3>
        
        <h4>Cifrado de extremo a extremo</h4>
        <ul>
          <li><strong>WhatsApp:</strong> ✅ Siempre activado</li>
          <li><strong>Telegram:</strong> ⚠️ Solo en chats secretos</li>
        </ul>
        
        <h4>Privacidad del número de teléfono</h4>
        <ul>
          <li><strong>WhatsApp:</strong> ❌ Siempre visible para contactos</li>
          <li><strong>Telegram:</strong> ✅ Puedes usar nombre de usuario</li>
        </ul>
        
        <h4>Respaldos seguros</h4>
        <ul>
          <li><strong>WhatsApp:</strong> ⚠️ Locales cifrados, nube sin cifrar</li>
          <li><strong>Telegram:</strong> ✅ Sincronización cifrada entre dispositivos</li>
        </ul>
        
        <h4>Transparencia</h4>
        <ul>
          <li><strong>WhatsApp:</strong> ⚠️ Propiedad de Meta, políticas cambiantes</li>
          <li><strong>Telegram:</strong> ✅ Más independiente, código parcialmente abierto</li>
        </ul>
        
        <h4>Facilidad de uso</h4>
        <ul>
          <li><strong>WhatsApp:</strong> ✅ Seguridad automática, fácil para todos</li>
          <li><strong>Telegram:</strong> ⚠️ Requiere conocimiento para usar funciones seguras</li>
        </ul>
        
        <h3>¿Cuál elegir según tu situación?</h3>
        
        <h4>Elige WhatsApp si:</h4>
        <ul>
          <li>Quieres seguridad automática sin complicarte</li>
          <li>La mayoría de tus contactos ya lo usan</li>
          <li>No te importa que Meta tenga algunos metadatos</li>
          <li>Prefieres simplicidad sobre funciones avanzadas</li>
          <li>Usas principalmente chat individual y grupos pequeños</li>
        </ul>
        
        <h4>Elige Telegram si:</h4>
        <ul>
          <li>Valoras el anonimato (nombres de usuario)</li>
          <li>Necesitas funciones avanzadas (bots, canales grandes)</li>
          <li>Quieres evitar productos de Meta/Facebook</li>
          <li>Te sientes cómodo gestionando configuraciones de privacidad</li>
          <li>Participas en comunidades grandes o públicas</li>
        </ul>
        
        <h3>Configuraciones de seguridad recomendadas</h3>
        
        <h4>Para WhatsApp:</h4>
        <ol>
          <li>Activa verificación en dos pasos</li>
          <li>Configura mensajes que desaparecen para chats sensibles</li>
          <li>Desactiva respaldos en la nube si manejas información muy sensible</li>
          <li>Revisa configuración de privacidad (quién ve tu foto, estado, etc.)</li>
          <li>Activa notificaciones de seguridad</li>
        </ol>
        
        <h4>Para Telegram:</h4>
        <ol>
          <li>Usa chats secretos para conversaciones sensibles</li>
          <li>Configura autodestrucción de mensajes en chats secretos</li>
          <li>Activa verificación en dos pasos</li>
          <li>Usa nombres de usuario en lugar de compartir tu número</li>
          <li>Revisa configuración de privacidad y seguridad</li>
          <li>Considera usar proxies si estás en países con censura</li>
        </ol>
        
        <h3>Alternativas a considerar</h3>
        
        <h4>Signal</h4>
        <p><strong>Lo mejor para:</strong> Máxima seguridad y privacidad</p>
        <ul>
          <li>Cifrado de extremo a extremo por defecto</li>
          <li>Código completamente abierto</li>
          <li>Organización sin fines de lucro</li>
          <li>Recomendado por expertos en seguridad</li>
        </ul>
        <p><strong>Desventaja:</strong> Menos usuarios, funciones más limitadas</p>
        
        <h4>iMessage (solo Apple)</h4>
        <p><strong>Lo mejor para:</strong> Usuarios de iPhone/Mac</p>
        <ul>
          <li>Cifrado de extremo a extremo entre dispositivos Apple</li>
          <li>Integración perfecta con el ecosistema Apple</li>
          <li>Fácil de usar</li>
        </ul>
        <p><strong>Desventaja:</strong> Solo funciona entre dispositivos Apple</p>
        
        <h3>Mitos comunes sobre seguridad</h3>
        
        <h4>Mito: "Si no hago nada malo, no necesito privacidad"</h4>
        <p><strong>Realidad:</strong> La privacidad protege contra robo de identidad, acoso, y uso indebido de información personal.</p>
        
        <h4>Mito: "Las apps gratuitas no pueden ser seguras"</h4>
        <p><strong>Realidad:</strong> Muchas apps gratuitas son muy seguras. El modelo de negocio no determina la seguridad.</p>
        
        <h4>Mito: "El cifrado es solo para criminales"</h4>
        <p><strong>Realidad:</strong> El cifrado protege a periodistas, activistas, empresas y ciudadanos comunes.</p>
        
        <h3>Consejos generales de seguridad</h3>
        
        <h4>Para cualquier app de mensajería:</h4>
        <ul>
          <li>Mantén la app actualizada</li>
          <li>No hagas clic en enlaces sospechosos</li>
          <li>Verifica la identidad de contactos nuevos</li>
          <li>Usa contraseñas fuertes para tu dispositivo</li>
          <li>Ten cuidado con lo que compartes en grupos grandes</li>
          <li>Configura bloqueo de pantalla en tu teléfono</li>
        </ul>
        
        <h4>Señales de alerta:</h4>
        <ul>
          <li>Mensajes de verificación no solicitados</li>
          <li>Contactos que reportan mensajes extraños de tu cuenta</li>
          <li>Sesiones activas en dispositivos que no reconoces</li>
          <li>Cambios en configuración que no hiciste</li>
        </ul>
        
        <p><strong>Conclusión:</strong> Tanto WhatsApp como Telegram pueden ser seguros si los usas correctamente. WhatsApp es mejor para la mayoría de usuarios porque la seguridad está activada por defecto. Telegram ofrece más control y funciones avanzadas, pero requiere más conocimiento para usarlo de forma segura. Para máxima seguridad, considera Signal. Lo más importante es entender las limitaciones de cada plataforma y configurarlas apropiadamente para tus necesidades.</p>
      `,
    },
    {
      id: 9,
      title: "Samsung Galaxy S24: ¿Vale la pena el cambio?",
      summary: "Analizamos las nuevas características del Galaxy S24 y te ayudamos a decidir si es momento de cambiar.",
      category: "smartphones",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=2070&auto=format&fit=crop",
      timeAgo: "Hace 3 días",
      featured: false,
      author: "Fernando Castro",
      readTime: "6 min",
      tags: ["Samsung", "Galaxy S24", "Android", "Smartphones"],
      content: `
        <h2>Samsung Galaxy S24: ¿Revolución o evolución?</h2>
        <p>Samsung lanzó su nueva serie Galaxy S24 con promesas de mejor IA, cámaras mejoradas y más eficiencia. Te ayudamos a decidir si vale la pena la actualización.</p>
        
        <h3>Las mejoras más importantes del Galaxy S24</h3>
        
        <h4>1. Inteligencia Artificial integrada</h4>
        <p><strong>Galaxy AI:</strong> Samsung integró IA en muchas funciones del teléfono</p>
        <ul>
          <li><strong>Traducción en tiempo real:</strong> Traduce llamadas telefónicas mientras hablas</li>
          <li><strong>Asistente de escritura:</strong> Mejora tus mensajes y emails automáticamente</li>
          <li><strong>Búsqueda inteligente:</strong> Encierra cualquier objeto en una foto para buscarlo en Google</li>
          <li><strong>Edición de fotos con IA:</strong> Elimina objetos, mejora calidad, cambia fondos</li>
        </ul>
        <p><strong>¿Es útil en la vida real?</strong> Sí, especialmente la traducción y edición de fotos. Aunque algunas funciones parecen más novedad que necesidad.</p>
        
        <h4>2. Cámara mejorada</h4>
        <p><strong>Especificaciones técnicas:</strong></p>
        <ul>
          <li>Cámara principal: 50MP con mejor procesamiento</li>
          <li>Ultra gran angular: 12MP</li>
          <li>Teleobjetivo: 10MP con zoom óptico 3x</li>
          <li>Frontal: 12MP</li>
        </ul>
        
        <p><strong>Mejoras reales:</strong></p>
        <ul>
          <li><strong>Fotos nocturnas:</strong> Mucho mejor rendimiento con poca luz</li>
          <li><strong>Zoom mejorado:</strong> Zoom digital hasta 30x más nítido</li>
          <li><strong>Video:</strong> Estabilización mejorada, grabación en 8K</li>
          <li><strong>Modo retrato:</strong> Mejor separación del fondo</li>
        </ul>
        
        <h4>3. Rendimiento y batería</h4>
        <p><strong>Procesador:</strong> Snapdragon 8 Gen 3 (más eficiente que el anterior)</p>
        <p><strong>Beneficios reales:</strong></p>
        <ul>
          <li>20% mejor rendimiento en juegos</li>
          <li>15% mejor eficiencia energética</li>
          <li>Menos calentamiento durante uso intensivo</li>
          <li>Carga más rápida (25W inalámbrica, 45W con cable)</li>
        </ul>
        
        <p><strong>Duración de batería:</strong></p>
        <ul>
          <li>S24: 4,000 mAh (día completo de uso normal)</li>
          <li>S24+: 4,900 mAh (día y medio de uso normal)</li>
          <li>S24 Ultra: 5,000 mAh (hasta 2 días de uso moderado)</li>
        </ul>
        
        <h4>4. Pantalla</h4>
        <p><strong>Mejoras:</strong></p>
        <ul>
          <li>Brillo máximo: 2,600 nits (excelente bajo el sol)</li>
          <li>Mejor eficiencia energética</li>
          <li>Colores más precisos</li>
          <li>Menos reflejos</li>
        </ul>
        
        <h4>5. Diseño y construcción</h4>
        <ul>
          <li>Marco de titanio en el S24 Ultra (más resistente y ligero)</li>
          <li>Gorilla Glass Victus 2 (más resistente a caídas)</li>
          <li>Resistencia al agua IP68</li>
          <li>Diseño más refinado con bordes menos pronunciados</li>
        </ul>
        
        <h3>Comparación con modelos anteriores</h3>
        
        <h4>Galaxy S24 vs Galaxy S23</h4>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background-color: #f0f0f0;">
            <th style="padding: 8px; border: 1px solid #ddd;">Característica</th>
            <th style="padding: 8px; border: 1px solid #ddd;">S24</th>
            <th style="padding: 8px; border: 1px solid #ddd;">S23</th>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">Procesador</td>
            <td style="padding: 8px; border: 1px solid #ddd;">Snapdragon 8 Gen 3</td>
            <td style="padding: 8px; border: 1px solid #ddd;">Snapdragon 8 Gen 2</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">IA integrada</td>
            <td style="padding: 8px; border: 1px solid #ddd;">Galaxy AI</td>
            <td style="padding: 8px; border: 1px solid #ddd;">Limitada</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">Batería</td>
            <td style="padding: 8px; border: 1px solid #ddd;">4,000 mAh</td>
            <td style="padding: 8px; border: 1px solid #ddd;">3,900 mAh</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">Precio inicial</td>
            <td style="padding: 8px; border: 1px solid #ddd;">$799 USD</td>
            <td style="padding: 8px; border: 1px solid #ddd;">$799 USD</td>
          </tr>
        </table>
        
        <h3>¿Deberías actualizar?</h3>
        
        <h4>SÍ, actualiza si tienes:</h4>
        <ul>
          <li><strong>Galaxy S21 o anterior:</strong> Notarás mejoras significativas</li>
          <li><strong>Un teléfono con problemas de batería:</strong> El S24 tiene mejor eficiencia</li>
          <li><strong>Necesidades de cámara profesional:</strong> Las mejoras en foto/video son notables</li>
          <li><strong>Uso intensivo de IA:</strong> Las funciones nuevas pueden ser muy útiles</li>
          <li><strong>Problemas de rendimiento:</strong> El nuevo procesador es mucho más rápido</li>
        </ul>
        
        <h4>NO actualices si tienes:</h4>
        <ul>
          <li><strong>Galaxy S23:</strong> Las mejoras son incrementales</li>
          <li><strong>Presupuesto ajustado:</strong> El S23 sigue siendo excelente y ahora más barato</li>
          <li><strong>Tu teléfono actual funciona bien:</strong> No hay urgencia real</li>
          <li><strong>No usas funciones avanzadas:</strong> Para uso básico, no justifica el costo</li>
        </ul>
        
        <h3>Comparación con la competencia</h3>
        
        <h4>Galaxy S24 vs iPhone 15</h4>
        <ul>
          <li><strong>Cámara:</strong> Empate, ambos excelentes con fortalezas diferentes</li>
          <li><strong>Rendimiento:</strong> iPhone ligeramente superior en benchmarks</li>
          <li><strong>IA:</strong> Galaxy S24 tiene más funciones de IA integradas</li>
          <li><strong>Personalización:</strong> Android permite más customización</li>
          <li><strong>Ecosistema:</strong> iPhone mejor si tienes otros productos Apple</li>
          <li><strong>Precio:</strong> Similar, pero Galaxy ofrece más opciones de almacenamiento</li>
        </ul>
        
        <h4>Galaxy S24 vs Google Pixel 8</h4>
        <ul>
          <li><strong>IA:</strong> Pixel tiene ventaja en procesamiento de fotos con IA</li>
          <li><strong>Android puro:</strong> Pixel recibe actualizaciones más rápido</li>
          <li><strong>Hardware:</strong> Galaxy S24 tiene mejor pantalla y construcción</li>
          <li><strong>Precio:</strong> Pixel 8 generalmente más barato</li>
          <li><strong>Soporte:</strong> Pixel promete 7 años de actualizaciones</li>
        </ul>
        
        <h3>Precios y disponibilidad</h3>
        
        <h4>Precios de lanzamiento (USD):</h4>
        <ul>
          <li><strong>Galaxy S24 (128GB):</strong> $799</li>
          <li><strong>Galaxy S24+ (256GB):</strong> $999</li>
          <li><strong>Galaxy S24 Ultra (256GB):</strong> $1,299</li>
        </ul>
        
        <h4>¿Cuál elegir?</h4>
        <ul>
          <li><strong>S24 básico:</strong> Para la mayoría de usuarios, excelente relación calidad-precio</li>
          <li><strong>S24+:</strong> Si quieres pantalla más grande y mejor batería</li>
          <li><strong>S24 Ultra:</strong> Para usuarios power que necesitan S Pen y la mejor cámara</li>
        </ul>
        
        <h3>Funciones de IA en detalle</h3>
        
        <h4>Live Translate (Traducción en vivo)</h4>
        <p><strong>Cómo funciona:</strong> Durante una llamada, el teléfono traduce en tiempo real lo que dice la otra persona y lo que dices tú.</p>
        <p><strong>Idiomas soportados:</strong> 13 idiomas inicialmente, incluyendo español, inglés, francés, alemán, etc.</p>
        <p><strong>¿Es útil?</strong> Muy útil para viajes de negocios o comunicación internacional.</p>
        
        <h4>Circle to Search</h4>
        <p><strong>Cómo funciona:</strong> Mantén presionado el botón de inicio, encierra cualquier objeto en la pantalla, y Google lo buscará automáticamente.</p>
        <p><strong>Casos de uso:</strong> Identificar plantas, buscar productos, traducir texto en imágenes.</p>
        
        <h4>Photo Assist</h4>
        <p><strong>Funciones:</strong></p>
        <ul>
          <li>Eliminar objetos no deseados de fotos</li>
          <li>Mover objetos dentro de la foto</li>
          <li>Mejorar resolución de imágenes</li>
          <li>Cambiar fondos automáticamente</li>
        </ul>
        
        <h3>Problemas y limitaciones</h3>
        
        <h4>Aspectos negativos:</h4>
        <ul>
          <li><strong>Precio alto:</strong> Sigue siendo caro para muchos presupuestos</li>
          <li><strong>IA requiere internet:</strong> Muchas funciones de IA necesitan conexión</li>
          <li><strong>Bloatware:</strong> Samsung incluye muchas apps preinstaladas</li>
          <li><strong>Actualizaciones lentas:</strong> Android puro (Pixel) recibe actualizaciones más rápido</li>
          <li><strong>Carga lenta:</strong> 45W es bueno pero no el más rápido del mercado</li>
        </ul>
        
        <h4>Problemas reportados por usuarios:</h4>
        <ul>
          <li>Algunos problemas menores de software en el lanzamiento</li>
          <li>La IA a veces comete errores en traducciones</li>
          <li>Calentamiento durante uso muy intensivo</li>
          <li>Duración de batería variable según uso de IA</li>
        </ul>
        
        <h3>Alternativas a considerar</h3>
        
        <h4>Si el S24 es muy caro:</h4>
        <ul>
          <li><strong>Galaxy S23:</strong> Ahora más barato, sigue siendo excelente</li>
          <li><strong>Galaxy A54:</strong> Gama media con muchas funciones del S24</li>
          <li><strong>Google Pixel 7a:</strong> Excelente cámara a menor precio</li>
          <li><strong>OnePlus 12:</strong> Rendimiento similar, precio más bajo</li>
        </ul>
        
        <h4>Si quieres algo diferente:</h4>
        <ul>
          <li><strong>iPhone 15:</strong> Si prefieres iOS</li>
          <li><strong>Google Pixel 8:</strong> Para Android puro y mejor IA fotográfica</li>
          <li><strong>Xiaomi 14:</strong> Especificaciones similares, precio más bajo</li>
        </ul>
        
        <h3>Consejos para la compra</h3>
        
        <h4>Cuándo comprar:</h4>
        <ul>
          <li><strong>Inmediatamente:</strong> Si necesitas un teléfono nuevo urgentemente</li>
          <li><strong>En 3-6 meses:</strong> Para evitar problemas iniciales de software</li>
          <li><strong>Black Friday/Cyber Monday:</strong> Para mejores descuentos</li>
          <li><strong>Cuando salga el S25:</strong> El S24 bajará de precio</li>
        </ul>
        
        <h4>Dónde comprar:</h4>
        <ul>
          <li><strong>Samsung directamente:</strong> Mejores ofertas de trade-in</li>
          <li><strong>Operadoras:</strong> Planes de financiamiento</li>
          <li><strong>Retailers:</strong> Amazon, Best Buy para comparar precios</li>
          <li><strong>Costco/Sam's:</strong> A veces incluyen accesorios gratis</li>
        </ul>
        
        <h4>Accesorios recomendados:</h4>
        <ul>
          <li><strong>Funda:</strong> Protección esencial ($20-50 USD)</li>
          <li><strong>Protector de pantalla:</strong> Cristal templado ($10-30 USD)</li>
          <li><strong>Cargador inalámbrico:</strong> Para aprovechar la carga rápida ($30-60 USD)</li>
          <li><strong>Galaxy Buds:</strong> Integración perfecta con el teléfono ($100-200 USD)</li>
        </ul>
        
        <p><strong>Conclusión:</strong> El Galaxy S24 es una evolución sólida con mejoras reales en IA, cámara y eficiencia. Si tienes un teléfono de 2-3 años o más, la actualización vale la pena. Si tienes un S23 o teléfono reciente de gama alta, las mejoras son incrementales. Las funciones de IA son impresionantes pero no revolucionarias. Para la mayoría de usuarios, el S24 básico ofrece la mejor relación calidad-precio de la serie.</p>
      `,
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
      author: "Sofía Ramírez",
      readTime: "7 min",
      tags: ["IA", "Fotografía", "Edición", "Apps"],
      content: `
        <h2>Transforma tus fotos con inteligencia artificial</h2>
        <p>Ya no necesitas ser un experto en Photoshop para tener fotos increíbles. La IA puede mejorar automáticamente tus imágenes con solo unos clics.</p>
        
        <h3>¿Qué puede hacer la IA por tus fotos?</h3>
        
        <h4>Mejoras automáticas</h4>
        <ul>
          <li><strong>Aumentar resolución:</strong> Convierte fotos borrosas en imágenes nítidas</li>
          <li><strong>Mejorar iluminación:</strong> Corrige fotos muy oscuras o muy claras</li>
          <li><strong>Eliminar ruido:</strong> Quita el "granulado" de fotos tomadas con poca luz</li>
          <li><strong>Corregir colores:</strong> Hace que los colores se vean más naturales y vibrantes</li>
          <li><strong>Enfocar automáticamente:</strong> Mejora la nitidez de fotos ligeramente desenfocadas</li>
        </ul>
        
        <h4>Ediciones creativas</h4>
        <ul>
          <li><strong>Eliminar objetos:</strong> Borra personas, cables, basura de tus fotos</li>
          <li><strong>Cambiar fondos:</strong> Reemplaza el fondo por paisajes o colores sólidos</li>
          <li><strong>Efectos artísticos:</strong> Convierte fotos en pinturas, dibujos o estilos únicos</li>
          <li><strong>Restaurar fotos antiguas:</strong> Repara fotos viejas dañadas o descoloridas</li>
          <li><strong>Crear avatares:</strong> Genera versiones animadas o artísticas de ti mismo</li>
        </ul>
        
        <h3>Mejores aplicaciones gratuitas</h3>
        
        <h4>Remini - Mejorador de fotos con IA</h4>
        <p><strong>Especialidad:</strong> Aumentar resolución y nitidez</p>
        <p><strong>Precio:</strong> Gratis con límites, Pro $4.99/semana</p>
        <p><strong>Lo que hace bien:</strong></p>
        <ul>
          <li>Mejora dramáticamente fotos borrosas o de baja calidad</li>
          <li>Excelente para fotos antiguas o tomadas con cámaras viejas</li>
          <li>Interfaz muy simple de usar</li>
          <li>Resultados impresionantes en rostros</li>
        </ul>
        <p><strong>Limitaciones:</strong></p>
        <ul>
          <li>Versión gratuita permite pocas fotos por día</li>
          <li>A veces "inventa" detalles que no estaban en la foto original</li>
          <li>Mejor con rostros que con paisajes</li>
        </ul>
        
        <h4>Snapseed (Google)</h4>
        <p><strong>Especialidad:</strong> Editor completo con funciones de IA</p>
        <p><strong>Precio:</strong> Completamente gratis</p>
        <p><strong>Lo que hace bien:</strong></p>
        <ul>
          <li>Herramientas profesionales sin costo</li>
          <li>Ajustes automáticos inteligentes</li>
          <li>Eliminar objetos con "Healing"</li>
          <li>Filtros y efectos de calidad</li>
          <li>No requiere cuenta ni suscripción</li>
        </ul>
        <p><strong>Cómo usarlo:</strong></p>
        <ol>
          <li>Abre tu foto</li>
          <li>Toca "Herramientas" → "Ajustar imagen"</li>
          <li>Deja que la IA haga ajustes automáticos</li>
          <li>Usa "Healing" para eliminar objetos no deseados</li>
          <li>Aplica filtros: Ve a "Looks" para estilos predefinidos</li>
          <li>Guarda: Toca "Exportar" → "Guardar"</li>
        </ol>
        
        <h4>VSCO</h4>
        <p><strong>Especialidad:</strong> Filtros profesionales y edición estética</p>
        <p><strong>Precio:</strong> Gratis con funciones básicas, $19.99/año para premium</p>
        <p><strong>Lo que hace bien:</strong></p>
        <ul>
          <li>Filtros de calidad cinematográfica</li>
          <li>Ajustes automáticos inteligentes</li>
          <li>Comunidad creativa activa</li>
          <li>Herramientas de edición avanzadas</li>
        </ul>
        
        <h4>Canva</h4>
        <p><strong>Especialidad:</strong> Edición simple con IA y plantillas</p>
        <p><strong>Precio:</strong> Gratis con funciones básicas</p>
        <p><strong>Lo que hace bien:</strong></p>
        <ul>
          <li>Eliminar fondos automáticamente</li>
          <li>Plantillas para redes sociales</li>
          <li>Efectos y filtros con IA</li>
          <li>Muy fácil de usar para principiantes</li>
        </ul>
        
        <h3>Aplicaciones especializadas</h3>
        
        <h4>Para eliminar fondos</h4>
        <p><strong>Remove.bg</strong></p>
        <ul>
          <li>Elimina fondos automáticamente</li>
          <li>5 imágenes gratis por mes</li>
          <li>Resultados muy precisos</li>
          <li>Funciona desde el navegador</li>
        </ul>
        
        <p><strong>Background Eraser</strong></p>
        <ul>
          <li>App móvil gratuita</li>
          <li>Elimina fondos con IA</li>
          <li>Permite edición manual adicional</li>
        </ul>
        
        <h4>Para restaurar fotos antiguas</h4>
        <p><strong>MyHeritage In Color</strong></p>
        <ul>
          <li>Colorea fotos en blanco y negro</li>
          <li>Mejora calidad de fotos antiguas</li>
          <li>Gratis con registro</li>
        </ul>
        
        <p><strong>Photomyne</strong></p>
        <ul>
          <li>Escanea y mejora fotos físicas</li>
          <li>Corrige automáticamente colores y contraste</li>
          <li>Organiza fotos por fechas</li>
        </ul>
        
        <h4>Para efectos artísticos</h4>
        <p><strong>Prisma</strong></p>
        <ul>
          <li>Convierte fotos en obras de arte</li>
          <li>Estilos de pintores famosos</li>
          <li>Gratis con anuncios</li>
        </ul>
        
        <p><strong>DeepArt</strong></p>
        <ul>
          <li>Efectos artísticos avanzados</li>
          <li>Basado en redes neuronales</li>
          <li>Resultados únicos y creativos</li>
        </ul>
        
        <h3>Herramientas web gratuitas</h3>
        
        <h4>Photopea</h4>
        <p><strong>Qué es:</strong> Photoshop gratuito en el navegador</p>
        <p><strong>Funciones de IA:</strong></p>
        <ul>
          <li>Relleno consciente del contenido</li>
          <li>Selección automática de objetos</li>
          <li>Filtros inteligentes</li>
          <li>Compatible con archivos de Photoshop</li>
        </ul>
        
        <h4>Cleanup.pictures</h4>
        <p><strong>Qué hace:</strong> Elimina objetos de fotos automáticamente</p>
        <ul>
          <li>Completamente gratis</li>
          <li>Solo marca el objeto y lo elimina</li>
          <li>No requiere registro</li>
          <li>Funciona en el navegador</li>
        </ul>
        
        <h4>Upscale.media</h4>
        <p><strong>Qué hace:</strong> Aumenta resolución de imágenes</p>
        <ul>
          <li>Hasta 4x el tamaño original</li>
          <li>Gratis para imágenes pequeñas</li>
          <li>Mantiene calidad al agrandar</li>
        </ul>
        
        <h3>Guía paso a paso: Mejorar una foto</h3>
        
        <h4>Usando Snapseed (gratis):</h4>
        <ol>
          <li><strong>Descarga Snapseed</strong> de App Store o Google Play</li>
          <li><strong>Abre tu foto</strong> tocando el ícono "+"</li>
          <li><strong>Mejora automática:</strong> Ve a "Herramientas" → "Ajustar imagen"</li>
          <li><strong>Ajusta manualmente:</strong> Usa "Brillo", "Contraste", "Saturación"</li>
          <li><strong>Elimina objetos:</strong> Usa "Healing" para borrar elementos no deseados</li>
          <li><strong>Aplica filtros:</strong> Ve a "Looks" para estilos predefinidos</li>
          <li><strong>Guarda:</strong> Toca "Exportar" → "Guardar"</li>
        </ol>
        
        <h4>Usando Remove.bg para eliminar fondo:</h4>
        <ol>
          <li><strong>Ve a remove.bg</strong> en tu navegador</li>
          <li><strong>Sube tu foto</strong> arrastrándola o haciendo clic en "Upload Image"</li>
          <li><strong>Espera</strong> 5-10 segundos mientras la IA procesa</li>
          <li><strong>Descarga</strong> el resultado sin fondo</li>
          <li><strong>Opcional:</strong> Agrega un nuevo fondo en Canva</li>
        </ol>
        
        <h3>Consejos para mejores resultados</h3>
        
        <h4>Para que la IA funcione mejor:</h4>
        <ul>
          <li><strong>Usa fotos de buena calidad inicial:</strong> La IA mejora, pero no hace milagros</li>
          <li><strong>Evita sobre-procesar:</strong> Menos es más, no apliques todos los filtros</li>
          <li><strong>Mantén copias originales:</strong> Siempre guarda la foto original</li>
          <li><strong>Experimenta con diferentes apps:</strong> Cada una tiene fortalezas diferentes</li>
          <li><strong>Ajusta manualmente después:</strong> La IA es un punto de partida, no el final</li>
        </ul>
        
        <h4>Errores comunes a evitar:</h4>
        <ul>
          <li><strong>Sobre-saturar colores:</strong> Los colores muy intensos se ven artificiales</li>
          <li><strong>Exceso de nitidez:</strong> Puede crear halos y artefactos</li>
          <li><strong>Eliminar demasiado ruido:</strong> Puede hacer que la foto se vea "plástica"</li>
          <li><strong>Confiar 100% en automático:</strong> Siempre revisa y ajusta manualmente</li>
        </ul>
        
        <h3>Casos de uso específicos</h3>
        
        <h4>Para fotos de redes sociales:</h4>
        <ol>
          <li>Usa VSCO para filtros estéticos</li>
          <li>Ajusta brillo y contraste en Snapseed</li>
          <li>Elimina imperfecciones con Healing</li>
          <li>Redimensiona para cada plataforma en Canva</li>
        </ol>
        
        <h4>Para fotos familiares antiguas:</h4>
        <ol>
          <li>Escanea con buena resolución</li>
          <li>Usa Remini para mejorar nitidez</li>
          <li>Colorea con MyHeritage si es blanco y negro</li>
          <li>Ajusta colores y contraste en Snapseed</li>
        </ol>
        
        <h4>Para fotos de productos (venta online):</h4>
        <ol>
          <li>Elimina fondo con Remove.bg</li>
          <li>Agrega fondo blanco limpio</li>
          <li>Mejora iluminación en Snapseed</li>
          <li>Asegúrate de que los colores sean precisos</li>
        </ol>
        
        <h3>Limitaciones de la IA actual</h3>
        
        <h4>Lo que la IA NO puede hacer bien:</h4>
        <ul>
          <li><strong>Crear detalles que no existen:</strong> No puede "adivinar" información perdida</li>
          <li><strong>Entender contexto:</strong> Puede eliminar partes importantes por error</li>
          <li><strong>Mantener estilo consistente:</strong> Los resultados pueden variar</li>
          <li><strong>Trabajar con fotos muy dañadas:</strong> Hay límites en lo que puede reparar</li>
        </ul>
        
        <h4>Cuándo usar edición manual:</h4>
        <ul>
          <li>Para ajustes muy específicos</li>
          <li>Cuando la IA comete errores obvios</li>
          <li>Para mantener un estilo personal</li>
          <li>En proyectos profesionales importantes</li>
        </ul>
        
        <h3>El futuro de la edición con IA</h3>
        
        <h4>Tendencias emergentes:</h4>
        <ul>
          <li><strong>Edición en tiempo real:</strong> Mejoras automáticas mientras tomas la foto</li>
          <li><strong>IA más inteligente:</strong> Mejor comprensión del contexto</li>
          <li><strong>Integración en cámaras:</strong> Procesamiento de IA directamente en el dispositivo</li>
          <li><strong>Edición por voz:</strong> "Haz esta foto más brillante" y la IA lo hace</li>
        </ul>
        
        <h3>Consideraciones éticas</h3>
        
        <h4>Uso responsable:</h4>
        <ul>
          <li><strong>Transparencia:</strong> Menciona si una foto está muy editada</li>
          <li><strong>Realismo:</strong> Evita crear expectativas irreales</li>
          <li><strong>Privacidad:</strong> Lee los términos de las apps sobre uso de tus fotos</li>
          <li><strong>Autenticidad:</strong> Mantén un balance entre mejora y naturalidad</li>
        </ul>
        
        <p><strong>Conclusión:</strong> La IA ha democratizado la edición de fotos, permitiendo que cualquiera pueda mejorar sus imágenes sin conocimientos técnicos. Las herramientas gratuitas disponibles son sorprendentemente poderosas y fáciles de usar. Sin embargo, la clave está en usarlas como complemento a tu creatividad, no como reemplazo. Experimenta con diferentes aplicaciones, aprende qué funciona mejor para tus necesidades, y recuerda que la mejor foto editada es aquella que mejora la original sin perder su esencia natural.</p>
      `,
    },
  ])

  // Cargar Google Identity Services
  useEffect(() => {
    const loadGoogleScript = () => {
      if (window.google) {
        initializeGoogle()
        return
      }

      const script = document.createElement("script")
      script.src = "https://accounts.google.com/gsi/client"
      script.async = true
      script.defer = true
      script.onload = initializeGoogle
      document.head.appendChild(script)
    }

    const initializeGoogle = () => {
      if (window.google) {
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

        // Validar que el Client ID esté configurado
        if (!clientId || clientId === "YOUR_GOOGLE_CLIENT_ID") {
          console.warn(
            "Google Client ID no configurado. Por favor configura NEXT_PUBLIC_GOOGLE_CLIENT_ID en tu archivo .env.local",
          )
          return
        }

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        })
        setIsGoogleLoaded(true)
      }
    }

    loadGoogleScript()
  }, [])

  // Manejar respuesta de Google
  const handleGoogleResponse = (response: any) => {
    try {
      // Decodificar el JWT token de Google
      const payload = JSON.parse(atob(response.credential.split(".")[1]))
      const userData: GoogleUser = {
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      }

      setGoogleUser(userData)
      setName(userData.name)
      setEmail(userData.email)
    } catch (error) {
      console.error("Error al procesar la respuesta de Google:", error)
    }
  }

  // Renderizar botón de Google
  useEffect(() => {
    if (isGoogleLoaded && !googleUser) {
      const googleButtonElement = document.getElementById("google-signin-button")
      if (googleButtonElement && window.google) {
        // Limpiar el contenido anterior
        googleButtonElement.innerHTML = ""
        window.google.accounts.id.renderButton(googleButtonElement, {
          theme: "filled_blue",
          size: "large",
          text: "continue_with",
          shape: "rectangular",
          logo_alignment: "left",
          width: "100%",
        })
      }
    }
  }, [isGoogleLoaded, googleUser])

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
    setCurrentView("home") // Asegurar que regresamos a la vista principal
  }

  const handleSubscription = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && name) {
      setIsSubscribed(true)
      setTimeout(() => {
        setIsSubscribed(false)
        setEmail("")
        setName("")
        setGoogleUser(null)
      }, 3000)
    }
  }

  const handleGoogleSignIn = () => {
    if (window.google) {
      window.google.accounts.id.prompt()
    }
  }

  const handleLogoutGoogle = () => {
    setGoogleUser(null)
    setName("")
    setEmail("")
  }

  const handleReadMore = (article: NewsArticle) => {
    setSelectedArticle(article)
    setCurrentView("article")
    // Scroll to top
    window.scrollTo(0, 0)
  }

  const handleBackToHome = () => {
    setCurrentView("home")
    setSelectedArticle(null)
    window.scrollTo(0, 0)
  }

  const getRelatedArticles = (currentArticle: NewsArticle) => {
    return allNews
      .filter((article) => article.id !== currentArticle.id && article.category === currentArticle.category)
      .slice(0, 3)
  }

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.name : categoryId
  }

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.color : "bg-gray-600"
  }

  // Vista de artículo individual
  if (currentView === "article" && selectedArticle) {
    const relatedArticles = getRelatedArticles(selectedArticle)

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-gray-900 bg-fixed">
        <div className="absolute inset-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=2125&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>

        {/* Header simplificado para artículo */}
        <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/10 border-b border-white/20">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <button
                onClick={handleBackToHome}
                className="flex items-center gap-3 text-white hover:text-blue-300 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 text-white p-2 rounded-lg">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">Hola, Tecnología</h1>
                    <span className="text-xs text-blue-200">News</span>
                  </div>
                </div>
              </button>

              <div className="flex items-center gap-4">
                <button className="text-white hover:text-blue-300 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="text-white hover:text-blue-300 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Contenido del artículo */}
        <main className="py-8">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Header del artículo */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(selectedArticle.category)}`}
                >
                  {getCategoryName(selectedArticle.category)}
                </span>
                <span className="text-gray-300 text-sm">{selectedArticle.timeAgo}</span>
                <span className="text-gray-300 text-sm flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedArticle.readTime}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{selectedArticle.title}</h1>

              <p className="text-xl text-gray-200 mb-6">{selectedArticle.summary}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">{selectedArticle.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{selectedArticle.author}</p>
                    <p className="text-gray-300 text-sm">Autor</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {selectedArticle.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Imagen del artículo */}
            <div className="relative h-64 md:h-96 mb-8 rounded-xl overflow-hidden">
              <Image
                src={selectedArticle.image || "/placeholder.svg"}
                alt={selectedArticle.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Contenido del artículo */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8 mb-8">
              <div
                className="prose prose-invert prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                style={{
                  color: "#e2e8f0",
                  lineHeight: "1.7",
                }}
              />
            </div>

            {/* Interacciones del artículo */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-white hover:text-red-400 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span>Me gusta</span>
                  </button>
                  <button className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>Comentar</span>
                  </button>
                  <button className="flex items-center gap-2 text-white hover:text-green-400 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span>Compartir</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Artículos relacionados */}
            {relatedArticles.length > 0 && (
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Más artículos de {getCategoryName(selectedArticle.category)}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedArticles.map((article) => (
                    <div key={article.id} className="cursor-pointer group" onClick={() => handleReadMore(article)}>
                      <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
                        <Image
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="text-white font-medium mb-2 group-hover:text-blue-300 transition-colors">
                        {article.title}
                      </h4>
                      <p className="text-gray-300 text-sm">{article.timeAgo}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    )
  }

  // Vista principal (home)
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

            <div className="mt-4 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0 text-left">
                <h3 className="text-lg font-bold text-white mb-2">iPhone 16 - Diseñado para Apple Intelligence</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Descubre el nuevo iPhone 16 con chip A18, Control de Cámara y colores vibrantes. Construido para Apple
                  Intelligence.
                </p>
                <a
                  href="https://www.apple.com/iphone-16/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-black hover:bg-black text-white text-sm px-4 py-2 rounded-md"
                >
                  Conoce más
                </a>
              </div>
              <div className="w-40 h-32 relative">
                <video
                  className="w-full h-full object-cover rounded-lg"
                  muted
                  playsInline
                  loop
                  autoPlay
                  preload="metadata"
                  role="img"
                  aria-label="iPhone 16 series showcasing front view of iPhone 16 pro, Action Button and Camera Control with dynamic abstract animation of iPhone 16 showing Ultramarine, Teal and Pink colors and ending the animation showcasing iPhone 16 Pro, iPhone 16 and iPhone 16e in White color."
                >
                  <source
                    src="/105/media/us/iphone/family/2025/e7ff365a-cb59-4ce9-9cdf-4cb965455b69/anim/welcome/medium_2x.mp4#t=6.513572"
                    type="video/mp4"
                  />
                  </video>              
                  <Image
                    src="https://th.bing.com/th/id/R.64c24b79854932ede4a4fef035ee876b?rik=HPfSV6e9RUbMZg&riu=http%3a%2f%2fimg.youtube.com%2fvi%2feDqfg_LexCQ%2fmaxresdefault.jpg&ehk=A90BDg8QynRurVr22VmGkhZJ5lf5YtfbEMWfik12mXU%3d&risl=&pid=ImgRaw&r=0"
                    alt="iPhone 16"
                    fill
                    className="object-cover rounded-lg"
                    style={{ position: 'absolute', top: 0, left: 0 }}
                    />
                  
              </div>
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
                <Button
                  onClick={() => {
                    handleCategoryClick("all")
                    // Scroll to news section
                    setTimeout(() => {
                      const newsSection = document.querySelector('[data-section="featured-news"]')
                      if (newsSection) {
                        newsSection.scrollIntoView({ behavior: "smooth" })
                      }
                    }, 100)
                  }}
                  className="bg-purple-800 hover:bg-purple-500 text-white"
                >
                  Últimas Noticias Tech
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
          <section className="py-16 bg-white/5 backdrop-blur-sm" data-section="featured-news">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-bold text-white">
                  {selectedCategory === "all"
                    ? "Noticias Tech Destacadas"
                    : `${getCategoryName(selectedCategory)} Destacadas`}
                </h2>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredNews.map((article) => (
                  <div
                    key={article.id}
                    className="rounded-xl overflow-hidden backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 group cursor-pointer"
                    onClick={() => handleReadMore(article)}
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
                    className="flex gap-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                    onClick={() => handleReadMore(article)}
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
                <div className="space-y-6">
                  {/* Información sobre Google Sign-In */}
                  {!googleUser && (
                    <div className="text-center">
                      <p className="text-gray-200 mb-4">Regístrate fácilmente con Google o completa el formulario:</p>

                      {/* Botón de Google Sign-In */}
                      <div className="flex justify-center mb-6">
                        {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID &&
                        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID !== "YOUR_GOOGLE_CLIENT_ID" ? (
                          <div id="google-signin-button" className="max-w-xs"></div>
                        ) : (
                          <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-4 text-yellow-200">
                            <p className="text-sm">
                              <strong>Para desarrolladores:</strong> Google Sign-In no está configurado. Configura
                              NEXT_PUBLIC_GOOGLE_CLIENT_ID en tu archivo .env.local
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px bg-white/20"></div>
                        <span className="text-gray-300 text-sm">o completa manualmente</span>
                        <div className="flex-1 h-px bg-white/20"></div>
                      </div>
                    </div>
                  )}

                  {/* Mostrar información del usuario de Google */}
                  {googleUser && (
                    <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {googleUser.picture && (
                            <img
                              src={googleUser.picture || "/placeholder.svg"}
                              alt={googleUser.name}
                              className="w-10 h-10 rounded-full"
                            />
                          )}
                          <div>
                            <p className="text-white font-medium">¡Hola, {googleUser.name}!</p>
                            <p className="text-green-200 text-sm">{googleUser.email}</p>
                          </div>
                        </div>
                        <button
                          onClick={handleLogoutGoogle}
                          className="text-green-200 hover:text-white text-sm underline"
                        >
                          Cambiar cuenta
                        </button>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubscription} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        type="text"
                        placeholder="Tu nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:bg-white/20"
                        disabled={!!googleUser}
                      />
                      <Input
                        type="email"
                        placeholder="Tu correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:bg-white/20"
                        disabled={!!googleUser}
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
                </div>
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
