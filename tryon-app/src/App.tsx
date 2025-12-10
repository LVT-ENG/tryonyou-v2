import React, { useState } from 'react'
import './styles/hero.css'

const claims = [
  'Avatar 3D + prenda real',
  'Fit Score sin devoluciones',
  'Comparador de tejido',
  'Recomendador PAU',
  'Pago dual ABVET',
  'Armario Inteligente',
  'Armario Solidario',
  'Orquestación JIT (CAP)'
]

export default function App(){
  const [open,setOpen] = useState(false)
  return (
    <main>
      <header className="topbar">
        <div>TRYONYOU · Armario Inteligente</div>
        <nav><a href="#claims">Claims</a> · <a href="#abvet">ABVET</a> · <a href="/patent">Patente</a></nav>
      </header>

      <section className="hero">
        <h1>TRYONYOU — ULTIMÁTUM</h1>
        <p>Hiperrealismo textil · Tu estilo, tus medidas · Pago dual ABVET</p>
        <div className="cta">
          <button onClick={()=>setOpen(true)}>Probar</button>
          <a id="abvet" className="ghost" href="#/abvet-payment">Pagar con ABVET</a>
        </div>
      </section>

      <section id="claims" className="claims">
        {claims.map((c,i)=>(
          <article key={i} className="card">
            <h3>{i+1}. {c}</h3>
            <p>Integrado en el sistema TRYONYOU–ABVETOS–ULTRA–PLUS–ULTIMATUM.</p>
          </article>
        ))}
      </section>

      <footer className="footer">
        <small>© 2025 TRYONYOU — <a href="/patent">/patent</a> · <a href="mailto:hello@tryonyou.com">Contacto</a></small>
      </footer>

      {open && (
        <div className="modal" onClick={()=>setOpen(false)}>
          <div className="modal-body" onClick={e=>e.stopPropagation()}>
            <h2>Avatar 3D (placeholder)</h2>
            <p>Demo visual. Conexión al módulo real en siguiente iteración.</p>
            <button onClick={()=>setOpen(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </main>
  )
}
