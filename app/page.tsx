"use client";
import { useState } from "react";

const TOPICS: any = {
  thermodynamics: {
    name: "Thermodynamics",
    class: "11 & 12",
    subjects: ["physics", "chemistry"],
    physics: {
      oneLiner: "Energy, work aur heat ke beech ka relationship — machines aur engines ke context mein.",
      concepts: ["Internal Energy (U) — system ke andar total energy", "Work done by gas: W = PΔV", "First Law: ΔU = Q − W", "Isothermal, Adiabatic, Isochoric, Isobaric processes", "Carnot Engine aur efficiency = 1 − T₂/T₁"],
      examFocus: "JEE mein PV diagrams, Carnot cycle, aur process-based numericals aate hain.",
      ncertRef: "NCERT Physics Part 2, Class 11 — Chapter 12",
      trapAlert: "Adiabatic mein Q = 0 hota hai, ΔU = 0 nahi — yeh common galti hai!",
    },
    chemistry: {
      oneLiner: "Chemical reactions mein energy change — enthalpy, entropy aur spontaneity ke context mein.",
      concepts: ["Enthalpy (ΔH) — heat absorbed/released at constant pressure", "Hess's Law — energy additive hoti hai", "Entropy (ΔS) — disorder ka measure", "Gibbs Energy: ΔG = ΔH − TΔS", "ΔG < 0 → spontaneous reaction"],
      examFocus: "NEET/Boards mein ΔG, spontaneity, aur Born-Haber cycle se questions aate hain.",
      ncertRef: "NCERT Chemistry Part 1, Class 11 — Chapter 6",
      trapAlert: "ΔH negative matlab exothermic — but exothermic reaction hamesha spontaneous nahi hoti! ΔG dekho.",
    },
    keyDifference: "Physics mein mechanical energy aur engines ka focus hai. Chemistry mein chemical reactions ki energy change ka.",
    exceptions: [{ rule: "Exothermic reactions spontaneous hoti hain", exception: "NH₄Cl + Ba(OH)₂ reaction endothermic hai phir bhi spontaneous — kyunki ΔS bahut zyada positive hai.", why: "Spontaneity sirf ΔH se nahi, ΔG = ΔH − TΔS se decide hoti hai." }],
  },
  atomicStructure: {
    name: "Atomic Structure",
    class: "11",
    subjects: ["physics", "chemistry"],
    physics: {
      oneLiner: "Atom ke andar particles ka behavior — photoelectric effect aur Bohr model ke through.",
      concepts: ["Rutherford model — nuclear atom", "Bohr Model — fixed circular orbits", "Energy of orbit: Eₙ = −13.6/n² eV", "Photoelectric Effect — E = hν", "de Broglie wavelength: λ = h/mv"],
      examFocus: "JEE mein photoelectric effect numericals, Bohr model energy levels common hain.",
      ncertRef: "NCERT Physics Part 2, Class 12 — Chapter 12",
      trapAlert: "Bohr model sirf hydrogen-like atoms ke liye valid hai — multi-electron atoms ke liye nahi.",
    },
    chemistry: {
      oneLiner: "Electrons ka atom mein arrangement — orbitals, quantum numbers aur electronic configuration.",
      concepts: ["4 Quantum Numbers: n, l, m, s", "Shapes of orbitals: s (sphere), p (dumbbell), d (complex)", "Aufbau Principle — lower energy pehle fill hoti hai", "Pauli Exclusion — same 4 quantum numbers possible nahi", "Hund's Rule — same energy orbitals mein ek-ek electron pehle"],
      examFocus: "NEET/Boards mein electronic configuration, quantum numbers, aur orbital shapes se questions.",
      ncertRef: "NCERT Chemistry Part 1, Class 11 — Chapter 2",
      trapAlert: "Cr aur Cu ki electronic configuration exception hai — 3d⁵4s¹ aur 3d¹⁰4s¹ — stability wajah se.",
    },
    keyDifference: "Physics mein atom ka macroscopic behavior (energy levels, radiation) focus hai. Chemistry mein electrons ka arrangement aur bonding ke implications.",
    exceptions: [{ rule: "Aufbau principle ke hisaab se 4s pehle bhar, phir 3d", exception: "Chromium (Cr): expected [Ar] 3d⁴ 4s² but actual [Ar] 3d⁵ 4s¹ hai", why: "Half-filled d-orbital (3d⁵) extra stability deta hai — symmetry ka fayda." }, { rule: "Aufbau principle ke hisaab se 4s pehle bhar, phir 3d", exception: "Copper (Cu): expected [Ar] 3d⁹ 4s² but actual [Ar] 3d¹⁰ 4s¹ hai", why: "Completely filled d-orbital (3d¹⁰) maximum stability deta hai." }],
  },
  electrochemistry: {
    name: "Electrochemistry",
    class: "12",
    subjects: ["physics", "chemistry"],
    physics: {
      oneLiner: "Current, resistance aur circuits — Ohm's law aur electrical energy ke context mein.",
      concepts: ["Ohm's Law: V = IR", "Resistivity: R = ρL/A", "Kirchhoff's Laws — complex circuits solve karne ke liye", "Power: P = VI = I²R", "Series aur Parallel combinations"],
      examFocus: "JEE mein complex circuit problems, Wheatstone bridge, aur potentiometer numericals.",
      ncertRef: "NCERT Physics Part 1, Class 12 — Chapter 3",
      trapAlert: "Internal resistance ignore mat karo numericals mein — terminal voltage aur EMF alag hoti hai.",
    },
    chemistry: {
      oneLiner: "Chemical reactions se electricity banana aur electricity se chemical reactions karana.",
      concepts: ["Galvanic Cell — chemical → electrical energy", "Electrolytic Cell — electrical → chemical energy", "Cell EMF: E°cell = E°cathode − E°anode", "Nernst Equation: E = E° − (RT/nF)ln Q", "Faraday's Laws — kitna substance deposit hoga"],
      examFocus: "NEET/Boards mein cell EMF calculation, electrolysis products, aur Faraday's law numericals.",
      ncertRef: "NCERT Chemistry Part 1, Class 12 — Chapter 3",
      trapAlert: "Galvanic cell mein anode negative hota hai (oxidation), electrolytic cell mein anode positive — confuse mat hona!",
    },
    keyDifference: "Physics mein electrons ka flow aur circuit resistance focus hai. Chemistry mein ions ka movement aur redox reactions ka focus hai.",
    exceptions: [{ rule: "Higher SRP wala electrode cathode hota hai", exception: "Concentration cells mein dono electrodes same material ke hote hain, concentration difference se current flow karta hai.", why: "Nernst equation se EMF aata hai, SRP se nahi — Q (reaction quotient) matter karta hai." }],
  },
  gasLaws: {
    name: "Gas Laws & Kinetic Theory",
    class: "11",
    subjects: ["physics", "chemistry"],
    physics: {
      oneLiner: "Gas molecules ka random motion — pressure, temperature aur energy ka molecular explanation.",
      concepts: ["Kinetic Theory — gases random motion mein hain", "PV = nRT — Ideal Gas Law", "KE ∝ Temperature — average KE = (3/2)kT", "RMS Speed: v_rms = √(3RT/M)", "Degrees of Freedom — motion ke types"],
      examFocus: "JEE mein RMS speed, degrees of freedom, aur kinetic energy numericals.",
      ncertRef: "NCERT Physics Part 2, Class 11 — Chapter 13",
      trapAlert: "RMS speed, average speed aur most probable speed teen alag cheezein hain — formulas confuse mat karo.",
    },
    chemistry: {
      oneLiner: "Gas laws chemical stoichiometry mein — moles, pressure aur reactions ke liye.",
      concepts: ["Boyle's Law: PV = constant (T fixed)", "Charles's Law: V/T = constant (P fixed)", "Avogadro's Law: equal volumes = equal moles", "Ideal Gas: PV = nRT", "Van der Waals equation — real gases ke liye"],
      examFocus: "NEET/Boards mein gas stoichiometry, mole calculations, aur real vs ideal gas.",
      ncertRef: "NCERT Chemistry Part 1, Class 11 — Chapter 5",
      trapAlert: "STP pe 1 mole gas = 22.4 L — lekin yeh sirf ideal gas ke liye. Real gases thoda alag hota hai.",
    },
    keyDifference: "Physics mein molecular speed aur kinetic energy ka focus hai. Chemistry mein moles, stoichiometry aur real gas behavior.",
    exceptions: [{ rule: "Ideal gas law PV = nRT hamesha valid hai", exception: "High pressure ya low temperature pe real gases ideal behavior se deviate karti hain.", why: "Real gases mein intermolecular forces aur finite molecular volume hota hai — Van der Waals equation use karo." }],
  },
};

