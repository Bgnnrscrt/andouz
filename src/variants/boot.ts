// Style previews (owner's request 09.11): /style/1 … /style/6 show the same portal in six
// different looks so the owner can compare them before a redesign. main.tsx loads this module
// lazily and only on those URLs: the normal site never downloads this code or its CSS.
import './bridge.css'
import './themes.css'
import './switcher.css'

export interface Variant {
  id: number
  slug: string
  name: string
  scheme: 'light' | 'dark'
  themeColor: string
  /** Google Fonts css2 query (without display=swap); every family has Cyrillic + Latin. */
  fonts: string
  /** document.fonts.load() probe: wait for the heading face so the page doesn't flash. */
  probe: string
}

export const VARIANTS: Variant[] = [
  {
    id: 1,
    slug: 'old-money',
    name: 'Старые деньги',
    scheme: 'light',
    themeColor: '#f1ece2',
    fonts: 'family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Jost:wght@400;500;600;700',
    probe: '600 1em "Cormorant Garamond"',
  },
  {
    id: 2,
    slug: 'samarkand',
    name: 'Самарканд',
    scheme: 'dark',
    themeColor: '#0d2149',
    fonts: 'family=Philosopher:ital,wght@0,400;0,700;1,400&family=Onest:wght@400;500;600;700',
    probe: '700 1em "Philosopher"',
  },
  {
    id: 3,
    slug: 'brutal',
    name: 'Необрутализм',
    scheme: 'light',
    themeColor: '#fff4de',
    fonts: 'family=Dela+Gothic+One&family=Rubik:wght@400;500;600;700;800',
    probe: '400 1em "Dela Gothic One"',
  },
  {
    id: 4,
    slug: 'noir',
    name: 'Нуар',
    scheme: 'dark',
    themeColor: '#0b0b0c',
    fonts: 'family=Oswald:wght@400;500;600;700&family=Golos+Text:wght@400;500;600;700',
    probe: '600 1em "Oswald"',
  },
  {
    id: 5,
    slug: 'notebook',
    name: 'Блокнот',
    scheme: 'light',
    themeColor: '#fbfaf4',
    fonts: 'family=Caveat:wght@500;600;700&family=PT+Sans:ital,wght@0,400;0,700;1,400',
    probe: '700 1em "Caveat"',
  },
  {
    id: 6,
    slug: 'seventies',
    name: 'Семидесятые',
    scheme: 'light',
    themeColor: '#f4e7cc',
    fonts: 'family=Unbounded:wght@600;700;800&family=Montserrat:wght@400;500;600;700',
    probe: '800 1em "Unbounded"',
  },
]

const FONT_WAIT_MS = 1500
const HIDE_KEY = 'ando_style_switcher_hidden'

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

function setMeta(name: string, content: string) {
  let meta = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.name = name
    document.head.appendChild(meta)
  }
  meta.content = content
}

/** Loads the variant's fonts and waits (at most FONT_WAIT_MS) for the heading face. */
function loadFonts(v: Variant): Promise<void> {
  return new Promise((resolve) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `https://fonts.googleapis.com/css2?${v.fonts}&display=swap`
    link.onload = () => {
      const fonts = document.fonts
      if (!fonts?.load) return resolve()
      Promise.race([fonts.load(v.probe, 'Ая Az'), wait(FONT_WAIT_MS)]).then(
        () => resolve(),
        () => resolve(),
      )
    }
    link.onerror = () => resolve()
    document.head.appendChild(link)
    setTimeout(resolve, FONT_WAIT_MS * 2)
  })
}

function readHidden(): boolean {
  try {
    return sessionStorage.getItem(HIDE_KEY) === '1'
  } catch {
    return false
  }
}

function writeHidden(hidden: boolean) {
  try {
    if (hidden) sessionStorage.setItem(HIDE_KEY, '1')
    else sessionStorage.removeItem(HIDE_KEY)
  } catch {
    /* private mode: the switcher just reappears after a reload */
  }
}

/** Small fixed bar: 1–6, the current name, «Оригинал» (the live site) and hide. */
function mountSwitcher(current: Variant) {
  const bar = document.createElement('nav')
  bar.className = 'vsw'
  bar.setAttribute('aria-label', 'Варианты стиля сайта')

  const label = document.createElement('span')
  label.className = 'vsw-label'
  label.textContent = 'Стиль'
  bar.appendChild(label)

  const links: { a: HTMLAnchorElement; base: string }[] = []
  for (const v of VARIANTS) {
    const a = document.createElement('a')
    a.className = 'vsw-num'
    a.textContent = String(v.id)
    a.title = v.name
    if (v.id === current.id) a.setAttribute('aria-current', 'page')
    bar.appendChild(a)
    links.push({ a, base: `/style/${v.id}` })
  }

  const name = document.createElement('span')
  name.className = 'vsw-name'
  name.textContent = current.name
  bar.appendChild(name)

  const orig = document.createElement('a')
  orig.className = 'vsw-orig'
  orig.textContent = 'Оригинал'
  orig.title = 'Сайт в нынешнем виде'
  bar.appendChild(orig)
  links.push({ a: orig, base: '/' })

  const hide = document.createElement('button')
  hide.type = 'button'
  hide.className = 'vsw-hide'
  hide.setAttribute('aria-label', 'Скрыть панель стилей')
  hide.textContent = '×'
  bar.appendChild(hide)

  const show = document.createElement('button')
  show.type = 'button'
  show.className = 'vsw-show'
  show.setAttribute('aria-label', 'Показать панель стилей')
  show.textContent = String(current.id)

  // Keep the open section (hash) when switching, so the same page can be compared across styles.
  const syncHrefs = () => {
    for (const { a, base } of links) a.href = base + window.location.hash
  }
  syncHrefs()
  window.addEventListener('hashchange', syncHrefs)

  const apply = (hidden: boolean) => {
    bar.hidden = hidden
    show.hidden = !hidden
  }
  hide.addEventListener('click', () => {
    writeHidden(true)
    apply(true)
    show.focus()
  })
  show.addEventListener('click', () => {
    writeHidden(false)
    apply(false)
    hide.focus()
  })
  apply(readHidden())

  document.body.append(bar, show)
}

export async function boot(id: number): Promise<void> {
  const v = VARIANTS.find((x) => x.id === id)
  if (!v) return
  const root = document.documentElement
  root.dataset.style = v.slug
  root.style.colorScheme = v.scheme
  setMeta('theme-color', v.themeColor)
  setMeta('robots', 'noindex, nofollow')
  await loadFonts(v)
  mountSwitcher(v)
}
