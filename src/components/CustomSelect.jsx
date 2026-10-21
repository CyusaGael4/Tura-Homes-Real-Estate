import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'

/**
 * Accessible animated dropdown used in the hero filter hub and the
 * Properties page filter bar.
 */
export default function CustomSelect({
  label,
  value,
  options,
  onChange,
  placeholder = 'Any',
}) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    if (open === undefined || !open) return undefined

    const onDocClick = (event) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) setOpen(false)
    }
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const select = (option) => {
    onChange(option === value ? '' : option)
    setOpen(false)
  }

  return (
    <div ref={wrapRef} className="relative min-w-0">
      <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-body-light">
        {label}
      </span>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-3 rounded-xl border bg-white px-4 py-3.5 text-left text-[14.5px] font-semibold text-navy-900 transition-colors hover:border-navy-100 hover:bg-mist-50 ${
          open ? 'border-navy-900 ring-4 ring-navy-900/10' : 'border-mist-200'
        } tap-target`}
      >
        <span className={`truncate ${value ? '' : 'font-medium text-body-light'}`}>
          {value || placeholder}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={20} className="shrink-0 text-navy-600" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={label}
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 top-full z-40 mt-2 max-h-[50vh] overflow-auto rounded-2xl border border-mist-200 bg-white p-1.5 card-shadow"
          >
            {['All', ...options].map((option) => {
              const optionValue = option === 'All' ? '' : option
              const selected = (value || '') === optionValue
              return (
                <li key={option}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => select(optionValue)}
                    className={`flex w-full items-center justify-between gap-2 rounded-xl px-3.5 py-3 text-left text-sm transition-colors ${
                      selected
                        ? 'bg-navy-900 font-semibold text-white'
                        : 'font-medium text-body hover:bg-mist-50 hover:text-navy-900'
                    } tap-target`}
                  >
                    <span>{option}</span>
                    {selected && <Check size={17} />}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