const SUBJECT_CONFIG: any = {
  physics: { label: "Physics", emoji: "⚛️", color: "#3B6FE8", bg: "#EEF3FD", border: "#C5D6FA" },
  chemistry: { label: "Chemistry", emoji: "🧪", color: "#16A34A", bg: "#EDFBF0", border: "#BBF0CC" },
  biology: { label: "Biology", emoji: "🧬", color: "#9333EA", bg: "#F5EEFF", border: "#DDB8FA" },
};

function SubjectCard({ subject, data }: any) {
  const cfg = SUBJECT_CONFIG[subject];
  return (
    <div style={{ background: cfg.bg, border: `1.5px solid ${cfg.border}`, borderRadius: 14, padding: "20px 18px", flex: 1, minWidth: 260 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 20 }}>{cfg.emoji}</span>
        <span style={{ fontWeight: 700, fontSize: 15, color: cfg.color }}>{cfg.label}</span>
      </div>
      <p style={{ fontSize: 13.5, color: "#374151", marginBottom: 14, lineHeight: 1.6, fontStyle: "italic" }}>"{data.oneLiner}"</p>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: cfg.color, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" as const }}>Key Concepts</div>
        {data.concepts.map((c: string, i: number) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
            <span style={{ color: cfg.color, fontWeight: 700, fontSize: 13 }}>→</span>
            <span style={{ fontSize: 13, color: "#1F2937", lineHeight: 1.5 }}>{c}</span>
          </div>
        ))}
      </div>
      <div style={{ background: "#fff", borderRadius: 10, padding: "10px 14px", marginBottom: 10, border: `1px solid ${cfg.border}` }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: cfg.color, marginBottom: 4, textTransform: "uppercase" as const }}>📖 Exam Focus</div>
        <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>{data.examFocus}</div>
      </div>
      <div style={{ background: "#FFF8E1", borderRadius: 10, padding: "10px 14px", border: "1px solid #FFE082" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B45309", marginBottom: 4, textTransform: "uppercase" as const }}>⚠️ Trap Alert</div>
        <div style={{ fontSize: 13, color: "#78350F", lineHeight: 1.5 }}>{data.trapAlert}</div>
      </div>
      <div style={{ marginTop: 10, fontSize: 11, color: "#9CA3AF" }}>📚 {data.ncertRef}</div>
    </div>
  );
}

