"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  BookOpen,
  Users,
  Compass,
  Lightbulb,
  Shield,
  Heart,
  Quote,
  CheckCircle2,
  GraduationCap,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Smile,
  Mail,
  Phone,
  Instagram,
  Facebook,
  ShieldCheck,
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
}

interface ValueItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const VALUES_DATA: ValueItem[] = [
  {
    id: "inovacao",
    number: "01",
    title: "Inovação",
    description:
      "Trabalhar de forma dinâmica e contínua para atender às necessidades da sociedade e formar agentes transformadores da realidade social.",
    icon: Lightbulb
  },
  {
    id: "comprometimento",
    number: "02",
    title: "Comprometimento",
    description:
      "Planejar e executar todos os nossos projetos e ações com o mais alto nível de qualidade, responsabilidade e dedicação.",
    icon: Compass
  },
  {
    id: "integridade",
    number: "03",
    title: "Integridade",
    description:
      "Agir com ética, transparência e respeito, construindo relações de confiança sólidas e duradouras com toda a sociedade.",
    icon: Shield
  },
  {
    id: "aprendizado-mutuo",
    number: "04",
    title: "Aprendizado Mútuo",
    description:
      "Promover a troca e o compartilhamento de conhecimentos e experiências de forma empática, compreensiva e acolhedora.",
    icon: BookOpen
  },
  {
    id: "cooperacao",
    number: "05",
    title: "Cooperação",
    description:
      "Exercer o trabalho em equipe fundamentado no diálogo aberto, na proatividade e na construção de um ambiente colaborativo.",
    icon: Users
  },
  {
    id: "fraternidade",
    number: "06",
    title: "Fraternidade",
    description:
      "Estabelecer laços de empatia, companheirismo e solidariedade, cultivando um convívio social harmonioso e humano.",
    icon: Heart
  }
];

