"use client";

import Image from "next/image";
import { 
  motion, 
  useScroll, 
  useTransform, 
  AnimatePresence, 
  useInView,
  useSpring
} from "framer-motion";
import { 
  ArrowRight, Heart, Trophy, Users, Menu, X, 
  Calendar, MapPin, ChevronDown, Mail, Instagram, 
  Facebook, Youtube, FileText, ExternalLink,
  Phone, Send, Sparkles, CheckCircle2, Search,
  QrCode, Copy, ArrowUpRight, Quote,
  ChevronLeft, ChevronRight, XCircle, ZoomIn
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ============================================================================
// UTILITIES & HOOKS
// ============================================================================

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Hook para detectar tamanho da tela (Responsividade JS)
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

// ============================================================================
// TYPES & INTERFACES (TypeScript Robustness)
// ============================================================================

interface NavItem {
  name: string;
  href: string;
}

interface StatItem {
  id: number;
  label: string;
  value: number;
  suffix: string;
  description?: string;
}

interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  image?: string;
}

interface TimelineItem {
  year: string;
  title: string;
  desc: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio?: string;
}

interface GalleryImage {
  id: number;
  cat: 'esporte' | 'cultura' | 'social';
  src: string;
  alt: string;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  cat: string;
  author?: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  avatar: string;
}

// ============================================================================
// MOCK DATA (Expanded)
// ============================================================================

const NAVIGATION: NavItem[] = [
  { name: "Início", href: "#inicio" },
  { name: "Projetos", href: "#projetos" },
  { name: "História", href: "#historia" },
  { name: "Transparência", href: "#transparencia" },
  { name: "Galeria", href: "#galeria" },
  { name: "Contato", href: "#contato" },
];

const STATS: StatItem[] = [
  { id: 1, label: "Vidas Impactadas", value: 5200, suffix: "+", description: "Crianças e jovens atendidos diretamente." },
  { id: 2, label: "Eventos Realizados", value: 145, suffix: "", description: "Campeonatos, oficinas e ações sociais." },
  { id: 3, label: "Voluntários Ativos", value: 380, suffix: "", description: "Pessoas dedicando tempo à causa." },
  { id: 4, label: "Cestas Doadas (kg)", value: 12000, suffix: "", description: "Alimento na mesa de quem precisa." },
];

const SERVICES: ServiceItem[] = [
  { 
    id: "esportes",
    title: "Esporte & Disciplina", 
    desc: "A Copa Lite e nossos treinos de Futsal não formam apenas atletas de alto rendimento, formam cidadãos com disciplina, respeito, trabalho em equipe e garra para vencer na vida.",
    tags: ["Futsal", "Vôlei", "Funcional"],
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&q=80"
  },
  { 
    id: "cultura",
    title: "Cultura & Arte", 
    desc: "Oficinas de teatro, música e dança. Acreditamos que a expressão artística é a chave para desbloquear o potencial criativo dos jovens e afastá-los da vulnerabilidade social.",
    tags: ["Teatro", "Música", "Dança"],
    image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=800&q=80"
  },
  { 
    id: "social",
    title: "Ação Social Integrada", 
    desc: "Suporte integral às famílias. Distribuição de alimentos, apoio psicológico, jurídico e reforço escolar no contra-turno para garantir um desenvolvimento pleno.",
    tags: ["Cestas", "Psicologia", "Educação"],
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80"
  }
];

const TIMELINE: TimelineItem[] = [
  { year: "2018", title: "A Fundação", desc: "Nascemos de um sonho no Guará com apenas um time de futsal e muita vontade de fazer a diferença." },
  { year: "2020", title: "Resiliência na Pandemia", desc: "Adaptação rápida para cultos online e distribuição recorde de 5 toneladas de alimentos." },
  { year: "2022", title: "Expansão Cultural", desc: "Inauguração do polo de cultura com oficinas de teatro e parcerias com escolas locais." },
  { year: "2024", title: "Selo de Excelência", desc: "Parceria firmada com Ministério do Esporte e expansão da Copa Lite para todo o DF." },
  { year: "2025", title: "O Futuro Digital", desc: "Lançamento da plataforma de gestão e novos polos de atendimento no Entorno." },
];

