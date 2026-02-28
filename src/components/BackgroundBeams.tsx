import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

const VERTEX = `void main() { gl_Position = vec4(position, 1.0); }`;

const FRAGMENT = `
uniform float iTime;
uniform vec2 iResolution;
uniform float uOpacity;

#define NUM_OCTAVES 3
float rand(vec2 n) { return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }
float noise(vec2 p){
  vec2 ip=floor(p); vec2 u=fract(p);
  u=u*u*(3.0-2.0*u);
  float res=mix(
    mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
    mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),
    u.y
  );
  return res*res;
}
float fbm(vec2 x) {
  float v=0.0; float a=0.3;
  vec2 shift=vec2(100.0);
  mat2 rot=mat2(cos(0.5),sin(0.5),-sin(0.5),cos(0.50));
  for(int i=0;i<NUM_OCTAVES;++i){
    v+=a*noise(x);
    x=rot*x*2.0+shift;
    a*=0.4;
  }
  return v;
}
void main() {
  vec2 p = ((gl_FragCoord.xy) - iResolution.xy*0.5) / iResolution.y * mat2(6., -4., 4., 6.);
  vec4 o = vec4(0.);
  float f = 2. + fbm(p + vec2(iTime * 5., 0.)) * .5;
  for(float i=0.; i++ < 35.;){
    vec2 v = p + cos(i*i + (iTime + p.x*.08)*.025 + i*vec2(13.,11.)) * 3.5;
    float tailNoise = fbm(v + vec2(iTime*.5, i)) * .3 * (1. - (i/35.));
    vec4 auroraColors = vec4(
      .1 + .3 * sin(i*.2 + iTime*.4),
      .3 + .5 * cos(i*.3 + iTime*.5),
      .7 + .3 * sin(i*.4 + iTime*.3),
      1.
    );
    vec2 av = abs(v);
    vec4 currentContribution = auroraColors * exp(sin(i*i + iTime*.8)) / length(max(av, vec2(av.x*f*.015, av.y*1.5)));
    float thinnessFactor = smoothstep(0., 1., i/35.) * .6;
    o += currentContribution * (1. + tailNoise*.8) * thinnessFactor;
  }
  o = tanh(pow(o / 100., vec4(1.6)));
  gl_FragColor = o * uOpacity;
}`;

const BackgroundBeams = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const threeRef = useRef<{
    renderer: THREE.WebGLRenderer;
    material: THREE.ShaderMaterial;
    geometry: THREE.PlaneGeometry;
    raf: number;
    ro: ResizeObserver;
  } | null>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(el.clientWidth, el.clientHeight, false);

    const canvas = renderer.domElement;
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    el.appendChild(canvas);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(el.clientWidth, el.clientHeight) },
        uOpacity: { value: 1.0 },
      },
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    scene.add(new THREE.Mesh(geometry, material));

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      material.uniforms.iTime.value += 0.016;
      renderer.render(scene, camera);
    };

    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setSize(w, h, false);
      material.uniforms.iResolution.value.set(w, h);
    });
    ro.observe(el);

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(animate);
    };
    document.addEventListener("visibilitychange", onVis);

    raf = requestAnimationFrame(animate);
    threeRef.current = { renderer, material, geometry, raf, ro };

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (el.contains(canvas)) el.removeChild(canvas);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
      threeRef.current = null;
    };
  }, []);

  useEffect(() => {
    const t = threeRef.current;
    if (!t) return;
    t.material.uniforms.uOpacity.value = isDark ? 1.25 : 0.15;
  }, [isDark]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      style={{
        maxWidth: "100vw",
        ...(isDark
          ? {}
          : {
              mixBlendMode: "multiply" as React.CSSProperties["mixBlendMode"],
              WebkitMaskImage:
                "radial-gradient(ellipse at center, transparent 0%, black 55%)",
              maskImage:
                "radial-gradient(ellipse at center, transparent 0%, black 55%)",
            }),
      }}
    />
  );
};

export default BackgroundBeams;
