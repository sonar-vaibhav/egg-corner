'use client'

import { useMemo, useState } from 'react'
import {
  Bell,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Egg,
  LayoutDashboard,
  ListFilter,
  Menu,
  MoreHorizontal,
  PackageCheck,
  Plus,
  ReceiptText,
  Search,
  Settings2,
  ShoppingBasket,
  Sparkles,
  Store,
  Users,
  Utensils,
  X,
  Zap,
} from 'lucide-react'

const menu = [
  { name: 'Egg Bhurji', category: 'Bhurji', price: 60, station: 'Bhurji Station' },
  { name: 'Green Bhurji', category: 'Bhurji', price: 60, station: 'Bhurji Station' },
  { name: 'Boiled Masala', category: 'Boiled Special', price: 70, station: 'Special Station' },
  { name: 'Anda Ghotala', category: 'Boiled Special', price: 150, station: 'Special Station' },
  { name: 'Egg Rice', category: 'Rice Special', price: 80, station: 'Rice Station' },
  { name: 'Omlet', category: 'Omlet', price: 50, station: 'Omelette Station' },
  { name: 'Half Fry', category: 'Half Fry Special', price: 50, station: 'Fry Station' },
  { name: 'Green Fry', category: 'Half Fry Special', price: 80, station: 'Fry Station' },
  { name: 'Boiled Egg', category: 'Boiled Eggs', price: 20, station: 'Boiled Station' },
]

const initialOrders = [
  { id: 'EG-1048', type: 'Dine-in', place: 'Table 04', items: '2× Egg Bhurji, 1× Omlet', status: 'Preparing', age: '08 min', tone: 'amber' },
  { id: 'EG-1047', type: 'Takeaway', place: 'Pickup #47', items: '1× Green Bhurji, 2× Half Fry', status: 'New', age: '04 min', tone: 'blue' },
  { id: 'EG-1046', type: 'Dine-in', place: 'Table 08', items: '1× Egg Rice, 1× Boiled Masala', status: 'Preparing', age: '13 min', tone: 'amber' },
  { id: 'EG-1045', type: 'Takeaway', place: 'Pickup #45', items: '2× Green Fry, 1× Boiled Egg', status: 'Ready', age: '02 min', tone: 'green' },
]

const nav = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'New Order', icon: Plus },
  { label: 'Active Orders', icon: ReceiptText, count: '12' },
  { label: 'Kitchen Display', icon: Utensils, count: '9' },
  { label: 'Batch Preparation', icon: Zap, count: '3' },
  { label: 'Ready for Handover', icon: PackageCheck, count: '4' },
  { label: 'Order History', icon: Clock3 },
  { label: 'Menu Management', icon: ShoppingBasket },
  { label: 'Staff Management', icon: Users },
  { label: 'Reports & Analytics', icon: CircleDollarSign },
]

