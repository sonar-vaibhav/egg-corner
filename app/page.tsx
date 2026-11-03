'use client'

import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  Bell,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Egg,
  LayoutDashboard,
  ListFilter,
  MapPin,
  MoreHorizontal,
  PackageCheck,
  Plus,
  ReceiptText,
  Search,
  Settings2,
  ShoppingBasket,
  ShoppingCart,
  Sparkles,
  Store,
  Trash2,
  UserRound,
  Users,
  Utensils,
  X,
  Zap,
} from 'lucide-react'

type MenuItem = {
  name: string
  category: string
  price: number
  station: string
  description: string
  customizable: boolean
  available: boolean
}

type Customization = {
  extraEggs: number
  spice: string
  addOns: string[]
  notes: string
}

type CartLine = MenuItem & {
  lineId: string
  qty: number
  customization: Customization
  addonTotal: number
}

const categories = ['All Items', 'Bhurji', 'Boiled Special', 'Rice Special', 'Omlet', 'Half Fry Special', 'Boiled Eggs', 'Add-ons']

const menu: MenuItem[] = [
  { name: 'Egg Bhurji', category: 'Bhurji', price: 60, station: 'Bhurji Station', description: 'Classic masala scramble with pav', customizable: true, available: true },
  { name: 'Green Bhurji', category: 'Bhurji', price: 60, station: 'Bhurji Station', description: 'Fresh coriander and green chilli', customizable: true, available: true },
  { name: 'Boiled Bhurji', category: 'Bhurji', price: 60, station: 'Bhurji Station', description: 'Silky bhurji made with boiled eggs', customizable: true, available: true },
  { name: 'Boiled Masala', category: 'Boiled Special', price: 70, station: 'Special Station', description: 'Spiced boiled eggs with buttery masala', customizable: true, available: true },
  { name: 'Anda Ghotala', category: 'Boiled Special', price: 150, station: 'Special Station', description: 'Eggs, cheese and rich street-style gravy', customizable: true, available: true },
  { name: 'Egg Rice', category: 'Rice Special', price: 80, station: 'Rice Station', description: 'Wok-tossed rice with two eggs', customizable: true, available: true },
  { name: 'Omlet', category: 'Omlet', price: 50, station: 'Omelette Station', description: 'Fluffy two-egg masala omelette', customizable: true, available: true },
  { name: 'Half Fry', category: 'Half Fry Special', price: 50, station: 'Fry Station', description: 'Sunny-side eggs with crisp edges', customizable: true, available: true },
  { name: 'Green Fry', category: 'Half Fry Special', price: 80, station: 'Fry Station', description: 'Half fry finished with green masala', customizable: true, available: true },
  { name: 'Boiled Egg', category: 'Boiled Eggs', price: 20, station: 'Boiled Station', description: 'Perfectly cooked egg with seasoning', customizable: false, available: true },
  { name: 'Butter Pav Jodi', category: 'Add-ons', price: 30, station: 'Pav Station', description: 'Two soft pav toasted with butter', customizable: false, available: true },
  { name: 'Extra Cheese', category: 'Add-ons', price: 30, station: 'Bhurji Station', description: 'Melted cheese topping', customizable: false, available: true },
]

const defaultCustomization: Customization = { extraEggs: 0, spice: 'Normal', addOns: [], notes: '' }

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
  const [cart, setCart] = useState<CartLine[]>([])
  const [toast, setToast] = useState('')

  const filteredMenu = useMemo(() => menu.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())), [search])
  const total = cart.reduce((sum, item) => sum + (item.price + item.addonTotal) * item.qty, 0)

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

      <section className="content">
        <header className="topbar"><div><span className="eyebrow">MONDAY, 03 NOVEMBER 2026</span><h1>{active === 'Overview' ? 'Good afternoon, Arjun' : active}</h1></div><div className="top-actions"><button className="icon-btn" aria-label="Notifications"><Bell size={19} /><i /></button><div className="store-status"><span className="live-dot" /> Open <ChevronDown size={14} /></div><button className="profile-mini">AS</button></div></header>

        {active === 'New Order' ? <OrderView cart={cart} total={total} filteredMenu={filteredMenu} search={search} setSearch={setSearch} setCart={setCart} placeOrder={placeOrder} /> : active === 'Kitchen Display' || active === 'Batch Preparation' ? <KitchenView orders={orders} active={active} setOrders={setOrders} /> : <Overview orders={orders} setActive={setActive} />}
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

