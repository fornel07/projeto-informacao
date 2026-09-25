"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  Sparkles,
  BookOpen,
  Users,
  Compass,
  Lightbulb,
  Shield,
  Heart,
  Quote,
  CheckCircle2,
  ChevronRight,
  Building2,
  GraduationCap,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Calendar,
  Sun,
  Smile,
  HeartHandshake,
  Mail,
  Phone,
  Instagram,
  Facebook,
  ShieldCheck,
  ExternalLink,
  X,
  Lock
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================================================
// DADOS INSTITUCIONAIS REAIS — PROJETO INFORMAÇÃO
// ============================================================================

interface Founder {
  name: string;
  role: string;
  degrees: string[];
  currentPosition: string;
  location: string;
  photo: string;
  quote: string;
  badge: string;
}

interface ValueItem {
  id: string;
  number: string;
  title: string;
  description: string;
  practical: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const VALUES_DATA: ValueItem[] = [
  {
    id: "inovacao",
    number: "01",
    title: "Inovação",
    description:
      "Trabalhar de forma dinâmica e contínua para atender às necessidades da sociedade e formar agentes transformadores da realidade social.",
    practical: "Metodologias pedagógicas abertas, simulados autorais e adaptação às realidades individuais de cada vestibulando.",
    icon: Lightbulb,
    accentColor: "#FFB30F"
  },
  {
    id: "comprometimento",
    number: "02",
    title: "Comprometimento",
    description:
      "Planejar e executar todos os nossos projetos e ações com o mais alto nível de qualidade, responsabilidade e dedicação.",
    practical: "Aulas estruturadas com rigor acadêmico para disputar as vagas mais concorridas do país.",
    icon: Compass,
    accentColor: "#E67E22"
  },
  {
    id: "integridade",
    number: "03",
    title: "Integridade",
    description:
      "Agir com ética, transparência e respeito, construindo relações de confiança sólidas e duradouras com toda a sociedade.",
    practical: "Prestação de contas aberta, 100% gratuito e fidelidade incondicional à causa pública.",
    icon: Shield,
    accentColor: "#D97706"
  },
  {
    id: "aprendizado-mutuo",
    number: "04",
    title: "Aprendizado Mútuo",
    description:
      "Promover a troca e o compartilhamento de conhecimentos e experiências de forma empática, compreensiva e acolhedora.",
    practical: "Sala de aula dialógica: educadores e estudantes constroem o saber juntos, sem barreiras.",
    icon: BookOpen,
    accentColor: "#2563EB"
  },
  {
    id: "cooperacao",
    number: "05",
    title: "Cooperação",
    description:
      "Exercer o trabalho em equipe fundamentado no diálogo aberto, na proatividade e na construção de um ambiente horizontal.",
    practical: "Corpo docente e coordenação voluntária atuando de mãos dadas para que nenhum aluno desista.",
    icon: Users,
    accentColor: "#0D9488"
  },
  {
    id: "fraternidade",
    number: "06",
    title: "Fraternidade",
    description:
      "Estabelecer laços profundos de empatia, companheirismo e solidariedade, cultivando um convívio social harmonioso e humano.",
    practical: "Acolhimento afetivo, apoio emocional e merenda garantida: cuidamos do ser humano por inteiro.",
    icon: Heart,
    accentColor: "#E11D48"
  }
];

const FOUNDERS_DATA: Founder[] = [
  {
    name: "Edvaldo Camilo Inácio",
    role: "Co-fundador & Jurídico Institucional",
    degrees: [
      "Bacharel em Direito pela Univ. Presbiteriana Mackenzie",
      "Pós-graduado em Direito Público Aplicado (Direito Constitucional) pela Ebradi"
    ],
    currentPosition: "Advogado e Procurador Jurídico Municipal",
    location: "São Paulo, Brasil",
    photo: "/pin/founders/edvaldo_camilo.webp",
    quote: "A cidadania real começa quando a juventude da escola pública tem instrumentos para disputar o topo com igualdade.",
    badge: "Direito Constitucional"
  },
  {
    name: "Felipe Urbano",
    role: "Co-fundador & Estratégia de Operações",
    degrees: [
      "Graduado em Engenharia Elétrica pela UNICAMP",
      "MBA em Gestão de Projetos pela USP"
    ],
    currentPosition: "Analista de Dados Sênior com foco em Engenharia Elétrica em Campinas/SP",
    location: "Campinas, Brasil",
    photo: "/pin/founders/felipe_urbano.webp",
    quote: "Usamos planejamento e dados para que o cursinho seja perene, sustentável e acolha cada vez mais jovens amparenses.",
    badge: "Engenharia & Gestão"
  },
  {
    name: "Gabriel Perli",
    role: "Co-fundador & Pesquisa Científica",
    degrees: [
      "Graduado e Mestre em Química pela UNICAMP",
      "Doutor em Química de Polímeros pela Univ. de Lyon (França)",
      "Marie Skłodowska-Curie Fellow"
    ],
    currentPosition: "Pesquisador pós-doutoral em Donostia-San Sebastián (Espanha)",
    location: "Donostia-San Sebastián, Espanha",
    photo: "/pin/founders/gabriel_perli.webp",
    quote: "Grandes carreiras científicas nascem de faíscas de curiosidade despertadas na juventude. Nenhuma mente deve ser esquecida.",
    badge: "Bolsista Marie Curie"
  },
  {
    name: "Gilmar Brito",
    role: "Co-fundador & Humanidades Digitais",
    degrees: [
      "Graduado em História pela USP (intercâmbio na Univ. Lumière Lyon 2)",
      "Mestre (M1) em História da Arte pela Univ. Lumière Lyon 2",
      "Mestre (M2) em Tecnologias Digitais Aplicadas à História pela École des Chartes (França)"
    ],
    currentPosition: "Pesquisador em Humanidades Digitais (DaSCH / Univ. de Basileia, Suíça)",
    location: "Basileia, Suíça",
    photo: "/pin/founders/gilmar_brito.webp",
    quote: "Conhecer nossa história e nossa cultura é a força motriz mais libertadora para escrevermos novos futuros em Amparo.",
    badge: "Humanidades Suíça"
  },
  {
    name: "Renan D. B. Brotto",
    role: "Co-fundador & Tecnologia & IA",
    degrees: [
      "Graduado em Engenharia de Computação pela UNICAMP",
      "Pesquisa acadêmica pela Univ. Paul Sabatier e ANITI (França)"
    ],
    currentPosition: "Pesquisador Sênior no Samsung R&D Center",
    location: "Campinas / Toulouse",
    photo: "/pin/founders/renan_brotto.webp",
    quote: "A tecnologia mais avançada precisa gerar impacto real na base, aproximando os estudantes do conhecimento de ponta.",
    badge: "Inteligência Artificial"
  }
];

// ============================================================================
// COMPONENTE: 3D Book Interactive Canvas — No Background (z-0)
// ============================================================================

const Book3DBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Configuração Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Iluminação Quente e Brilhante
    const ambientLight = new THREE.AmbientLight(0xffeedd, 1.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.6);
    sunLight.position.set(5, 8, 5);
    scene.add(sunLight);

