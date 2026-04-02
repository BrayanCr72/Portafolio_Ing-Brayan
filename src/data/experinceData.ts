

interface Project {
  name: string;
  description: string;
  technologies: string[];
  role: string;
  challenge: string;
  impact: string;
  Url?: string; // opcional con ?
}

interface Company {
  title: string;
  projects: Project[];
}

interface ExperienceData {
  title: string;
  srs: Company;
  fundes: Company;
  universidad: Company;
  freelance: Company;
}

interface Experience {
  es: ExperienceData;
  en: ExperienceData;
}
export const experience = {
  es: {
    title: "Experiencia Profesional",
    srs: {
      title: "SRS (Servicio de Registros Sanitarios)",
      projects: [
        {
          name: "RegControl",
          description:
            "Sistema de control de registros y trazabilidad utilizado dentro de SRS para centralizar documentación, gestionar estados y almacenar archivos en la nube.",
          technologies: [
            "React",
            "Nest.js",
            "PostgreSQL",
            "Railway",
            "AWS S3",
            "AWS Lambda"
          ],
          role:
            "Participé en el análisis y planeamiento, diseño de la base de datos, creación de procedimientos almacenados, desarrollo del backend y frontend, configuración de AWS y despliegue completo.",
          challenge:
            "Fue mi primer experiencia laboral y el mayor reto fue implementar servicios en la nube con AWS. Integrar S3 y Lambda para el manejo de documentación fue un aprendizaje clave.",
          impact:
            "El sistema mejoró el orden, trazabilidad y gestión interna de registros, generando un impacto significativo dentro de la empresa.",
          Url: ""
        },
        {
          name: "Sitio Web Informativo + Asistente IA",
          description:
            "Desarrollo del sitio web oficial de SRS con un chatbot basado en IA para atender consultas sobre la empresa.",
          technologies: [
            "React",
            "FastAPI",
            "PostgreSQL",
            "OpenAI API",
            "Railway",
            "GoDaddy Domains"
          ],
          role:
            "Diseño, desarrollo frontend, creación del backend, integración del chatbot con OpenAI y despliegue final.",
          challenge:
            "El reto principal fue crear e integrar el asistente virtual con IA, lo cual marcó mi primera incursión en inteligencia artificial.",
          impact:
            "El sitio fortaleció la presencia digital de SRS y permitió a los usuarios aclarar dudas de forma rápida mediante el chatbot.",
          Url: "https://www.srsregistros.com/"
        }
      ]
    },

    fundes: {
      title: "Fundes",
      projects: [
        {
          name: "Sistema de Gestión Interno",
          description:
            "Sistema interno utilizado por Fundes para gestión administrativa.",
          technologies: ["Next.js"],
          role:
            "Desarrollo de componentes frontend y conexión con APIs existentes.",
          challenge:
            "Fue un trabajo de corta duración y técnicamente sencillo, sin retos significativos.",
          impact:
            "Contribuí al avance del frontend y a la mejora del flujo interno del sistema.",
          Url: ""
        }
      ]
    },

    universidad: {
      title: "Universidad Nacional de Costa Rica",
      projects: [
        {
          name: "Sistema de Control y Gestión de Activos",
          description:
            "Plataforma para gestionar activos universitarios, con validación de datos, análisis de incongruencias y carga masiva.",
          technologies: ["Laravel", "JavaScript", "SQL", "HTML", "CSS"],
          role:
            "Uno de los integrantes principales del proyecto: análisis, planeamiento, desarrollo full-stack y optimización de consultas.",
          challenge:
            "El mayor reto fue manejar grandes volúmenes de datos y detectar inconsistencias entre registros antiguos y nuevos.",
          impact:
            "El sistema mejoró los controles internos y redujo errores en la gestión de activos.",
          Url: ""
        },
        {
          name: "FitPass",
          description:
            "Sistema de control y gestión para gimnasios, con análisis corporal, membresías, finanzas y rutinas generadas por IA.",
          technologies: [
            "Next.js",
            "FastAPI",
            "PostgreSQL",
            "Railway",
            "OpenAI API",
            "React Native"
          ],
          role:
            "Lideré el análisis y diseño de la base de datos, desarrollo backend, integración con IA y trabajo en la capa frontend.",
          challenge:
            "Integrar IA para crear rutinas personalizadas, geolocalización por mapa y manejo de múltiples roles dentro de una misma plataforma.",
          impact:
            "FitPass ofreció una automatización avanzada para gyms, potenciando decisiones con IA y mejorando la experiencia de usuarios y administradores.",
          Url: ""
        },
        {
          name: "Tico Travel (App Móvil)",
          description:
            "Aplicación móvil para registrar destinos turísticos y gestionar reservaciones.",
          technologies: [
            ".NET MAUI",
            ".NET Core",
            "SQL Server",
            "React Native"
          ],
          role:
            "Diseño de la base de datos, procedimientos almacenados, creación del backend y desarrollo frontend.",
          challenge:
            "Integrar tecnologías móviles y backend robusto con flujos de reserva.",
          impact:
            "La app permitió centralizar destinos, usuarios y reservaciones en un entorno móvil moderno.",
          Url: ""
        }
      ]
    },

    freelance: {
      title: "Freelance",
      projects: [
        {
          name: "Build a Trip",
          description:
            "Plataforma para crear itinerarios de viaje en Costa Rica, con descuentos automáticos y pasarela de pagos.",
          technologies: ["React", "Supabase", "Vercel", "Moneris Payments"],
          role:
            "Desarrollo completo: diseño, frontend, backend, integraciones y despliegue.",
          challenge:
            "Integración de pasarela de pagos internacional y manejo dinámico de itinerarios.",
          impact:
            "Una herramienta funcional que permite a los usuarios planear viajes de forma intuitiva y segura.",
          Url: "https://www.buildatripcr.com/"
        },
        {
          name: "HealthPort",
          description:
            "Plataforma de casilleros para compras internacionales enfocada en el sector salud.",
          technologies: ["React", "Supabase", "Vercel"],
          role:
            "Desarrollo full-stack, diseño de lógica de roles, manejo de delivery codes, panel administrativo y dashboard avanzado.",
          challenge:
            "Implementar trazabilidad completa de paquetes y roles específicos para delivery, admins y superadmin.",
          impact:
            "Un sistema confiable que optimiza compras internacionales y garantiza la seguridad en entregas.",
          Url: ""
        }
      ]
    }
  },

  // --------------------------------------------------------------------
  // -------------------------- ENGLISH VERSION --------------------------
  // --------------------------------------------------------------------

  en: {
    title: "Professional Experience",
    srs: {
      title: "SRS (Regulatory Solutions)",
      projects: [
        {
          name: "RegControl",
          description:
            "A record management and traceability system used internally to centralize documents, track processes, and store files in the cloud.",
          technologies: [
            "React",
            "Nest.js",
            "PostgreSQL",
            "Railway",
            "AWS S3",
            "AWS Lambda"
          ],
          role:
            "I contributed to the analysis, system planning, database design, stored procedures, backend and frontend development, AWS setup, and deployment.",
          challenge:
            "It was my first job experience, and integrating AWS services —especially S3 and Lambda— was the biggest challenge and learning opportunity.",
          impact:
            "The system greatly improved internal organization, traceability, and record management within SRS.",
          Url: ""

        },
        {
          name: "Company Website + AI Assistant",
          description:
            "Development of the official SRS website with an AI-based chatbot to answer user questions about the company.",
          technologies: [
            "React",
            "FastAPI",
            "PostgreSQL",
            "OpenAI API",
            "Railway",
            "GoDaddy Domains"
          ],
          role:
            "Designed the interface, built the frontend, developed the backend, integrated the AI assistant, and deployed the entire system.",
          challenge:
            "Building the AI chatbot was the most challenging part and marked my first experience working with artificial intelligence.",
          impact:
            "The website strengthened SRS's digital presence and improved user support through the chatbot.",
          Url: "https://www.srsregistros.com/"
        }
      ]
    },

    fundes: {
      title: "Fundes",
      projects: [
        {
          name: "Internal Management System",
          description:
            "Internal platform used for administrative workflows.",
          technologies: ["Next.js"],
          role:
            "Frontend development: components, interfaces, and API integrations.",
          challenge:
            "A short and technically simple project without major challenges.",
          impact:
            "Helped move the platform forward and improve UI functionality.",
          Url: ""
        }
      ]
    },

    universidad: {
      title: "National University of Costa Rica",
      projects: [
        {
          name: "Asset Management & Control System",
          description:
            "Platform for managing university assets, handling mass data imports, and detecting inconsistencies across records.",
          technologies: ["Laravel", "JavaScript", "SQL", "HTML", "CSS"],
          role:
            "Key team member: analysis, planning, backend, frontend, and data optimization.",
          challenge:
            "Handling large data volumes and identifying mismatch patterns between new and existing records.",
          impact:
            "Improved accuracy and control over the university’s asset inventory.",
          Url: ""
        },
        {
          name: "FitPass",
          description:
            "Gym management system with financial tracking, memberships, client measurements, notifications, and AI-generated routines.",
          technologies: [
            "Next.js",
            "FastAPI",
            "PostgreSQL",
            "Railway",
            "OpenAI API",
            "React Native"
          ],
          role:
            "Led the database design, backend logic, AI integration, and participated in frontend development.",
          challenge:
            "Integrating AI for personalized routines, implementing geolocation, and coordinating multiple user roles.",
          impact:
            "FitPass offered automation, intelligent training plans, and administrative efficiency for gyms.",
          Url: ""
        },
        {
          name: "Tico Travel (Mobile App)",
          description:
            "Mobile app to register travel destinations and manage reservations.",
          technologies: [
            ".NET MAUI",
            ".NET Core",
            "SQL Server",
            "React Native"
          ],
          role:
            "Database design, stored procedures, backend development, and frontend implementation.",
          challenge:
            "Combining mobile frameworks with robust backend flows for reservations.",
          impact:
            "The app centralized tourism listings and reservations on a modern mobile platform.",
          Url: ""
        }
      ]
    },

    freelance: {
      title: "Freelance",
      projects: [
        {
          name: "Build a Trip",
          description:
            "A travel itinerary platform for Costa Rica, with automatic discounts and integrated payment gateway.",
          technologies: ["React", "Supabase", "Vercel", "Moneris Payments"],
          role: "Full-stack development, integrations, design, and deployment.",
          challenge:
            "Integrating an international payment gateway and managing dynamic travel itineraries.",
          impact:
            "Enabled users to easily create and pay for customized itineraries in Costa Rica.",
          Url: "https://www.buildatripcr.com/"
        },
        {
          name: "HealthPort",
          description:
            "Locker platform for international purchases focused on the medical sector, including package tracking and multi-role system.",
          technologies: ["React", "Supabase", "Vercel"],
          role:
            "Full-stack development, role logic, delivery code system, admin panel, and analytics dashboard.",
          challenge:
            "Implementing full traceability of packages and secure code-based delivery validation.",
          impact:
            "A reliable platform that optimizes medical-sector imports and ensures secure package delivery.",
          Url: ""
        }
      ]
    }
  }
};