// Sequência exata de fundadores solicitada: Renan, Gilmar, Felipe Urbano, Camilo, Perli
const FOUNDERS_DATA: Founder[] = [
  {
    name: "Renan D. B. Brotto",
    role: "Co-fundador",
    degrees: [
      "Graduado em Engenharia de Computação pela UNICAMP",
      "Pesquisa acadêmica pela Univ. Paul Sabatier e ANITI (França)"
    ],
    currentPosition: "Pesquisador no Samsung R&D Center",
    location: "Campinas / Toulouse",
    photo: "/pin/founders/renan_brotto.webp"
  },
  {
    name: "Gilmar Brito",
    role: "Co-fundador",
    degrees: [
      "Graduado em História pela USP (intercâmbio na Univ. Lumière Lyon 2)",
      "Mestre (M1) em História da Arte pela Univ. Lumière Lyon 2",
      "Mestre (M2) em Tecnologias Digitais Aplicadas à História pela École des Chartes (França)"
    ],
    currentPosition: "Pesquisador em Humanidades Digitais (DaSCH / Univ. de Basileia)",
    location: "Basileia, Suíça",
    photo: "/pin/founders/gilmar_brito.webp"
  },
  {
    name: "Felipe Urbano",
    role: "Co-fundador",
    degrees: [
      "Graduado em Engenharia Elétrica pela UNICAMP",
      "MBA em Gestão de Projetos pela USP"
    ],
    currentPosition: "Analista de Dados Sênior com foco em Engenharia Elétrica",
    location: "Campinas, SP",
    photo: "/pin/founders/felipe_urbano.webp"
  },
  {
    name: "Edvaldo Camilo Inácio",
    role: "Co-fundador",
    degrees: [
      "Bacharel em Direito pela Univ. Presbiteriana Mackenzie",
      "Pós-graduado em Direito Público Aplicado (Direito Constitucional) pela Ebradi"
    ],
    currentPosition: "Advogado e Procurador Jurídico Municipal",
    location: "São Paulo, SP",
    photo: "/pin/founders/edvaldo_camilo.webp"
  },
  {
    name: "Gabriel Perli",
    role: "Co-fundador",
    degrees: [
      "Graduado e Mestre em Química pela UNICAMP",
      "Doutor em Química de Polímeros pela Univ. de Lyon (França)",
      "Marie Skłodowska-Curie Fellow"
    ],
    currentPosition: "Pesquisador pós-doutoral em San Sebastián (Espanha)",
    location: "San Sebastián, Espanha",
    photo: "/pin/founders/gabriel_perli.webp"
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

    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.4);
    sunLight.position.set(5, 8, 5);
    scene.add(sunLight);

    const bluePointLight = new THREE.PointLight(0x074bed, 3.5, 20);
    bluePointLight.position.set(-2, 3, 3);
    scene.add(bluePointLight);

    const fillLight = new THREE.DirectionalLight(0xf0f4f8, 1.2);
    fillLight.position.set(-5, -2, 3);
    scene.add(fillLight);

    const bookGroup = new THREE.Group();
    scene.add(bookGroup);

    const MAX_TRAIL_POINTS = 50;
    const trailPositions = new Float32Array(MAX_TRAIL_POINTS * 3);
    const trailColors = new Float32Array(MAX_TRAIL_POINTS * 3);

    for (let i = 0; i < MAX_TRAIL_POINTS; i++) {
      trailPositions[i * 3] = 0;
      trailPositions[i * 3 + 1] = 0;
      trailPositions[i * 3 + 2] = 0;

      const ratio = 1 - i / MAX_TRAIL_POINTS;
      trailColors[i * 3] = 0.03 * ratio;
      trailColors[i * 3 + 1] = 0.29 * ratio;
      trailColors[i * 3 + 2] = 0.93 * ratio + 0.07;
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

    const particleCount = 65;
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
      color: 0x074bed,
      size: 0.08,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    let modelMesh: THREE.Object3D | null = null;
    let modelMaxDim = 1;

    const getResponsiveBaseScale = (w: number) => {
      if (w < 480) return 1.4;
      if (w < 640) return 1.6;
      if (w < 1024) return 2.0;
      return 2.6;
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

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth >= 768) {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const history: THREE.Vector3[] = [];
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
        const p = scrollProgress / 0.22;
        targetX = THREE.MathUtils.lerp(isMobile ? 0.9 : 2.5, isMobile ? -0.7 : -1.8, p);
        targetY = THREE.MathUtils.lerp(0.35, 0.1, p);
        targetZ += THREE.MathUtils.lerp(0.5, 0.2, p);
        targetRotX = 0.35 + Math.sin(elapsedTime * 0.8) * 0.08;
        targetRotY = -0.55 + p * 0.8;
      } else if (scrollProgress < 0.5) {
        const p = (scrollProgress - 0.22) / 0.28;
        targetX = THREE.MathUtils.lerp(-1.8, 2.0, p) * xRatio;
        targetY = THREE.MathUtils.lerp(0.1, -0.4, p);
        targetZ += THREE.MathUtils.lerp(0.2, 0.4, p);
        targetRotX = 0.2 + p * 0.3;
        targetRotY = 0.25 + Math.sin(elapsedTime * 1.2) * 0.15;
      } else if (scrollProgress < 0.75) {
        const p = (scrollProgress - 0.5) / 0.25;
        targetX = THREE.MathUtils.lerp(2.0, -2.1, p) * xRatio;
        targetY = THREE.MathUtils.lerp(-0.4, 0.2, p);
        targetZ += 0.3;
        targetRotX = 0.5 - p * 0.2;
        targetRotY = -0.4 + p * 0.7;
      } else {
        const p = (scrollProgress - 0.75) / 0.25;
        targetX = THREE.MathUtils.lerp(-2.1, 0.0, p) * xRatio;
        targetY = THREE.MathUtils.lerp(0.2, -0.8, p);
        targetZ += THREE.MathUtils.lerp(0.3, 0.8, p);
        targetRotX = 0.3 + p * 0.2;
        targetRotY = Math.sin(elapsedTime * 0.9) * 0.2;
      }

      if (!isMobile) {
        targetX += mouseX * 0.25;
        targetY += mouseY * 0.2;
      }
      targetY += Math.sin(elapsedTime * 1.5) * 0.08;

      bookGroup.position.x += (targetX - bookGroup.position.x) * 0.06;
      bookGroup.position.y += (targetY - bookGroup.position.y) * 0.06;
      bookGroup.position.z += (targetZ - bookGroup.position.z) * 0.06;

      bookGroup.rotation.x += (targetRotX - bookGroup.rotation.x) * 0.06;
      bookGroup.rotation.y += (targetRotY - bookGroup.rotation.y) * 0.06;
      bookGroup.rotation.z += (targetRotZ - bookGroup.rotation.z) * 0.06;

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
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20 sm:opacity-30 md:opacity-40 transition-opacity duration-500"
      aria-hidden="true"
    />
  );
};