function OrderView({ cart, total, filteredMenu, search, setSearch, setCart, placeOrder }: { cart: CartLine[]; total: number; filteredMenu: MenuItem[]; search: string; setSearch: (value: string) => void; setCart: React.Dispatch<React.SetStateAction<CartLine[]>>; placeOrder: () => void }) {
  const [category, setCategory] = useState('All Items')
  const [cartOpen, setCartOpen] = useState(false)
  const [step, setStep] = useState<'menu' | 'checkout'>('menu')
  const [customizing, setCustomizing] = useState<MenuItem | null>(null)
  const [customization, setCustomization] = useState<Customization>(defaultCustomization)
  const [orderType, setOrderType] = useState<'Dine-in' | 'Takeaway'>('Dine-in')
  const [table, setTable] = useState('04')
  const [payment, setPayment] = useState('Cash')
  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [notice, setNotice] = useState('')

  const visibleItems = filteredMenu.filter((item) => category === 'All Items' || item.category === category)
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const tax = Math.round(total * 0.05)
  const finalTotal = total + tax

  function showNotice(message: string) {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 1600)
  }

  function customizationKey(item: MenuItem, options: Customization) {
    return `${item.name}-${options.extraEggs}-${options.spice}-${options.addOns.join('|')}-${options.notes.trim()}`
  }

  function addItem(item: MenuItem, options: Customization = defaultCustomization) {
    const addonTotal = options.extraEggs * 20 + (options.addOns.includes('Extra Cheese') ? 30 : 0) + (options.addOns.includes('Extra Butter') ? 15 : 0) + (options.addOns.includes('Extra Pav Jodi') ? 30 : 0)
    const lineId = customizationKey(item, options)
    setCart((current) => {
      const existing = current.find((line) => line.lineId === lineId)
      return existing ? current.map((line) => line.lineId === lineId ? { ...line, qty: line.qty + 1 } : line) : [...current, { ...item, lineId, qty: 1, customization: options, addonTotal }]
    })
    showNotice(`${item.name} added`)
  }

  function startAdd(item: MenuItem) {
    if (!item.available) return
    if (!item.customizable) {
      addItem(item)
      return
    }
    setCustomizing(item)
    setCustomization(defaultCustomization)
  }

  function changeQuantity(lineId: string, delta: number) {
    setCart((current) => current.flatMap((line) => line.lineId === lineId ? (line.qty + delta > 0 ? [{ ...line, qty: line.qty + delta }] : []) : [line]))
  }

  function cartQuantity(itemName: string) {
    return cart.filter((line) => line.name === itemName).reduce((sum, line) => sum + line.qty, 0)
  }

  function customizationSummary(line: CartLine) {
    const values = [line.customization.extraEggs ? `+${line.customization.extraEggs} egg` : '', line.customization.spice !== 'Normal' ? line.customization.spice : '', ...line.customization.addOns].filter(Boolean)
    return values.length ? values.join(' · ') : 'Regular preparation'
  }

  function continueToCheckout() {
    setCartOpen(false)
    setStep('checkout')
  }

  function finishOrder() {
    if (!cart.length) return
    placeOrder()
    setStep('menu')
    setPayment('Cash')
    setCustomerName('')
    setPhone('')
    showNotice('Order sent to kitchen')
  }

  return <div className="page-body order-page">
    {step === 'menu' ? <>
      <div className="order-head menu-first-head"><div><p className="muted">Counter terminal / Fast entry</p><h2>New order</h2></div><div className="menu-status"><span className="live-dot" /> Menu available <span className="menu-date">03 Nov 2026</span></div></div>
      <section className="panel menu-panel menu-first-panel">
        <div className="menu-toolbar"><div className="search"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search dishes by name..." /></div><button className="filter-btn"><ListFilter size={16} /> Quick menu</button></div>
        <div className="categories" aria-label="Menu categories">{categories.map((item) => <button key={item} className={`category ${category === item ? 'active' : ''}`} onClick={() => setCategory(item)}>{item}</button>)}</div>
        <div className="menu-result-row"><p><strong>{visibleItems.length}</strong> dishes <span>·</span> Tap + to add quickly</p><span className="availability-key"><i /> Available now</span></div>
        <div className="menu-grid quick-menu-grid">{visibleItems.map((item) => { const quantity = cartQuantity(item.name); return <article className={`menu-item quick-menu-item ${!item.available ? 'unavailable' : ''}`} key={item.name}>
          <div className="food-art"><Egg size={27} /></div><div className="menu-item-copy"><div className="item-title-row"><strong>{item.name}</strong>{quantity > 0 && <span className="selected-badge"><Check size={11} /> {quantity}</span>}</div><span>{item.description}</span><small>{item.category}</small><b>₹{item.price}</b></div>
          <div className="menu-card-footer"><span className="available-label"><i /> {item.available ? 'Available' : 'Sold out'}</span><div className="card-qty">{quantity > 0 && <><button aria-label={`Decrease ${item.name}`} onClick={() => { const line = cart.find((entry) => entry.name === item.name); if (line) changeQuantity(line.lineId, -1) }}>−</button><b>{quantity}</b></>}<button className="add-circle" aria-label={`Add ${item.name}`} onClick={() => startAdd(item)}><Plus size={18} /></button></div></div>
        </article> })}</div>
      </section>
      {itemCount > 0 && <button className="floating-cart" onClick={() => setCartOpen(true)}><span className="cart-icon"><ShoppingCart size={19} /></span><span><strong>{itemCount} {itemCount === 1 ? 'ITEM' : 'ITEMS'}</strong><small>Review order</small></span><b>₹{finalTotal}</b><ChevronRight size={17} /></button>}
    </> : <CheckoutStep cart={cart} total={total} tax={tax} finalTotal={finalTotal} orderType={orderType} setOrderType={setOrderType} table={table} setTable={setTable} payment={payment} setPayment={setPayment} customerName={customerName} setCustomerName={setCustomerName} phone={phone} setPhone={setPhone} onBack={() => setStep('menu')} onPlace={finishOrder} />}

    {cartOpen && <div className="cart-overlay" onMouseDown={() => setCartOpen(false)}><aside className="cart-drawer" onMouseDown={(event) => event.stopPropagation()}><div className="drawer-heading"><div><span className="eyebrow">ORDER REVIEW</span><h2>Your order <span>({itemCount})</span></h2></div><button className="close-btn" aria-label="Close cart" onClick={() => setCartOpen(false)}><X size={19} /></button></div><div className="drawer-items">{cart.map((line) => <div className="drawer-item" key={line.lineId}><div className="drawer-item-info"><strong>{line.name}</strong><span>{customizationSummary(line)}</span><small>₹{line.price} + ₹{line.addonTotal} add-ons</small></div><div className="drawer-item-actions"><b>₹{(line.price + line.addonTotal) * line.qty}</b><div className="qty"><button onClick={() => changeQuantity(line.lineId, -1)}>−</button><strong>{line.qty}</strong><button onClick={() => changeQuantity(line.lineId, 1)}>+</button><button className="remove-line" onClick={() => setCart((current) => current.filter((entry) => entry.lineId !== line.lineId))}><Trash2 size={14} /></button></div></div></div>)}</div><div className="drawer-footer"><div className="bill"><div><span>Subtotal</span><b>₹{total}</b></div><div><span>Taxes & charges</span><b>₹{tax}</b></div><div className="bill-total"><span>Total</span><strong>₹{finalTotal}</strong></div></div><button className="secondary-action" onClick={() => setCartOpen(false)}>Continue adding items</button><button className="place-btn" onClick={continueToCheckout}>Proceed to customer details <ChevronRight size={16} /></button></div></aside></div>}
    {customizing && <div className="sheet-overlay" onMouseDown={() => setCustomizing(null)}><section className="custom-sheet" onMouseDown={(event) => event.stopPropagation()}><div className="sheet-handle" /><div className="sheet-heading"><div><span className="eyebrow">CUSTOMIZE ITEM</span><h2>{customizing.name}</h2><p>{customizing.description}</p></div><button className="close-btn" onClick={() => setCustomizing(null)}><X size={18} /></button></div><CustomizationOptions customization={customization} setCustomization={setCustomization} /><button className="place-btn" onClick={() => { addItem(customizing, customization); setCustomizing(null) }}>Add to order <span>₹{customizing.price + customization.extraEggs * 20 + (customization.addOns.includes('Extra Cheese') ? 30 : 0) + (customization.addOns.includes('Extra Butter') ? 15 : 0) + (customization.addOns.includes('Extra Pav Jodi') ? 30 : 0)}</span></button></section></div>}
    {notice && <div className="toast"><Sparkles size={17} /> {notice}</div>}
  </div>
}