const TEAM: TeamMember[] = [
  { name: "Pr. João Silva", role: "Presidente", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop" },
  { name: "Dra. Ana Souza", role: "Dir. Social", image: "https://images.unsplash.com/photo-1573496359-7013c53bca1b?w=400&h=400&fit=crop" },
  { name: "Carlos Mendes", role: "Coord. Esportes", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" },
  { name: "Mariana Lima", role: "Coord. Cultura", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop" },
];

const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1, cat: "esporte", src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80", alt: "Final do Campeonato de Futsal" },
  { id: 2, cat: "cultura", src: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?w=800&q=80", alt: "Apresentação de Teatro" },
  { id: 3, cat: "social", src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80", alt: "Entrega de Cestas Básicas" },
  { id: 4, cat: "esporte", src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&q=80", alt: "Torcida Organizada Jovem" },
  { id: 5, cat: "social", src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80", alt: "Atividades com Crianças" },
  { id: 6, cat: "cultura", src: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=800&q=80", alt: "Aula de Música e Violão" },
];

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Como o esporte afasta jovens das drogas e da violência",
    excerpt: "Estudos mostram que a prática regular de futsal reduz em 70% a chance de envolvimento com ilícitos em comunidades vulneráveis.",
    date: "12 FEV 2026",
    image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=600&q=80",
    cat: "Artigo",
    author: "Carlos Mendes"
  },
  {
    id: 2,
    title: "Resultado Final: Copa Lite 2025 - Edição Histórica",
    excerpt: "Confira as fotos exclusivas e os placares da final emocionante que parou o ginásio do Guará neste fim de semana.",
    date: "10 FEV 2026",
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=600&q=80",
    cat: "Notícia",
    author: "Redação AHMDF"
  },
  {
    id: 3,
    title: "Novo Edital de Cultura Aberto para Voluntários",
    excerpt: "Estamos selecionando professores voluntários de violão, teclado e artes plásticas. Saiba como participar da transformação.",
    date: "05 FEV 2026",
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?w=600&q=80",
    cat: "Comunicado",
    author: "Mariana Lima"
  }
];

const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: "Maria Clara", role: "Mãe de Aluno", text: "O projeto mudou a vida do meu filho. Antes ele ficava na rua, hoje ele sonha em ser atleta e melhorou as notas na escola.", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Lucas Ferreira", role: "Ex-Aluno e Voluntário", text: "Eu cresci jogando na Copa Lite. Hoje, volto como treinador para retribuir tudo o que fizeram por mim. Gratidão eterna.", avatar: "https://i.pravatar.cc/150?img=11" },
  { id: 3, name: "Fernanda Costa", role: "Parceira Local", text: "A seriedade e a transparência da AHMDF nos dá segurança para investir. Vemos o resultado no sorriso das crianças.", avatar: "https://i.pravatar.cc/150?img=5" },
];

const FAQ_DATA = [
  { question: "Como inscrever meu filho nos projetos?", answer: "As inscrições abrem trimestralmente. É necessário comparecer à nossa sede com RG, CPF do responsável e comprovante de escolaridade da criança." },
  { question: "A associação aceita doações de materiais?", answer: "Sim! Aceitamos doações de materiais esportivos (bolas, coletes), instrumentos musicais, alimentos não perecíveis e materiais escolares." },
  { question: "Onde ocorrem os treinos e oficinas?", answer: "Nossa sede principal fica no Ginásio do Guará, mas também atuamos nas quadras poliesportivas parceiras da QE 28 e arredores." },
  { question: "Como posso me tornar um voluntário?", answer: "Basta preencher o formulário na seção de contato ou nos enviar um WhatsApp. Temos vagas para diversas áreas, desde o administrativo até o campo." },
];

// ============================================================================
// MICRO-COMPONENTS (Reusability & Clean Code)
// ============================================================================

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on desktop to avoid touch issues
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setIsVisible(true);
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      ref={cursorRef}
      className="fixed w-6 h-6 border-2 border-blue-600 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out mix-blend-difference"
    />
  );
};

const SectionHeader = ({ title, subtitle, light = false, align = "left" }: { title: string, subtitle?: string, light?: boolean, align?: "left" | "center" }) => (
  <div className={cn("mb-16 md:mb-24 px-2", align === "center" ? "text-center" : "text-left")}>
    {subtitle && (
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={cn("block text-xs font-bold uppercase tracking-[0.2em] mb-4", light ? "text-neutral-400" : "text-blue-900")}
      >
        {subtitle}
      </motion.span>
    )}
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={cn("font-serif text-4xl md:text-5xl lg:text-7xl font-light tracking-tight leading-[1.1]", light ? "text-white" : "text-neutral-900")}
    >
      {title}
    </motion.h2>
    <motion.div 
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className={cn("mt-6 h-[2px] w-24 origin-left", light ? "bg-white/30" : "bg-blue-900", align === "center" && "mx-auto")} 
    />
  </div>
);

const AnimatedCounter = ({ value, suffix }: { value: number, suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const springValue = useSpring(0, { bounce: 0, duration: 2000 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) springValue.set(value);
  }, [isInView, value, springValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

// ============================================================================
// MODALS & OVERLAYS
// ============================================================================

const DonationModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white p-6 md:p-10 w-full max-w-lg shadow-2xl border border-neutral-100 rounded-none md:rounded-3xl relative overflow-hidden"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-neutral-100 rounded-full transition"><X className="text-neutral-500" /></button>
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-900">
             <Heart size={32} className="fill-blue-900" />
          </div>
          <h3 className="font-serif text-3xl text-neutral-900">Faça a Diferença</h3>
          <p className="text-neutral-500 mt-2 text-sm">Sua doação mantém nossos projetos vivos.</p>
        </div>

        <div className="bg-neutral-50 p-6 text-center border border-dashed border-neutral-300 mb-6 rounded-xl">
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">Chave PIX (CNPJ)</p>
          <div className="flex flex-col items-center gap-4">
             <QrCode className="text-neutral-900" size={64} />
             <code className="block text-lg font-mono font-bold text-neutral-900 bg-white px-4 py-2 rounded border border-neutral-200 select-all">
               44.441.844/0001-43
             </code>
          </div>
          <button className="mt-4 text-xs font-bold text-blue-900 flex items-center justify-center gap-2 hover:underline">
            <Copy size={12} /> Copiar Chave
          </button>
        </div>

        <button className="w-full py-4 bg-blue-900 text-white font-bold uppercase tracking-widest hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20 rounded-xl">
          Confirmar Doação Enviada
        </button>
      </motion.div>
    </div>
  );
};

const Lightbox = ({ image, onClose }: { image: GalleryImage | null, onClose: () => void }) => {
  if (!image) return null;
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-xl"
      onClick={onClose}
    >
      <button className="absolute top-6 right-6 text-white/50 hover:text-white transition"><XCircle size={48} /></button>
      <motion.div 
        initial={{ scale: 0.9 }} animate={{ scale: 1 }}
        className="relative max-w-5xl w-full max-h-[90vh] aspect-video"
        onClick={(e) => e.stopPropagation()} 
      >
        <Image src={image.src} alt={image.alt} fill className="object-contain" />
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
           <p className="text-xl font-serif font-bold">{image.alt}</p>
           <p className="text-sm uppercase tracking-widest opacity-70">{image.cat}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [openTransparency, setOpenTransparency] = useState<string | null>("futebol");
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  
  // Testimonial Carousel State
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const filteredImages = activeTab === "all" ? GALLERY_IMAGES : GALLERY_IMAGES.filter(img => img.cat === activeTab);

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <main className="w-full relative bg-[#FAFAF9] text-neutral-900 font-sans selection:bg-blue-900 selection:text-white overflow-x-hidden">
      <CustomCursor />
      <DonationModal isOpen={isDonationOpen} onClose={() => setIsDonationOpen(false)} />
      <AnimatePresence>
         {selectedImage && <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />}
      </AnimatePresence>

      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[100]" style={{ scaleX }} />

      {/* --- NAVIGATION (MODIFIED: LOGO ONLY) --- */}
      <motion.nav 
        className="fixed top-0 w-full z-50 bg-[#FAFAF9]/80 backdrop-blur-md border-b border-neutral-200 transition-all duration-300"
      >
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 h-20 sm:h-24 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 z-50">
             {/* Logo Aumentada e sem texto */}
             <div className="relative w-12 h-12 sm:w-16 sm:h-16 hover:scale-105 transition-transform duration-300">
                <Image src="/LOGO-missionáriosd.png" alt="AHMDF" fill className="object-contain" priority />
             </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {NAVIGATION.map((item) => (
              <a key={item.name} href={item.href} className="text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-blue-900 transition-colors relative group">
                {item.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <button 
              onClick={() => setIsDonationOpen(true)}
              className="px-8 py-3 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-blue-900 transition-colors rounded-none"
            >
              Doar Agora
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
             {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#FAFAF9] z-40 flex flex-col justify-center items-center gap-8 lg:hidden px-6"
          >
             {NAVIGATION.map((item) => (
              <a key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} className="font-serif text-3xl sm:text-4xl text-neutral-900 hover:text-blue-900 transition-colors">
                {item.name}
              </a>
            ))}
            <div className="w-16 h-[1px] bg-neutral-300 my-4"></div>
            <button onClick={() => { setIsDonationOpen(true); setIsMenuOpen(false); }} className="w-full max-w-xs py-4 bg-blue-900 text-white font-bold uppercase tracking-widest">
               Quero Doar
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION (MODIFIED: ALIGNMENT & IMAGE SIZE) --- */}
      <section id="inicio" className="pt-32 pb-16 md:pt-48 md:pb-32 px-4 sm:px-6 max-w-[1800px] mx-auto w-full overflow-hidden">
        {/* Changed items-end to items-center for vertical centering */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
             >
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                 <span className="text-blue-900 font-bold tracking-widest text-[10px] sm:text-xs uppercase">
                   Transformando Vidas Desde 2018
                 </span>
               </div>
               
               <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-[6.5rem] leading-[1] tracking-tighter text-neutral-900 mb-8 break-words">
                 O Esporte <br className="hidden sm:block"/>
                 <span className="text-neutral-400 italic font-light">Transforma.</span>
               </h1>
               
               <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-xl leading-relaxed mb-10 border-l-2 border-neutral-200 pl-6">
                 Unindo comunidades vulneráveis através da excelência no esporte e da liberdade na cultura. <strong className="text-neutral-900">Junte-se à nossa missão.</strong>
               </p>
               
               <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
                 <button onClick={() => setIsDonationOpen(true)} className="px-8 sm:px-10 py-4 bg-neutral-900 text-white text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-blue-900 transition-all shadow-lg hover:shadow-xl w-full sm:w-auto text-center">
                   Seja um Padrinho
                 </button>
                 <a href="#projetos" className="px-8 sm:px-10 py-4 border border-neutral-300 text-neutral-900 text-xs sm:text-sm font-bold uppercase tracking-widest hover:border-neutral-900 hover:bg-white transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
                   Nossos Projetos <ArrowRight size={16} />
                 </a>
               </div>
             </motion.div>
          </div>

          <div className="lg:col-span-5 relative mt-8 lg:mt-0 order-1 lg:order-2">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1, delay: 0.2 }}
               // Reduced max-width here (max-w-md instead of max-w-lg/none) to make image slightly smaller
               className="relative aspect-[3/4] md:aspect-[4/5] w-full max-w-sm md:max-w-md mx-auto overflow-hidden bg-neutral-200 rounded-sm"
             >
                <Image 
                  src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000" 
                  alt="Hero Image - Criança Jogando" 
                  fill 
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-out scale-105 hover:scale-100"
                  priority
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 text-xs font-bold uppercase tracking-widest z-10">
                   Brasília - DF
                </div>
                <div className="absolute bottom-0 left-0 bg-white p-6 md:p-8 max-w-[80%] border-t-4 border-blue-900">
                   <p className="font-serif text-xl sm:text-2xl mb-1 text-neutral-900">Copa Lite</p>
                   <p className="text-[10px] sm:text-xs text-neutral-500 uppercase tracking-widest">Final 2025 • Guará</p>
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* --- MARQUEE (Scrolling Text) --- */}
      <div className="w-full overflow-hidden bg-blue-900 py-4">
         <motion.div 
           animate={{ x: [0, -1000] }}
           transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
           className="whitespace-nowrap flex gap-8 text-white/80 font-bold uppercase tracking-widest text-xs sm:text-sm"
         >
           {[...Array(10)].map((_, i) => (
             <span key={i} className="flex items-center gap-8">
               <span>Disciplina • Respeito • Cidadania • Fé • Inclusão</span>
               <Sparkles size={12} className="text-blue-400" />
             </span>
           ))}
         </motion.div>
      </div>

      {/* --- STATS (Responsive Grid) --- */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200">
          {STATS.map((stat) => (
            <div key={stat.id} className="p-8 md:p-12 text-center group hover:bg-neutral-50 transition-colors">
               <h3 className="font-serif text-5xl md:text-6xl text-neutral-900 mb-2">
                 <AnimatedCounter value={stat.value} suffix={stat.suffix} />
               </h3>
               <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 group-hover:text-blue-900 transition-colors mb-2">{stat.label}</p>
               <p className="text-sm text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{stat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- PROJETOS (Sticky Layout) --- */}
      <section id="projetos" className="py-24 md:py-32 px-4 sm:px-6 max-w-[1800px] mx-auto">
        <SectionHeader title="Nossa Atuação" subtitle="Pilares" />
        
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
          {SERVICES.map((service, i) => (
            <motion.div 
              key={service.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group border-t border-neutral-200 pt-8 hover:border-blue-900 transition-colors duration-500 flex flex-col h-full"
            >
               <div className="flex justify-between items-start mb-6">
                 <span className="block text-xs font-bold text-neutral-300 group-hover:text-blue-900 transition-colors">0{i + 1}</span>
                 <ArrowUpRight className="text-neutral-300 group-hover:text-blue-900 transition-colors group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
               </div>
               
               <div className="aspect-video w-full overflow-hidden bg-neutral-100 mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">
                  {service.image && (
                    <Image src={service.image} alt={service.title} width={600} height={400} className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700" />
                  )}
               </div>

               <h3 className="font-serif text-2xl md:text-3xl mb-4 text-neutral-900">{service.title}</h3>
               <p className="text-neutral-500 leading-relaxed mb-6 flex-grow text-sm md:text-base">{service.desc}</p>
               
               <div className="flex flex-wrap gap-2 mt-auto">
                 {service.tags.map(tag => (
                   <span key={tag} className="text-[10px] uppercase border border-neutral-200 px-3 py-1 text-neutral-500 font-medium group-hover:border-blue-900 group-hover:text-blue-900 transition-colors">{tag}</span>
                 ))}
               </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- TIMELINE (Vertical Mobile Fix) --- */}
      <section id="historia" className="py-24 md:py-32 bg-neutral-900 text-white px-4 sm:px-6">
        <div className="max-w-[1800px] mx-auto">
          <SectionHeader title="Trajetória" subtitle="Legado" light />
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-0 border-t border-white/10 pt-12 md:pt-16">
            {TIMELINE.map((item, index) => (
              <div key={index} className="relative pl-6 md:pl-8 border-l border-white/10 md:border-l md:first:border-l-0 md:first:pl-0 group">
                <span className="text-3xl md:text-4xl font-serif text-neutral-600 mb-2 block group-hover:text-white transition-colors duration-300">{item.year}</span>
                <h4 className="text-lg md:text-xl font-medium mb-3 text-neutral-200">{item.title}</h4>
                <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">{item.desc}</p>
                {/* Dot for mobile visual */}
                <div className="absolute left-[-5px] top-3 w-2 h-2 bg-blue-500 rounded-full md:hidden"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TRANSPARÊNCIA (Accordion Improved) --- */}
      <section id="transparencia" className="py-24 md:py-32 px-4 sm:px-6 max-w-[1800px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
             <SectionHeader title="Transparência" subtitle="Prestação de Contas" />
             <p className="text-neutral-600 mb-8 text-lg">
               Acesso público a todos os documentos institucionais, balanços e termos de fomento. <strong>Integridade é nossa base.</strong>
             </p>
             <div className="relative aspect-video bg-neutral-100 overflow-hidden group cursor-pointer shadow-xl">
                <Image src="/transparencia-missionarios.png" alt="Portal Mais Brasil" fill className="object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                   <a href="/transparencia-missionarios.png" target="_blank" className="bg-white/95 backdrop-blur px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-blue-900 hover:text-white transition-colors shadow-lg">
                     <Search size={14} className="inline mr-2" />
                     Visualizar Portal
                   </a>
                </div>
             </div>
          </div>

          <div className="lg:col-span-8 space-y-2">
            {/* Accordion Item 1 */}
            <div className="border border-neutral-200 bg-white p-1 rounded-sm">
              <button 
                onClick={() => setOpenTransparency(openTransparency === 'futebol' ? null : 'futebol')}
                className={cn("w-full py-6 px-6 flex items-center justify-between text-left group transition-colors", openTransparency === 'futebol' ? 'bg-neutral-50' : 'bg-white')}
              >
                <div>
                  <span className="text-[10px] font-bold text-blue-900 uppercase tracking-widest mb-1 block">Convênio Ativo</span>
                  <h3 className="font-serif text-xl sm:text-2xl text-neutral-900">Termo de Fomento Nº 968401</h3>
                </div>
                <div className={`w-10 h-10 flex items-center justify-center border border-neutral-200 rounded-full transition-all duration-300 ${openTransparency === 'futebol' ? 'rotate-180 bg-neutral-900 text-white border-neutral-900' : ''}`}>
                   <ChevronDown size={18} />
                </div>
              </button>
              <AnimatePresence>
                {openTransparency === 'futebol' && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 md:p-8 pt-0 grid md:grid-cols-2 gap-8 text-sm text-neutral-600 border-t border-neutral-100 mt-4">
                       <div className="space-y-4">
                          <div>
                            <p className="font-bold text-neutral-900 mb-1">Objeto do Convênio</p>
                            <p>Realização do evento Futebol 7 da 2ª Copa Lite no DF, promovendo inclusão e esporte.</p>
                          </div>
                          <div>
                             <p className="font-bold text-neutral-900 mb-1">Status</p>
                             <span className="inline-flex items-center gap-2 text-green-700 bg-green-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                               <CheckCircle2 size={12} /> Em Execução
                             </span>
                          </div>
                       </div>
                       <div className="space-y-4">
                          <div>
                             <p className="font-bold text-neutral-900 mb-1">Identificadores</p>
                             <p className="font-mono bg-neutral-100 p-2 inline-block rounded">Proposta: 021203/2024</p>
                             <p className="font-mono bg-neutral-100 p-2 inline-block rounded ml-2">Emenda: 44970009</p>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-3 pt-2">
                             <button className="flex items-center justify-center gap-2 text-xs font-bold uppercase bg-neutral-100 hover:bg-blue-900 hover:text-white px-4 py-3 transition-colors w-full">
                                <FileText size={14} /> Edital 01 (RH)
                             </button>
                             <button className="flex items-center justify-center gap-2 text-xs font-bold uppercase bg-neutral-100 hover:bg-blue-900 hover:text-white px-4 py-3 transition-colors w-full">
                                <FileText size={14} /> Edital 02 (Bens)
                             </button>
                          </div>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

             {/* Accordion Item 2 */}
             <div className="border border-neutral-200 bg-white p-1 rounded-sm">
              <button 
                onClick={() => setOpenTransparency(openTransparency === 'estatuto' ? null : 'estatuto')}
                className={cn("w-full py-6 px-6 flex items-center justify-between text-left group transition-colors", openTransparency === 'estatuto' ? 'bg-neutral-50' : 'bg-white')}
              >
                <div>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1 block">Institucional</span>
                  <h3 className="font-serif text-xl sm:text-2xl text-neutral-900">Estatuto e Atas</h3>
                </div>
                <div className={`w-10 h-10 flex items-center justify-center border border-neutral-200 rounded-full transition-all duration-300 ${openTransparency === 'estatuto' ? 'rotate-180 bg-neutral-900 text-white border-neutral-900' : ''}`}>
                   <ChevronDown size={18} />
                </div>
              </button>
              <AnimatePresence>
                {openTransparency === 'estatuto' && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 md:p-8 pt-0 border-t border-neutral-100 mt-4">
                       <p className="text-neutral-600 mb-4 text-sm">Disponibilizamos nosso Estatuto Social e as atas das últimas assembleias para conferência pública.</p>
                       <a href="https://drive.google.com/file/d/1yjxx43XIuhdNmz0GGe9W904OBAEZC7yL/view" target="_blank" className="inline-flex items-center gap-2 text-sm font-bold text-blue-900 hover:text-blue-700 underline decoration-blue-200 underline-offset-4">
                          <ExternalLink size={16} /> Acessar pasta completa no Google Drive
                       </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion Item 3: Edital 001/2026 - RH */}
            <div className="border border-neutral-200 bg-white p-1 rounded-sm mt-2">
                <button
                    onClick={() => setOpenTransparency(openTransparency === 'edital1' ? null : 'edital1')}
                    className={cn("w-full py-6 px-6 flex items-center justify-between text-left group transition-colors", openTransparency === 'edital1' ? 'bg-neutral-50' : 'bg-white')}
                >
                    <div>
                        <span className="text-[10px] font-bold text-blue-900 uppercase tracking-widest mb-1 block">Processo Seletivo</span>
                        <h3 className="font-serif text-xl sm:text-2xl text-neutral-900">Cotação Prévia Nº 001/2026 - RH</h3>
                    </div>
                    <div className={`w-10 h-10 flex items-center justify-center border border-neutral-200 rounded-full transition-all duration-300 ${openTransparency === 'edital1' ? 'rotate-180 bg-neutral-900 text-white border-neutral-900' : ''}`}>
                        <ChevronDown size={18} />
                    </div>
                </button>
                <AnimatePresence>
                    {openTransparency === 'edital1' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="p-6 md:p-8 pt-0 grid md:grid-cols-2 gap-8 text-sm text-neutral-600 border-t border-neutral-100 mt-4">
                                <div className="space-y-4">
                                    <div>
                                        <p className="font-bold text-neutral-900 mb-1">Objeto do Edital</p>
                                        <p>Contratação de recursos humanos (Coordenador Geral, Coordenador Operacional e Auxiliar Operacional) para a realização do Evento Copa União Satélite no DF.</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-neutral-900 mb-1">Prazos</p>
                                        <p><strong>Recebimento:</strong> 10/06/2026 até 15/06/2026</p>
                                        <p><strong>Homologação:</strong> 15/06/2026 às 14h</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <p className="font-bold text-neutral-900 mb-1">Informações Financeiras</p>
                                        <p><strong>Convênio Relacionado:</strong> Termo de Fomento Nº 992769</p>
                                        <p><strong>Valor Estimado:</strong> R$ 24.520,00</p>
                                        <p><strong>Critério:</strong> Menor preço por item</p>
                                    </div>
                                    <div className="pt-2">
                                        <a href="/Edital RH (1).docx (1).pdf" target="_blank" className="flex items-center justify-center gap-2 text-xs font-bold uppercase bg-blue-900 text-white hover:bg-blue-800 px-4 py-3 transition-colors w-full">
                                            <FileText size={14} /> Baixar Edital Completo
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Accordion Item 4: Edital 002/2026 - Bens e Serviços */}
            <div className="border border-neutral-200 bg-white p-1 rounded-sm mt-2">
                <button
                    onClick={() => setOpenTransparency(openTransparency === 'edital2' ? null : 'edital2')}
                    className={cn("w-full py-6 px-6 flex items-center justify-between text-left group transition-colors", openTransparency === 'edital2' ? 'bg-neutral-50' : 'bg-white')}
                >
                    <div>
                        <span className="text-[10px] font-bold text-blue-900 uppercase tracking-widest mb-1 block">Aquisições</span>
                        <h3 className="font-serif text-xl sm:text-2xl text-neutral-900">Cotação Prévia Nº 002/2026 - Bens e Serviços</h3>
                    </div>
                    <div className={`w-10 h-10 flex items-center justify-center border border-neutral-200 rounded-full transition-all duration-300 ${openTransparency === 'edital2' ? 'rotate-180 bg-neutral-900 text-white border-neutral-900' : ''}`}>
                        <ChevronDown size={18} />
                    </div>
                </button>
                <AnimatePresence>
                    {openTransparency === 'edital2' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="p-6 md:p-8 pt-0 grid md:grid-cols-2 gap-8 text-sm text-neutral-600 border-t border-neutral-100 mt-4">
                                <div className="space-y-4">
                                    <div>
                                        <p className="font-bold text-neutral-900 mb-1">Objeto do Edital</p>
                                        <p>Prestação de serviços e aquisição de bens (medalhas, troféus, bolas, uniformes, arbitragem, ambulância, etc.) para a realização do Evento Copa União Satélite no DF.</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-neutral-900 mb-1">Prazos</p>
                                        <p><strong>Recebimento:</strong> 10/06/2026 até 15/06/2026</p>
                                        <p><strong>Homologação:</strong> 15/06/2026 às 13h</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <p className="font-bold text-neutral-900 mb-1">Informações Financeiras</p>
                                        <p><strong>Convênio Relacionado:</strong> Termo de Fomento Nº 992769</p>
                                        <p><strong>Valor Estimado:</strong> R$ 367.480,00</p>
                                        <p><strong>Critério:</strong> Menor preço por item</p>
                                    </div>
                                    <div className="pt-2">
                                        <a href="/Edital_Bens_e_Serviços (1) (1).docx (1).pdf" target="_blank" className="flex items-center justify-center gap-2 text-xs font-bold uppercase bg-blue-900 text-white hover:bg-blue-800 px-4 py-3 transition-colors w-full">
                                            <FileText size={14} /> Baixar Edital Completo
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* --- GALERIA (Lightbox & Masonry) --- */}
      <section id="galeria" className="py-24 md:py-32 bg-white px-4 sm:px-6">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
             <SectionHeader title="Galeria" subtitle="Registros" />
             <div className="flex gap-2 flex-wrap mb-10 md:mb-0">
               {['all', 'esporte', 'cultura', 'social'].map((cat) => (
                 <button
                   key={cat}
                   onClick={() => setActiveTab(cat)}
                   className={cn(
                     "text-[10px] sm:text-xs font-bold uppercase tracking-widest px-4 py-2 transition-all border",
                     activeTab === cat ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 text-neutral-500 hover:border-neutral-900 hover:text-neutral-900"
                   )}
                 >
                   {cat}
                 </button>
               ))}
             </div>
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            <AnimatePresence>
              {filteredImages.map((img) => (
                <motion.div
                  layout
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative aspect-square group overflow-hidden bg-neutral-100 cursor-zoom-in"
                  onClick={() => setSelectedImage(img)}
                >
                  <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-neutral-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                    <ZoomIn className="text-white mb-2" size={32} />
                    <span className="text-white font-serif text-lg italic">{img.alt}</span>
                    <span className="text-white/70 text-xs uppercase tracking-widest mt-2">{img.cat}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* --- TESTIMONIALS (Custom Slider) --- */}
      <section className="py-24 md:py-32 bg-[#F5F5F0] px-4 sm:px-6 overflow-hidden">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-blue-900">Depoimentos</span>
            <h2 className="font-serif text-4xl md:text-5xl">Vidas Transformadas</h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                 <Quote size={48} className="text-blue-900/20 mx-auto mb-8" />
                 <p className="font-serif text-2xl md:text-4xl text-neutral-900 leading-relaxed mb-10">
                   "{TESTIMONIALS[currentTestimonial].text}"
                 </p>
                 <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                       <Image src={TESTIMONIALS[currentTestimonial].avatar} alt="Avatar" width={64} height={64} className="object-cover" />
                    </div>
                    <div>
                       <h4 className="font-bold text-neutral-900">{TESTIMONIALS[currentTestimonial].name}</h4>
                       <p className="text-xs uppercase tracking-widest text-neutral-500">{TESTIMONIALS[currentTestimonial].role}</p>
                    </div>
                 </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center gap-4 mt-12">
               <button onClick={prevTestimonial} className="p-4 border border-neutral-300 rounded-full hover:bg-neutral-900 hover:text-white transition-colors hover:border-neutral-900">
                  <ChevronLeft size={20} />
               </button>
               <button onClick={nextTestimonial} className="p-4 border border-neutral-300 rounded-full hover:bg-neutral-900 hover:text-white transition-colors hover:border-neutral-900">
                  <ChevronRight size={20} />
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- BLOG (Cards Clean) --- */}
      <section id="blog" className="py-24 md:py-32 bg-neutral-900 text-neutral-400 px-4 sm:px-6">
         <div className="max-w-[1800px] mx-auto">
            <SectionHeader title="Atualizações" subtitle="Journal" light />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 border-t border-white/10 pt-12">
               {BLOG_POSTS.map((post) => (
                  <article key={post.id} className="group cursor-pointer flex flex-col h-full">
                     <div className="overflow-hidden aspect-[16/10] mb-6 bg-neutral-800">
                        <Image src={post.image} alt={post.title} width={600} height={400} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                     </div>
                     <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest mb-3">
                        <span className="text-white bg-blue-900 px-2 py-1">{post.cat}</span>
                        <span>{post.date}</span>
                     </div>
                     <h3 className="text-xl md:text-2xl font-serif text-white mb-4 leading-tight group-hover:underline decoration-1 underline-offset-4">{post.title}</h3>
                     <p className="text-sm leading-relaxed mb-6 flex-grow">{post.excerpt}</p>
                     <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white group-hover:translate-x-2 transition-transform">
                        Ler Artigo <ArrowRight size={12} />
                     </div>
                  </article>
               ))}
            </div>
         </div>
      </section>

      {/* --- FAQ (Clean) --- */}
      <section className="py-24 md:py-32 px-4 sm:px-6 max-w-3xl mx-auto">
         <h3 className="font-serif text-3xl md:text-4xl text-center mb-16 text-neutral-900">Dúvidas Frequentes</h3>
         <div className="space-y-6">
            {FAQ_DATA.map((faq, i) => (
               <details key={i} className="group border-b border-neutral-200 pb-6">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-lg text-neutral-800 hover:text-blue-900 transition-colors">
                     {faq.question}
                     <span className="transition-transform group-open:rotate-45 ml-4"><X size={20} className="text-neutral-400" /></span>
                  </summary>
                  <p className="mt-4 text-neutral-500 leading-relaxed text-sm md:text-base animate-in slide-in-from-top-2">{faq.answer}</p>
               </details>
            ))}
         </div>
      </section>

      {/* --- CONTACT (Split Screen Layout) --- */}
      <section id="contato" className="bg-white border-t border-neutral-200">
         <div className="max-w-[1800px] mx-auto grid lg:grid-cols-2">
            {/* Info Column */}
            <div className="bg-[#F5F5F0] p-12 md:p-24 lg:border-r border-neutral-200">
               <span className="text-xs font-bold uppercase tracking-widest text-blue-900 mb-6 block">Contato</span>
               <h2 className="font-serif text-5xl md:text-7xl text-neutral-900 mb-12">Vamos<br/>Conversar.</h2>
               
               <div className="space-y-12 text-lg">
                  <div>
                     <p className="text-xs uppercase font-bold text-neutral-400 tracking-widest mb-2 flex items-center gap-2">
                       <MapPin size={14} /> Visite-nos
                     </p>
                     <p className="font-serif text-2xl">QE 28 Bloco A Loja, Guará - DF</p>
                  </div>
                  <div>
                     <p className="text-xs uppercase font-bold text-neutral-400 tracking-widest mb-2 flex items-center gap-2">
                       <Phone size={14} /> Fale Conosco
                     </p>
                     <p className="font-serif text-2xl mb-1">(61) 9 9364-1738</p>
                     <p className="text-neutral-500 text-base">missionariosdf@gmail.com</p>
                  </div>
                  <div className="pt-8 border-t border-neutral-300">
                     <p className="text-xs uppercase font-bold text-neutral-400 tracking-widest mb-4">Redes Sociais</p>
                     <div className="flex gap-6">
                        <a href="#" className="w-12 h-12 border border-neutral-300 rounded-full flex items-center justify-center text-neutral-600 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all"><Instagram size={20} /></a>
                        <a href="#" className="w-12 h-12 border border-neutral-300 rounded-full flex items-center justify-center text-neutral-600 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all"><Facebook size={20} /></a>
                        <a href="#" className="w-12 h-12 border border-neutral-300 rounded-full flex items-center justify-center text-neutral-600 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all"><Youtube size={20} /></a>
                     </div>
                  </div>
               </div>
            </div>

            {/* Form Column */}
            <div className="p-12 md:p-24 bg-white flex flex-col justify-center">
               <h3 className="font-serif text-3xl mb-8">Envie uma mensagem</h3>
               <form className="space-y-8">
                  <div className="relative group">
                     <input type="text" placeholder=" " required className="peer w-full bg-transparent py-4 border-b border-neutral-300 outline-none focus:border-blue-900 transition-colors" />
                     <label className="absolute left-0 top-4 text-neutral-400 text-lg transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-900 peer-focus:font-bold peer-valid:-top-4 peer-valid:text-xs peer-valid:font-bold">Seu Nome</label>
                  </div>
                  <div className="relative group">
                     <input type="email" placeholder=" " required className="peer w-full bg-transparent py-4 border-b border-neutral-300 outline-none focus:border-blue-900 transition-colors" />
                     <label className="absolute left-0 top-4 text-neutral-400 text-lg transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-900 peer-focus:font-bold peer-valid:-top-4 peer-valid:text-xs peer-valid:font-bold">Seu E-mail</label>
                  </div>
                  <div className="relative group">
                     <textarea rows={4} placeholder=" " required className="peer w-full bg-transparent py-4 border-b border-neutral-300 outline-none focus:border-blue-900 transition-colors resize-none"></textarea>
                     <label className="absolute left-0 top-4 text-neutral-400 text-lg transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-900 peer-focus:font-bold peer-valid:-top-4 peer-valid:text-xs peer-valid:font-bold">Sua Mensagem</label>
                  </div>
                  <button className="px-12 py-5 bg-neutral-900 text-white font-bold uppercase tracking-widest text-sm hover:bg-blue-900 transition-all w-full md:w-auto flex items-center justify-center gap-3 group">
                     Enviar Mensagem <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
               </form>
            </div>
         </div>
      </section>

      {/* --- FOOTER (Minimal) --- */}
      <footer className="bg-white border-t border-neutral-200 py-12 px-6">
         <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
               <div className="relative w-6 h-6 grayscale opacity-50">
                  <Image src="/LOGO-missionáriosd.png" alt="AHMDF" fill className="object-contain" />
               </div>
               <span className="font-serif font-bold text-neutral-400 text-sm">AHMDF © 2026. Todos os direitos reservados.</span>
            </div>
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
               <a href="#" className="hover:text-blue-900 transition-colors">Privacidade</a>
               <a href="#" className="hover:text-blue-900 transition-colors">Termos de Uso</a>
               <a href="#" className="hover:text-blue-900 transition-colors">Mapa do Site</a>
            </div>
         </div>
      </footer>
    </main>
  );
}