function ExceptionCards({ exceptions }: any) {
  if (!exceptions || exceptions.length === 0) return null;
  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#DC2626", marginBottom: 12 }}>🚨 Exceptions — Yaad Rakhna Zaroori Hai</div>
      {exceptions.map((ex: any, i: number) => (
        <div key={i} style={{ background: "#FFF5F5", border: "1.5px solid #FCA5A5", borderRadius: 12, padding: "14px 16px", marginBottom: 10 }}>
          <div style={{ marginBottom: 8 }}><span style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase" as const }}>Rule: </span><span style={{ fontSize: 13, color: "#374151" }}>{ex.rule}</span></div>
          <div style={{ marginBottom: 8 }}><span style={{ fontSize: 11, fontWeight: 700, color: "#DC2626", textTransform: "uppercase" as const }}>Exception: </span><span style={{ fontSize: 13, color: "#1F2937", fontWeight: 600 }}>{ex.exception}</span></div>
          <div style={{ background: "#fff", borderRadius: 8, padding: "8px 12px", border: "1px solid #FCA5A5" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#7C3AED", textTransform: "uppercase" as const }}>💡 Kyun: </span>
            <span style={{ fontSize: 13, color: "#374151" }}>{ex.why}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (q: string) => {
    setQuery(q);
    setNotFound(false);
    if (!q.trim()) { setResult(null); return; }
    const key = Object.keys(TOPICS).find((k) =>
      TOPICS[k].name.toLowerCase().includes(q.toLowerCase()) || k.toLowerCase().includes(q.toLowerCase())
    );
    if (key) { setResult(TOPICS[key]); }
    else { setResult(null); setNotFound(q.length > 2); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", fontFamily: "-apple-system, sans-serif" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 16px 64px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>📚</div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: "#0F172A", margin: "0 0 6px" }}>Samjho</h1>
          <p style={{ fontSize: 15, color: "#64748B", margin: 0 }}>
            Ek topic — Physics, Chemistry mein clearly differentiated<br />
            <span style={{ fontSize: 13, color: "#94A3B8" }}>NCERT-based • Class 11 & 12 • CBSE / JEE / NEET</span>
          </p>
        </div>

        {/* Search */}
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }}>🔍</span>
          <input
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Topic likho... jaise Thermodynamics, Waves, Gas Laws"
            style={{ width: "100%", padding: "14px 16px 14px 46px", fontSize: 16, border: "2px solid #E2E8F0", borderRadius: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
          />
        </div>

        {/* Result */}
        {result && (
          <div style={{ marginTop: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", margin: 0 }}>{result.name}</h2>
              <span style={{ background: "#EEF3FD", color: "#3B6FE8", fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>Class {result.class}</span>
            </div>
            <div style={{ background: "linear-gradient(135deg, #0F172A, #1E3A5F)", borderRadius: 14, padding: "16px 20px", marginBottom: 20, display: "flex", gap: 12 }}>
              <span style={{ fontSize: 22 }}>⚡</span>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase" as const, marginBottom: 5 }}>Key Difference</div>
                <div style={{ fontSize: 14, color: "#F1F5F9", lineHeight: 1.6 }}>{result.keyDifference}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" as const }}>
              {result.subjects.map((s: string) => <SubjectCard key={s} subject={s} data={result[s]} />)}
            </div>
            <ExceptionCards exceptions={result.exceptions} />
          </div>
        )}

        {/* Not Found */}
        {notFound && (
          <div style={{ marginTop: 28, textAlign: "center", padding: "28px 20px", background: "#fff", borderRadius: 14, border: "1.5px solid #E2E8F0" }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>🤔</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#374151" }}>Yeh topic abhi add nahi hua</div>
            <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 4 }}>Thermodynamics, Atomic Structure, Electrochemistry, Gas Laws try karo</div>
          </div>
        )}

        {/* Popular Topics */}
        {!result && !notFound && (
          <div style={{ marginTop: 32 }}>
            <div style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 600, marginBottom: 14, textTransform: "uppercase" as const }}>Popular Topics</div>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 10 }}>
              {Object.values(TOPICS).map((t: any) => (
                <button key={t.name} onClick={() => handleSearch(t.name)}
                  style={{ background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 24, padding: "8px 16px", fontSize: 13, fontWeight: 600, color: "#374151", cursor: "pointer", fontFamily: "inherit" }}>
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 48, textAlign: "center", fontSize: 12, color: "#CBD5E1" }}>
          Content sourced from NCERT textbooks — Class 11 & 12
        </div>
      </div>
    </div>
  );
}