// Ashima Arts 2D simplex noise (classic, MIT licensed) - compact GLSL implementation
export const noiseGLSL = /* glsl */ `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
              + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * snoise(p);
      p *= 2.02;
      amplitude *= 0.5;
    }
    return value;
  }
`;

export const smokeVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const smokeFragmentShader = /* glsl */ `
  ${noiseGLSL}

  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    // two drifting noise layers for a wispy, billowing look
    vec2 p1 = uv * 2.6 + vec2(uTime * 0.035, -uTime * 0.05);
    vec2 p2 = uv * 4.2 + vec2(-uTime * 0.02, -uTime * 0.03);

    float n1 = fbm(p1);
    float n2 = fbm(p2);
    float n = n1 * 0.65 + n2 * 0.35;

    float smokeAlpha = smoothstep(0.15, 0.85, n) * 0.4;

    // keep it concentrated toward the lower two-thirds, fading at the very top/bottom
    float verticalMask = smoothstep(0.0, 0.25, uv.y) * smoothstep(1.0, 0.35, uv.y);
    smokeAlpha *= verticalMask;

    vec3 deepColor = vec3(0.22, 0.03, 0.03);
    vec3 warmColor = vec3(0.85, 0.55, 0.22);
    vec3 color = mix(deepColor, warmColor, clamp(n * 0.8 + 0.3, 0.0, 1.0));

    gl_FragColor = vec4(color, smokeAlpha);
  }
`;