export default function Page() {
  const [active, setActive] = useState('Overview')
  const [role, setRole] = useState('Owner / Admin')
  const [orders, setOrders] = useState(initialOrders)
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState<{ name: string; price: number; qty: number }[]>([])
  const [toast, setToast] = useState('')

  const filteredMenu = useMemo(() => menu.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())), [search])
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  function addToCart(item: (typeof menu)[number]) {
    setCart((current) => {
      const found = current.find((cartItem) => cartItem.name === item.name)
      return found ? current.map((cartItem) => cartItem.name === item.name ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem) : [...current, { name: item.name, price: item.price, qty: 1 }]
    })
    setToast(`${item.name} added to order`)
    setTimeout(() => setToast(''), 1800)
  }

  function placeOrder() {
    if (!cart.length) return
    const next = `EG-${1050 + orders.length}`
    setOrders((current) => [{ id: next, type: 'Takeaway', place: 'Pickup #50', items: cart.map((item) => `${item.qty}× ${item.name}`).join(', '), status: 'New', age: 'now', tone: 'blue' }, ...current])
    setCart([])
    setToast(`${next} sent to kitchen`)
    setActive('Kitchen Display')
    setTimeout(() => setToast(''), 2200)
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark"><Egg size={22} strokeWidth={2.5} /></div><div><strong>EggFlow</strong><span>The Egg Corner</span></div></div>
        <div className="role-card"><div className="avatar">AS</div><div className="role-copy"><strong>Arjun Shah</strong><span>{role}</span></div><ChevronDown size={16} /></div>
        <nav className="nav-list" aria-label="Primary navigation">
          {nav.map(({ label, icon: Icon, count }) => <button key={label} className={`nav-item ${active === label ? 'active' : ''}`} onClick={() => setActive(label)}><Icon size={18} /><span>{label}</span>{count && <b>{count}</b>}</button>)}
        </nav>
        <div className="sidebar-bottom"><button className="nav-item"><Settings2 size={18} /><span>Settings</span></button><div className="connection"><span className="live-dot" /> Live kitchen connection</div></div>
      </aside>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        {[
          { label: 'Home', target: 'Overview', icon: LayoutDashboard },
          { label: 'New Order', target: 'New Order', icon: Plus },
          { label: 'Kitchen', target: 'Kitchen Display', icon: Utensils },
          { label: 'Ready', target: 'Ready for Handover', icon: PackageCheck },
          { label: 'More', target: 'Order History', icon: MoreHorizontal },
        ].map(({ label, target, icon: Icon }) => (
          <button key={label} className={active === target || (label === 'More' && ['Order History', 'Menu Management', 'Staff Management', 'Reports & Analytics'].includes(active)) ? 'active' : ''} onClick={() => setActive(target)}>
            <Icon size={19} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <section className="content">
        <header className="topbar"><div><span className="eyebrow">MONDAY, 03 NOVEMBER 2026</span><h1>{active === 'Overview' ? 'Good afternoon, Arjun' : active}</h1></div><div className="top-actions"><button className="icon-btn" aria-label="Notifications"><Bell size={19} /><i /></button><div className="store-status"><span className="live-dot" /> Open <ChevronDown size={14} /></div><button className="profile-mini">AS</button></div></header>

        {active === 'New Order' ? <OrderView cart={cart} total={total} filteredMenu={filteredMenu} search={search} setSearch={setSearch} addToCart={addToCart} setCart={setCart} placeOrder={placeOrder} /> : active === 'Kitchen Display' || active === 'Batch Preparation' ? <KitchenView orders={orders} active={active} setOrders={setOrders} /> : <Overview orders={orders} setActive={setActive} />}
      </section>
      {toast && <div className="toast"><Sparkles size={17} /> {toast}</div>}
    </main>
  )
}

function Overview({ orders, setActive }: { orders: typeof initialOrders; setActive: (value: string) => void }) {
  return <div className="page-body"><div className="welcome-row"><div><p className="muted">Here&apos;s what&apos;s happening across the shop today.</p></div><div className="date-filter"><Clock3 size={16} /> Today <ChevronDown size={14} /></div></div>
    <div className="kpi-grid"><Kpi label="Total orders" value="48" change="↑ 12.5%" sub="vs. yesterday" icon={ReceiptText} /><Kpi label="Revenue today" value="₹6,840" change="↑ 8.2%" sub="vs. yesterday" icon={CircleDollarSign} /><Kpi label="Pending orders" value="12" change="Needs attention" sub="in the kitchen queue" icon={Clock3} alert /><Kpi label="Avg. prep time" value="11m 24s" change="↓ 2m 08s" sub="vs. yesterday" icon={Zap} /></div>
    <div className="section-grid"><section className="panel chart-panel"><div className="panel-heading"><div><h2>Order volume</h2><p>Orders placed by hour</p></div><button className="ghost-btn">This week <ChevronDown size={14} /></button></div><div className="chart"><div className="chart-y"><span>20</span><span>15</span><span>10</span><span>5</span><span>0</span></div><div className="chart-area"><div className="grid-lines" /> <svg viewBox="0 0 700 210" preserveAspectRatio="none" aria-label="Order volume chart"><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#65a845" stopOpacity=".23" /><stop offset="100%" stopColor="#65a845" stopOpacity="0" /></linearGradient></defs><path d="M0 170 C45 160, 55 130, 95 142 S145 160, 185 100 S230 123, 270 110 S320 85, 360 112 S410 90, 445 66 S490 98, 525 55 S580 74, 615 38 S665 45, 700 18 V210 H0Z" fill="url(#fill)" /><path d="M0 170 C45 160, 55 130, 95 142 S145 160, 185 100 S230 123, 270 110 S320 85, 360 112 S410 90, 445 66 S490 98, 525 55 S580 74, 615 38 S665 45, 700 18" fill="none" stroke="#65a845" strokeWidth="3" /></svg><div className="chart-x"><span>9 AM</span><span>11 AM</span><span>1 PM</span><span>3 PM</span><span>5 PM</span><span>7 PM</span><span>9 PM</span></div></div></div></section><section className="panel split-panel"><div className="panel-heading"><div><h2>Order mix</h2><p>Today&apos;s order types</p></div><MoreHorizontal size={19} /></div><div className="donut-wrap"><div className="donut"><strong>48</strong><span>orders</span></div><div className="legend"><div><i className="dot green" />Dine-in <b>29</b></div><div><i className="dot yellow" />Takeaway <b>19</b></div></div></div><div className="payment-row"><span>Cash <b>₹3,240</b></span><span>UPI <b>₹3,600</b></span></div></section></div>
    <div className="lower-grid"><section className="panel orders-panel"><div className="panel-heading"><div><h2>Live kitchen queue</h2><p>Real-time order status</p></div><button className="text-btn" onClick={() => setActive('Kitchen Display')}>View kitchen <span>→</span></button></div><div className="order-list">{orders.slice(0, 4).map((order) => <OrderRow key={order.id} order={order} />)}</div></section><section className="panel batch-panel"><div className="panel-heading"><div><h2>Suggested batches</h2><p>Compatible dishes grouped</p></div><button className="text-btn" onClick={() => setActive('Batch Preparation')}>View all <span>→</span></button></div><div className="batch-card"><div className="batch-icon"><Zap size={19} /></div><div><strong>Egg Bhurji</strong><span>5 portions · 3 orders</span></div><b>Ready to start</b></div><div className="batch-card"><div className="batch-icon yellow-bg"><Utensils size={19} /></div><div><strong>Green Bhurji</strong><span>3 portions · 2 orders</span></div><b>Ready to start</b></div><div className="batch-card"><div className="batch-icon blue-bg"><Egg size={19} /></div><div><strong>Omlet</strong><span>4 portions · 3 orders</span></div><b>Ready to start</b></div></section></div>
  </div>
}

function Kpi({ label, value, change, sub, icon: Icon, alert }: { label: string; value: string; change: string; sub: string; icon: typeof ReceiptText; alert?: boolean }) { return <div className="kpi"><div className="kpi-top"><span>{label}</span><div className={`kpi-icon ${alert ? 'alert-icon' : ''}`}><Icon size={17} /></div></div><strong>{value}</strong><div className="kpi-change"><span className={alert ? 'amber' : ''}>{change}</span> <small>{sub}</small></div></div> }

function OrderRow({ order }: { order: (typeof initialOrders)[number] }) { return <div className="order-row"><div className={`status-bar ${order.tone}`} /><div className="order-main"><div><strong>{order.id}</strong><span>{order.type} · {order.place}</span></div><p>{order.items}</p></div><div className="order-right"><span className={`pill ${order.tone}`}>{order.status}</span><small>{order.age}</small></div></div> }

function OrderView({ cart, total, filteredMenu, search, setSearch, addToCart, setCart, placeOrder }: any) { return <div className="page-body order-page"><div className="order-head"><div><p className="muted">Counter terminal / Fast entry</p><h2>Create a new order</h2></div><div className="order-types"><button className="type-btn active"><Store size={18} /> Dine-in</button><button className="type-btn"><PackageCheck size={18} /> Takeaway</button></div></div><div className="order-layout"><section className="panel menu-panel"><div className="menu-toolbar"><div className="search"><Search size={17} /><input value={search} onChange={(e: any) => setSearch(e.target.value)} placeholder="Search menu..." /></div><button className="filter-btn"><ListFilter size={16} /> Filter</button></div><div className="categories"><button className="category active">All items</button>{['Bhurji', 'Boiled Special', 'Rice Special', 'Omlet', 'Fry'].map((cat) => <button key={cat} className="category">{cat}</button>)}</div><div className="menu-grid">{filteredMenu.map((item: any) => <button className="menu-item" key={item.name} onClick={() => addToCart(item)}><div className="food-art"><Egg size={27} /></div><div className="menu-item-copy"><strong>{item.name}</strong><span>{item.category}</span><b>₹{item.price}</b></div><span className="add-circle"><Plus size={18} /></span></button>)}</div></section><aside className="panel cart-panel"><div className="cart-heading"><div><h2>Current order</h2><p>Order #EG-1050</p></div><button className="clear-btn" onClick={() => setCart([])}>Clear</button></div><div className="order-choice"><button className="choice active">Dine-in</button><button className="choice">Takeaway</button><label>Table <select><option>04</option><option>05</option><option>08</option></select></label></div><div className="cart-items">{cart.length ? cart.map((item: any) => <div className="cart-item" key={item.name}><div><strong>{item.name}</strong><span>₹{item.price} each</span></div><div className="qty"><button onClick={() => setCart((c: any[]) => c.flatMap((x) => x.name === item.name ? (x.qty > 1 ? [{ ...x, qty: x.qty - 1 }] : []) : [x]))}>−</button><b>{item.qty}</b><button onClick={() => setCart((c: any[]) => c.map((x) => x.name === item.name ? { ...x, qty: x.qty + 1 } : x))}>+</button></div></div>) : <div className="empty-cart"><ShoppingBasket size={28} /><strong>Your order is empty</strong><span>Add dishes from the menu to get started</span></div>}</div><div className="addon-box"><span>Add-ons</span><div><button>+ Extra cheese <b>₹30</b></button><button>+ Extra egg <b>₹20</b></button></div></div><div className="bill"><div><span>Subtotal</span><b>₹{total}</b></div><div><span>Taxes & charges</span><b>₹{Math.round(total * .05)}</b></div><div className="bill-total"><span>Total</span><strong>₹{total + Math.round(total * .05)}</strong></div></div><div className="payment-select"><span>Payment method</span><div><button className="pay active">Cash</button><button className="pay">UPI</button><button className="pay">Later</button></div></div><button className="place-btn" onClick={placeOrder}>Place order <span>₹{total + Math.round(total * .05)}</span></button></aside></div></div> }

function KitchenView({ orders, active, setOrders }: { orders: typeof initialOrders; active: string; setOrders: (orders: typeof initialOrders) => void }) { const [tab, setTab] = useState('All'); const visible = orders.filter((order) => tab === 'All' || order.status === tab); return <div className="page-body kitchen-page"><div className="kitchen-head"><div><p className="muted">Kitchen Display System <span className="live-badge"><span className="live-dot" /> Live</span></p><h2>{active === 'Batch Preparation' ? 'Batch preparation' : 'Kitchen queue'}</h2></div><div className="kitchen-stats"><span><b>{orders.filter((o) => o.status === 'New').length}</b> New</span><span><b>{orders.filter((o) => o.status === 'Preparing').length}</b> Preparing</span><span><b>{orders.filter((o) => o.status === 'Ready').length}</b> Ready</span></div></div><div className="tabs">{['All', 'New', 'Preparing', 'Ready'].map((item) => <button key={item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>{item}</button>)}<button className="sound">Sound on</button></div>{active === 'Batch Preparation' && <div className="batch-banner"><Zap size={20} /><div><strong>3 suggested batches ready</strong><span>Grouping compatible dishes can save 18 minutes during this rush.</span></div><button onClick={() => setOrders(orders.map((o) => o))}>Review suggestions →</button></div>}<div className="kitchen-grid">{visible.map((order) => <article className={`kitchen-card ${order.tone}`} key={order.id}><div className="kc-top"><div><strong>{order.id}</strong><span>{order.type} · {order.place}</span></div><span className={`pill ${order.tone}`}>{order.status}</span></div><div className="kc-time"><Clock3 size={15} /> {order.age} ago {order.age === '13 min' && <b>Delayed</b>}</div><div className="kc-items">{order.items.split(', ').map((item) => <div key={item}><span className="check-box" />{item}</div>)}</div><div className="kc-footer"><span><Utensils size={14} /> {order.type === 'Takeaway' ? 'Fry Station' : 'Bhurji Station'}</span><button onClick={() => setOrders(orders.map((o) => o.id === order.id ? { ...o, status: o.status === 'New' ? 'Preparing' : o.status === 'Preparing' ? 'Ready' : 'Ready', tone: o.status === 'New' ? 'amber' : 'green' } : o))}>{order.status === 'New' ? 'Accept order' : order.status === 'Preparing' ? 'Mark ready' : 'View details'} <span>→</span></button></div></article>)}</div></div> }