    const goldPointLight = new THREE.PointLight(0xffb30f, 4.5, 20);
    goldPointLight.position.set(-2, 3, 3);
    scene.add(goldPointLight);

    const fillLight = new THREE.DirectionalLight(0xffe8c2, 1.4);
    fillLight.position.set(-5, -2, 3);
    scene.add(fillLight);

    // Grupo do Livro
    const bookGroup = new THREE.Group();
    scene.add(bookGroup);

    // Sistema de Rastros / Traços (Trailing Ribbon & Particles)
    const MAX_TRAIL_POINTS = 50;
    const trailPositions = new Float32Array(MAX_TRAIL_POINTS * 3);
    const trailColors = new Float32Array(MAX_TRAIL_POINTS * 3);

    for (let i = 0; i < MAX_TRAIL_POINTS; i++) {
      trailPositions[i * 3] = 0;
      trailPositions[i * 3 + 1] = 0;
      trailPositions[i * 3 + 2] = 0;

      const ratio = 1 - i / MAX_TRAIL_POINTS;
      trailColors[i * 3] = 1.0;
      trailColors[i * 3 + 1] = 0.7 * ratio + 0.3;
      trailColors[i * 3 + 2] = 0.06;
    }

    const trailGeometry = new THREE.BufferGeometry();
    trailGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(trailPositions, 3)
    );
    trailGeometry.setAttribute("color", new THREE.BufferAttribute(trailColors, 3));

    const trailMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      linewidth: 3
    });

    const trailLine = new THREE.Line(trailGeometry, trailMaterial);
    scene.add(trailLine);

    // Partículas de poeira dourada flutuantes ao redor do livro
    const particleCount = 70;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 9;
      particlePos[i + 1] = (Math.random() - 0.5) * 9;
      particlePos[i + 2] = (Math.random() - 0.5) * 5;
    }
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePos, 3)
    );
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffb30f,
      size: 0.09,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Carregamento do Livro 3D (book.glb) com Escala Responsiva
    let modelMesh: THREE.Object3D | null = null;
    let modelMaxDim = 1;

    const getResponsiveBaseScale = (w: number) => {
      if (w < 640) return 1.8; // Smartphone
      if (w < 1024) return 2.2; // Tablet
      return 2.8; // Desktop
    };

    const loader = new GLTFLoader();
    loader.load(
      "/pin/book.glb",
      (gltf) => {
        const model = gltf.scene;
        modelMesh = model;

        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        modelMaxDim = Math.max(size.x, size.y, size.z) || 1;

        const baseScale = getResponsiveBaseScale(window.innerWidth);
        const scaleFactor = baseScale / modelMaxDim;
        model.scale.setScalar(scaleFactor);

        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center.multiplyScalar(scaleFactor));

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
          }
        });

        bookGroup.add(model);
      },
      undefined,
      (err) => console.warn("GLTF Load Notice:", err)
    );

    // Trajetória do Livro com Base no Scroll
    let scrollProgress = 0;
    const updateScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        scrollProgress = Math.min(1, Math.max(0, window.scrollY / docHeight));
      }
    };
    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();

    // Rastreamento Suave do Mouse (Apenas em Desktop)
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth >= 768) {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Histórico de Posições para o Rastro
    const history: THREE.Vector3[] = [];

    // Loop de Renderização
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const w = window.innerWidth;
      const isMobile = w < 768;
      const isTablet = w >= 768 && w < 1024;
      const xRatio = isMobile ? 0.38 : (isTablet ? 0.7 : 1.0);

      let targetX = 0;
      let targetY = 0;
      let targetZ = isMobile ? -0.3 : 0.2;
      let targetRotX = 0.3;
      let targetRotY = 0;
      let targetRotZ = 0;

      if (scrollProgress < 0.22) {
        // Hero: Flutua no lado direito superior no desktop, bem visível no fundo
        const p = scrollProgress / 0.22;
        targetX = THREE.MathUtils.lerp(isMobile ? 0.9 : 2.5, isMobile ? -0.7 : -1.8, p);
        targetY = THREE.MathUtils.lerp(0.35, 0.1, p);
        targetZ += THREE.MathUtils.lerp(0.5, 0.2, p);
        targetRotX = 0.35 + Math.sin(elapsedTime * 0.8) * 0.08;
        targetRotY = -0.55 + p * 0.8;
      } else if (scrollProgress < 0.5) {
        // História: Passa pela esquerda e desliza suavemente
        const p = (scrollProgress - 0.22) / 0.28;
        targetX = THREE.MathUtils.lerp(-1.8, 2.0, p) * xRatio;
        targetY = THREE.MathUtils.lerp(0.1, -0.4, p);
        targetZ += THREE.MathUtils.lerp(0.2, 0.4, p);
        targetRotX = 0.2 + p * 0.3;
        targetRotY = 0.25 + Math.sin(elapsedTime * 1.2) * 0.15;
      } else if (scrollProgress < 0.75) {
        // Valores: Passa por trás dos cards de valores
        const p = (scrollProgress - 0.5) / 0.25;
        targetX = THREE.MathUtils.lerp(2.0, -2.1, p) * xRatio;
        targetY = THREE.MathUtils.lerp(-0.4, 0.2, p);
        targetZ += 0.3;
        targetRotX = 0.5 - p * 0.2;
        targetRotY = -0.4 + p * 0.7;
      } else {
        // Fundadores & Comunidade: Centro acolhedor
        const p = (scrollProgress - 0.75) / 0.25;
        targetX = THREE.MathUtils.lerp(-2.1, 0.0, p) * xRatio;
        targetY = THREE.MathUtils.lerp(0.2, -0.8, p);
        targetZ += THREE.MathUtils.lerp(0.3, 0.8, p);
        targetRotX = 0.3 + p * 0.2;
        targetRotY = Math.sin(elapsedTime * 0.9) * 0.2;
      }

      // Adição sutil de levitação e interação com mouse (suave no mobile)
      if (!isMobile) {
        targetX += mouseX * 0.25;
        targetY += mouseY * 0.2;
      }
      targetY += Math.sin(elapsedTime * 1.5) * 0.08;

      // Suavização (Damping)
      bookGroup.position.x += (targetX - bookGroup.position.x) * 0.06;
      bookGroup.position.y += (targetY - bookGroup.position.y) * 0.06;
      bookGroup.position.z += (targetZ - bookGroup.position.z) * 0.06;

      bookGroup.rotation.x += (targetRotX - bookGroup.rotation.x) * 0.06;
      bookGroup.rotation.y += (targetRotY - bookGroup.rotation.y) * 0.06;
      bookGroup.rotation.z += (targetRotZ - bookGroup.rotation.z) * 0.06;

      // Atualização do Rastro de Traços
      const currentPos = bookGroup.position.clone();
      history.unshift(currentPos);
      if (history.length > MAX_TRAIL_POINTS) {
        history.pop();
      }

      const positions = trailGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < history.length; i++) {
        positions[i * 3] = history[i].x;
        positions[i * 3 + 1] = history[i].y;
        positions[i * 3 + 2] = history[i].z;
      }
      trailGeometry.attributes.position.needsUpdate = true;

      // Rotação suave das partículas
      particles.rotation.y = elapsedTime * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      if (modelMesh && modelMaxDim) {
        const baseScale = getResponsiveBaseScale(w);
        const scaleFactor = baseScale / modelMaxDim;
        modelMesh.scale.setScalar(scaleFactor);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      trailGeometry.dispose();
      trailMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-25 sm:opacity-35 md:opacity-45 transition-opacity duration-500"
      aria-hidden="true"
    />
  );
};

