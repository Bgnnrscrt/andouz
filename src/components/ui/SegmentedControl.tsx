import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { SPRING } from '../../lib/motion';

export interface SegmentOption<T extends string> {
  value: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
  /** Accent for the active state (hex). Defaults to ANDO green. */
  color?: string;
}

interface SegmentedControlProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Unique per page — the active pill slides between options under this id. */
  layoutId: string;
  ariaLabel: string;
  /** `bar`: joined segmented track. `pills`: separate glass pills (wraps on small screens). */
  variant?: 'bar' | 'pills';
  size?: 'sm' | 'md';
  fullWidth?: boolean;
  className?: string;
  /** Wires aria-controls: tabs get `${idPrefix}-tab-${value}`, panels should use `${idPrefix}-panel-${value}`. */
  idPrefix?: string;
}

/** Accessible tablist with a sliding active pill (arrow keys, Home/End). */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  layoutId,
  ariaLabel,
  variant = 'bar',
  size = 'md',
  fullWidth = false,
  className = '',
  idPrefix,
}: SegmentedControlProps<T>) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const current = options.findIndex((o) => o.value === value);
    let next = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (current + 1) % options.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (current - 1 + options.length) % options.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = options.length - 1;
    if (next < 0) return;
    e.preventDefault();
    onChange(options[next].value);
    buttons.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      className={`seg seg-${variant} seg-${size}${fullWidth ? ' seg-full' : ''} ${className}`}
    >
      {options.map((o, i) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            ref={(el) => {
              buttons.current[i] = el;
            }}
            type="button"
            role="tab"
            id={idPrefix ? `${idPrefix}-tab-${o.value}` : undefined}
            aria-controls={idPrefix ? `${idPrefix}-panel-${o.value}` : undefined}
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            className={`seg-btn${active ? ' is-active' : ''}`}
            style={{ '--seg-color': o.color ?? '#00f59b' } as React.CSSProperties}
            onClick={() => onChange(o.value)}
          >
            {active && <motion.span layoutId={layoutId} className="seg-indicator" transition={SPRING.snappy} />}
            <span className="seg-content">
              {o.icon}
              {o.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