function CustomizationOptions({ customization, setCustomization }: { customization: Customization; setCustomization: React.Dispatch<React.SetStateAction<Customization>> }) {
  const addOns = ['Extra Cheese', 'Extra Butter', 'Extra Pav Jodi']
  return <div className="custom-options">
    <div className="option-group"><div className="option-label"><strong>Extra eggs</strong><span>₹20 each</span></div><div className="option-pills">{[0, 1, 2, 3].map((count) => <button key={count} className={customization.extraEggs === count ? 'selected' : ''} onClick={() => setCustomization((current) => ({ ...current, extraEggs: count }))}>{count === 0 ? 'No extra' : `+${count} egg${count > 1 ? 's' : ''}`}</button>)}</div></div>
    <div className="option-group"><div className="option-label"><strong>Spiciness</strong><span>Choose one</span></div><div className="option-pills">{['Normal', 'Less Spicy', 'Medium Spicy', 'Extra Spicy'].map((spice) => <button key={spice} className={customization.spice === spice ? 'selected' : ''} onClick={() => setCustomization((current) => ({ ...current, spice }))}>{spice}</button>)}</div></div>
    <div className="option-group"><div className="option-label"><strong>Add something extra</strong><span>Optional</span></div><div className="option-pills">{addOns.map((addOn) => <button key={addOn} className={customization.addOns.includes(addOn) ? 'selected' : ''} onClick={() => setCustomization((current) => ({ ...current, addOns: current.addOns.includes(addOn) ? current.addOns.filter((item) => item !== addOn) : [...current.addOns, addOn] }))}>{addOn}</button>)}</div></div>
    <label className="notes-field"><span>Special preparation instructions</span><input value={customization.notes} onChange={(event) => setCustomization((current) => ({ ...current, notes: event.target.value }))} placeholder="e.g. no coriander" /></label>
  </div>
}