// ============================================================================
// COMPONENTE: Modal de Verificação para Acesso ao Formulário de Voluntários
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
      }, 1000);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-md bg-white border border-[#c2c2c2] rounded-2xl p-5 sm:p-7 shadow-2xl text-black font-inter font-normal my-auto max-h-[92vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-full text-zinc-400 hover:text-black hover:bg-zinc-100 transition-colors"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#074BED]/10 flex items-center justify-center text-[#074BED]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-urbanist font-normal text-base sm:text-lg tracking-tight text-black">
              Verificação de Segurança
            </h3>
            <span className="text-[11px] font-mono text-zinc-500">
              Acesso ao Formulário de Voluntários
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6 font-normal">
          Confirme a verificação abaixo para acessar o formulário oficial de inscrição do{" "}
          <strong>Projeto InformAção</strong>.
        </p>

        <div className="p-4 rounded-xl bg-zinc-50 border border-[#c2c2c2]/80 flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={handleVerify}
              disabled={isVerifying || isVerified}
              className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${
                isVerified
                  ? "bg-emerald-600 border-emerald-600 text-white"
                  : isVerifying
                  ? "border-[#074BED] bg-blue-50"
                  : "border-[#c2c2c2] bg-white hover:border-[#074BED]"
              }`}
            >
              {isVerified && <CheckCircle2 className="w-4 h-4" />}
              {isVerifying && (
                <span className="w-3 h-3 rounded-full border-2 border-[#074BED] border-t-transparent animate-spin" />
              )}
            </button>
            <span className="text-xs font-mono font-normal text-zinc-800">
              {isVerified
                ? "Verificado com sucesso"
                : isVerifying
                ? "Verificando…"
                : "Não sou um robô"}
            </span>
          </div>

          <div className="flex flex-col items-end">
            <Lock className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-[9px] font-mono text-zinc-400 mt-0.5">
              Segurança
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-2 border-t border-zinc-100">
          <span>Projeto InformAção • Amparo (SP)</span>
          <span>Formulário Oficial</span>
        </div>
      </motion.div>
    </div>
  );
};

// ============================================================================
// COMPONENTE: Hero Background com Matriz e Linha de Luz Azul (#074BED)
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

      const meshGrad = ctx.createLinearGradient(0, 0, 0, h);
      meshGrad.addColorStop(0, "rgba(7, 75, 237, 0.08)");
      meshGrad.addColorStop(0.35, "rgba(7, 75, 237, 0.03)");
      meshGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = meshGrad;
      ctx.fillRect(0, 0, w, h);

      const spotGrad = ctx.createRadialGradient(
        w * 0.5,
        h * 0.15,
        10,
        w * 0.5,
        h * 0.25,
        w * (isMobile ? 0.7 : 0.5)
      );
      spotGrad.addColorStop(0, "rgba(7, 75, 237, 0.12)");
      spotGrad.addColorStop(0.6, "rgba(7, 75, 237, 0.02)");
      spotGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = spotGrad;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.beginPath();
      const step = isMobile ? 20 : 15;
      for (let x = 0; x <= w; x += step) {
        const y =
          h * 0.38 +
          Math.sin(x * 0.0022 + time) * (isMobile ? 30 : 55) +
          Math.cos(x * 0.0045 - time * 0.8) * (isMobile ? 15 : 25) +
          (x / w) * (isMobile ? 35 : 70);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      const ribbonGrad = ctx.createLinearGradient(0, 0, w, h);
      ribbonGrad.addColorStop(0, "rgba(7, 75, 237, 0)");
      ribbonGrad.addColorStop(0.3, "rgba(7, 75, 237, 0.25)");
      ribbonGrad.addColorStop(0.7, "rgba(7, 75, 237, 0.30)");
      ribbonGrad.addColorStop(1, "rgba(7, 75, 237, 0)");

      ctx.strokeStyle = ribbonGrad;
      ctx.lineWidth = isMobile ? 22 : 40;
      ctx.lineCap = "round";
      ctx.filter = isMobile ? "blur(16px)" : "blur(28px)";
      ctx.stroke();
      ctx.restore();

      const spacing = isMobile ? 24 : 32;
      const maxRadius = isMobile ? 1.8 : 2.5;

      for (let y = 14; y < h; y += spacing) {
        const progressY = y / h;
        const baseRadius = Math.max(0.5, (1 - progressY * 0.85) * maxRadius);

        for (let x = 14; x < w; x += spacing) {
          const ribbonY =
            h * 0.38 +
            Math.sin(x * 0.0022 + time) * (isMobile ? 30 : 55) +
            Math.cos(x * 0.0045 - time * 0.8) * (isMobile ? 15 : 25) +
            (x / w) * (isMobile ? 35 : 70);
          const distToRibbon = Math.abs(y - ribbonY);

          let r = baseRadius;
          let alpha = Math.max(0.02, (1 - progressY) * (isMobile ? 0.12 : 0.16));

          if (distToRibbon < (isMobile ? 80 : 120)) {
            const proximity = 1 - distToRibbon / (isMobile ? 80 : 120);
            r += proximity * (isMobile ? 0.8 : 1.2);
            alpha += proximity * 0.25;
            ctx.fillStyle = `rgba(7, 75, 237, ${alpha})`;
          } else {
            ctx.fillStyle = `rgba(194, 194, 194, ${alpha})`;
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
// COMPONENTE: Navbar Oficial com Fontes Urbanist & Inter sem Bold
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
          ? "bg-white/95 backdrop-blur-md py-2.5 sm:py-3 border-b border-[#c2c2c2]/60 shadow-xs"
          : "bg-transparent py-3 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-8 flex items-center justify-between gap-2 sm:gap-4">
        <a href="#" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-white border border-[#c2c2c2] p-1 sm:p-1.5 flex items-center justify-center shadow-xs group-hover:border-[#074BED] transition-all duration-300 shrink-0">
            <div className="relative w-full h-full">
              <Image
                src="/logo_symbol.png"
                alt="Projeto InformAção"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-urbanist font-normal text-sm sm:text-base text-black tracking-tight group-hover:text-[#074BED] transition-colors truncate">
              Projeto InformAção
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-zinc-500 uppercase truncate">
              Amparo • SP — Desde 2014
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-xs font-inter font-normal tracking-wide uppercase text-zinc-600">
          <a href="#historia" className="hover:text-[#074BED] transition-colors">
            História
          </a>
          <a href="#valores" className="hover:text-[#074BED] transition-colors">
            Valores
          </a>
          <a href="#fundadores" className="hover:text-[#074BED] transition-colors">
            Fundadores
          </a>
          <a href="#metodologia" className="hover:text-[#074BED] transition-colors">
            Metodologia
          </a>
          <a href="#contato" className="hover:text-[#074BED] transition-colors">
            Contato
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenVolunteer}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-xs font-inter font-normal tracking-wide bg-[#074BED] hover:bg-[#0039CB] text-white transition-all shadow-sm hover:scale-[1.02] active:scale-95 whitespace-nowrap"
          >
            <span>Seja Voluntário</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </button>
        </div>
      </div>
    </header>
  );
};

// ============================================================================
// COMPONENTE: Hero Section (Urbanist nos Headers & Inter no Body sem Bold)
// ============================================================================

interface HeroSectionProps {
  onOpenVolunteer: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenVolunteer }) => {
  return (
    <section className="relative min-h-[75vh] sm:min-h-[85vh] flex flex-col justify-center pt-24 sm:pt-36 pb-12 sm:pb-20 px-4 sm:px-8 overflow-hidden bg-white">
      <HeroMeshBackground />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl mb-4 sm:mb-6">
          <h1 className="font-urbanist font-normal text-2xl xs:text-3xl sm:text-5xl lg:text-6xl text-black tracking-tight leading-[1.2] sm:leading-[1.15]">
            Educação solidária para abrir portas nas{" "}
            <span className="text-[#074BED]">universidades públicas.</span>
          </h1>
        </div>

        <p className="max-w-2xl text-sm sm:text-lg text-zinc-600 font-inter font-normal leading-relaxed mb-8 sm:mb-10">
          Nossa missão é colaborar na formação pessoal e no desenvolvimento de projetos de vida
          para promover a transformação social. Cursinho voluntário e 100% gratuito voltado
          aos estudantes da rede pública de Amparo e região.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10 sm:mb-16 font-inter font-normal">
          <button
            onClick={onOpenVolunteer}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-normal tracking-wide bg-[#074BED] hover:bg-[#0039CB] text-white transition-all shadow-sm hover:scale-[1.02] text-center"
          >
            Quero Ser Voluntário
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#historia"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-normal tracking-wide text-zinc-800 hover:text-black bg-white hover:bg-zinc-50 border border-[#c2c2c2] transition-all text-center"
          >
            Conhecer Nossa História
            <ArrowUpRight className="w-4 h-4 text-zinc-500" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 pt-5 sm:pt-8 border-t border-[#c2c2c2]/50 font-inter font-normal">
          <div>
            <div className="text-xl sm:text-3xl font-urbanist font-normal text-black">2014</div>
            <div className="text-[11px] sm:text-xs font-mono text-zinc-500 uppercase tracking-wider mt-1">
              Ano de Fundação
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-3xl font-urbanist font-normal text-[#074BED]">100%</div>
            <div className="text-[11px] sm:text-xs font-mono text-zinc-500 uppercase tracking-wider mt-1">
              Gratuito & Voluntário
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-3xl font-urbanist font-normal text-black">Amparo</div>
            <div className="text-[11px] sm:text-xs font-mono text-zinc-500 uppercase tracking-wider mt-1">
              Praça Dr. Meirelles Reis, 153
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-3xl font-urbanist font-normal text-[#074BED]">Apoio</div>
            <div className="text-[11px] sm:text-xs font-mono text-zinc-500 uppercase tracking-wider mt-1">
              ENEM & Vestibulares
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// SEÇÃO 1: Nossa História & Praça Dr. Meirelles Reis
// ============================================================================

const HistorySection: React.FC = () => {
  return (
    <section id="historia" className="relative py-14 sm:py-24 px-4 sm:px-8 bg-zinc-50 border-t border-[#c2c2c2]/50 font-inter font-normal">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-12 pb-5 sm:pb-6 border-b border-[#c2c2c2]/60">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#074BED] block mb-1">
              Nossa Origem
            </span>
            <h2 className="font-urbanist font-normal text-2xl sm:text-3xl md:text-4xl text-black tracking-tight">
              A História do Projeto InformAção
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
            Uma iniciativa comunitária que começou na praça pública e se consolidou como espaço de acolhimento e preparação educacional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center mb-16">
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#c2c2c2] shadow-sm">
              <Image
                src="/pin/founders/comunidade_aula.webp"
                alt="Turma do Projeto InformAção com camisetas pintadas"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest bg-[#074BED] text-white px-2.5 py-1 rounded-md font-normal">
                  Arquivo das Turmas
                </span>
                <p className="text-xs sm:text-sm font-normal mt-2">
                  Camisetas brancas marcadas com as mãos de voluntários e estudantes: símbolo da construção coletiva.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-[#c2c2c2]/80 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#074BED] font-normal">
                <MapPin className="w-4 h-4 text-[#074BED]" />
                <span>O Início em Amparo (2014)</span>
              </div>
              <h3 className="font-urbanist font-normal text-base sm:text-lg text-black">
                Espaço Comunitário no Centro
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                Em 2014, um grupo de jovens formados em universidades públicas decidiu unir forças para criar um cursinho comunitário gratuito para os estudantes das escolas públicas de Amparo, com atividades na Praça Dr. Meirelles Reis, 153, no Centro da cidade.
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-xl border border-[#c2c2c2]/80 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#074BED] font-normal">
                <BookOpen className="w-4 h-4 text-[#074BED]" />
                <span>Informação e Ação</span>
              </div>
              <h3 className="font-urbanist font-normal text-base sm:text-lg text-black">
                A Proposta do Nome
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                O nome <strong>Projeto InformAção</strong> traduz a união entre o acesso à informação de qualidade sobre os vestibulares e a ação prática necessária para transformar a realidade de cada participante.
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-xl border border-[#c2c2c2]/80 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#074BED] font-normal">
                <Users className="w-4 h-4 text-[#074BED]" />
                <span>Continuidade Comunitária</span>
              </div>
              <h3 className="font-urbanist font-normal text-base sm:text-lg text-black">
                Retorno de Ex-Alunos
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                Ao longo dos anos, estudantes aprovados em vestibulares como UNICAMP, USP, UNESP e IFSP retornam para atuar como educadores e coordenadores voluntários, mantendo vivo o propósito comunitário.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-[#c2c2c2] p-6 sm:p-10 shadow-xs">
          <Quote className="w-8 h-8 text-[#074BED] mb-4" />
          <blockquote className="font-urbanist font-normal text-lg sm:text-2xl text-black leading-snug tracking-tight mb-4">
            “A educação não transforma o mundo; a educação muda as pessoas, e as pessoas transformam o mundo.”
          </blockquote>
          <div className="text-sm font-urbanist font-normal text-black">Paulo Freire</div>
          <div className="text-xs text-zinc-500 font-mono">
            Referência pedagógica em educação popular e comunitária
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// SEÇÃO 2: Valores Institucionais
// ============================================================================

const ValuesSection: React.FC = () => {
  return (
    <section id="valores" className="relative py-14 sm:py-24 px-4 sm:px-8 bg-white border-t border-[#c2c2c2]/50 font-inter font-normal">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-12 pb-5 sm:pb-6 border-b border-[#c2c2c2]/60">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#074BED] block mb-1">
              Princípios
            </span>
            <h2 className="font-urbanist font-normal text-2xl sm:text-3xl md:text-4xl text-black tracking-tight">
              Nossos Valores
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
            Os seis princípios fundamentais que orientam as decisões pedagógicas e organizacionais do projeto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {VALUES_DATA.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.id}
                className="group rounded-2xl bg-white border border-[#c2c2c2] hover:border-[#074BED] p-6 transition-all duration-200 shadow-xs hover:shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-[#EEF4FF] flex items-center justify-center text-[#074BED] group-hover:bg-[#074BED] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xl font-light text-zinc-400">
                      {val.number}
                    </span>
                  </div>

                  <h3 className="font-urbanist font-normal text-base sm:text-lg text-black mb-2 group-hover:text-[#074BED] transition-colors">
                    {val.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                    {val.description}
                  </p>
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
// SEÇÃO 3: Fundadores (Sequência: Renan, Gilmar, Felipe Urbano, Camilo, Perli)
// ============================================================================

const FoundersSection: React.FC = () => {
  return (
    <section id="fundadores" className="relative py-14 sm:py-24 px-4 sm:px-8 bg-zinc-50 border-t border-[#c2c2c2]/50 font-inter font-normal">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-12 pb-5 sm:pb-6 border-b border-[#c2c2c2]/60">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#074BED] block mb-1">
              Equipe Fundadora
            </span>
            <h2 className="font-urbanist font-normal text-2xl sm:text-3xl md:text-4xl text-black tracking-tight">
              Os Fundadores de 2014
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
            Profissionais formados em instituições de ensino público e de referência que iniciaram as atividades do cursinho em Amparo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {FOUNDERS_DATA.map((founder) => (
            <div
              key={founder.name}
              className="rounded-2xl bg-white border border-[#c2c2c2] p-4 sm:p-5 shadow-xs flex flex-col justify-between hover:border-[#074BED] transition-all"
            >
              <div>
                <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden mb-4 bg-zinc-100 border border-zinc-200">
                  <Image
                    src={founder.photo}
                    alt={founder.name}
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-mono text-zinc-700 border border-[#c2c2c2] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#074BED]" />
                    <span>{founder.location}</span>
                  </div>
                </div>

                <h3 className="font-urbanist font-normal text-base sm:text-lg text-black tracking-tight">
                  {founder.name}
                </h3>
                <p className="text-xs font-mono text-[#074BED] mb-3">
                  {founder.role}
                </p>

                <div className="space-y-1.5 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                    Formação Acadêmica:
                  </span>
                  {founder.degrees.map((d, dIdx) => (
                    <div
                      key={dIdx}
                      className="text-xs text-zinc-700 bg-zinc-50 border border-zinc-200/80 p-2 rounded-lg leading-relaxed font-normal"
                    >
                      {d}
                    </div>
                  ))}
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-0.5">
                    Atuação:
                  </span>
                  <p className="text-xs text-zinc-800 font-normal leading-relaxed">
                    {founder.currentPosition}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-4 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>Fundador PIN</span>
                <span className="font-normal text-black">Desde 2014</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// SEÇÃO 4: Metodologia e Atividades
// ============================================================================

const MethodologySection: React.FC = () => {
  return (
    <section id="metodologia" className="relative py-14 sm:py-24 px-4 sm:px-8 bg-white border-t border-[#c2c2c2]/50 font-inter font-normal">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-12 pb-5 sm:pb-6 border-b border-[#c2c2c2]/60">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#074BED] block mb-1">
              Como Funciona
            </span>
            <h2 className="font-urbanist font-normal text-2xl sm:text-3xl md:text-4xl text-black tracking-tight">
              Atividades Aos Sábados
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
            Estrutura de apoio pedagógico e convivência voltada aos estudantes do ensino médio e pré-vestibulandos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#c2c2c2] shadow-xs space-y-3">
            <div className="w-11 h-11 rounded-xl bg-[#EEF4FF] flex items-center justify-center text-[#074BED]">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-urbanist font-normal text-base sm:text-lg text-black">
              Aulas e Simulados
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
              Encontros semanais cobrindo as disciplinas exigidas no ENEM, UNICAMP, USP e UNESP, com foco na resolução de exercícios e simulados periódicos.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#c2c2c2] shadow-xs space-y-3">
            <div className="w-11 h-11 rounded-xl bg-[#EEF4FF] flex items-center justify-center text-[#074BED]">
              <Smile className="w-5 h-5" />
            </div>
            <h3 className="font-urbanist font-normal text-base sm:text-lg text-black">
              Alimentação e Acolhimento
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
              Garantia de alimentação para os estudantes durante o período de aula e espaço para diálogo sobre escolhas de carreira, rotina de estudos e desafios cotidianos.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#c2c2c2] shadow-xs space-y-3">
            <div className="w-11 h-11 rounded-xl bg-[#EEF4FF] flex items-center justify-center text-[#074BED]">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-urbanist font-normal text-base sm:text-lg text-black">
              Orientação de Inscrições e Matrículas
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
              Auxílio com pedidos de isenção de taxa de inscrição, escolha de cursos, calendários oficiais e trâmites de matrícula nos programas de cotas e assistência estudantil.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// SEÇÃO 5: Contato Oficial
// ============================================================================

interface ContactSectionProps {
  onOpenVolunteer: () => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ onOpenVolunteer }) => {
  return (
    <section id="contato" className="relative py-14 sm:py-24 px-4 sm:px-8 bg-zinc-50 border-t border-[#c2c2c2]/50 font-inter font-normal">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-12 pb-5 sm:pb-6 border-b border-[#c2c2c2]/60">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#074BED] block mb-1">
              Fale Conosco
            </span>
            <h2 className="font-urbanist font-normal text-2xl sm:text-3xl md:text-4xl text-black tracking-tight">
              Canais Oficiais de Contato
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
            Atendimento para dúvidas sobre o cursinho, inscrições de novos alunos e voluntariado.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10 sm:mb-14">
          <a
            href="https://wa.me/5519998169352"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl bg-white border border-[#c2c2c2] hover:border-[#074BED] p-4 sm:p-5 shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 sm:mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                WhatsApp
              </span>
              <h3 className="font-urbanist font-normal text-base text-black mb-1 group-hover:text-[#074BED] transition-colors">
                (19) 9 9816-9352
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                Mensagens diretas sobre turmas e voluntariado.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-mono text-[#074BED]">
              <span>Conversar</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </a>

          <a
            href="https://www.instagram.com/pinformacao"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl bg-white border border-[#c2c2c2] hover:border-[#074BED] p-4 sm:p-5 shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mb-3 sm:mb-4">
                <Instagram className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                Instagram
              </span>
              <h3 className="font-urbanist font-normal text-base text-black mb-1 group-hover:text-[#074BED] transition-colors">
                @pinformacao
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                Avisos, fotos das aulas e calendários de inscrição.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-mono text-[#074BED]">
              <span>Ver perfil</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </a>

          <a
            href="https://www.facebook.com/PInformAcao"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl bg-white border border-[#c2c2c2] hover:border-[#074BED] p-4 sm:p-5 shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#074BED] flex items-center justify-center mb-3 sm:mb-4">
                <Facebook className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                Facebook
              </span>
              <h3 className="font-urbanist font-normal text-base text-black mb-1 group-hover:text-[#074BED] transition-colors">
                Projeto InformAção
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                Página oficial com histórico e publicações.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-mono text-[#074BED]">
              <span>Acessar</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </a>

          <a
            href="mailto:projeto.inform@gmail.com"
            className="group rounded-2xl bg-white border border-[#c2c2c2] hover:border-[#074BED] p-4 sm:p-5 shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-700 flex items-center justify-center mb-3 sm:mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                E-mail
              </span>
              <h3 className="font-urbanist font-normal text-sm sm:text-base text-black mb-1 truncate group-hover:text-[#074BED] transition-colors">
                projeto.inform@gmail.com
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                Parcerias, informações gerais e contato formal.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-mono text-[#074BED]">
              <span>Escrever</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </a>
        </div>

        <div className="rounded-2xl bg-white border border-[#c2c2c2] p-6 sm:p-12 text-center max-w-3xl mx-auto shadow-xs font-inter font-normal">
          <h2 className="font-urbanist font-normal text-xl sm:text-2xl md:text-3xl text-black tracking-tight mb-2 sm:mb-3">
            “Estamos juntos. Juntos, sempre.”
          </h2>
          <p className="max-w-lg mx-auto text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6 font-normal">
            Participe como estudante, educador voluntário ou apoiador do cursinho em Amparo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenVolunteer}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-normal tracking-wide bg-[#074BED] hover:bg-[#0039CB] text-white transition-all shadow-sm hover:scale-[1.02] text-center w-full sm:w-auto"
            >
              Inscrição para Voluntários
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="mailto:projeto.inform@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-normal tracking-wide text-zinc-800 hover:text-black bg-white hover:bg-zinc-50 border border-[#c2c2c2] transition-all text-center w-full sm:w-auto"
            >
              Enviar Mensagem
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// COMPONENTE: Footer Institucional
// ============================================================================

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-white border-t border-[#c2c2c2] py-8 sm:py-10 px-4 sm:px-8 text-zinc-500 font-inter font-normal">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-center md:text-left">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white border border-[#c2c2c2] p-1 flex items-center justify-center shadow-xs shrink-0">
            <div className="relative w-full h-full">
              <Image
                src="/logo_symbol.png"
                alt="Projeto InformAção"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-urbanist font-normal text-black text-sm">
              Projeto InformAção
            </span>
            <span className="text-zinc-500 text-[11px]">
              Praça Dr. Meirelles Reis, 153 — Centro, Amparo - SP
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4 text-zinc-600 text-xs font-mono">
          <a
            href="https://wa.me/5519998169352"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#074BED] transition-colors"
          >
            (19) 9 9816-9352
          </a>
          <span>•</span>
          <a
            href="mailto:projeto.inform@gmail.com"
            className="hover:text-[#074BED] transition-colors"
          >
            projeto.inform@gmail.com
          </a>
          <span>•</span>
          <span>Amparo - SP</span>
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
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        touchMultiplier: 1.4
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
    <div className="relative min-h-screen bg-white text-black antialiased overflow-x-hidden font-inter font-normal">
      <Book3DBackground />

      <VolunteerModal
        isOpen={volunteerModalOpen}
        onClose={() => setVolunteerModalOpen(false)}
      />

      <Navbar onOpenVolunteer={() => setVolunteerModalOpen(true)} />

      <main className="relative z-10 pointer-events-auto">
        <HeroSection onOpenVolunteer={() => setVolunteerModalOpen(true)} />
        <HistorySection />
        <ValuesSection />
        <FoundersSection />
        <MethodologySection />
        <ContactSection onOpenVolunteer={() => setVolunteerModalOpen(true)} />
      </main>

      <Footer />
    </div>
  );
}