// ============================================================================
// COMPONENTE: Modal com Verificação Cloudflare para o Formulário de Voluntários
// ============================================================================

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VolunteerModal: React.FC<VolunteerModalProps> = ({ isOpen, onClose }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const formUrl =
    "https://docs.google.com/forms/d/1iss0IQ2EXc6eRrotpT1_5N-jpw8ZJnovGY--oJru80w/viewform?edit_requested=true";

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      setTimeout(() => {
        window.open(formUrl, "_blank", "noopener,noreferrer");
        onClose();
        setIsVerified(false);
      }, 1200);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md bg-[#FFFDF9] border border-[#E6DDCA] rounded-3xl p-6 sm:p-7 shadow-2xl text-[#1C1F26]"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-black hover:bg-slate-100 transition-colors"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#FFB30F]/20 flex items-center justify-center text-[#B45309]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold tracking-tight text-[#1C1F26]">
              Verificação de Segurança
            </h3>
            <span className="text-[11px] font-mono text-[#7C7465]">
              Cloudflare Turnstile • Acesso Seguro
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#5C5546] leading-relaxed mb-6">
          Por favor, confirme que você é um ser humano antes de acessar o formulário oficial de
          inscrição para educadores voluntários do <strong>Projeto InformAção</strong>.
        </p>

        {/* Caixa de Verificação Interativa no Estilo Cloudflare Turnstile */}
        <div className="p-4 rounded-2xl bg-[#F7F2E8] border border-[#E0D7C3] flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={handleVerify}
              disabled={isVerifying || isVerified}
              className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${
                isVerified
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : isVerifying
                  ? "border-[#D97706] bg-[#FFECD1]"
                  : "border-[#C4B79F] bg-white hover:border-[#D97706]"
              }`}
            >
              {isVerified && <CheckCircle2 className="w-4 h-4" />}
              {isVerifying && (
                <span className="w-3 h-3 rounded-full border-2 border-[#D97706] border-t-transparent animate-spin" />
              )}
            </button>
            <span className="text-xs font-mono font-medium text-[#3E382E]">
              {isVerified
                ? "Humano verificado com sucesso!"
                : isVerifying
                ? "Verificando conexão segura…"
                : "Não sou um robô"}
            </span>
          </div>

          <div className="flex flex-col items-end">
            <Lock className="w-3.5 h-3.5 text-[#B45309]" />
            <span className="text-[9px] font-mono text-[#A39985] mt-0.5">
              Turnstile
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-[#8C8270] pt-2 border-t border-[#F0E8D7]">
          <span>Projeto InformAção • Amparo (SP)</span>
          <span>Formulário Oficial</span>
        </div>
      </motion.div>
    </div>
  );
};

// ============================================================================
// COMPONENTE: Hero Mesh Canvas com Dotted Matrix e Ribbon Glow (z-0)
// ============================================================================

const HeroMeshBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(window.innerHeight * 1.15, 700);
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      time += 0.007;
      const w = canvas.width;
      const h = canvas.height;
      const isMobile = w < 768;

      ctx.clearRect(0, 0, w, h);

      // 1. Mesh Gradient Translúcido de Cima para Baixo (permite ver o livro 3D no fundo)
      const meshGrad = ctx.createLinearGradient(0, 0, 0, h);
      meshGrad.addColorStop(0, "rgba(255, 242, 216, 0.50)");
      meshGrad.addColorStop(0.35, "rgba(253, 244, 229, 0.30)");
      meshGrad.addColorStop(0.7, "rgba(250, 245, 236, 0.12)");
      meshGrad.addColorStop(1, "rgba(250, 247, 242, 0)");
      ctx.fillStyle = meshGrad;
      ctx.fillRect(0, 0, w, h);

      // Glow sutil âmbar
      const spotGrad = ctx.createRadialGradient(
        w * 0.45 + Math.sin(time) * (isMobile ? 40 : 100),
        h * 0.18,
        20,
        w * 0.45,
        h * 0.25,
        w * (isMobile ? 0.65 : 0.55)
      );
      spotGrad.addColorStop(0, "rgba(255, 179, 15, 0.18)");
      spotGrad.addColorStop(0.6, "rgba(255, 213, 107, 0.06)");
      spotGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = spotGrad;
      ctx.fillRect(0, 0, w, h);

      // 2. Ribbon Glow Sinuoso em Ouro Âmbar (Atrás do conteúdo)
      ctx.save();
      ctx.beginPath();
      const step = isMobile ? 20 : 15;
      for (let x = 0; x <= w; x += step) {
        const y =
          h * 0.38 +
          Math.sin(x * 0.0022 + time) * (isMobile ? 35 : 65) +
          Math.cos(x * 0.0045 - time * 0.8) * (isMobile ? 18 : 30) +
          (x / w) * (isMobile ? 40 : 80);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      const ribbonGrad = ctx.createLinearGradient(0, 0, w, h);
      ribbonGrad.addColorStop(0, "rgba(255, 179, 15, 0)");
      ribbonGrad.addColorStop(0.2, "rgba(255, 179, 15, 0.28)");
      ribbonGrad.addColorStop(0.5, "rgba(255, 213, 107, 0.40)");
      ribbonGrad.addColorStop(0.8, "rgba(255, 150, 0, 0.24)");
      ribbonGrad.addColorStop(1, "rgba(255, 179, 15, 0)");

      ctx.strokeStyle = ribbonGrad;
      ctx.lineWidth = isMobile ? 24 : 46;
      ctx.lineCap = "round";
      ctx.filter = isMobile ? "blur(18px)" : "blur(32px)";
      ctx.stroke();
      ctx.restore();

      // Filamento central
      ctx.save();
      ctx.beginPath();
      for (let x = 0; x <= w; x += step) {
        const y =
          h * 0.38 +
          Math.sin(x * 0.0022 + time) * (isMobile ? 35 : 65) +
          Math.cos(x * 0.0045 - time * 0.8) * (isMobile ? 18 : 30) +
          (x / w) * (isMobile ? 40 : 80);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
      ctx.lineWidth = isMobile ? 2.0 : 3.5;
      ctx.filter = isMobile ? "blur(3px)" : "blur(5px)";
      ctx.stroke();
      ctx.restore();

      // 3. Matriz de Bolinhas Diminuindo de Tamanho de Cima para Baixo
      const spacing = isMobile ? 24 : 32;
      const maxRadius = isMobile ? 2.0 : 3.0;

      for (let y = 14; y < h; y += spacing) {
        const progressY = y / h;
        const baseRadius = Math.max(0.5, (1 - progressY * 0.85) * maxRadius);

        for (let x = 14; x < w; x += spacing) {
          const ribbonY =
            h * 0.38 +
            Math.sin(x * 0.0022 + time) * (isMobile ? 35 : 65) +
            Math.cos(x * 0.0045 - time * 0.8) * (isMobile ? 18 : 30) +
            (x / w) * (isMobile ? 40 : 80);
          const distToRibbon = Math.abs(y - ribbonY);

          let r = baseRadius;
          let alpha = Math.max(0.03, (1 - progressY) * (isMobile ? 0.12 : 0.16));

          if (distToRibbon < (isMobile ? 80 : 130)) {
            const proximity = 1 - distToRibbon / (isMobile ? 80 : 130);
            r += proximity * (isMobile ? 0.9 : 1.4);
            alpha += proximity * 0.22;
            ctx.fillStyle = `rgba(230, 140, 20, ${alpha})`;
          } else {
            ctx.fillStyle = `rgba(180, 140, 100, ${alpha})`;
          }

          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

// ============================================================================
// COMPONENTE: Navbar com Quadrado Arredondado & Responsivo
// ============================================================================

interface NavbarProps {
  onOpenVolunteer: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenVolunteer }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAF7F2]/90 backdrop-blur-md py-2.5 sm:py-3 border-b border-[#E8DFC9] shadow-sm"
          : "bg-transparent py-3 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-10 flex items-center justify-between">
        {/* Logo Oficial com Quadrado Arredondado & Afastamento Suave */}
        <a href="#" className="flex items-center gap-2.5 sm:gap-3.5 group">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white border border-[#E2D9C4] p-1.5 sm:p-2 flex items-center justify-center shadow-xs group-hover:border-[#FFB30F] transition-all duration-300 group-hover:scale-105 shrink-0">
            <div className="relative w-full h-full">
              <Image
                src="/pin/pin_symbol_color.png"
                alt="Projeto InformAção Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-sm sm:text-lg text-[#1C1F26] tracking-tight group-hover:text-[#D97706] transition-colors truncate">
              Projeto InformAção
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#7C7465] uppercase truncate">
              Amparo • SP — Fundado em 2014
            </span>
          </div>
        </a>

        {/* Navegação Desktop */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-mono tracking-wider uppercase text-[#5A5344]">
          <a href="#historia" className="hover:text-[#1C1F26] transition-colors">
            História
          </a>
          <a href="#valores" className="hover:text-[#1C1F26] transition-colors">
            Valores
          </a>
          <a href="#fundadores" className="hover:text-[#1C1F26] transition-colors">
            Fundadores
          </a>
          <a href="#ciclo" className="hover:text-[#1C1F26] transition-colors">
            Metodologia
          </a>
          <a href="#contato" className="hover:text-[#1C1F26] transition-colors">
            Contato
          </a>
        </nav>

        {/* Botão de Ação Direcionando ao Modal de Voluntário com Cloudflare */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenVolunteer}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide bg-[#FFB30F] hover:bg-[#FFA300] text-[#1C1F26] transition-all shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95"
          >
            <span>Seja Voluntário</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};

// ============================================================================
// COMPONENTE: Hero Section Alegre (Sand / Wheat + Mesh Gradient)
// ============================================================================

interface HeroSectionProps {
  onOpenVolunteer: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenVolunteer }) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-28 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-10 overflow-hidden bg-transparent">
      {/* Mesh, Ribbon e Dotted Matrix */}
      <HeroMeshBackground />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-mono font-medium text-[#7C4800] bg-[#FFECD1]/85 border border-[#FFD8A8] backdrop-blur-sm mb-6 shadow-sm flex-wrap"
        >
          <Sun className="w-3.5 h-3.5 text-[#E67E22] shrink-0" />
          <span>Educação Solidária & Cursinho em Amparo (SP)</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#E67E22] hidden sm:inline-block" />
          <span className="font-semibold hidden sm:inline-block">Desde 2014</span>
        </motion.div>

        {/* Título Equilibrado */}
        <div className="max-w-4xl mb-6">
          <h1 className="text-2xl sm:text-5xl lg:text-6xl font-normal text-[#1C1F26] tracking-tight leading-[1.2] sm:leading-[1.15]">
            O futuro começa quando a{" "}
            <span className="font-serif italic font-medium text-[#B45309]">
              informação
            </span>{" "}
            se encontra com a{" "}
            <span className="font-serif italic font-medium text-[#D97706]">
              ação comunitária.
            </span>
          </h1>
        </div>

        <p className="max-w-2xl text-sm sm:text-lg text-[#524B3D] font-normal leading-relaxed mb-8 sm:mb-10">
          Nascido na histórica <strong>Praça Pádua Salles</strong>, o{" "}
          <strong>Projeto InformAção</strong> é um movimento voluntário e cursinho preparatório
          comunitário 100% gratuito. Há mais de uma década, abrimos as portas das maiores
          universidades públicas para os jovens da escola pública de Amparo e região.
        </p>

        {/* Botões Responsivos */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-12 sm:mb-16">
          <a
            href="#historia"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-[#FFB30F] hover:bg-[#FFA300] text-[#1C1F26] transition-all shadow-md hover:shadow-lg hover:scale-[1.02] text-center"
          >
            Conhecer Nossa História
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenVolunteer}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-medium tracking-wide text-[#3E382E] hover:text-[#1C1F26] bg-white/90 hover:bg-white border border-[#E0D7C3] transition-all shadow-xs text-center"
          >
            Quero Ser Voluntário
            <ArrowUpRight className="w-4 h-4 text-[#D97706]" />
          </button>
        </div>

        {/* Indicadores */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-[#E8DEC7]">
          <div>
            <div className="text-2xl sm:text-3xl font-mono font-medium text-[#1C1F26]">2014</div>
            <div className="text-[10px] sm:text-xs font-mono text-[#7C7465] uppercase tracking-wider mt-1">
              Origem na Praça
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-mono font-medium text-[#B45309]">100%</div>
            <div className="text-[10px] sm:text-xs font-mono text-[#7C7465] uppercase tracking-wider mt-1">
              Gratuito & Comunitário
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-mono font-medium text-[#1C1F26]">+10 Anos</div>
            <div className="text-[10px] sm:text-xs font-mono text-[#7C7465] uppercase tracking-wider mt-1">
              De Vidas Transformadas
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-mono font-medium text-[#B45309]">70%+</div>
            <div className="text-[10px] sm:text-xs font-mono text-[#7C7465] uppercase tracking-wider mt-1">
              Docência de Ex-Alunos
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// SEÇÃO DEDICADA 1: A Origem & Praça Pádua Salles (História Completa)
// ============================================================================

const HistorySection: React.FC = () => {
  return (
    <section id="historia" className="relative py-20 sm:py-28 px-4 sm:px-10 bg-[#F5EFE4]/60 backdrop-blur-[1px] border-t border-[#E8DEC7]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-16 pb-6 border-b border-[#E0D5BA]">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B45309] block mb-2">
              [ CAPÍTULO 01 ]
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal text-[#1C1F26] tracking-tight">
              A Origem na Praça Pádua Salles e o "P" Maiúsculo
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#665E4F] font-mono leading-relaxed">
            Uma iniciativa que começou em um banco de praça pública e se tornou referência de educação popular em Amparo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center mb-16 sm:mb-20">
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-white shadow-xl">
              <Image
                src="/pin/founders/comunidade_aula.webp"
                alt="Turma do Projeto InformAção com as mãos pintadas nas camisetas"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest bg-[#FFB30F] text-[#1C1F26] px-3 py-1 rounded-full font-semibold">
                  Arquivo Histórico • Março de 2020
                </span>
                <p className="text-xs sm:text-sm font-medium mt-2 drop-shadow">
                  A clássica camiseta branca marcada com as mãos dos voluntários e alunos: símbolo do afeto e da construção coletiva.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div className="bg-[#FFFDF9] p-5 sm:p-6 rounded-2xl border border-[#E6DDCA] shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#B45309] font-medium">
                <MapPin className="w-4 h-4 text-[#D97706]" />
                <span>O Encontro na Praça Central (2014)</span>
              </div>
              <h3 className="text-base sm:text-lg font-medium text-[#1C1F26]">
                O Espaço Público Como Sala de Aula
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5546] leading-relaxed">
                Em 2014, cinco amigos recém-formados em grandes universidades decidiram que seu privilégio deveria virar dever:
                ocupar a Praça Pádua Salles e criar um cursinho comunitário gratuito para os estudantes das escolas públicas
                de Amparo. Sem burocracia, com afeto e alto rigor acadêmico.
              </p>
            </div>

            <div className="bg-[#FFFDF9] p-5 sm:p-6 rounded-2xl border border-[#E6DDCA] shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#B45309] font-medium">
                <Sparkles className="w-4 h-4 text-[#D97706]" />
                <span>Informação & Ação: O "P" Maiúsculo</span>
              </div>
              <h3 className="text-base sm:text-lg font-medium text-[#1C1F26]">
                Um Projeto em Constante Aperfeiçoamento
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5546] leading-relaxed">
                Informar não basta; é preciso agir. E agir sem informação desorienta. O nome <strong>Projeto InformAção</strong> une
                essas duas convicções. O "P" maiúsculo de Projeto existe para afirmar que nenhuma estrutura é definitiva:
                trata-se de uma iniciativa viva, humilde para aprender e aberta a novas ideias.
              </p>
            </div>

            <div className="bg-[#FFFDF9] p-5 sm:p-6 rounded-2xl border border-[#E6DDCA] shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#B45309] font-medium">
                <HeartHandshake className="w-4 h-4 text-[#D97706]" />
                <span>O Ciclo Virtuoso</span>
              </div>
              <h3 className="text-base sm:text-lg font-medium text-[#1C1F26]">
                De Vestibulandos a Professores da Nova Geração
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5546] leading-relaxed">
                O maior orgulho do PIN é ver ex-alunos aprovados na UNICAMP, USP, UNESP e IFSP retornando aos sábados
                para lecionar, coordenar e acolher os novos vestibulandos. A semente plantada em 2014 floresce todo ano.
              </p>
            </div>
          </div>
        </div>

        {/* Paulo Freire Quote */}
        <div className="relative rounded-3xl bg-[#FFFDF9] border border-[#E0D5BA] p-6 sm:p-14 shadow-sm overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#FFB30F]/10 rounded-full blur-[80px] pointer-events-none" />
          <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFB30F] mb-4 sm:mb-6" />

          <blockquote className="text-lg sm:text-2xl lg:text-3xl font-serif italic text-[#1C1F26] leading-snug tracking-tight mb-6">
            “A educação não transforma o mundo; a educação muda as pessoas, e as pessoas transformam o mundo.”
          </blockquote>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#EDE4D0]">
            <div>
              <div className="text-sm sm:text-base font-semibold text-[#1C1F26]">Paulo Freire</div>
              <div className="text-xs text-[#7C7465] font-mono">
                Patrono da Educação Brasileira — Inspiração Pedagógica do Projeto InformAção
              </div>
            </div>
            <span className="text-xs font-mono font-medium text-[#7C4800] bg-[#FFECD1] px-4 py-2 rounded-full border border-[#FFD8A8] self-start sm:self-auto">
              Pedagogia Dialógica & Acolhedora
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// SEÇÃO DEDICADA 2: Os 6 Valores Fundamentais
// ============================================================================

const ValuesSection: React.FC = () => {
  return (
    <section id="valores" className="relative py-20 sm:py-28 px-4 sm:px-10 bg-transparent border-t border-[#E8DEC7]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-16 pb-6 border-b border-[#E0D5BA]">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B45309] block mb-2">
              [ CAPÍTULO 02 ]
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal text-[#1C1F26] tracking-tight">
              Os 6 Valores Fundamentais
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#665E4F] font-mono leading-relaxed">
            Mais do que palavras na parede: compromissos vividos a cada sábado em sala de aula com os estudantes de Amparo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {VALUES_DATA.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.id}
                className="group rounded-3xl bg-[#FFFDF9] border border-[#E6DDCA] hover:border-[#D97706] p-6 sm:p-7 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm"
                      style={{ backgroundColor: val.accentColor }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-2xl font-light text-[#C4B79F]">
                      {val.number}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-medium text-[#1C1F26] mb-3 group-hover:text-[#B45309] transition-colors">
                    {val.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5C5546] leading-relaxed mb-6 font-normal">
                    {val.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0E8D7] text-xs text-[#7C7465]">
                  <strong className="text-[#1C1F26] block mb-1">Como aplicamos:</strong>
                  <span>{val.practical}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// SEÇÃO DEDICADA 3: Os 5 Fundadores (Com as Fotos Reais)
// ============================================================================

const FoundersSection: React.FC = () => {
  return (
    <section id="fundadores" className="relative py-20 sm:py-28 px-4 sm:px-10 bg-[#F5EFE4]/60 backdrop-blur-[1px] border-t border-[#E8DEC7]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-16 pb-6 border-b border-[#E0D5BA]">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B45309] block mb-2">
              [ CAPÍTULO 03 ]
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal text-[#1C1F26] tracking-tight">
              Os 5 Idealizadores de 2014
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#665E4F] font-mono leading-relaxed">
            Formações de excelência pela UNICAMP, USP, Mackenzie, Lyon e Basileia, mobilizadas para abrir caminhos para a juventude de Amparo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {FOUNDERS_DATA.map((founder, idx) => (
            <div
              key={founder.name}
              className={`group rounded-3xl bg-[#FFFDF9] border border-[#E6DDCA] hover:border-[#D97706] p-5 sm:p-6 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between ${
                idx === 3 || idx === 4 ? "lg:col-span-1" : ""
              }`}
            >
              <div>
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden mb-5 sm:mb-6 bg-[#EBE3D3]">
                  <Image
                    src={founder.photo}
                    alt={founder.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-mono text-[#5A5344] border border-[#E0D7C3] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#D97706]" />
                    <span>{founder.location}</span>
                  </div>
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium text-[#7C4800] bg-[#FFECD1] mb-2">
                  {founder.badge}
                </div>

                <h3 className="text-lg sm:text-xl font-medium text-[#1C1F26] tracking-tight mb-1 group-hover:text-[#B45309] transition-colors">
                  {founder.name}
                </h3>
                <p className="text-xs font-mono text-[#7C7465] mb-4">
                  {founder.role}
                </p>

                <div className="space-y-1.5 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#A39985] block">
                    Formação Acadêmica:
                  </span>
                  {founder.degrees.map((d, dIdx) => (
                    <div
                      key={dIdx}
                      className="text-xs text-[#524B3D] bg-[#F7F2E8] p-2 rounded-lg leading-relaxed"
                    >
                      {d}
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#A39985] block mb-0.5">
                    Atuação Profissional:
                  </span>
                  <p className="text-xs text-[#3E382E] font-medium leading-relaxed">
                    {founder.currentPosition}
                  </p>
                </div>

                <p className="text-xs font-serif italic text-[#6B6353] border-l-2 border-[#FFB30F] pl-3 py-0.5 leading-relaxed">
                  “{founder.quote}”
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[#F0E8D7] flex items-center justify-between text-[11px] font-mono text-[#7C7465]">
                <span>Fundador PIN</span>
                <span className="font-semibold text-[#B45309]">Desde 2014</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// SEÇÃO DEDICADA 4: Metodologia & Cuidado Integral com o Aluno
// ============================================================================

const MethodologySection: React.FC = () => {
  return (
    <section id="ciclo" className="relative py-20 sm:py-28 px-4 sm:px-10 bg-transparent border-t border-[#E8DEC7]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-16 pb-6 border-b border-[#E0D5BA]">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B45309] block mb-2">
              [ CAPÍTULO 04 ]
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal text-[#1C1F26] tracking-tight">
              Como Fazemos a Diferença aos Sábados
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#665E4F] font-mono leading-relaxed">
            Mais que um cursinho: uma rede de apoio completa para que nenhum jovem amparense fique para trás.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
          <div className="bg-[#FFFDF9] p-6 sm:p-8 rounded-3xl border border-[#E6DDCA] shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFB30F]/20 flex items-center justify-center text-[#B45309]">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-[#1C1F26]">
              Aulas & Simulados Autorais
            </h3>
            <p className="text-xs sm:text-sm text-[#5C5546] leading-relaxed">
              Grade completa cobrindo todas as áreas do ENEM, UNICAMP e FUVEST. Materiais didáticos preparados
              com foco nas maiores dificuldades dos estudantes da rede pública.
            </p>
          </div>

          <div className="bg-[#FFFDF9] p-6 sm:p-8 rounded-3xl border border-[#E6DDCA] shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E11D48]/10 flex items-center justify-center text-[#E11D48]">
              <Smile className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-[#1C1F26]">
              Acolhimento & Merenda Diária
            </h3>
            <p className="text-xs sm:text-sm text-[#5C5546] leading-relaxed">
              Ninguém estuda com fome ou desamparo emocional. Fornecemos alimentação aos sábados e espaço seguro de
              mentoria para dialogar sobre ansiedades, escolhas de carreira e desafios familiares.
            </p>
          </div>

          <div className="bg-[#FFFDF9] p-6 sm:p-8 rounded-3xl border border-[#E6DDCA] shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0D9488]/10 flex items-center justify-center text-[#0D9488]">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-[#1C1F26]">
              Mentoria Até a Matrícula
            </h3>
            <p className="text-xs sm:text-sm text-[#5C5546] leading-relaxed">
              O compromisso não acaba com a lista de aprovados: auxiliamos nos trâmites de matrícula, busca de bolsas de
              moradia estudantil e adaptação aos primeiros anos da faculdade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// SEÇÃO DEDICADA 5: Contato Oficial do Projeto InformAção & Redes Sociais
// ============================================================================

interface ContactSectionProps {
  onOpenVolunteer: () => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ onOpenVolunteer }) => {
  return (
    <section id="contato" className="relative py-20 sm:py-28 px-4 sm:px-10 bg-[#F5EFE4]/60 backdrop-blur-[1px] border-t border-[#E8DEC7]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-16 pb-6 border-b border-[#E0D5BA]">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B45309] block mb-2">
              [ FALE COM A GENTE ]
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal text-[#1C1F26] tracking-tight">
              Contato do Projeto InformAção
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#665E4F] font-mono leading-relaxed">
            Canais oficiais de atendimento para estudantes, voluntários, apoiadores e comunidade de Amparo e região.
          </p>
        </div>

        {/* Grade com os 4 Canais Oficiais de Contato */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-14 sm:mb-16">
          {/* 1. WhatsApp */}
          <a
            href="https://wa.me/5519998169352"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-3xl bg-[#FFFDF9] border border-[#E6DDCA] hover:border-[#25D366] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 text-[#128C7E] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#7C7465] block mb-1">
                WhatsApp Oficial
              </span>
              <h3 className="text-base sm:text-lg font-semibold text-[#1C1F26] mb-2 group-hover:text-[#128C7E] transition-colors">
                (19) 9 9816-9352
              </h3>
              <p className="text-xs text-[#5C5546] leading-relaxed">
                Mensagens diretas com a coordenação para dúvidas sobre matrículas e voluntariado.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-[#F0E8D7] flex items-center justify-between text-xs font-mono text-[#128C7E]">
              <span>Conversar agora</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </a>

          {/* 2. Instagram */}
          <a
            href="https://www.instagram.com/pinformacao"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-3xl bg-[#FFFDF9] border border-[#E6DDCA] hover:border-[#E1306C] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E1306C]/15 text-[#E1306C] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Instagram className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#7C7465] block mb-1">
                Instagram
              </span>
              <h3 className="text-base sm:text-lg font-semibold text-[#1C1F26] mb-2 group-hover:text-[#E1306C] transition-colors">
                @pinformacao
              </h3>
              <p className="text-xs text-[#5C5546] leading-relaxed">
                Acompanhe o dia a dia das turmas, editais de seleção, eventos e aprovações.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-[#F0E8D7] flex items-center justify-between text-xs font-mono text-[#E1306C]">
              <span>Acessar perfil</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </a>

          {/* 3. Facebook */}
          <a
            href="https://www.facebook.com/PInformAcao"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-3xl bg-[#FFFDF9] border border-[#E6DDCA] hover:border-[#1877F2] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#1877F2]/15 text-[#1877F2] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Facebook className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#7C7465] block mb-1">
                Página Facebook
              </span>
              <h3 className="text-base sm:text-lg font-semibold text-[#1C1F26] mb-2 group-hover:text-[#1877F2] transition-colors">
                Projeto InformAção
              </h3>
              <p className="text-xs text-[#5C5546] leading-relaxed">
                Comunidade no Facebook fundada em 2014 com fotos históricas e notícias do projeto.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-[#F0E8D7] flex items-center justify-between text-xs font-mono text-[#1877F2]">
              <span>Visitar página</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </a>

          {/* 4. E-mail */}
          <a
            href="mailto:projeto.inform@gmail.com"
            className="group rounded-3xl bg-[#FFFDF9] border border-[#E6DDCA] hover:border-[#D97706] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FFB30F]/20 text-[#B45309] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#7C7465] block mb-1">
                Correio Eletrônico
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-[#1C1F26] mb-2 truncate group-hover:text-[#B45309] transition-colors">
                projeto.inform@gmail.com
              </h3>
              <p className="text-xs text-[#5C5546] leading-relaxed">
                Parcerias institucionais, doações de materiais e contato oficial da diretoria.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-[#F0E8D7] flex items-center justify-between text-xs font-mono text-[#B45309]">
              <span>Enviar e-mail</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </a>
        </div>

        {/* Banner do Lema Comunitário com Botão para Cloudflare Modal */}
        <div className="rounded-3xl bg-[#FFFDF9] border-2 border-[#FFD8A8] p-6 sm:p-14 text-center max-w-4xl mx-auto shadow-sm">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-mono uppercase tracking-[0.2em] text-[#7C4800] bg-[#FFECD1] border border-[#FFD8A8] mb-5">
            Lema Institucional
          </span>
          <h2 className="text-2xl sm:text-4xl font-normal text-[#1C1F26] tracking-tight mb-4">
            “Estamos juntos. <span className="text-[#B45309] font-serif italic">Juntos, sempre.</span>”
          </h2>
          <p className="max-w-xl mx-auto text-xs sm:text-base text-[#524B3D] leading-relaxed font-normal mb-8">
            Venha construir essa história em Amparo. Seja como vestibulando, educador voluntário ou apoiador parceiro.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onOpenVolunteer}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-[#FFB30F] hover:bg-[#FFA300] text-[#1C1F26] transition-all shadow-md hover:shadow-lg hover:scale-[1.02] text-center"
            >
              Inscrever-se Como Voluntário
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="mailto:projeto.inform@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-medium tracking-wide text-[#3E382E] hover:text-[#1C1F26] bg-[#FAF5EB] hover:bg-white border border-[#DDD3BE] transition-all text-center"
            >
              Falar com a Diretoria
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// COMPONENTE: Footer Oficial com Identidade da Marca
// ============================================================================

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-[#EFE8DC] border-t border-[#E0D7C3] py-10 sm:py-14 px-4 sm:px-10 text-[#6B6353]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-center md:text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-[#E2D9C4] p-1.5 flex items-center justify-center shadow-xs shrink-0">
            <div className="relative w-full h-full">
              <Image
                src="/pin/pin_symbol_color.png"
                alt="Projeto InformAção"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[#1C1F26] font-semibold text-sm">
              Projeto InformAção
            </span>
            <span className="text-[#7C7465]">Praça Pádua Salles — Centro, Amparo (SP)</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4 text-[#7C7465]">
          <a
            href="https://wa.me/5519998169352"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1C1F26] transition-colors"
          >
            WhatsApp: (19) 9 9816-9352
          </a>
          <span className="hidden sm:inline">•</span>
          <a
            href="mailto:projeto.inform@gmail.com"
            className="hover:text-[#1C1F26] transition-colors"
          >
            projeto.inform@gmail.com
          </a>
          <span className="hidden sm:inline">•</span>
          <span className="text-[#B45309] font-medium">“Estamos juntos. Juntos, sempre.”</span>
        </div>
      </div>
    </footer>
  );
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function PINLandingPage() {
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);

  useEffect(() => {
    let lenis: Lenis | null = null;
    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        touchMultiplier: 1.5
      });

      lenis.on("scroll", () => {
        ScrollTrigger.update();
      });

      const tickerCallback = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(tickerCallback);
        lenis?.destroy();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    } catch (err) {
      console.warn("Lenis notice:", err);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#1C1F26] selection:bg-[#FFB30F] selection:text-[#1C1F26] antialiased overflow-x-hidden font-sans">
      {/* 1. Livro 3D Interativo no Fundo (z-0, atrás de todo o conteúdo da página) */}
      <Book3DBackground />

      {/* 2. Modal do Voluntário com Verificação Cloudflare Turnstile */}
      <VolunteerModal
        isOpen={volunteerModalOpen}
        onClose={() => setVolunteerModalOpen(false)}
      />

      {/* 3. Header com Quadrado Arredondado na Logo */}
      <Navbar onOpenVolunteer={() => setVolunteerModalOpen(true)} />

      {/* Conteúdo Principal — Stacking Context Superior (z-10) que fica na frente do Livro 3D */}
      <main className="relative z-10 pointer-events-auto">
        {/* 4. Hero Ensolarado com Mesh Gradient e Dotted Matrix */}
        <HeroSection onOpenVolunteer={() => setVolunteerModalOpen(true)} />

        {/* 5. Seção Dedicada: História & Praça Pádua Salles */}
        <HistorySection />

        {/* 6. Seção Dedicada: Os 6 Valores Fundamentais */}
        <ValuesSection />

        {/* 7. Seção Dedicada: Os 5 Fundadores com Fotos Reais */}
        <FoundersSection />

        {/* 8. Seção Dedicada: Metodologia e Apoio aos Sábados */}
        <MethodologySection />

        {/* 9. Seção Dedicada: Fale com a Gente & Redes Sociais */}
        <ContactSection onOpenVolunteer={() => setVolunteerModalOpen(true)} />
      </main>

      {/* 10. Rodapé Oficial */}
      <Footer />
    </div>
  );
}