function CheckoutStep({ cart, total, tax, finalTotal, orderType, setOrderType, table, setTable, payment, setPayment, customerName, setCustomerName, phone, setPhone, onBack, onPlace }: { cart: CartLine[]; total: number; tax: number; finalTotal: number; orderType: 'Dine-in' | 'Takeaway'; setOrderType: (value: 'Dine-in' | 'Takeaway') => void; table: string; setTable: (value: string) => void; payment: string; setPayment: (value: string) => void; customerName: string; setCustomerName: (value: string) => void; phone: string; setPhone: (value: string) => void; onBack: () => void; onPlace: () => void }) {
  const [submitting, setSubmitting] = useState(false)
  function submit() {
    if (submitting || !cart.length) return
    setSubmitting(true)
    onPlace()
    window.setTimeout(() => setSubmitting(false), 500)
  }
  return <div className="checkout-page"><div className="checkout-top"><button className="back-link" onClick={onBack}><ArrowLeft size={16} /> Back to menu</button><div><span className="eyebrow">STEP 2 OF 2</span><h2>Finish this order</h2></div><span className="checkout-total">₹{finalTotal}</span></div><div className="checkout-layout"><section className="checkout-main"><div className="checkout-section"><div className="section-title"><span className="step-number">1</span><div><h3>Customer details</h3><p>Optional for takeaway orders</p></div></div><div className="form-grid"><label className="field"><span>Customer name</span><div className="input-with-icon"><UserRound size={16} /><input value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder="Enter name" /></div></label><label className="field"><span>Phone number <em>optional</em></span><div className="input-with-icon"><span className="phone-prefix">+91</span><input value={phone} onChange={(event) => setPhone(event.target.value.replace(/[^0-9]/g, '').slice(0, 10))} placeholder="10-digit number" inputMode="numeric" /></div></label></div></div><div className="checkout-section"><div className="section-title"><span className="step-number">2</span><div><h3>Order type</h3><p>Where should we serve it?</p></div></div><div className="order-type-cards"><button className={`order-type-card ${orderType === 'Dine-in' ? 'selected' : ''}`} onClick={() => setOrderType('Dine-in')}><span className="type-icon"><Store size={19} /></span><span><strong>Dine-in</strong><small>Serve at a table</small></span>{orderType === 'Dine-in' && <Check size={17} />}</button><button className={`order-type-card ${orderType === 'Takeaway' ? 'selected' : ''}`} onClick={() => setOrderType('Takeaway')}><span className="type-icon"><PackageCheck size={19} /></span><span><strong>Takeaway</strong><small>Prepare for pickup</small></span>{orderType === 'Takeaway' && <Check size={17} />}</button></div>{orderType === 'Dine-in' ? <label className="table-select"><span><MapPin size={15} /> Table number</span><select value={table} onChange={(event) => setTable(event.target.value)}><option value="04">Table 04</option><option value="05">Table 05</option><option value="08">Table 08</option><option value="12">Table 12</option></select></label> : <div className="pickup-note"><PackageCheck size={17} /><span><strong>Pickup token will be generated</strong><small>It will print with the kitchen ticket after placing the order.</small></span></div>}</div><div className="checkout-section"><div className="section-title"><span className="step-number">3</span><div><h3>Payment method</h3><p>Confirm how the customer will pay</p></div></div><div className="payment-cards">{['Cash', 'UPI', 'Pay Later'].map((method) => <button key={method} className={`payment-card ${payment === method ? 'selected' : ''}`} onClick={() => setPayment(method)}><CreditCard size={18} /><span><strong>{method}</strong><small>{method === 'UPI' ? 'Confirm after payment' : method === 'Pay Later' ? 'Settle later' : 'Collect at counter'}</small></span>{payment === method && <Check size={16} />}</button>)}</div>{payment === 'UPI' && <div className="payment-warning">UPI orders stay pending until payment is manually confirmed.</div>}</div></section><aside className="checkout-summary"><div className="summary-heading"><div><span className="eyebrow">ORDER SUMMARY</span><h3>{cart.reduce((sum, item) => sum + item.qty, 0)} items</h3></div><button onClick={onBack}>Edit</button></div><div className="summary-items">{cart.map((line) => <div key={line.lineId}><span><strong>{line.qty} × {line.name}</strong><small>{line.customization.extraEggs ? `+${line.customization.extraEggs} egg · ` : ''}{line.customization.spice !== 'Normal' ? line.customization.spice : 'Regular'}</small></span><b>₹{(line.price + line.addonTotal) * line.qty}</b></div>)}</div><div className="bill"><div><span>Subtotal</span><b>₹{total}</b></div><div><span>Taxes & charges</span><b>₹{tax}</b></div><div className="bill-total"><span>Total to collect</span><strong>₹{finalTotal}</strong></div></div><button className="place-btn confirm-order" onClick={submit} disabled={submitting}><span>{submitting ? 'Placing order...' : 'Confirm & place order'}</span><ChevronRight size={17} /></button><p className="kitchen-send"><Utensils size={14} /> Order will be sent to the kitchen</p></aside></div></div>
}

function KitchenView({ orders, active, setOrders }: { orders: typeof initialOrders; active: string; setOrders: (orders: typeof initialOrders) => void }) { const [tab, setTab] = useState('All'); const visible = orders.filter((order) => tab === 'All' || order.status === tab); return <div className="page-body kitchen-page"><div className="kitchen-head"><div><p className="muted">Kitchen Display System <span className="live-badge"><span className="live-dot" /> Live</span></p><h2>{active === 'Batch Preparation' ? 'Batch preparation' : 'Kitchen queue'}</h2></div><div className="kitchen-stats"><span><b>{orders.filter((o) => o.status === 'New').length}</b> New</span><span><b>{orders.filter((o) => o.status === 'Preparing').length}</b> Preparing</span><span><b>{orders.filter((o) => o.status === 'Ready').length}</b> Ready</span></div></div><div className="tabs">{['All', 'New', 'Preparing', 'Ready'].map((item) => <button key={item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>{item}</button>)}<button className="sound">Sound on</button></div>{active === 'Batch Preparation' && <div className="batch-banner"><Zap size={20} /><div><strong>3 suggested batches ready</strong><span>Grouping compatible dishes can save 18 minutes during this rush.</span></div><button onClick={() => setOrders(orders.map((o) => o))}>Review suggestions →</button></div>}<div className="kitchen-grid">{visible.map((order) => <article className={`kitchen-card ${order.tone}`} key={order.id}><div className="kc-top"><div><strong>{order.id}</strong><span>{order.type} · {order.place}</span></div><span className={`pill ${order.tone}`}>{order.status}</span></div><div className="kc-time"><Clock3 size={15} /> {order.age} ago {order.age === '13 min' && <b>Delayed</b>}</div><div className="kc-items">{order.items.split(', ').map((item) => <div key={item}><span className="check-box" />{item}</div>)}</div><div className="kc-footer"><span><Utensils size={14} /> {order.type === 'Takeaway' ? 'Fry Station' : 'Bhurji Station'}</span><button onClick={() => setOrders(orders.map((o) => o.id === order.id ? { ...o, status: o.status === 'New' ? 'Preparing' : o.status === 'Preparing' ? 'Ready' : 'Ready', tone: o.status === 'New' ? 'amber' : 'green' } : o))}>{order.status === 'New' ? 'Accept order' : order.status === 'Preparing' ? 'Mark ready' : 'View details'} <span>→</span></button></div></article>)}</div></div> }
